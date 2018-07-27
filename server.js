'use strict';

const express 			= require('express');
const morgan 			= require('morgan');
const bodyParser		= require('body-parser');
const favicon			= require('serve-favicon');
const compress 			= require('compression');
const helmet			= require('helmet');
const flash				= require('connect-flash');
const hbs				= require('express-hbs');
const path				= require('path');
const _					= require('lodash');
const methodOverride 	= require('method-override');
const cookieParser		= require('cookie-parser');
const validator			= require('validator');
const config			= require('./config/env/config');
const request			= require ('request');

/**
 * Configure a morgan token for the userid.
 */
morgan.token('userid', (req) => {
	return (req.user) ? req.user.displayName + ' <' + req.user.email + '>' : 'anonymous';
});

module.exports.renderIndex = (req, res) => {
	res.render('public/index');
};

/**
 * Initialize local variables in express app.
 */
module.exports.initLocalVariables = function(app) {

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.logo = config.logo;
	app.locals.favicon = config.favicon;
	app.locals.env = process.env.NODE_ENV;
	app.locals.domain = config.domain;
	app.locals.sessionTimeout = config.sessionTimeout || 300;
	app.locals.sessionTimeoutWarning = config.sessionTimeoutWarning || 300;
	
	// Set up a local variable for the url to the api server
	const protocol = config.api.secure ? 'https' : 'http';
	app.locals.apiUrl = protocol + '://' + config.api.host + ':' + config.api.port;

	// Passing the request url to environment locals
	app.use(function (req, res, next) {
		res.locals.host = req.protocol + '://' + req.hostname;
		res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
		next();
	});

	app.enable('trust proxy');
};

/**
 * Initialize the various express middleware.
 */
module.exports.initMiddleware = function(app) {
	
	// Initialize compression
	app.use(compress({
	  filter: (req, res) => {
		var result = (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
		return result;
	  },
	  level: 9
	}));
  
	// Restrict file uploads
	app.use ('/uploads/*', (req, res, next) => {
	  var pathname = req.baseUrl;
	  if (!!~pathname.indexOf ('file-')) res.status(403).send('<h1>403 Forbidden</h1>');
	  else next();
	});
  
	// Initialize favicon middleware
	app.use(favicon(app.locals.favicon));
  
	// Enable logger (morgan) if enabled in the configuration file
	if (_.has(config, 'log.format')) {
	  app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
	}
  
	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
	  // Disable views cache
	  app.set('view cache', false);
	} 
	else if (process.env.NODE_ENV === 'production') {
	  app.locals.cache = 'memory';
	}
  
	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
	  extended: true,
	  limit: '50mb'
	}));
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(methodOverride());
  
	// Add the cookie parser and flash middleware
	app.use(cookieParser());
	app.use(flash());
};

/**
 * Configure express template view engine
 */
module.exports.initViewEngine = function(app) {
	app.engine('server.view.html', hbs.express4({
	  extname: '.server.view.html'
	}));
	app.set('view engine', 'server.view.html');
	app.set('views', path.resolve('./'));
};

/**
 * Configure Helmet headers configuration
 */
module.exports.initHelmetHeaders = function(app) {
	// Use helmet to secure Express headers
	const SIX_MONTHS = 15778476000;
	app.use(helmet.frameguard());
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.ieNoOpen());
	app.use(helmet.hsts({
	  maxAge: SIX_MONTHS,
	  includeSubdomains: true,
	  force: true
	}));
	app.disable('x-powered-by');
};

/**
 * Configure the client static routes
 */
module.exports.initModuleRoutes = function (app) {

	app.use('/', express.static(path.resolve('./public'), { maxAge: 86400000 }));

	config.folders.forEach(function (staticPath) {
		app.use(staticPath, express.static(path.resolve('./' + staticPath)));
	});

	app.route('/*').get(this.renderIndex);
};

let app = express();

this.initLocalVariables(app);
this.initMiddleware(app);
this.initViewEngine(app);
this.initHelmetHeaders(app);
this.initModuleRoutes(app);

app.listen(config.port, config.host, () => {
	console.log('listening on ' + config.host + ':' + config.port);
});

(function (app) {
	'use strict';
	app.registerModule('messages', ['core']); // The core module is required for special route handling; see /core/config/core.client.routes
	app.registerModule('messages.services');
	app.registerModule('messages.routes', ['ui.router', 'core.routes', 'messages.services']);
} (ApplicationConfiguration));

(function (app) {
	'use strict';
	// The core module is required for special route handling; see /core/client/config/core.client.routes
	app.registerModule('proposalQuestions', ['core']);
	app.registerModule('proposalQuestions.services');
	app.registerModule('proposalQuestions.routes', ['ui.router', 'core.routes', 'proposalQuestions.services']);
}(ApplicationConfiguration));

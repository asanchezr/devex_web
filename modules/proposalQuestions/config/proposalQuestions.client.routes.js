// =========================================================================
//
// All the client side routes for proposalQuestions
//
// =========================================================================
(function () {
	'use strict';

	angular.module ('proposalQuestions.routes').config (['$stateProvider', function ($stateProvider) {
		$stateProvider
		// -------------------------------------------------------------------------
		//
		// this is the top level, abstract route for all propsalQuestion routes, it only
		// contians the ui-view that all other routes get rendered in
		//
		// -------------------------------------------------------------------------
		.state ('proposalQuestions', {
			abstract : true,
			url      : '/proposalQuestions',
			template : '<ui-view autoscroll="true"></ui-view>'
		})
		// -------------------------------------------------------------------------
		//
		// propsalQuestion listing. Resolve to all proposalQuestions in the system and place that in
		// the scope. listing itself is done through a directive
		//
		// -------------------------------------------------------------------------
		.state ('proposalQuestions.list', {
			url          : '',
			templateUrl  : '/modules/proposalQuestions/client/views/list-proposalQuestions.client.view.html',
			controller   : 'PropsalQuestionsListController',
			controllerAs : 'vm',
			resolve: {
				proposalQuestions: function ($stateParams, PropsalQuestionsService) {
					return PropsalQuestionsService.query ();
				}
			},
			data: {
				pageTitle: 'proposalQuestions List'
			}
		})
		// -------------------------------------------------------------------------
		//
		// view a propsalQuestion, resolve the propsalQuestion data
		//
		// -------------------------------------------------------------------------
		.state ('proposalQuestions.view', {
			url          : '/:propsalQuestionId',
			templateUrl  : '/modules/proposalQuestions/client/views/view-propsalQuestion.client.view.html',
			controller   : 'PropsalQuestionViewController',
			controllerAs : 'vm',
			resolve: {
				propsalQuestion: function ($stateParams, PropsalQuestionsService) {
					return PropsalQuestionsService.get ({
						propsalQuestionId: $stateParams.propsalQuestionId
					}).$promise;
				}
			},
			data: {
				pageTitle: 'PropsalQuestion: {{ propsalQuestion.name }}'
			}
		})
		// -------------------------------------------------------------------------
		//
		// the base for editing
		//
		// -------------------------------------------------------------------------
		.state ('propsalQuestionadmin', {
			abstract : true,
			url      : '/propsalQuestionadmin',
			template : '<ui-view autoscroll="true"></ui-view>'
		})
		// -------------------------------------------------------------------------
		//
		// edit a propsalQuestion
		//
		// -------------------------------------------------------------------------
		.state ('propsalQuestionadmin.edit', {
			url          : '/:propsalQuestionId/edit',
			templateUrl  : '/modules/proposalQuestions/client/views/edit-propsalQuestion.client.view.html',
			controller   : 'PropsalQuestionEditController',
			controllerAs : 'qqq',
			resolve: {
				editing: function () { return true; },
				propsalQuestion: function ($stateParams, PropsalQuestionsService) {
					return PropsalQuestionsService.get ({
						propsalQuestionId: $stateParams.propsalQuestionId
					}).$promise;
				}
			},
			data: {
				roles: ['admin', 'gov'],
				pageTitle: 'PropsalQuestion {{ propsalQuestion.title }}'
			}
		})
		// -------------------------------------------------------------------------
		//
		// create a new propsalQuestion and edit it
		//
		// -------------------------------------------------------------------------
		.state ('propsalQuestionadmin.create', {
			url          : '/create',
			templateUrl  : '/modules/proposalQuestions/client/views/edit-propsalQuestion.client.view.html',
			controller   : 'PropsalQuestionEditController',
			controllerAs : 'qqq',
			resolve: {
				editing: function () { return false; },
				propsalQuestion: function (PropsalQuestionsService) {
					return new PropsalQuestionsService ();
				}
			},
			data: {
				roles: ['admin', 'gov'],
				pageTitle: 'New PropsalQuestion'
			}
		})
		;
	}]);
}());



(function () {
	'use strict';
	angular.module ('proposalQuestions')
	// -------------------------------------------------------------------------
	//
	// directive for listing proposalQuestions
	//
	// -------------------------------------------------------------------------
	.directive ('propsalQuestionList', function () {
		return {
			restrict     : 'E',
			controllerAs : 'vm',
			scope        : {
				title       : '@',
				context     : '@',
				proposalQuestions : '='
			},
			templateUrl  : '/modules/proposalQuestions/views/list.proposalQuestions.directive.html',
			controller   : function ($sce, $rootScope, $scope, PropsalQuestionsService, Authentication) {
				var vm         = this;
				vm.trust       = $sce.trustAsHtml;
				vm.auth        = Authentication;
				vm.title       = ($scope.title) ? $scope.title : null;
				vm.canAdd      = vm.auth.isAdmin;
				vm.context     = $scope.context;
				vm.proposalQuestions = $scope.proposalQuestions;
				$rootScope.$on ('updatePropsalQuestions', function () {
					vm.proposalQuestions = PropsalQuestionsService.query ();
				});
			}
		}
	})
	// -------------------------------------------------------------------------
	//
	// directive for viewing a propsalQuestion, could have several different modes
	//
	// -------------------------------------------------------------------------
	.directive ('propsalQuestionView', function () {
		return {
			restrict     : 'E',
			controllerAs : 'vm',
			scope        : {
				mode       : '@',
				propsalQuestion : '='
			},
			templateUrl  : '/modules/proposalQuestions/views/view.propsalQuestion.directive.html',
			controller   : function ($scope, Authentication) {
				var vm        = this;
				vm.auth       = Authentication;
				vm.mode       = $scope.mode || 'page';
				vm.canEdit    = vm.auth.isAdmin;
				vm.propsalQuestion = $scope.propsalQuestion;
			}
		}

	})
	;
}());


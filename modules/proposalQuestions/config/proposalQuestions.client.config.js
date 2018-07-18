(function () {
	'use strict';

	angular.module('proposalQuestions').run(['menuService', function (menuService) {
		menuService.addSubMenuItem ('topbar', 'admin', {
			title: 'Propsal Questions',
			state: 'proposalQuestions.list'
		});
	}]);

}());

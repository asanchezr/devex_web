// proposalQuestions service used to communicate proposalQuestions REST endpoints
(function () {
	'use strict';
	angular.module ('proposalQuestions.services').factory ('PropsalQuestionsService', function ($resource, $log) {
		var PropsalQuestion = $resource ('/api/proposalQuestions/:propsalQuestionId', {
			propsalQuestionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
		angular.extend (PropsalQuestion.prototype, {
			createOrUpdate: function () {
				var propsalQuestion = this;
				if (propsalQuestion._id) {
					return propsalQuestion.$update (function () {}, function (e) {$log.error (e.data);});
				} else {
					return propsalQuestion.$save (function () {}, function (e) {$log.error (e.data);});
				}
			}
		});
		return PropsalQuestion;
	});
}());

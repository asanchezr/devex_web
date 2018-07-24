(function () {
	'use strict';
	angular.module ('orgs.services').factory ('OrgsService', ['$resource', '$log', function ($resource, $log) {

		var Org = $resource (window.apiUrl + '/api/orgs/:orgId', {
			orgId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			list: {
				method: 'GET',
				url: window.apiUrl + '/api/orgs',
				isArray: true
			},
			my: {
				method: 'GET',
				url: window.apiUrl + '/api/my/orgs',
				isArray: true
			},
			myadmin: {
				method: 'GET',
				url: window.apiUrl + '/api/myadmin/orgs',
				isArray: true
			},
			removeUser: {
				method: 'GET',
				url: window.apiUrl + '/api/orgs/:orgId/user/:userId/remove',
				isArray: false
			},
			addMeToOrg: {
				method: 'GET',
				url: window.apiUrl + '/api/addmeto/org/:orgId',
				isArray: false
			}
		});
		angular.extend (Org.prototype, {
			createOrUpdate: function () {
				var org = this;
				if (org._id) {
					return org.$update (function () {}, function (e) {$log.error (e.data);});
				} else {
					return org.$save (function () {}, function (e) {$log.error (e.data);});
				}
			}
		});
		return Org;
	}]);
}());

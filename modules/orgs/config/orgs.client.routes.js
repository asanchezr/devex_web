// =========================================================================
//
// All the client side routes for orgs
//
// =========================================================================
(function () {
	'use strict';

	angular.module('orgs.routes').config(['$stateProvider', function ($stateProvider) {
		$stateProvider
		// -------------------------------------------------------------------------
		//
		// this is the top level, abstract route for all org routes, it only
		// contians the ui-view that all other routes get rendered in
		//
		// -------------------------------------------------------------------------
		.state('orgs', {
			abstract: true,
			url: '/orgs',
			template: '<ui-view autoscroll="true"></ui-view>'
		})
		// -------------------------------------------------------------------------
		//
		// create a new org
		//
		// -------------------------------------------------------------------------
		.state ('orgs.create', {
			url: '/create',
			templateUrl: '/modules/orgs/views/org-add.html',
			controller: 'OrgCreateController',
			controllerAs: 'vm',
			resolve: {
				org: ['OrgsService', function (OrgsService) {
					return new OrgsService();
				}]
			}
		})
		// -------------------------------------------------------------------------
		//
		// org listing. Resolve to all orgs in the system and place that in
		// the scope. listing itself is done through a directive
		//
		// -------------------------------------------------------------------------
		.state('orgs.list', {
			url: '',
			templateUrl: '/modules/orgs/views/list-orgs.client.view.html',
			data: {
				pageTitle: 'Orgs List'
			},
			ncyBreadcrumb: {
				label: 'All orgs'
			},
			resolve: {
				orgs: ['OrgsService', function (OrgsService) {
					return OrgsService.query ().$promise;
				}]
			},
			controller: 'OrgsListController',
			controllerAs: 'vm'
		})
		// -------------------------------------------------------------------------
		//
		// view an org, resolve the org data
		//
		// -------------------------------------------------------------------------
		.state('orgs.view', {
			url: '/:orgId',
			templateUrl: '/modules/orgs/views/org-view.html',
			controller: 'OrgViewController',
			controllerAs: 'vm',
			resolve: {
				org: ['$stateParams', 'OrgsService', function ($stateParams, OrgsService) {
					return OrgsService.get({
						orgId: $stateParams.orgId
					}).$promise;
				}],
				capabilities: ['CapabilitiesService', function (CapabilitiesService) {
					return CapabilitiesService.query ().$promise;
				}]
			}
		})
		// -------------------------------------------------------------------------
		//
		// the base for editing
		//
		// -------------------------------------------------------------------------
		.state('orgadmin', {
			abstract: true,
			url: '/orgadmin/:orgId',
			templateUrl: '/modules/orgs/views/org-edit.html',
			controller: 'OrgAdminController',
			controllerAs: 'vm',
			resolve: {
				org: ['$stateParams', 'OrgsService', function ($stateParams, OrgsService) {
					return OrgsService.get({
						orgId: $stateParams.orgId
					}).$promise;
				}],
				capabilities: ['CapabilitiesService', function (CapabilitiesService) {
					return CapabilitiesService.query ().$promise;
				}]
			},
			data: {
				roles: ['user', 'admin']
			}
		})
		.state('orgadmin.profile', {
			url: '/main',
			templateUrl: '/modules/orgs/views/org-main.html',
			controller: 'OrgProfileController',
			controllerAs: 'vm',
			data: {
				pageTitle: 'Company Settings'
			},
			resolve: {
				org: ['$stateParams', 'OrgsService', function ($stateParams, OrgsService) {
					return OrgsService.get({
						orgId: $stateParams.orgId
					}).$promise;
				}],
				capabilities: ['CapabilitiesService', function (CapabilitiesService) {
					return CapabilitiesService.query ().$promise;
				}]
			}
		})
		.state ('orgadmin.members', {
			url: '/members',
			templateUrl: '/modules/orgs/views/org-members.html',
			controller: 'OrgMembersController',
			controllerAs: 'vm',
			data: {
				pageTitle: 'Company Members'
			},
			resolve: {
				org: ['$stateParams', 'OrgsService', function ($stateParams, OrgsService) {
					return OrgsService.get({
						orgId: $stateParams.orgId
					}).$promise;
				}],
				capabilities: ['CapabilitiesService', function (CapabilitiesService) {
					return CapabilitiesService.query ().$promise;
				}]
			}
		})
		.state ('orgadmin.terms', {
			url: '/terms',
			templateUrl: '/modules/orgs/views/org-terms.html',
			controller: 'OrgTermsController',
			controllerAs: 'vm',
			data: {
				pageTitle: 'Company Terms'
			},
			resolve: {
				org: ['$stateParams', 'OrgsService', function ($stateParams, OrgsService) {
					return OrgsService.get({
						orgId: $stateParams.orgId
					}).$promise;
				}]
			}
		})
		;
	}]);
}());

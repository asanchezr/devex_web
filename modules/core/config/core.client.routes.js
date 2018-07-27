(function () {
	'use strict';

	angular
		.module('core.routes')
		.config(routeConfig);

	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routeConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.rule(function ($injector, $location) {
			var path = $location.path();
			var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

			if (hasTrailingSlash) {
				// if last character is a slash, return the same url without the slash
				var newPath = path.substr(0, path.length - 1);
				$location.replace().path(newPath);
			}
		});

		// Redirect to 404 when route not found
		$urlRouterProvider.otherwise(function ($injector) {
			$injector.get('$state').transitionTo('not-found', null, {
				location: false
			});
		});

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/modules/core/views/home.client.view.html',
				controller: 'HomeController',
				controllerAs: 'vm',
				ncyBreadcrumb: {
					label: 'Home'
				}
			})
			.state('not-found', {
				url: '/not-found',
				templateUrl: '/modules/core/views/404.client.view.html',
				controller: 'ErrorController',
				controllerAs: 'vm',
				params: {
					message: ['$stateParams', function($stateParams) {
						return $stateParams.message;
					}]
				},
				data: {
					ignoreState: true,
					pageTitle: 'Not Found'
				},
				ncyBreadcrumb: {
					label: 'Not Found'
				}
			})
			.state('bad-request', {
				url: '/bad-request',
				templateUrl: '/modules/core/views/400.client.view.html',
				controller: 'ErrorController',
				controllerAs: 'vm',
				params: {
					message: ['$stateParams', function($stateParams) {
						return $stateParams.message;
					}]
				},
				data: {
					ignoreState: true,
					pageTitle: 'Bad Request'
				},
				ncyBreadcrumb: {
					label: 'Bad Request'
				}
			})
			.state('forbidden', {
				url: '/forbidden',
				templateUrl: '/modules/core/views/403.client.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Forbidden'
				}
			})
			.state('disclaimer', {
				url: '/disclaimer',
				templateUrl: '/modules/core/views/disclaimer.client.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Disclaimer'
				}
			})
			.state('privacy', {
				url: '/privacy',
				templateUrl: '/modules/core/views/privacy.client.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Privacy'
				}
			})
			.state('accessibility', {
				url: '/accessibility',
				templateUrl: '/modules/core/views/accessibility.client.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Accessibility'
				}
			})
			.state('workwithus', {
				url: '/workwithus',
				templateUrl: '/modules/core/views/workwithus.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Work With Us'
				}
			})
			.state('codewithus', {
				url: '/codewithus',
				templateUrl: '/modules/core/views/codewithus.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Code With Us'
				}
			})
			.state('roadmap', {
				url: '/roadmap',
				templateUrl: '/modules/core/views/roadmap.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Roadmap'
				}
			})
			.state('iotblog', {
				url: '/iotblog',
				templateUrl: '/modules/core/views/iotblog.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'IOT Blog'
				}
			})
			.state('codewithusps', {
				url: '/codewithusps',
				templateUrl: '/modules/core/views/codewithus-ps.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Code With Us'
				}
			})
			.state('sprintwithus', {
				url: '/sprintwithus',
				templateUrl: '/modules/core/views/sprintwithus.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Sprint With Us'
				}
			})
			.state('sprintwithus-howtoapply', {
				url: '/sprintwithus-howtoapply',
				templateUrl: '/modules/core/views/sprintwithus-howtoapply.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Sprint With Us'
				}
			})
			.state('sprintwithusps', {
				url: '/sprintwithusps',
				templateUrl: '/modules/core/views/sprintwithus-ps.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Sprint With Us'
				}
			})
			.state('about', {
				url: '/about',
				templateUrl: '/modules/core/views/about.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'About Us'
				}
			})
			.state('copyright', {
				url: '/copyright',
				templateUrl: '/modules/core/views/copyright.client.view.html',
				data: {
					ignoreState: true,
					pageTitle: 'Copyright'
				}
			})
			.state('template', {
				url: '/template/:templateId',
				templateUrl: ['$stateParams', function ($stateParams) {
					var id = $stateParams.templateId;
					return '/modules/core/views/templates/template-'+id+'.html';
				}],
				data: {
					ignoreState: true,
					pageTitle: 'Template'
				}
			})
			;
	}
}());

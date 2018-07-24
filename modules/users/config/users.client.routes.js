(function () {
	'use strict';

	// Setting up route
	angular
		.module('users.routes')
		.config(routeConfig);

	routeConfig.$inject = ['$stateProvider'];

	function routeConfig($stateProvider) {
		// Users state routing
		$stateProvider
			.state('settings', {
				abstract: true,
				url: '/settings',
				templateUrl: '/modules/users/views/settings/settings.client.view.html',
				controller: 'SettingsController',
				controllerAs: 'vm',
				data: {
					roles: ['user', 'admin', 'gov-request', 'gov']
				},
				resolve: {
					capabilities: ['CapabilitiesService', function (CapabilitiesService) {
						return CapabilitiesService.query ();
					}]
				}
			})
			.state ('settings.skills', {
				url: '/skills',
				templateUrl: '/modules/users/views/settings/profile-skills.html',
				controller: 'ProfileSkillsController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Skills'
				}
			})
			.state ('settings.privacy', {
				url: '/privacy',
				templateUrl: '/modules/users/views/settings/profile-privacy.html',
				controller: 'ProfilePrivacyController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Privacy'
				}
			})
			.state ('settings.messages', {
				url: '/messages',
				templateUrl: '/modules/users/views/settings/profile-messages.html',
				controller: 'ProfileMessagesController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Messages'
				}
			})
			.state('settings.profile', {
				url: '/profile',
				templateUrl: '/modules/users/views/settings/profile-main.html',
				controller: 'EditProfileController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Settings'
				}
			})
			.state('settings.payment', {
				url: '/payment',
				templateUrl: '/modules/users/views/settings/payment-settings.client.view.html',
				controller: 'EditProfileController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Payment Details'
				}
			})
			.state('settings.password', {
				url: '/password',
				templateUrl: '/modules/users/views/settings/change-password.client.view.html',
				controller: 'ChangePasswordController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Settings password'
				}
			})
			.state('authentication', {
				abstract: true,
				url: '/authentication',
				templateUrl: '/modules/users/views/authentication/authentication.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				resolve: {
					usercount: ['UsersService', function (UsersService) {
						return UsersService.countUsers ().then (function (o) {return o.count});
					}]
				}
			})
			.state('authentication.gov', {
				url: '/government',
				templateUrl: '/modules/users/views/authentication/gov.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Government'
				}
			})
			.state('authentication.signinadmin', {
				url: '/signinadmin?err',
				templateUrl: '/modules/users/views/authentication/signin.admin.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Signin'
				}
			})
		 .state('signup', {
				url: '/signup',
				templateUrl: '/modules/users/views/authentication/signup.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Signup'
				}
			})
			.state('authentication.signin', {
				url: '/signin?err',
				templateUrl: '/modules/users/views/authentication/signin.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Signin'
				}
			})
			.state('password', {
				abstract: true,
				url: '/password',
				template: '<ui-view autoscroll="true"/>'
			})
			.state('password.forgot', {
				url: '/forgot',
				templateUrl: '/modules/users/views/password/forgot-password.client.view.html',
				controller: 'PasswordController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Password forgot'
				}
			})
			.state('password.reset', {
				abstract: true,
				url: '/reset',
				template: '<ui-view autoscroll="true"/>'
			})
			.state('password.reset.invalid', {
				url: '/invalid',
				templateUrl: '/modules/users/views/password/reset-password-invalid.client.view.html',
				data: {
					pageTitle: 'Password reset invalid'
				}
			})
			.state('password.reset.success', {
				url: '/success',
				templateUrl: '/modules/users/views/password/reset-password-success.client.view.html',
				data: {
					pageTitle: 'Password reset success'
				}
			})
			.state('password.reset.form', {
				url: '/:token',
				templateUrl: '/modules/users/views/password/reset-password.client.view.html',
				controller: 'PasswordController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Password reset form'
				}
			});
	}
}());

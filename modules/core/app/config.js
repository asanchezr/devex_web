import request from 'request';
import validator from 'validator';

(function (window) {
	'use strict';

	const cleanUser = (user) => {
		let safeUserObject;
		safeUserObject = {
			_id                     : user._id,
			orgsAdmin               : user.orgsAdmin,
			orgsMember              : user.orgsMember,
			orgsPending             : user.orgsPending,
			displayName             : validator.escape(user.displayName),
			provider                : validator.escape(user.provider),
			username                : validator.escape(user.username),
			created                 : user.created.toString(),
			roles                   : user.roles,
			profileImageURL         : user.profileImageURL,
			email                   : validator.escape(user.email),
			lastName                : validator.escape(user.lastName),
			firstName               : validator.escape(user.firstName),
			additionalProvidersData : user.additionalProvidersData,
			government              : user.government,
			notifyOpportunities     : user.notifyOpportunities,
			notifyEvents            : user.notifyEvents,
			notifyBlogs             : user.notifyBlogs,
			userTitle               : user.userTitle,
			isDisplayEmail          : user.isDisplayEmail,
			isDeveloper             : user.isDeveloper,
			paymentMethod           : user.paymentMethod,
			phone                   : validator.escape(user.phone),
			address                 : validator.escape(user.address),
			businessContactName     : validator.escape(user.businessContactName),
			businessContactEmail    : validator.escape(user.businessContactEmail),
			businessContactPhone    : validator.escape(user.businessContactPhone),
			businessName            : validator.escape(user.businessName),
			businessAddress         : validator.escape(user.businessAddress),
			businessAddress2        : validator.escape(user.businessAddress2),
			businessCity            : validator.escape(user.businessCity),
			businessProvince        : user.businessProvince,
			businessCode            : validator.escape(user.businessCode),
			location                : user.location,
			description             : validator.escape(user.description),
			website                 : user.website,
			skills                  : user.skills,
			skillsData              : user.skillsData,
			badges                  : user.badges,
			capabilities            : user.capabilities,
			endorsements            : user.endorsements,
			github                  : user.github,
			stackOverflow           : user.stackOverflow,
			stackExchange           : user.stackExchange,
			linkedIn                : user.linkedIn,
			isPublicProfile         : user.isPublicProfile,
			isAutoAdd               : user.isAutoAdd,
			capabilityDetails 		: user.capabilityDetails,
			capabilitySkills 		: user.capabilitySkills
		};

		return safeUserObject;
	};

	var applicationModuleName = 'mean';

	var service = {
		applicationEnvironment: window.env,
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: [
		'ngResource',
		'ngAnimate',
		'ngMessages',
		'ui.router',
		'ui.bootstrap',
		'ui.tinymce',
		'ngFileUpload',
		'ngImgCrop',
		'ui-notification',
		'ncy-angular-breadcrumb',
		'dndLists',
		'ngIdle'
		],
		registerModule: registerModule
	};

  	window.ApplicationConfiguration = service;

	let url = window.location.search;
	url = url.replace('?', '');
	let searchParams = new URLSearchParams(url);

	let user;
	let userObj = sessionStorage.getItem('user');
	if (userObj) {
		user = JSON.parse(userObj);
	}
  	
	if (user) {
		window.user = user;
	}
	else if (searchParams.has('code')) {
		const code = searchParams.get('code');
		request(window.apiUrl + '/api/auth/validate?code=' + code, (error, response, body) => {

			if (response && response.statusCode === 200) {
				user = JSON.parse(body);
				user = cleanUser(user);
				if (user) {

					// store user object in session storage
					sessionStorage.setItem('user', JSON.stringify(user));

					window.user = user;
				}
			}
		});
	}

  // Add a new vertical module
  function registerModule(moduleName, dependencies) {
	// Create angular module
	angular.module(moduleName, dependencies || []);

	// Add the module to the AngularJS configuration file
	angular.module(applicationModuleName).requires.push(moduleName);
  }

  // Angular-ui-notification configuration
  angular.module('ui-notification').config(['NotificationProvider', function(NotificationProvider) {
	NotificationProvider.setOptions({
	  delay: 2000,
	  startTop: 20,
	  startRight: 10,
	  verticalSpacing: 20,
	  horizontalSpacing: 20,
	  positionX: 'right',
	  positionY: 'bottom'
	});
  }]);

  // Angular idle configuration
  angular.module('ngIdle').config(['IdleProvider', 'KeepaliveProvider', function(IdleProvider, KeepaliveProvider) {
	IdleProvider.idle(Number(window.sessionTimeoutWarning));
	IdleProvider.timeout(Number(window.sessionTimeout));
	KeepaliveProvider.interval(2);
  }]);
}(window));




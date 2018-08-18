import request from 'request';
import validator from 'validator';

(function () {
	'use strict';
	// Authentication service for user variables
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

	var Authentication = [
		'$window',
		function ($window) {

		var auth = {
			user: $window.user,
			permissions : function () {
				var isUser     = !!$window.user;
				var ret        = isUser ? $window.user : {};
				var isAdmin    = isUser && !!~$window.user.roles.indexOf ('admin');
				var isGov      = isUser && !!~$window.user.roles.indexOf ('gov');
				ret.loggedIn   = isUser;
				ret.isLoggedIn = isUser;
				ret.isUser     = isUser;
				ret.isAdmin    = isAdmin;
				ret.isGov      = isGov;
				return ret;
			}
		};


		/**
		 * Attempt to log in if there is a github token present or a user in session storage
		 */
		let url = window.location.search;
		url = url.replace('?', '');
		let searchParams = new URLSearchParams(url);

		let user;
		let userObj = sessionStorage.getItem('user');
		if (userObj) {
			user = JSON.parse(userObj);
		}

		if (user) {
			auth.user = user;
			return auth;
		}
		else if (searchParams.has('code')) {
			const code = searchParams.get('code');
			return request(window.apiUrl + '/api/auth/validate?code=' + code, (error, response, body) => {

				if (response && response.statusCode === 200) {
					user = JSON.parse(body);
					user = cleanUser(user);
					if (user) {

						// store user object in session storage
						sessionStorage.setItem('user', JSON.stringify(user));

						auth.user = user;
						window.location.href = '/';
						return auth;
					}
				}
			});
		}
		else {
			return auth;
		}
		
	}
		
	];

	angular.module ('users.services').factory('Authentication', Authentication);
}());

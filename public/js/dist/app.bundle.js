/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(4);
	__webpack_require__(5);

	// firebase config
	// require('./app/firebase.config.js');

	// dashboard
	__webpack_require__(6);
	__webpack_require__(7);

	// auth
	__webpack_require__(3);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);

	// standalone controllers
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);

	__webpack_require__(19);
	__webpack_require__(20);

	//challenge
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);

	// payment
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);

	// profile
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);

	// trainer
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);

	// tools
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(42);

	// wellness
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(45);

	// progress
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);

	// coach
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);

	// helpdesk
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);

	// contact
	__webpack_require__(55);
	__webpack_require__(56);

	// academy
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);

	// home
	__webpack_require__(60);
	__webpack_require__(61);

	// pricing
	__webpack_require__(62);
	__webpack_require__(63);

	// partner
	__webpack_require__(64);
	__webpack_require__(65);

	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);

	// career
	__webpack_require__(69);
	__webpack_require__(70);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	
	var userAppDependencies = ['Squats'];
	var appDependencies = ['ngMaterial', 'ngAnimate', 'ngResource', 'ngSanitize', 'LocalStorageModule', 'ksSwiper', 'md.data.table', 'satellizer', 'ngFileUpload', 'cgNotify', 'angular-loading-bar', 'ui.router', 'nvd3', 'ngYoutubeEmbed', 'infinite-scroll', 'firebase', 'uiCropper'];

	module.exports = {
	    squatsApp: angular.module('Squats', appDependencies),
	    squatsUser: angular.module('squatsUser', userAppDependencies)
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;
	var authService = __webpack_require__(3);

	squatsApp.config(["$mdThemingProvider", function ($mdThemingProvider) {
	  $mdThemingProvider.theme('default').primaryPalette('light-blue').accentPalette('grey');
	}]);

	squatsApp.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
	  cfpLoadingBarProvider.includeSpinner = false;
	}]);

	squatsApp.constant('thumbImageUrl', 'https://old.squats.in/upload/profilepics/thumb/thumb_');
	squatsApp.constant('fullImageUrl', 'https://old.squats.in/upload/profilepics/');
	squatsApp.constant('nutritionFiles', 'https://old.squats.in/upload/nutritionfiles/');
	squatsApp.constant('trainingImageUrl', 'https://old.squats.in/upload/trainingfiles/');
	squatsApp.constant('uploadImageUrl', 'https://old.squats.in/upload/');

	squatsApp.constant('serviceBase', 'https://old.squats.in/RootAPI/v1');

	// crm constants
	squatsApp.constant('crmBaseUrl', 'https://old.squats.in/CrmAPI/v1/');

	squatsApp.constant('challengeBaseURL', 'https://old.squats.in/ChallengeAPI/v1');

	squatsApp.factory('sessionInjector', ['authService', function (authService) {
	  var sessionInjector = {
	    request: function (config) {
	      if (authService.isAuth()) {
	        config.headers['X-Auth-Token'] = authService.getToken();
	      }
	      return config;
	    }
	  };
	  return sessionInjector;
	}]);

	squatsApp.service('authInterceptor', ['$q', '$window', function ($q, $window) {
	  var service = this;

	  service.responseError = function (response) {
	    if (response.status == 401) {
	      //$window.location.href = "/app#/login";
	    }
	    return $q.reject(response);
	  };
	}]);

	squatsApp.factory('timeoutHttpIntercept', ['$rootScope', '$q', function ($rootScope, $q) {
	  return {
	    'request': function (config) {
	      config.timeout = 30000;
	      return config;
	    }
	  };
	}]);

	squatsApp.config(['$httpProvider', function ($httpProvider) {
	  $httpProvider.interceptors.push('sessionInjector');
	  $httpProvider.interceptors.push('authInterceptor');
	  $httpProvider.interceptors.push('timeoutHttpIntercept');
	}]);

	squatsApp.config(["$authProvider", function ($authProvider) {
	  $authProvider.facebook({
	    clientId: '1285013348201923',
	    responseType: "token",
	    scope: ['public_profile', 'email']
	  });

	  $authProvider.google({
	    clientId: '785367747709-jsncrfgko3dpjpsrdjdh53r9d6g9l7mi.apps.googleusercontent.com',
	    responseType: "token"
	  });
	}]);

	module.exports = squatsApp;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('authService', ['localStorageService', function (localStorageService) {
	  var service = this,
	      currentUser = null,
	      transactionDetails = null,
	      token = null;
	  service.setCurrentUser = function (user) {
	    currentUser = user;
	    if (currentUser && currentUser.age == 0 || currentUser && currentUser.age == "0") {
	      currentUser.age = null;
	    }

	    if (currentUser && currentUser.sex == "male") {
	      currentUser.sex = "Male";
	    }
	    if (currentUser && currentUser.sex == "female") {
	      currentUser.sex = "Female";
	    }
	    localStorageService.set('user', user);
	    return currentUser;
	  };
	  service.getCurrentUser = function () {
	    if (!currentUser) {
	      currentUser = localStorageService.get('user');
	      if (currentUser && currentUser.age == 0 || currentUser && currentUser.age == "0") {
	        currentUser.age = null;
	        service.setCurrentUser(currentUser);
	      }
	      if (currentUser && currentUser.sex == "male") {
	        currentUser.sex = "Male";
	        service.setCurrentUser(currentUser);
	      }
	      if (currentUser && currentUser.sex == "female") {
	        currentUser.sex = "Female";
	        service.setCurrentUser(currentUser);
	      }
	    }
	    return currentUser;
	  };
	  service.getToken = function () {
	    if (!token) {
	      token = localStorageService.get('token');
	    }
	    return token;
	  };
	  service.setToken = function (token) {
	    token = token;
	    localStorageService.set('token', token);
	    return token;
	  };
	  service.logout = function (callback) {
	    localStorageService.clearAll();
	    currentUser = null;
	    token = null;
	    callback();
	  };

	  service.isAuth = function () {
	    return service.getToken() != null || service.getToken() != undefined;
	  };

	  service.setTransactionDetails = function (transData) {
	    transactionDetails = transData;

	    // localStorageService.set('transactionDetails', transData);
	    // return transactionDetails;
	  };
	  service.getTransactionDetails = function () {
	    if (!transactionDetails) {
	      //     $http({
	      //       'method': 'GET',
	      //       'url': serviceBase + '/clientTransactionDetails',
	      //       'headers': {
	      //         'X-Auth-Token': localStorageService.get('token')
	      //       }
	      //     })
	      //     .success(function (response) {
	      //       service.setTransactionDetails(response);
	      //       return transactionDetails;
	      //     })
	      //     .error(function (response) {
	      return transactionDetails;
	      //     });
	    } else {
	      return transactionDetails;
	    }
	  };
	}]);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.directive('ngFiles', ['$parse', function ($parse) {

	  function fn_link(scope, element, attrs) {
	    var onChange = $parse(attrs.ngFiles);
	    element.on('change', function (event) {
	      onChange(scope, { $files: event.target.files });
	    });
	  };

	  return {
	    link: fn_link
	  };
	}]);

	squatsApp.directive("compareTo", [function () {
	  return {
	    require: "ngModel",
	    scope: {
	      otherModelValue: "=compareTo"
	    },
	    link: function (scope, element, attributes, ngModel) {

	      ngModel.$validators.compareTo = function (modelValue) {
	        return modelValue == scope.otherModelValue;
	      };

	      scope.$watch("otherModelValue", function () {
	        ngModel.$validate();
	      });
	    }
	  };
	}]);

	squatsApp.directive('stringToNumber', function () {
	  return {
	    require: 'ngModel',
	    link: function (scope, element, attrs, ngModel) {
	      ngModel.$parsers.push(function (value) {
	        return '' + value;
	      });
	      ngModel.$formatters.push(function (value) {
	        return parseFloat(value);
	      });
	    }
	  };
	});

	squatsApp.directive("slider", ["$document", "$timeout", function ($document, $timeout) {
	  return {
	    restrict: "E",
	    scope: {
	      model: "=",
	      property: "@",
	      step: "@"
	    },
	    replace: true,
	    template: "<div class=\"slider-control\">\n<div class=\"slider\">\n</div>\n</div>",
	    link: function (scope, element, attrs) {
	      var fn, getP, handles, i, j, len, mv, pTotal, ref, setP, step, updatePositions;
	      element = element.children();
	      element.css('position', 'relative');
	      handles = [];
	      pTotal = 0;
	      step = function () {
	        if (scope.step != null) {
	          return parseFloat(scope.step);
	        } else {
	          return 0;
	        }
	      };
	      getP = function (i) {
	        if (scope.property != null) {
	          return scope.model[i][scope.property];
	        } else {
	          return scope.model[i];
	        }
	      };
	      setP = function (i, p) {
	        var s;
	        s = step();
	        if (s > 0) {
	          p = Math.round(p / s) * s;
	        }
	        if (scope.property != null) {
	          return scope.model[i][scope.property] = p;
	        } else {
	          return scope.model[i] = p;
	        }
	      };
	      updatePositions = function () {
	        var handle, i, j, len, p, pRunningTotal, results, x;
	        pTotal = scope.model.reduce(function (sum, item, i) {
	          return sum + getP(i);
	        }, 0);
	        pRunningTotal = 0;
	        results = [];
	        for (i = j = 0, len = handles.length; j < len; i = ++j) {
	          handle = handles[i];
	          p = getP(i);
	          pRunningTotal += p;
	          x = pRunningTotal / pTotal * 100;
	          results.push(handle.css({
	            left: x + "%",
	            top: "-" + handle.prop("clientHeight") / 2 + "px"
	          }));
	        }
	        return results;
	      };
	      ref = scope.model;
	      fn = function (mv, i) {
	        var handle, startPleft, startPright, startX;
	        if (i === scope.model.length - 1) {
	          return;
	        }
	        handle = angular.element('<div class="slider-handle"></div>');
	        handle.css("position", "absolute");
	        handles.push(handle);
	        element.append(handle);
	        startX = 0;
	        startPleft = startPright = 0;
	        return handle.on("mousedown", function (event) {
	          var mousemove, mouseup;
	          mousemove = function (_this) {
	            return function (event) {
	              return scope.$apply(function () {
	                var dp;
	                dp = (event.screenX - startX) / element.prop("clientWidth") * pTotal;
	                if (dp < -startPleft || dp > startPright) {
	                  return;
	                }
	                setP(i, startPleft + dp);
	                setP(i + 1, startPright - dp);
	                return updatePositions();
	              });
	            };
	          }(this);
	          mouseup = function () {
	            $document.unbind("mousemove", mousemove);
	            return $document.unbind("mouseup", mouseup);
	          };
	          event.preventDefault();
	          startX = event.screenX;
	          startPleft = getP(i);
	          startPright = getP(i + 1);
	          $document.on("mousemove", mousemove);
	          return $document.on("mouseup", mouseup);
	        });
	      };
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        mv = ref[i];
	        fn(mv, i);
	      }
	      return scope.$watch("model", updatePositions, true);
	    }
	  };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.filter('range', function () {
	  return function (input, total) {
	    total = parseInt(total);

	    for (var i = 0; i < total; i++) {
	      input.push(i);
	    }

	    return input;
	  };
	});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	  $urlRouterProvider.otherwise('/login');

	  $stateProvider.state('app', {
	    url: '/app',
	    templateUrl: '/ng-tpl/dashboard-tpl',
	    abstract: true,
	    resolve: {
	      checkAuthentication: ["$q", "$state", "$timeout", "$mdDialog", "authService", function ($q, $state, $timeout, $mdDialog, authService) {
	        var deferred = $q.defer();
	        // $timeout is an example; it also can be an xhr request or any other async function
	        $timeout(function () {
	          if (!authService.getToken()) {
	            // user is not logged, do not proceed
	            // instead, go to a different page
	            $state.go('login');
	            deferred.reject();
	          } else {
	            $mdDialog.hide();
	            // everything is fine, proceed
	            deferred.resolve();
	          }
	        });

	        return deferred.promise;
	      }]
	    }
	  }).state('app.dashboard', {
	    url: '/dashboard',
	    templateUrl: '/ng-tpl/dashboard'
	  });
	}]);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.controller('dashboardCtrl', ['$rootScope', '$http', 'profileService', 'progressService', 'coachService', 'authService', 'utilService', '$q', 'serviceBase', 'uploadImageUrl', 'thumbImageUrl', '$mdDialog', '$scope', 'notify', 'messageService', '$state', function ($rootScope, $http, profileService, progressService, coachService, authService, utilService, $q, serviceBase, uploadImageUrl, thumbImageUrl, $mdDialog, $scope, notify, messageService, $state) {

	    var dashboard = this;
	    dashboard.thumbImageUrl = thumbImageUrl;
	    dashboard.uploadImageUrl = uploadImageUrl;
	    dashboard.monthNames = utilService.months;

	    $rootScope.$on('reloadProfile', function () {
	        profileService.getAutoToken(function (success) {
	            dashboard.profileData = authService.getCurrentUser();
	        }, function (error) {
	            notify(messageService.error.corporateProfileActivate);
	            console.error(error);
	        });
	    });

	    dashboard.steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7', 'Step 8', 'Step 9', 'Step 10', 'Step 11', 'Step 12', 'Step 13', 'Step 14', 'Step 15'];

	    dashboard.selection = dashboard.steps[0];

	    dashboard.getCurrentStepIndex = function () {
	        // Get the index of the current step given selection
	        return dashboard.steps.indexOf(dashboard.selection);
	    };

	    dashboard.hasNextStep = function () {
	        var stepIndex = dashboard.getCurrentStepIndex();
	        var nextStep = stepIndex + 1;
	        // Return true if there is a next step, false if not
	        return !angular.isUndefined(dashboard.steps[nextStep]);
	    };

	    dashboard.hasPreviousStep = function () {
	        var stepIndex = dashboard.getCurrentStepIndex();
	        var previousStep = stepIndex - 1;
	        // Return true if there is a next step, false if not
	        return !angular.isUndefined(dashboard.steps[previousStep]);
	    };

	    dashboard.incrementStep = function () {
	        if (dashboard.hasNextStep()) {
	            var stepIndex = dashboard.getCurrentStepIndex();
	            var nextStep = stepIndex + 1;
	            dashboard.selection = dashboard.steps[nextStep];
	        }
	    };

	    dashboard.decrementStep = function () {
	        if (dashboard.hasPreviousStep()) {
	            var stepIndex = dashboard.getCurrentStepIndex();
	            var previousStep = stepIndex - 1;
	            dashboard.selection = dashboard.steps[previousStep];
	        }
	    };

	    dashboard.winList = [{
	        'id': '1',
	        'question': 'What is your approximate body fat percentage?'
	    }, {
	        'id': '2',
	        'question': 'How often do you get a good night’s sleep and wake up feeling totally rested?'
	    }, {
	        'id': '3',
	        'question': 'Are your eating habits irregular? For example, some days you go without eating the whole day and then sometimes you eat a lot at one time.'
	    }, {
	        'id': '4',
	        'question': 'What is your daily water intake?'
	    }, {
	        'id': '5',
	        'question': 'How many days a week do you exercise?'
	    }, {
	        'id': '6',
	        'question': 'Which type of exercise do you do for weight loss?'
	    }, {
	        'id': '7',
	        'question': 'How often are you on sick-leave from office?'
	    }, {
	        'id': '8',
	        'question': 'Confronted with a flight of stairs, would you…'
	    }, {
	        'id': '9',
	        'question': 'On a scale of 1-5, how would you rate your stress level (1=very low, 5=very high)?'
	    }, {
	        'id': '10',
	        'question': 'On a scale of 1-5, how would you rate your nutrition level (1=very poor, 5=excellent)?'
	    }, {
	        'id': '11',
	        'question': 'How many times per week do you eat out?'
	    }, {
	        'id': '12',
	        'question': 'How often do you smoke?'
	    }, {
	        'id': '13',
	        'question': 'How many times per week do you consume alcohol?'
	    }];

	    function outerFunction() {

	        var defer = $q.defer();
	        var promises = [];

	        promises.push($http.get(serviceBase + '/profile'));
	        promises.push($http.get(serviceBase + '/clientWeeklyStatus'));
	        promises.push($http.get(serviceBase + '/clientTrainerDetails'));

	        $q.all(promises).then(function (response) {
	            //success            
	            dashboard.profileData = response[0].data;
	            dashboard.progressData = response[1].data;
	            dashboard.coachData = response[2].data;

	            dashboard.latestCharts = {};
	            if (dashboard.progressData && dashboard.progressData.dietChart_data) {
	                var dietlen = dashboard.progressData.dietChart_data.length;
	                dashboard.latestCharts.diet = uploadImageUrl + dashboard.progressData.dietChart_data[dietlen - 1].prog_fileq;
	            }
	            if (dashboard.progressData && dashboard.progressData.trainingChart_data) {
	                var traininglen = dashboard.progressData.trainingChart_data.length;
	                dashboard.latestCharts.training = uploadImageUrl + dashboard.progressData.trainingChart_data[traininglen - 1].prog_fileq;
	            }

	            dashboard.setView(dashboard.checkScenario(dashboard.profileData, dashboard.progressData, dashboard.coachData));
	        }, function (err) {
	            //error
	        });

	        return defer.promise;
	    }
	    dashboard.data = [{
	        values: [], //values - represents the array of {x,y} data points
	        key: 'Week | Weight', //key  - the name of the series.
	        color: '#62d3f7', //color - optional: choose your own line color.
	        area: true
	    }];
	    outerFunction();

	    if (authService.getCurrentUser()) {
	        var user = authService.getCurrentUser();
	        if (user.activate_corporate_profile == 0) {
	            var profileTabs = utilService.profileTabsCalculator(authService.getCurrentUser());
	            dashboard.percent = profileTabs.percent;
	        } else if (user.activate_corporate_profile == 1) {
	            var profileTabs = utilService.profileTabsCorporateCalculator(authService.getCurrentUser());
	            dashboard.percent = profileTabs.percent;
	        }
	    }

	    dashboard.activateCorporate = function () {
	        if (dashboard.percent < 100) {
	            notify(messageService.required.profile);
	            $state.go('app.profile');
	        } else {
	            profileService.update({ activate_corporate_profile: 1 }, function (response) {
	                if (response.message == 'UserProfileUpdateSuccess') {
	                    if (response.corporate_message && response.corporate_message == "Corporate verification link sent") {
	                        notify(messageService.success.companyEmailVerifySent);
	                    }
	                    profileService.getAutoToken(function (success) {
	                        dashboard.profileData = authService.getCurrentUser();
	                        var profileTabs = utilService.profileTabsCorporateCalculator(authService.getCurrentUser());
	                        dashboard.percent = profileTabs.percent;
	                        dashboard.setView(dashboard.checkScenario(dashboard.profileData, dashboard.progressData, dashboard.coachData));
	                        // $state.go('app.profile');
	                    }, function (error) {
	                        notify(messageService.error.corporateProfileActivate);
	                        console.error(error);
	                    });
	                } else {
	                    notify(messageService.error.corporateProfileActivate);
	                    console.error(error);
	                }
	            }, function (error) {
	                notify(messageService.error.corporateProfileActivate);
	                console.error(error);
	            });
	        }
	    };

	    dashboard.deactivateCorporate = function () {
	        profileService.update({ activate_corporate_profile: 0, company: "", company_email: "", company_verified: 0 }, function (response) {
	            if (response.message == 'UserProfileUpdateSuccess') {
	                profileService.getAutoToken(function (success) {
	                    notify(messageService.success.corporateProfileDeactivated);
	                    dashboard.profileData = authService.getCurrentUser();
	                    var profileTabs = utilService.profileTabsCalculator(authService.getCurrentUser());
	                    dashboard.percent = profileTabs.percent;
	                    dashboard.setView(dashboard.checkScenario(dashboard.profileData, dashboard.progressData, dashboard.coachData));
	                }, function (error) {
	                    console.error(error);
	                });
	            } else {
	                console.error(error);
	            }
	        }, function (error) {
	            console.error(error);
	        });
	    };

	    dashboard.calculateWin = function () {
	        dashboard.windex = 0;
	        angular.forEach(dashboard.winList, function (win) {
	            dashboard.windex += parseInt(win.rating);
	        });
	        if (dashboard.windex < 121 && dashboard.windex >= 0) {
	            dashboard.winresult = "Danger Zone";
	            dashboard.windexcat = 1;
	        } else if (dashboard.windex < 151 && dashboard.windex > 120) {
	            dashboard.winresult = "Survival mode";
	            dashboard.windexcat = 2;
	        } else if (dashboard.windex < 200 && dashboard.windex > 150) {
	            dashboard.winresult = "Optimal";
	            dashboard.windexcat = 3;
	        } else if (dashboard.windex < 241 && dashboard.windex > 200) {
	            dashboard.winresult = "Supreme";
	            dashboard.windexcat = 4;
	        }
	        profileService.update({ windex: dashboard.windex, wincat: dashboard.windexcat }, function (response) {}, function (error) {
	            console.error(error);
	        });
	        // parseInt(dashboard.winList[0].rating) + dashboard.winList[1].rating.parseInt() + dashboard.winList[2].rating.parseInt() + dashboard.winList[3].rating.parseInt() + dashboard.winList[4].rating.parseInt() + dashboard.winList[5].rating.parseInt() + dashboard.winList[6].rating.parseInt() + dashboard.winList[7].rating.parseInt() + dashboard.winList[8].rating.parseInt() + dashboard.winList[9].rating.parseInt() + dashboard.winList[10].rating.parseInt() + dashboard.winList[11].rating.parseInt() + dashboard.winList[12].rating.parseInt() ;
	    };

	    dashboard.checkScenario = function (profileData, progressData, coachData) {
	        // console.log(dashboard.profileData);
	        var ScenarioId = 1;

	        if (dashboard.profileData.accept_gst == 0) {
	            $mdDialog.show({
	                controller: ["$scope", "$mdDialog", "notify", "profileService", "messageService", function ($scope, $mdDialog, notify, profileService, messageService) {
	                    $scope.profile = dashboard.profileData;
	                    $scope.accept = function (profile) {
	                        var localUser = {
	                            sex: profile.sex,
	                            age: profile.age,
	                            city: profile.city,
	                            house_no: profile.house_no,
	                            street: profile.street,
	                            state: profile.state,
	                            country: profile.country,
	                            pincode: profile.pincode,
	                            tel: profile.tel,
	                            height_ft: profile.height_ft,
	                            height_in: profile.height_in,
	                            weight: profile.weight,
	                            goal: profile.goal,
	                            diet_type: profile.diet_type,
	                            details: profile.details,
	                            email: profile.email,
	                            name: profile.name,
	                            accept_gst: 1
	                        };
	                        profileService.update(localUser, function (response) {
	                            if (response.message == 'UserProfileUpdateSuccess') {
	                                profileService.getAutoToken(function (success) {
	                                    notify(messageService.success.profileUpdate);
	                                    $mdDialog.hide(profile);
	                                }, function (error) {
	                                    notify(messageService.error.profileUpdate);
	                                    console.error(error);
	                                });
	                            } else {
	                                notify(messageService.error.profileUpdate);
	                            }
	                        }, function (error) {
	                            notify(messageService.error.profileUpdate);
	                            console.error(error);
	                        });
	                    };
	                }],
	                templateUrl: "/ng-tpl/profile-gst-terms-dialog",
	                parent: angular.element(document.body),
	                clickOutsideToClose: false,
	                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	            }).then(function (profile) {
	                // $state.go('logout');
	                dashboard.profileData = authService.getCurrentUser();
	            }, function () {
	                $scope.status = 'You cancelled the dialog.';
	            });
	        } else if (dashboard.percent < 100 && (!coachData || !coachData.package_start_dt)) {
	            if (!dashboard.profileData.house_no || !dashboard.profileData.street || !dashboard.profileData.city || !dashboard.profileData.state || !dashboard.profileData.country || !dashboard.profileData.pincode || !dashboard.profileData.tel) {
	                // $mdDialog.show({
	                // controller: ["$scope", "$mdDialog", "notify", "profileService", "messageService", function ($scope, $mdDialog,notify,profileService,messageService) {
	                //   $scope.profile = dashboard.profileData;
	                //   $scope.updateProfile = function (profile) {
	                //       var localUser = {
	                //           sex: profile.sex,
	                //           age: profile.age,
	                //           city: profile.city,
	                //           house_no: profile.house_no,
	                //           street: profile.street,
	                //           state: profile.state,
	                //           country: profile.country,
	                //           pincode: profile.pincode,
	                //           tel: profile.tel,
	                //           height_ft: profile.height_ft,
	                //           height_in: profile.height_in,
	                //           weight: profile.weight,
	                //           goal: profile.goal,
	                //           diet_type: profile.diet_type,
	                //           details: profile.details,
	                //           email: profile.email,
	                //           name: profile.name
	                //       };
	                //       profileService.update(localUser,
	                //         function (response) {
	                //           if (response.message == 'UserProfileUpdateSuccess') {
	                //               profileService.getAutoToken(function (success) {
	                //                   notify(messageService.success.profileUpdate);
	                //                   $mdDialog.hide(profile);
	                //               }, function (error) {
	                //                   notify(messageService.error.profileUpdate);
	                //                   console.error(error);
	                //               });
	                //           }
	                //           else {
	                //               notify(messageService.error.profileUpdate);
	                //           }
	                //         }, 
	                //         function (error) {
	                //               notify(messageService.error.profileUpdate);
	                //               console.error(error);
	                //         });
	                //   };
	                // }],
	                //       controller: "profileCtrl",
	                //       templateUrl: "/ng-tpl/profile-details-dialog",
	                //       parent: angular.element(document.body),
	                //       clickOutsideToClose: false,
	                //       fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	                //   }).then(function (profile) {
	                //     dashboard.profileData = authService.getCurrentUser();
	                //   }, function () {
	                //       $scope.status = 'You cancelled the dialog.';
	                // });
	                notify(messageService.required.profile);
	                $state.go('app.profile');
	            }
	            ScenarioId = 1;
	            return ScenarioId;
	        } else if (dashboard.profileData.company_verified == 1) {
	            ScenarioId = 8;
	            // return ScenarioId;
	        }
	        // else if ((dashboard.percent == 100) && (!coachData || !coachData.package_start_dt) && (!progressData || !progressData.week_data))
	        else if (!coachData || !coachData.package_start_dt) {
	                ScenarioId = 2; //scenario 3 is based on scenario 2 only, just show tools statictics when tools is used to calculate
	                dashboard.extraStats = utilService.toolsUsed(profileData);
	                if (dashboard.extraStats) {
	                    ScenarioId = 3;
	                }
	            } else if (coachData && coachData.package_start_dt && (!progressData || !progressData.week_data)) {
	                ScenarioId = 4;
	            } else if (coachData && coachData.package_start_dt && progressData && progressData.week_data) {
	                ScenarioId = 6; // default progressData avalable
	            }
	        if (coachData.package_start_dt && coachData.package_end_dt) {
	            var start = new Date(coachData.package_start_dt.replace(/\s/, 'T'));
	            var end = new Date(coachData.package_end_dt.replace(/\s/, 'T'));
	            dashboard.weekCharts = utilService.weekStatisticsCalculator(start, end, progressData);
	            dashboard.weekNumber = utilService.getCurrentWeek(start, end);
	        }

	        dashboard.maxWeight = 0;
	        angular.forEach(dashboard.weekCharts, function (val) {
	            if (val.week && val.week.hasOwnProperty('weight')) {
	                if (dashboard.maxWeight < val.week.weight) {
	                    dashboard.maxWeight = val.week.weight + 10;
	                }
	                dashboard.data[0].values.push({ 'x': val.week.week_no, 'y': val.week.weight });

	                if (val.week.week_no == dashboard.weekNumber && val.week.hasOwnProperty('weight')) {
	                    dashboard.weekStats = val.week;
	                    ScenarioId = 5; // Currrent Week updated
	                }
	            }
	        });

	        if (dashboard.weekNumber > 1) {
	            //week data not filled for 2 weeks consicutively
	            var presentWeek = dashboard.weekCharts[dashboard.weekNumber - 1];
	            var prevWeek = dashboard.weekCharts[dashboard.weekNumber - 2];
	            if (presentWeek.week && prevWeek.week && !presentWeek.week.hasOwnProperty('weight') && !prevWeek.week.hasOwnProperty('weight')) {
	                ScenarioId = 7;
	            }
	        }

	        dashboard.enableProgressChart = dashboard.data[0].values.length <= 1 ? false : true;
	        return ScenarioId;
	    };

	    dashboard.setView = function (id) {
	        dashboard.view = "/dashboard-scenarios/" + id;
	    };
	    //dashboard.setView(4);

	    window.onload = function () {

	        var container = $("#chart");
	        width = container[0].style.width;
	        height = container[0].style.height;

	        d3.select("#chart svg").attr("width", '100%').attr("height", '100%').attr('viewBox', '0 0 ' + width + ' ' + height).attr('preserveAspectRatio', 'xMinYMin').attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")").datum(exampleData).transition().duration(350).call(chart);
	    };

	    dashboard.options = {
	        chart: {
	            type: 'lineChart',
	            height: 400,
	            margin: {
	                top: 20,
	                right: 90,
	                bottom: 40,
	                left: 90
	            },
	            forceX: [0, dashboard.weekNumber],
	            forceY: [0, dashboard.maxWeight],
	            useInteractiveGuideline: true,
	            dispatch: {
	                stateChange: function (e) {},
	                changeState: function (e) {},
	                tooltipShow: function (e) {},
	                tooltipHide: function (e) {}
	            },
	            xAxis: {
	                axisLabel: 'Week',
	                tickFormat: function (d) {
	                    return d;
	                }
	            },
	            yAxis: {
	                axisLabel: 'Weight',
	                tickFormat: function (d) {
	                    return d;
	                }
	            },
	            callback: function (chart) {}
	        },
	        title: {
	            enable: false,
	            text: 'Title for Line Chart'
	        },
	        subtitle: {
	            enable: false,
	            text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
	            css: {
	                'text-align': 'center',
	                'margin': '10px 13px 0px 7px'
	            }
	        },
	        caption: {
	            enable: false,
	            html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
	            css: {
	                'text-align': 'justify',
	                'margin': '10px 13px 0px 7px'
	            }
	        }
	    };
	}]);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('loginService', ['localStorageService', '$http', 'serviceBase', function (localStorageService, $http, serviceBase) {
	  this.login = function (email, password, type, callback) {

	    $http.post(serviceBase + '/sign-in', {
	      'user_email': email,
	      'user_password': password,
	      'user_type': type
	    }).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.profile = function (token, callback) {
	    $http({
	      'method': 'GET',
	      'url': serviceBase + '/profile',
	      'headers': {
	        'X-Auth-Token': token
	      }
	    }).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.forgotPassword = function (email, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/forgetPassword',
	      'data': { 'email': email }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.getOauthServiceToken = function (OAuthRes, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/createUserfromFBandGplus',
	      'data': OAuthRes
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.authenticateUser = function (email, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/authenticateUser',
	      'data': { 'email': email }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };
	}]);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('signupService', ['localStorageService', '$http', 'serviceBase', function (localStorageService, $http, serviceBase) {
	  this.do = function (name, email, password, type, callback) {
	    $http.post(serviceBase + '/sign-up', {
	      'name': name,
	      'email': email,
	      'pwd': password
	    }).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };
	}]);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.factory('Google', ['$resource', '$auth', Google]);

	function Google($resource, $auth) {
	    return $resource("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + $auth.getToken(), {}, {});
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('Facebook', ['$resource', '$auth', '$http', Facebook]);

	function Facebook($resource, $auth, $http) {
	    // return $resource("https://graph.facebook.com/v2.3/me?alt=json&redirect=false&fields=email,name,id,picture,gender&access_token=" + $auth.getToken(), {}, {})

	    this.get = function (token, successCallback, errorCallback) {
	        $http.get("https://graph.facebook.com/v2.3/me?alt=json&redirect=false&fields=email,name,id,picture,gender&access_token=" + token).success(function (response) {
	            if (successCallback) {
	                successCallback(response);
	            }
	        }).error(function (response) {
	            if (errorCallback) {
	                errorCallback(response);
	            }
	        });
	    };
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("loginCtrl", ['$http', '$q', '$scope', '$window', 'loginService', 'authService', 'profileService', 'utilService', 'notify', 'messageService', '$auth', '$resource', 'Google', 'Facebook', 'serviceBase', function ($http, $q, $scope, $window, loginService, authService, profileService, utilService, notify, messageService, $auth, $resource, Google, Facebook, serviceBase) {

	  $scope.loginInfo = {};
	  $scope.showSignup = false;

	  var query = utilService.getParameterByName('email_token');
	  if (query) {
	    loginService.authenticateUser(query, function success(response) {
	      if (response.msg == "Authenticated") {
	        notify(messageService.success.activateAccount);
	      }
	    }, function error(error) {
	      notify(messageService.error.verify);
	    });
	  }

	  // var saveLead = function(lead){
	  //   var leadDetails = [];
	  //   if(lead){
	  //     leadDetails['email']= lead.email;
	  //     leadDetails['lastname']=lead.name;
	  //     leadDetails['gender']=lead.gender;
	  //     crmService.saveLead(leadDetails,function (res){
	  //         // console.log(res);
	  //     });
	  //   }
	  // }

	  $scope.login = function () {
	    $scope.loginInfo.type = 'client';
	    loginService.login($scope.loginInfo.email, $scope.loginInfo.password, $scope.loginInfo.type, function (response) {
	      successCall(response);
	    });
	  };

	  $scope.authenticate = function (provider) {
	    $auth.authenticate(provider).then(function (response, user) {
	      var authUser = {
	        user_email: "",
	        fullname: "",
	        pictureURL: "",
	        gender: "",
	        user_type: "client"
	      };
	      if (provider == 'google') {
	        var googleResponse = Google.get({}, function () {
	          authUser.user_email = googleResponse.email;
	          authUser.fullname = googleResponse.name;
	          authUser.pictureURL = googleResponse.picture;
	          authUser.gender = googleResponse.gender;

	          loginService.getOauthServiceToken(authUser, successCall);
	        });
	      }
	      if (provider == 'facebook') {
	        Facebook.get($auth.getToken(), function (fbResponse) {
	          authUser.user_email = fbResponse.email;
	          authUser.fullname = fbResponse.name;
	          authUser.pictureURL = fbResponse.picture.data.url;
	          authUser.gender = fbResponse.gender;
	          loginService.getOauthServiceToken(authUser, successCall);
	        });
	      }
	    }).catch(function (response) {
	      // Something went wrong.
	    });
	  };

	  var successCall = function (response) {
	    if (response.token) {
	      authService.setToken(response.token);

	      var defer = $q.defer();
	      var promises = [];
	      var headers = {
	        'X-Auth-Token': response.token
	      };

	      promises.push($http.get(serviceBase + '/profile', { "headers": headers }));
	      promises.push($http.get(serviceBase + '/clientTransactionDetails', { "headers": headers }));

	      $q.all(promises).then(function (response) {

	        authService.setCurrentUser(response[0].data);
	        if (response[1].data && response[1].data.transactionData) {
	          authService.setTransactionDetails(response[1].data.transactionData);
	        }
	        notify(messageService.success.login);
	        if ($window.location.pathname.indexOf('checkout') > 0) {
	          console.log("checkout");
	          $window.location.reload();
	        } else {
	          $window.location.href = '/app';
	        }
	      });
	    } else {
	      switch (response.errormessage) {
	        case "CREDENTIAL_MISMATCHED":
	          notify(messageService.error.login);
	          break;

	        case "ACCOUNT_NOT_AUTHENTICATED":
	          notify(messageService.error.activeateAccount);
	          break;
	      }
	    }
	  };

	  $scope.forgotPassword = function () {
	    loginService.forgotPassword($scope.loginInfo.email, function (response) {
	      $scope.viewForgotPasswordForm = false;
	      notify(messageService.success.passwordReset);
	    }, function (response) {
	      notify(messageService.error.passwordReset);
	    });
	  };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("signupCtrl", ['$window', 'authService', 'signupService', 'profileService', 'notify', 'messageService', 'crmService', function ($window, authService, signupService, profileService, notify, messageService, crmService) {

	    var signupCtrl = this;
	    signupCtrl.signselectedIndex = 0;
	    signupCtrl.do = function () {
	        signupService.do(signupCtrl.name, signupCtrl.email, signupCtrl.password, "client", function (res) {
	            if (res.errormessage) {
	                notify({ message: res.errormessage, classes: "alert-danger" });
	                return;
	            }
	            notify(messageService.success.signup);
	            signupCtrl.selectedIndex = 0;
	            signupCtrl.saveLead();
	            //$window.location.href = '/app';
	        });
	    };

	    signupCtrl.saveLead = function () {
	        var leadDetails = [];
	        if (signupCtrl.name && signupCtrl.email) {
	            leadDetails['email'] = signupCtrl.email;
	            leadDetails['lastname'] = signupCtrl.name;
	            if (leadDetails['email'] && leadDetails['lastname']) {
	                crmService.saveLead(leadDetails, function (res) {
	                    // console.log(res);
	                });
	            }
	        }
	    };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("verifyCtrl", ['notify', '$state', '$stateParams', 'profileService', 'messageService', '$timeout', function (notify, $state, $stateParams, profileService, messageService, $timeout) {

	  // console.log($stateParams.param);
	  profileService.verifyCompanyEmail({ token: $stateParams.param1, company_email: $stateParams.param2 }, function (res) {
	    if (res.message == "Company email verified") {
	      notify(messageService.success.company_email_verify);
	      profileService.getAutoToken(function (success) {
	        $timeout(function () {
	          $state.go('app.dashboard');
	        }, 1000);
	      }, function (error) {
	        console.error(error);
	      });
	    } else {
	      notify(messageService.error.company_email_verify);
	      $timeout(function () {
	        $state.go('login');
	      }, 1000);
	    }
	  }, function (err) {
	    notify(messageService.error.company_email_verify);
	    $timeout(function () {
	      $state.go('login');
	    }, 1000);
	  });
	}]);

	module.exports = squatsApp;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', function ($stateProvider) {
	  $stateProvider.state('login', {
	    url: '/login',
	    templateUrl: '/ng-tpl/login-page',
	    resolve: {
	      checkAuthentication: ["$q", "$state", "$timeout", "authService", function ($q, $state, $timeout, authService) {
	        var deferred = $q.defer();
	        // $timeout is an example; it also can be an xhr request or any other async function
	        $timeout(function () {
	          if (authService.getToken()) {
	            // user is not logged, do not proceed
	            // instead, go to a different page              
	            $state.go('app.dashboard');
	            deferred.reject();
	          } else {
	            // everything is fine, proceed
	            deferred.resolve();
	          }
	        });
	        return deferred.promise;
	      }]
	    }
	  }).state('logout', {
	    url: '/logout',
	    resolve: {
	      clearSession: ['$state', '$q', '$timeout', 'localStorageService', 'authService', '$auth', function ($state, $q, $timeout, localStorageService, authService, $auth) {
	        var deferred = $q.defer();
	        $auth.logout();
	        $timeout(function () {
	          authService.logout(function () {
	            $state.go('login');
	          });
	          deferred.resolve();
	        });
	        return deferred.promise;
	      }]
	    }
	  }).state('verifyCompanyEmail', {
	    url: '/verifyCompanyEmail/:param1/:param2',
	    controller: 'verifyCtrl'
	  });
	}]);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("mainCtrl", ["$http", "$rootScope", "$scope", "$location", "$window", "$anchorScroll", "authService", "profileService", "wellnessService", 'localStorageService', "$mdSidenav", "$mdDialog", "$mdToast", "ngYoutubeEmbedService", "challengeService", "notify", "messageService", function ($http, $rootScope, $scope, $location, $window, $anchorScroll, authService, profileService, wellnessService, localStorageService, $mdSidenav, $mdDialog, $mdToast, ngYoutubeEmbedService, challengeService, notify, messageService) {
	  $scope.status = '  ';
	  $scope.score = true;
	  $scope.showMobileMainHeader = true;
	  $scope.customFullscreen = false;
	  $scope.showQuestions = showQuestions;
	  $scope.probs = [{
	    p: .1
	  }, {
	    p: .5
	  }, {
	    p: .4
	  }];

	  if ($window.location.pathname) {
	    var url = window.location.pathname;
	    var urlArr = url.split('/');
	    if (urlArr.length > 1) {
	      $scope.page = urlArr[1];
	    }
	  }

	  var user = authService.getCurrentUser();

	  if (user) {
	    $scope.profileData = user;
	    if ($scope.profileData.sex) {
	      $scope.showProfileForm = false;
	      $scope.showGenderForm = false;
	    }
	    if (!$scope.profileData.name || !$scope.profileData.company || !$scope.profileData.email || !$scope.profileData.company_email) {
	      $scope.showProfileForm = true;
	    }
	    showQuestions();
	  } else {
	    $scope.showProfileForm = true;
	    $scope.profileData = {};
	  }

	  $scope.currentNavItem = '1';

	  $scope.openEvent = function (param) {
	    popup(param);
	  };

	  $scope.cloak = true;
	  $scope.showForm = false;

	  $scope.openSideNavPanel = function () {
	    $mdSidenav('left').open();
	  };
	  $scope.closeSideNavPanel = function () {
	    $mdSidenav('left').close();
	  };

	  $scope.showLogin = function (ev) {
	    dialogHandle(ev, "/ng-tpl/login-dialog");
	  };
	  $scope.showSignup = function (ev) {
	    dialogHandle(ev, "/ng-tpl/signup");
	  };
	  $scope.showFitmag = function (ev) {
	    dialogHandle(ev, "/ng-tpl/fitmag");
	  };
	  $scope.showEnroll = function (ev) {
	    dialogHandle(ev, "/ng-tpl/enroll");
	  };

	  $scope.steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7', 'Step 8', 'Step 9', 'Step 10', 'Step 11', 'Step 12', 'Step 13', 'Step 14', 'Step 15'];

	  $scope.selection = $scope.steps[0];

	  $scope.getCurrentStepIndex = function () {
	    // Get the index of the current step given selection
	    return $scope.steps.indexOf($scope.selection);
	  };

	  $scope.hasNextStep = function () {
	    var stepIndex = $scope.getCurrentStepIndex();
	    var nextStep = stepIndex + 1;
	    // Return true if there is a next step, false if not
	    return !angular.isUndefined($scope.steps[nextStep]);
	  };

	  $scope.hasPreviousStep = function () {
	    var stepIndex = $scope.getCurrentStepIndex();
	    var previousStep = stepIndex - 1;
	    // Return true if there is a next step, false if not
	    return !angular.isUndefined($scope.steps[previousStep]);
	  };

	  $scope.incrementStep = function () {
	    if ($scope.hasNextStep()) {
	      var stepIndex = $scope.getCurrentStepIndex();
	      var nextStep = stepIndex + 1;
	      $scope.selection = $scope.steps[nextStep];
	    }
	  };

	  $scope.decrementStep = function () {
	    if ($scope.hasPreviousStep()) {
	      var stepIndex = $scope.getCurrentStepIndex();
	      var previousStep = stepIndex - 1;
	      $scope.selection = $scope.steps[previousStep];
	    }
	  };

	  $scope.showGender = function () {
	    $scope.showGenderForm = true;
	    $scope.showProfileForm = false;
	    $scope.takeAssess = true;
	  };

	  $scope.takeAssessment = function () {
	    $scope.takeAssess = true;
	    $scope.score = false;
	  };

	  function showQuestions() {
	    $scope.showGenderForm = false;
	    $scope.showQuestionnaire = true;
	  };

	  $scope.calculateWin = function () {
	    $scope.downloadWinReport = 'inactive';
	    $scope.windex = 0;
	    $scope.windexcat = 0;
	    $scope.ratingListArr = [];

	    angular.forEach($scope.winList, function (win, index) {
	      if (index == 8) {
	        if ($scope.winList[8].rating == "0") {
	          $scope.winList[8].rating = "0";
	        } else if ($scope.winList[8].rating == "1") {
	          $scope.winList[8].rating = "20";
	        } else if ($scope.winList[8].rating == "2") {
	          $scope.winList[8].rating = "15";
	        } else if ($scope.winList[8].rating == "3") {
	          $scope.winList[8].rating = "10";
	        } else if ($scope.winList[8].rating == "4") {
	          $scope.winList[8].rating = "5";
	        } else if ($scope.winList[8].rating == "5") {
	          $scope.winList[8].rating = "0";
	        }
	      }
	      if (index == 9) {
	        if ($scope.winList[9].rating == "0") {
	          $scope.winList[9].rating = "0";
	        } else if ($scope.winList[9].rating == "1") {
	          $scope.winList[9].rating = "0";
	        } else if ($scope.winList[9].rating == "2") {
	          $scope.winList[9].rating = "5";
	        } else if ($scope.winList[9].rating == "3") {
	          $scope.winList[9].rating = "10";
	        } else if ($scope.winList[9].rating == "4") {
	          $scope.winList[9].rating = "20";
	        } else if ($scope.winList[9].rating == "5") {
	          $scope.winList[9].rating = "25";
	        }
	      }
	      $scope.windex += parseInt(win.rating);
	      $scope.ratingListArr.push(parseInt(win.rating));
	    });

	    if ($scope.windex < 121 && $scope.windex >= 0) {
	      $scope.winresult = "Danger Zone";
	      $scope.windexcat = 1;
	    } else if ($scope.windex < 151 && $scope.windex > 120) {
	      $scope.winresult = "Survival mode";
	      $scope.windexcat = 2;
	    } else if ($scope.windex < 200 && $scope.windex > 150) {
	      $scope.winresult = "Optimal";
	      $scope.windexcat = 3;
	    } else if ($scope.windex < 250 && $scope.windex > 200) {
	      $scope.winresult = "Supreme";
	      $scope.windexcat = 4;
	    }
	  };

	  $scope.sendReport = function () {
	    $scope.downloadWinReport = 'inactive';
	    if ($scope.windexcat && $scope.profileData && $scope.profileData.company_email) {
	      wellnessService.wellnessIndex({ windex: $scope.windex, wincat: $scope.windexcat, user: $scope.profileData, ratingList: $scope.ratingListArr }, function (response) {
	        $scope.downloadWinReport = 'active';
	        $scope.winReportUrl = response.url;
	        notify(messageService.success.winReport);
	      }, function (error) {
	        $scope.downloadWinReport = 'inactive';
	        notify(messageService.error.winReport);
	      });
	    }
	  };
	  $scope.sendReportAct = function () {
	    $scope.showForm = true;
	  };
	  $scope.retakeWin = function () {
	    $scope.takeAssess = false;
	    $scope.score = true;
	    if ($scope.profileData.user_id) {
	      $scope.showQuestionnaire = true;
	      $scope.showProfileForm = false;
	      $scope.showGenderForm = false;
	      $rootScope.$emit("reloadProfile");
	    } else {
	      $scope.showProfileForm = true;
	      $scope.showGenderForm = false;
	      $scope.showQuestionnaire = false;
	    }
	    $scope.selection = $scope.steps[0];
	    $scope.windex = 0;
	    $scope.windexcat = 0;
	    $scope.ratingListArr = [];
	    $scope.winList = [{
	      'id': '1',
	      'question': 'What is your approximate body fat percentage?',
	      'rating': "0"
	    }, {
	      'id': '2',
	      'question': 'How often do you get a good night’s sleep and wake up feeling totally rested?',
	      'rating': "0"
	    }, {
	      'id': '3',
	      'question': 'Are your eating habits irregular? For example, some days you go without eating the whole day and then sometimes you eat a lot at one time.',
	      'rating': "0"
	    }, {
	      'id': '4',
	      'question': 'What is your daily water intake?',
	      'rating': "0"
	    }, {
	      'id': '5',
	      'question': 'How many days a week do you exercise?',
	      'rating': "0"
	    }, {
	      'id': '6',
	      'question': 'Which type of exercise do you do for weight loss?',
	      'rating': "0"
	    }, {
	      'id': '7',
	      'question': 'How often are you on sick-leave from office?',
	      'rating': "0"
	    }, {
	      'id': '8',
	      'question': 'Confronted with a flight of stairs, would you…',
	      'rating': "0"
	    }, {
	      'id': '9',
	      'question': 'On a scale of 1-5, how would you rate your stress level (1=very low, 5=very high)?',
	      'rating': "0"
	    }, {
	      'id': '10',
	      'question': 'On a scale of 1-5, how would you rate your nutrition level (1=very poor, 5=excellent)?',
	      'rating': "0"
	    }, {
	      'id': '11',
	      'question': 'How many times per week do you eat out?',
	      'rating': "0"
	    }, {
	      'id': '12',
	      'question': 'How often do you smoke?',
	      'rating': "0"
	    }, {
	      'id': '13',
	      'question': 'How many times per week do you consume alcohol?',
	      'rating': "0"
	    }];
	  };

	  $scope.winList = [{
	    'id': '1',
	    'question': 'What is your approximate body fat percentage?',
	    'rating': "0"
	  }, {
	    'id': '2',
	    'question': 'How often do you get a good night’s sleep and wake up feeling totally rested?',
	    'rating': "0"
	  }, {
	    'id': '3',
	    'question': 'Are your eating habits irregular? For example, some days you go without eating the whole day and then sometimes you eat a lot at one time.',
	    'rating': "0"
	  }, {
	    'id': '4',
	    'question': 'What is your daily water intake?',
	    'rating': "0"
	  }, {
	    'id': '5',
	    'question': 'How many days a week do you exercise?',
	    'rating': "0"
	  }, {
	    'id': '6',
	    'question': 'Which type of exercise do you do for weight loss?',
	    'rating': "0"
	  }, {
	    'id': '7',
	    'question': 'How often are you on sick-leave from office?',
	    'rating': "0"
	  }, {
	    'id': '8',
	    'question': 'Confronted with a flight of stairs, would you…',
	    'rating': "0"
	  }, {
	    'id': '9',
	    'question': 'On a scale of 1-5, how would you rate your stress level (1=very low, 5=very high)?',
	    'rating': "0"
	  }, {
	    'id': '10',
	    'question': 'On a scale of 1-5, how would you rate your nutrition level (1=very poor, 5=excellent)?',
	    'rating': "0"
	  }, {
	    'id': '11',
	    'question': 'How many times per week do you eat out?',
	    'rating': "0"
	  }, {
	    'id': '12',
	    'question': 'How often do you smoke?',
	    'rating': "0"
	  }, {
	    'id': '13',
	    'question': 'How many times per week do you consume alcohol?',
	    'rating': "0"
	  }];

	  function dialogHandle(ev, tplPath) {
	    $mdDialog.show({
	      controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
	        $scope.hide = function () {
	          $mdDialog.hide();
	        };

	        $scope.cancel = function () {
	          $mdDialog.cancel();
	        };

	        $scope.answer = function (answer) {
	          $mdDialog.hide(answer);
	        };
	      }],
	      templateUrl: tplPath,
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    }).then(function (answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function () {
	      $scope.status = 'You cancelled the dialog.';
	    });
	  };

	  // Toast messages
	  $scope.getToastPosition = function () {
	    sanitizePosition();

	    return Object.keys($scope.toastPosition).filter(function (pos) {
	      return $scope.toastPosition[pos];
	    }).join(' ');
	  };

	  function sanitizePosition() {
	    var current = $scope.toastPosition;

	    if (current.bottom && last.top) current.top = false;
	    if (current.top && last.bottom) current.bottom = false;
	    if (current.right && last.left) current.left = false;
	    if (current.left && last.right) current.right = false;

	    last = angular.extend({}, current);
	  }

	  $scope.showActionToast = function () {
	    var pinTo = $scope.getToastPosition();
	    var toast = $mdToast.simple().textContent('Marked as read').action('UNDO').highlightAction(true).highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
	    .position(pinTo);

	    $mdToast.show(toast).then(function (response) {
	      if (response == 'ok') {
	        alert('You clicked the \'UNDO\' action.');
	      }
	    });
	  };
	  var last = {
	    bottom: false,
	    top: true,
	    left: false,
	    right: true
	  };

	  $scope.toastPosition = angular.extend({}, last);

	  $scope.getRatings = function (rating) {
	    if (rating) {
	      return Math.round(rating);
	    }
	  };

	  // GoDown Arrow js  
	  $scope.goDown = function (eID) {

	    // This scrolling function 
	    // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

	    var startY = currentYPosition();
	    var stopY = elmYPosition(eID);
	    var distance = stopY > startY ? stopY - startY : startY - stopY;
	    if (distance < 100) {
	      scrollTo(0, stopY);return;
	    }
	    var speed = Math.round(distance / 100);
	    if (speed >= 20) speed = 20;
	    var step = Math.round(distance / 25);
	    var leapY = stopY > startY ? startY + step : startY - step;
	    var timer = 0;
	    if (stopY > startY) {
	      for (var i = startY; i < stopY; i += step) {
	        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
	        leapY += step;if (leapY > stopY) leapY = stopY;timer++;
	      }return;
	    }
	    for (var i = startY; i > stopY; i -= step) {
	      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
	      leapY -= step;if (leapY < stopY) leapY = stopY;timer++;
	    }

	    function currentYPosition() {
	      // Firefox, Chrome, Opera, Safari
	      if (self.pageYOffset) return self.pageYOffset;
	      // Internet Explorer 6 - standards mode
	      if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
	      // Internet Explorer 6, 7 and 8
	      if (document.body.scrollTop) return document.body.scrollTop;
	      return 0;
	    }

	    function elmYPosition(eID) {
	      var elm = document.getElementById(eID);
	      var y = elm.offsetTop;
	      var node = elm;
	      while (node.offsetParent && node.offsetParent != document.body) {
	        node = node.offsetParent;
	        y += node.offsetTop;
	      }return y;
	    }
	  };

	  // function maxmind(){
	  //   var body = {"device":{"ip_address":"122.170.170.130","user_agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36","accept_language":"en-US,en;q=0.8","session_age":3600.5,"session_id":"c2ffa1b7-f5c5-4702-beb2-4254794fe391"},"event":{"transaction_id":"txn3134133","shop_id":"s2123","time":"2012-04-12T23:20:50.52Z","type":"purchase"},"account":{"user_id":"3132","username_md5":"570a90bfbf8c7eab5dc5d4e26832d5b1"},"email":{"address":"977577b140bfb7c516e4746204fbdb01","domain":"maxmind.com"},"billing":{"first_name":"John","last_name":"Doe","company":"Big Corp.","address":"400 Blake St.","address_2":"Suite 5","city":"New Haven","region":"CT","country":"US","postal":"06511","phone_number":"203-000-0000","phone_country_code":"1"},"shipping":{"first_name":"Jane","last_name":"Doe","company":"Smaller, Inc.","address":"82 Wall St.","address_2":"#1","city":"New Haven","region":"CT","country":"US","postal":"06515","phone_number":"203-000-0000","phone_country_code":"1","delivery_speed":"same_day"},"payment":{"processor":"stripe","was_authorized":false,"decline_code":"card_declined"},"credit_card":{"issuer_id_number":"323132","last_4_digits":"7643","token":"OQRST14PLQ98323","bank_name":"Bank of America","bank_phone_country_code":"1","bank_phone_number":"800-342-1232","avs_result":"Y","cvv_result":"N"},"order":{"amount":323.21,"currency":"USD","discount_code":"FIRST","affiliate_id":"af12","subaffiliate_id":"saf42","referrer_uri":"http://www.google.com/","is_gift":true,"has_gift_message":false},"shopping_cart":[{"category":"pets","item_id":"ad23232","quantity":2,"price":20.43},{"category":"beauty","item_id":"bst112","quantity":1,"price":100}],"custom_inputs":{"a_custom_input_key":"NSC0083121","another_custom_input_key":false}};

	  //   $http({
	  //     'method': 'POST',
	  //     'url': 'https://128087:z19zWm7XmCJH@minfraud.maxmind.com/minfraud/v2.0/score',
	  //     body
	  //   })
	  //   .success(function (response) {
	  //     successCallback(response);
	  //   })
	  //   .error(function (response) {
	  //     errorCallback(response);
	  //   });
	  // };
	  // maxmind();

	}]);

	module.exports = squatsApp;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.controller('sideNav', ['authService', 'profileService', '$mdSidenav', '$mdMedia', '$window', 'uploadImageUrl', 'notify', 'messageService', 'challengeService', function (authService, profileService, $mdSidenav, $mdMedia, $window, uploadImageUrl, notify, messageService, challengeService) {

		var nav = this;
		nav.collapse = true;
		nav.profile = authService.getCurrentUser();
		nav.profileImageUrl = uploadImageUrl;
		var formdata = new FormData();
		if (nav.profile && nav.profile.name && nav.profile.email) {
			nav.name = nav.profile.name && nav.profile.name != "" ? nav.profile.name.split(" ")[0] : nav.profile.email.split("@")[0];
		}
		if (nav.profile && nav.profile.profile_pic) {
			nav.imageUrl = nav.profileImageUrl + nav.profile.profile_pic + "?c=" + new Date().getMilliseconds().toString();
		}

		nav.getTheFiles = function ($files) {
			formdata = new FormData();
			nav.message = "";
			angular.forEach($files, function (value, key) {
				formdata.append('profile_pic', value);
			});
			nav.updateProfilePic();
		};

		var uploadSuccess = function (response) {
			profileService.getAutoToken(function (success) {
				nav.profile = authService.getCurrentUser();
				nav.imageUrl = nav.profileImageUrl + nav.profile.profile_pic + "?c=" + new Date().getMilliseconds().toString();
				notify(messageService.success.uploadPic);
			}, function (error) {
				notify(messageService.error.uploadPic);
			});
		};

		var uploadError = function (err) {
			notify(messageService.error.uploadPic);
		};

		nav.updateProfilePic = function () {
			notify(messageService.progress.uploadPic);
			profileService.uploadProfilePic(formdata, uploadSuccess, uploadError);
		};

		nav.checkchallenge = function () {
			challengeService.fetchChallengePrivacy(function success(res) {
				if (res && res.privacy) {
					nav.menu.push({
						link: 'public-feed',
						title: "T.C 4.0",
						icon: "fitness_center"
					});
				} else {
					nav.menu.push({
						link: 'app.overview',
						title: "T.C 4.0",
						icon: "fitness_center"
					});
				}
			});
		};

		nav.menu = [{
			link: 'app.dashboard',
			title: "Dashboard",
			icon: "dashboard"
		}, {
			link: 'app.profile',
			title: "My Profile",
			icon: "account_circle"
		}, {
			link: 'app.settings',
			title: "My Account",
			icon: "settings"
		}, {
			link: 'app.myCoach',
			title: "My Coach",
			icon: "vpn_key"
		},
		/*{
	 	link: 'app.academy',
	 	title: "Academy",
	 	icon: "work"
	 },*/
		{
			link: 'app.progress',
			title: "My Progress",
			icon: "equalizer"
		},
		/*{
	 	link: 'app.challenge',
	 	title: "Challenge",
	 	icon: "track_changes"
	 },*/
		/*	{
	 		link: 'app.notifications',
	 		title: "Notifications",
	 		icon: "sms"
	 	},*/
		{
			link: 'app.tools',
			title: "My Tools",
			icon: "build"
		}, {
			link: 'app.helpdesk',
			title: "Helpdesk",
			icon: "live_help"
		}];

		nav.checkchallenge();
	}]);

	module.exports = squatsUser;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('navCtrl', ['$scope', '$location', '$window', 'authService', 'localStorageService', '$mdSidenav', '$mdMedia', 'challengeService', '$state', function ($scope, $location, $window, authService, localStorageService, $mdSidenav, $mdMedia, challengeService, $state) {
		var nav = this;
		nav.profile = authService.getCurrentUser();
		if (nav.profile && nav.profile.name && nav.profile.email) {
			nav.name = nav.profile.name && nav.profile.name != "" ? nav.profile.name.split(" ")[0] : nav.profile.email.split("@")[0];
		}
		nav.isAuth = authService.isAuth;

		nav.checkchallenge = function () {
			challengeService.fetchChallengePrivacy(function success(res) {
				if (res && res.privacy) {
					$state.go('public-feed');
				} else {
					$state.go('app.overview');
				}
			});
		};
	}]);

	module.exports = squatsApp;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("swiperCtrl", ["$scope", "$mdSidenav", "$mdDialog", "$window", function ($scope, $mdSidenav, $mdDialog, $window) {
		$scope.swProgress = {};
		$scope.swTestimonial = {};
		$scope.swTransform = {};
		$scope.swCoach = {};
		$scope.swBrands = {};
		$scope.swUploadPics = {};
		$scope.swChallenge = {};

		var transformed = {
			effect: 'coverflow',
			grabCursor: true,
			loop: false,
			centeredSlides: true,
			initialSlide: 1,
			slidesPerView: 3,
			coverflow: {
				rotate: 5,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: false
			}
		};

		var transformed_sm = {
			effect: 'slide',
			grabCursor: false,
			simulateTouch: false,
			loop: false,
			centeredSlides: true,
			initialSlide: 0,
			slidesPerView: 1,
			coverflow: ''
		};

		var challenge = {
			effect: 'slide',
			grabCursor: true,
			simulateTouch: true,
			loop: false,
			centeredSlides: false,
			initialSlide: 0,
			slidesPerView: 1
		};

		var testimonial = {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			loop: false,
			initialSlide: 1,
			slidesPerView: 2,
			coverflow: {
				rotate: 5,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: false
			},
			breakpoints: {
				1000: {
					initialSlide: 0,
					slidesPerView: 2,
					effect: 'slide',
					grabCursor: false,
					simulateTouch: false,
					loop: false,
					centeredSlides: true,
					initialSlide: 1,
					slidesPerView: 2,
					coverflow: ''
				}
			}
		};

		var pricingCard = {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			loop: false,
			initialSlide: 1,
			slidesPerView: 3,
			coverflow: {
				rotate: 5,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: false
			}
		};

		var coachSlider = {
			effect: 'coverflow',
			loop: true,
			grabCursor: false,
			simulateTouch: false,
			onlyExternal: false,
			centeredSlides: true,
			initialSlide: 0,
			slidesPerView: 4,
			coverflow: {
				rotate: 0,
				stretch: 0,
				depth: 125,
				modifier: 2.05,
				slideShadows: false
			},
			breakpoints: {
				768: {
					slidesPerView: 3
				}
			}
		};
		var brandSlider = {
			effect: 'slide',
			autoplay: 2000,
			speed: 300,
			grabCursor: false,
			loop: true,
			centeredSlides: true,
			initialSlide: 3,
			autoplayDisableOnInteraction: true,
			slidesPerView: 'auto',
			coverflow: ''
		};

		var uploadpicSlider = {
			effect: 'slide',
			grabCursor: false,
			loop: false,
			spaceBetween: 10,
			centeredSlides: true,
			initialSlide: 0,
			slidesPerView: 1,
			coverflow: ''
		};

		var progress = {
			pagination: false,
			grabCursor: false,
			centeredSlides: false,
			initialSlide: 0,
			spaceBetween: 50,
			mousewheelControl: false,
			slidesPerView: 4.1,
			direction: 'vertical',
			breakpoints: {
				1024: {
					slidesPerView: 3,
					spaceBetween: 40
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				640: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 10
				}
			}
		};

		$scope.coverflowParams = function () {
			if ($window.screen.width <= 800) {
				return transformed_sm;
			} else {
				return transformed;
			}
		}();

		$scope.slideParams = function () {
			if ($window.screen.width <= 600) {
				return transformed_sm;
			} else {
				return testimonial;
			}
		}();

		$scope.cardParams = function () {
			if ($window.screen.width <= 800) {
				return transformed_sm;
			} else {
				return pricingCard;
			}
		}();

		$scope.coachParams = function () {
			if ($window.screen.width <= 600) {
				return transformed_sm;
			} else {
				return coachSlider;
			}
		}();

		$scope.challengeParams = function () {
			return challenge;
		}();

		$scope.brandParams = function () {
			return brandSlider;
		}();

		$scope.progressParams = function () {
			return progress;
		}();

		$scope.uploadpicParams = function () {
			return uploadpicSlider;
		}();

		$scope.next = function (s) {
			s.slideNext();
		};
		$scope.prev = function (s) {
			s.slidePrev();
		};
	}]);

	module.exports = squatsApp;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("enrollCtrl", [function () {
	    var enroll = this;
	    enroll.scr = "basic-detail";
	    enroll.height = {};
	    enroll.error = "";

	    enroll.viewScr = function (scr) {
	        return enroll.scr == scr;
	    };
	    enroll.setScr = function (scr) {
	        switch (enroll.scr) {
	            case "gender":
	                if (!enroll.gender) {
	                    enroll.error = "Please select your gender to continue";
	                    return false;
	                }
	                break;
	            case "age":
	                if (!enroll.age || !enroll.weight) {
	                    enroll.error = "Please select your age";
	                    return false;
	                }
	                break;
	            case "goal":
	                if (!enroll.goal) {
	                    enroll.error = "select your goal to continue";
	                    return false;
	                }
	                break;
	            case "food":
	                if (!enroll.food) {
	                    enroll.error = "Please select your choice of food";
	                    return false;
	                }
	                break;
	            case "city":
	                if (!enroll.city) {
	                    enroll.error = "Please select your city to continue";
	                    return false;
	                }
	        }
	        enroll.error = "";
	        enroll.scr = scr;
	        return true;
	    };

	    enroll.setGender = function (gen) {
	        enroll.error = "";
	        enroll.gender = gen;
	    };

	    enroll.setCity = function (city) {
	        enroll.error = "";
	        enroll.city = city;
	    };

	    enroll.setGoal = function (goal) {
	        enroll.error = "";
	        enroll.goal = goal;
	    };

	    enroll.setFood = function (food) {
	        enroll.error = "";
	        enroll.food = food;
	    };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("adminChallengeCtrl", ['$location', '$firebase', '$firebaseArray', 'challengeService', 'notify', 'messageService', '$window', '$mdDialog', '$scope', 'uploadImageUrl', 'utilService', 'authService', function ($location, $firebase, $firebaseArray, challengeService, notify, messageService, $window, $mdDialog, $scope, uploadImageUrl, utilService, authService) {

		var adminchallenge = this;
		adminchallenge.reviewedpostsoffset = 0;
		adminchallenge.notreviewedpostsoffset = 0;
		adminchallenge.invalidpostsoffset = 0;
		adminchallenge.validpostsoffset = 0;
		adminchallenge.fetchreqbusy = false;
		adminchallenge.notreviewedpostsfetchreqbusy = false;
		adminchallenge.invalidpostsfetchreqbusy = false;
		adminchallenge.validpostsfetchreqbusy = false;
		adminchallenge.uploadImageUrl = uploadImageUrl;
		adminchallenge.posts = [];
		adminchallenge.notreviewedposts = [];
		// adminchallenge.shortlistedpostsArr =[];
		adminchallenge.invalidposts = [];
		adminchallenge.validposts = [];
		adminchallenge.allsearchposts = [];
		adminchallenge.user = authService.getCurrentUser();

		adminchallenge.searchpostsbyname = function (searchname) {
			challengeService.searchchallengepostsbyname(searchname, function success(res) {
				if (res && res.PostList) {
					adminchallenge.total_records = res.total_records;
					adminchallenge.total_records_not_reviewed = res.total_records_not_reviewed;
					adminchallenge.total_records_reviewed = res.total_records_reviewed;
					adminchallenge.total_records_private = res.total_records_private;
					adminchallenge.total_records_public = res.total_records_public;
					adminchallenge.total_records_invalid = res.total_records_invalid;
					adminchallenge.total_records_valid = res.total_records_valid;

					angular.forEach(res.PostList, function (value, index) {
						value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
						var ref1 = firebase.database().ref().child('post_data').child(value.id).child('comments');
						value.comments = $firebaseArray(ref1);
						firebase.database().ref().child('post_data').child(value.id).child('likes').on('value', snapshots => {
							value.like_count = snapshots.numChildren();
						});
						firebase.database().ref().child('post_data').child(value.id).child('comments').on('value', snapshots => {
							// console.log("Snapshots : " + JSON.stringify(snapshots.val()));
							value.com_length = snapshots.numChildren();
						});
					});
					adminchallenge.allsearchposts = res.PostList;
				}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		adminchallenge.addCommentsearchbynameposts = function (post_id, content) {
			challengeService.comment(post_id, content, function success(res) {
				if (res && res.message == "Comment posted") {
					angular.forEach(adminchallenge.allsearchposts, function (value, key) {
						console.log(value);
						if (value.id == post_id) {
							challengeService.reloadPost(post_id, function success(res) {
								if (res && res.commentList) {
									value.comments = res.commentList;
								}
								console.log(res);
							}, function error(err) {
								if (err && err.errormsg) {
									// console.log(err.errormsg);
								}
							});
						}
					});
				}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};
		adminchallenge.acceptChallengeTask = function () {
			challengeService.acceptChallenge("public", function success(res) {
				if (res && res.msg == "Assigned") {
					var ref1 = firebase.database().ref().child('tc4_users');
					var challenger = $firebaseArray(ref1);
					challenger.$add({
						user_id: authService.getCurrentUser().user_id,
						post_type: "public",
						created_at: firebase.database.ServerValue.TIMESTAMP
					});
					$state.go('public-feed');
				}
			}, function error(err) {
				if (err && err.errormsg) {
					console.log(err.errormsg);
				}
			});
		};

		adminchallenge.addCommentreviewedposts = function (post_id, content) {
			challengeService.comment(post_id, content, function success(res) {
				if (res && res.message == "Comment posted") {
					angular.forEach(adminchallenge.allreviewedposts, function (value, key) {
						console.log(value);
						if (value.id == post_id) {
							challengeService.reloadPost(post_id, function success(res) {
								if (res && res.commentList) {
									value.comments = res.commentList;
								}
								console.log(res);
							}, function error(err) {
								if (err && err.errormsg) {
									// console.log(err.errormsg);
								}
							});
						}
					});
				}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		adminchallenge.addCommentinvalidposts = function (post_id, content) {
			challengeService.comment(post_id, content, function success(res) {
				if (res && res.message == "Comment posted") {
					angular.forEach(adminchallenge.allreviewedposts, function (value, key) {
						console.log(value);
						if (value.id == post_id) {
							challengeService.reloadPost(post_id, function success(res) {
								if (res && res.commentList) {
									value.comments = res.commentList;
								}
								console.log(res);
							}, function error(err) {
								if (err && err.errormsg) {
									// console.log(err.errormsg);
								}
							});
						}
					});
				}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		adminchallenge.addCommentnotreviewedposts = function (post_id, content) {
			challengeService.comment(post_id, content, function success(res) {
				if (res && res.message == "Comment posted") {
					angular.forEach(adminchallenge.allnotreviewedposts, function (value, key) {
						console.log(value);
						if (value.id == post_id) {
							challengeService.reloadPost(post_id, function success(res) {
								if (res && res.commentList) {
									value.comments = res.commentList;
								}
								console.log(res);
							}, function error(err) {
								if (err && err.errormsg) {
									// console.log(err.errormsg);
								}
							});
						}
					});
				}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		adminchallenge.addCommentvalidposts = function (post_id, content) {
			challengeService.comment(post_id, content, function success(res) {
				if (res && res.message == "Comment posted") {
					angular.forEach(adminchallenge.allnotreviewedposts, function (value, key) {
						console.log(value);
						if (value.id == post_id) {
							challengeService.reloadPost(post_id, function success(res) {
								if (res && res.commentList) {
									value.comments = res.commentList;
								}
								console.log(res);
							}, function error(err) {
								if (err && err.errormsg) {
									// console.log(err.errormsg);
								}
							});
						}
					});
				}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		adminchallenge.shortlistedposts = function () {
			challengeService.shortlistedposts(function success(res) {
				if (res && res.PostList) {
					// console.log(res.PostList);
					adminchallenge.shortlistedpostsArr = res.PostList;
				}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		adminchallenge.createCollage = function (user_id) {
			challengeService.createCollageUser(user_id, function success(res) {
				// if(res && res.pic_name) { 
				//   challenge.collageImg = res.pic_name;
				// }
			}, function error(err) {});
		};

		adminchallenge.markinvalid = function (post_user_id, post_id) {
			$mdDialog.show({
				controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
					$scope.hide = function () {
						$mdDialog.hide();
					};
					$scope.cancel = function () {
						$mdDialog.cancel();
					};
					$scope.answer = function (answer) {
						$mdDialog.hide(answer);
					};
				}],
				templateUrl: "/ng-tpl/challenge-admin-comment-dialogue",
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function (answer) {
				adminchallenge.user = authService.getCurrentUser().name;
				answer = "Commented By " + adminchallenge.user + " : " + answer;
				challengeService.markinvalidpost(post_id, answer, function success(res) {
					if (res && res.msg == "Marked invalid") {
						notify(messageService.success.postMarkedInvalid);
						if (post_user_id != authService.getCurrentUser().user_id) {
							var ref2 = firebase.database().ref().child('notifications').child(post_user_id);
							adminchallenge.notification = $firebaseArray(ref2);
							adminchallenge.notification.$add({
								message: authService.getCurrentUser().name + " has made your post invalid",
								post_id: post_id,
								image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
								created_at: firebase.database.ServerValue.TIMESTAMP,
								status: 0
							}).then(function (ref) {}, function (err) {});
						}
					}
				}, function error(err) {
					if (err && err.errormsg) {
						// console.log(err.errormsg);
					}
				});
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
		};

		adminchallenge.markvalid = function (post_user_id, post_id) {
			$mdDialog.show({
				controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
					$scope.hide = function () {
						$mdDialog.hide();
					};
					$scope.cancel = function () {
						$mdDialog.cancel();
					};
					$scope.answer = function (answer) {
						$mdDialog.hide(answer);
					};
				}],
				templateUrl: "/ng-tpl/challenge-admin-comment-dialogue",
				parent: angular.element(document.body),
				// targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function (answer) {
				adminchallenge.user = authService.getCurrentUser().name;
				answer = "Commented By " + adminchallenge.user + " : " + answer;
				challengeService.markvalidpost(post_id, answer, function success(res) {
					console.log('Response--->', res);
					if (res && res.msg == "Marked valid") {
						console.log("It has been marked valid");
						notify(messageService.success.postMarkedValid);
						if (post_user_id != authService.getCurrentUser().user_id) {
							var ref2 = firebase.database().ref().child('notifications').child(post_user_id);
							adminchallenge.notification = $firebaseArray(ref2);
							adminchallenge.notification.$add({
								message: authService.getCurrentUser().name + " has made your post valid",
								post_id: post_id,
								image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
								created_at: firebase.database.ServerValue.TIMESTAMP,
								status: 0
							}).then(function (ref) {}, function (err) {});
						}
					}
				}, function error(err) {
					if (err && err.errormsg) {
						console.log(err.errormsg);
					}
				});
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
		};

		adminchallenge.deletepost = function (post_user_id, post_id) {
			$mdDialog.show({
				controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
					$scope.hide = function () {
						$mdDialog.hide();
					};
					$scope.cancel = function () {
						$mdDialog.cancel();
					};
					$scope.answer = function (answer) {
						$mdDialog.hide(answer);
					};
				}],
				templateUrl: "/ng-tpl/challenge-admin-comment-dialogue",
				parent: angular.element(document.body),
				// targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function (answer) {
				adminchallenge.user = authService.getCurrentUser().name;
				answer = "Commented By " + adminchallenge.user + " : " + answer;
				challengeService.deletepost(post_id, answer, function success(res) {
					if (res && res.msg == "Post deleted") {
						notify(messageService.success.postDeleted);
						// console.log('value.id in delete post-->', value.id);
						if (post_user_id != authService.getCurrentUser().user_id) {
							var ref2 = firebase.database().ref().child('notifications').child(post_user_id);
							adminchallenge.notification = $firebaseArray(ref2);
							adminchallenge.notification.$add({
								message: authService.getCurrentUser().name + " has deleted your post",
								post_id: post_id,
								image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
								created_at: firebase.database.ServerValue.TIMESTAMP,
								status: 0
							}).then(function (ref) {}, function (err) {});
						}
					}
				}, function error(err) {
					if (err && err.errormsg) {
						console.log(err.errormsg);
					}
				});
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
		};

		// adminchallenge.deletepost = function (post_id){
		//   challengeService.deletepost(post_id,
		//     function success(res) {
		//       if(res && res.msg=="Post deleted") { 
		//         notify(messageService.success.postDeleted);
		//       }
		//     },
		//     function error(err) {
		//       if (err && err.errormsg) {
		//         // console.log(err.errormsg);
		//       }
		//     });
		// }

		adminchallenge.commentDialogue = function (post_id, content) {
			console.log("post_id-->", post_id);
			console.log("content-->", content);
			$mdDialog.show({
				controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
					$scope.hide = function () {
						$mdDialog.hide();
					};
					$scope.cancel = function () {
						$mdDialog.cancel();
					};
				}],
				templateUrl: "/ng-tpl/challenge-admin-comment-dialogue",
				parent: angular.element(document.body),
				// targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function (answer) {
				challenge.addFile(answer);
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
			//$state.go('public-feed');
		};

		adminchallenge.openImageDialog = function (ev, post_pics) {
			$mdDialog.show({
				controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
					$scope.post_pics = post_pics;
					$scope.uploadImageUrl = adminchallenge.uploadImageUrl;
					$scope.hide = function () {
						$mdDialog.hide();
					};

					$scope.cancel = function () {
						$mdDialog.cancel();
					};

					$scope.answer = function (answer) {
						$mdDialog.hide(answer);
					};
				}],
				templateUrl: "/ng-tpl/image-dialog",
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
		};

		adminchallenge.nextinvalidposts = function () {
			if (!adminchallenge.invalidpostsfetchreqbusy) {
				adminchallenge.invalidpostsfetchreqbusy = true;
				challengeService.allinvalidposts(adminchallenge.invalidpostsoffset, function success(res) {
					if (res && res.PostList) {
						adminchallenge.total_records = res.total_records;
						adminchallenge.total_records_not_reviewed = res.total_records_not_reviewed;
						adminchallenge.total_records_reviewed = res.total_records_reviewed;
						adminchallenge.total_records_private = res.total_records_private;
						adminchallenge.total_records_public = res.total_records_public;
						adminchallenge.total_records_invalid = res.total_records_invalid;
						adminchallenge.total_records_valid = res.total_records_valid;
						angular.forEach(res.PostList, function (value, index) {
							value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
							adminchallenge.invalidposts.push(value);
							var ref1 = firebase.database().ref().child('post_data').child(value.id).child('comments');
							value.comments = $firebaseArray(ref1);
							firebase.database().ref().child('post_data').child(value.id).child('likes').on('value', snapshots => {
								value.like_count = snapshots.numChildren();
							});
							firebase.database().ref().child('post_data').child(value.id).child('comments').on('value', snapshots => {
								// console.log("Snapshots : " + JSON.stringify(snapshots.val()));
								value.com_length = snapshots.numChildren();
							});
						});

						adminchallenge.invalidpostsoffset = adminchallenge.invalidpostsoffset + 20;
						adminchallenge.invalidpostsfetchreqbusy = false;
					}
				}, function error(err) {
					if (err && err.errormsg) {
						// console.log(err.errormsg);
					}
				});
			}
		};

		adminchallenge.nextvalidposts = function () {
			if (!adminchallenge.validpostsfetchreqbusy) {
				adminchallenge.validpostsfetchreqbusy = true;
				challengeService.allvalidposts(adminchallenge.validpostsoffset, function success(res) {
					if (res && res.PostList) {
						adminchallenge.total_records = res.total_records;
						adminchallenge.total_records_not_reviewed = res.total_records_not_reviewed;
						adminchallenge.total_records_reviewed = res.total_records_reviewed;
						adminchallenge.total_records_private = res.total_records_private;
						adminchallenge.total_records_public = res.total_records_public;
						adminchallenge.total_records_invalid = res.total_records_invalid;
						adminchallenge.total_records_valid = res.total_records_valid;
						angular.forEach(res.PostList, function (value, index) {
							value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
							adminchallenge.validposts.push(value);
							var ref1 = firebase.database().ref().child('post_data').child(value.id).child('comments');
							value.comments = $firebaseArray(ref1);
							firebase.database().ref().child('post_data').child(value.id).child('likes').on('value', snapshots => {
								value.like_count = snapshots.numChildren();
							});
							firebase.database().ref().child('post_data').child(value.id).child('comments').on('value', snapshots => {
								// console.log("Snapshots : " + JSON.stringify(snapshots.val()));
								value.com_length = snapshots.numChildren();
							});
						});

						adminchallenge.validpostsoffset = adminchallenge.validpostsoffset + 20;
						adminchallenge.validpostsfetchreqbusy = false;
					}
				}, function error(err) {
					if (err && err.errormsg) {
						// console.log(err.errormsg);
					}
				});
			}
		};

		adminchallenge.nextreviewedposts = function () {
			if (!adminchallenge.fetchreqbusy) {
				adminchallenge.fetchreqbusy = true;
				challengeService.allreviewedposts(adminchallenge.reviewedpostsoffset, function success(res) {
					if (res && res.PostList) {
						adminchallenge.total_records = res.total_records;
						adminchallenge.total_records_not_reviewed = res.total_records_not_reviewed;
						adminchallenge.total_records_reviewed = res.total_records_reviewed;
						adminchallenge.total_records_private = res.total_records_private;
						adminchallenge.total_records_public = res.total_records_public;
						adminchallenge.total_records_invalid = res.total_records_invalid;
						adminchallenge.total_records_valid = res.total_records_valid;
						angular.forEach(res.PostList, function (value, index) {
							value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
							adminchallenge.posts.push(value);
							var ref1 = firebase.database().ref().child('post_data').child(value.id).child('comments');
							value.comments = $firebaseArray(ref1);
							firebase.database().ref().child('post_data').child(value.id).child('likes').on('value', snapshots => {
								value.like_count = snapshots.numChildren();
							});
							firebase.database().ref().child('post_data').child(value.id).child('comments').on('value', snapshots => {
								// console.log("Snapshots : " + JSON.stringify(snapshots.val()));
								value.com_length = snapshots.numChildren();
							});
						});

						adminchallenge.reviewedpostsoffset = adminchallenge.reviewedpostsoffset + 20;
						adminchallenge.fetchreqbusy = false;
					}
				}, function error(err) {
					if (err && err.errormsg) {
						// console.log(err.errormsg);
					}
				});
			}
		};

		adminchallenge.nextnotreviewedposts = function () {
			if (!adminchallenge.notreviewedpostsfetchreqbusy) {
				adminchallenge.notreviewedpostsfetchreqbusy = true;
				challengeService.allnotreviewedposts(adminchallenge.notreviewedpostsoffset, function success(res) {
					if (res && res.PostList) {
						adminchallenge.total_records = res.total_records;
						adminchallenge.total_records_not_reviewed = res.total_records_not_reviewed;
						adminchallenge.total_records_reviewed = res.total_records_reviewed;
						adminchallenge.total_records_private = res.total_records_private;
						adminchallenge.total_records_public = res.total_records_public;
						adminchallenge.total_records_invalid = res.total_records_invalid;
						adminchallenge.total_records_valid = res.total_records_valid;
						angular.forEach(res.PostList, function (value, index) {
							value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
							adminchallenge.notreviewedposts.push(value);
							var ref1 = firebase.database().ref().child('post_data').child(value.id).child('comments');
							value.comments = $firebaseArray(ref1);
							firebase.database().ref().child('post_data').child(value.id).child('likes').on('value', snapshots => {
								value.like_count = snapshots.numChildren();
							});
							firebase.database().ref().child('post_data').child(value.id).child('comments').on('value', snapshots => {
								// console.log("Snapshots : " + JSON.stringify(snapshots.val()));
								value.com_length = snapshots.numChildren();
							});
						});

						adminchallenge.notreviewedpostsoffset = adminchallenge.notreviewedpostsoffset + 20;
						adminchallenge.notreviewedpostsfetchreqbusy = false;
					}
				}, function error(err) {
					if (err && err.errormsg) {
						// console.log(err.errormsg);
					}
				});
			}
		};

		adminchallenge.likeComment = function (post_id, commentObj) {
			firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id).once("value", snapshot => {
				const liked = snapshot.val();
				if (liked) {
					firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id).remove();
				} else {
					var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id);
					adminchallenge.like = $firebaseArray(ref1);

					adminchallenge.like.$add({
						liked_by_id: authService.getCurrentUser().user_id,
						liked_by_name: authService.getCurrentUser().name,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 1
					}).then(function (ref) {
						var ref2 = firebase.database().ref().child('notifications').child(Object.values(commentObj)[2]);
						adminchallenge.notification = $firebaseArray(ref2);
						adminchallenge.notification.$add({
							message: authService.getCurrentUser().name + " has liked your comment",
							post_id: post_id,
							image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
							created_at: firebase.database.ServerValue.TIMESTAMP,
							status: 0
						}).then(function (ref) {}, function (err) {});
					}, function (err) {});
				}
			});
		};

		adminchallenge.addCommentOnComment = function (post_id, commentObj, content) {
			// call it when you add comment under another comment
			// console.log(Object.values(commentObj));
			// console.log(Object.values(commentObj)[5]);
			// console.log(Object.values(commentObj)[6]);
			// console.log(Object.values(commentObj)[7]);
			var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[5]).child('replies');
			// // var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.keys(Object.values(commentObj)[5])[0]).child('replies');
			adminchallenge.comment = $firebaseArray(ref1);
			adminchallenge.comment.$add({
				reply_user_id: authService.getCurrentUser().user_id,
				reply_by: authService.getCurrentUser().name,
				reply_title: content,
				image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
				created_at: firebase.database.ServerValue.TIMESTAMP
			}).then(function (ref) {
				var ref2 = firebase.database().ref().child('notifications').child(Object.values(commentObj)[2]); // for notifications
				adminchallenge.notification = $firebaseArray(ref2);
				adminchallenge.notification.$add({
					message: authService.getCurrentUser().name + " has commented on your comment",
					post_id: post_id,
					image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
					created_at: firebase.database.ServerValue.TIMESTAMP,
					status: 0
				}).then(function (ref) {}, function (err) {});
			}, function (err) {});
		};

		adminchallenge.likePost = function (res_user_id, post_id) {
			console.log("liked post");
			console.log("Post ID : " + post_id);
			firebase.database().ref().child("post_data").child(post_id).child("likes").child(authService.getCurrentUser().user_id).once("value", snapshot => {
				const liked = snapshot.val();
				if (liked) {
					firebase.database().ref().child('post_data').child(post_id).child('likes').child(authService.getCurrentUser().user_id).remove();
				} else {
					var ref1 = firebase.database().ref().child('post_data').child(post_id).child('likes').child(authService.getCurrentUser().user_id);
					adminchallenge.like = $firebaseArray(ref1);

					adminchallenge.like.$add({
						like_by: authService.getCurrentUser().name,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 1
					}).then(function (ref) {
						// angular.forEach(adminchallenge.allPosts, function(value, key){
						// 	console.log(value.user_id);
						// 	if(value.id == post_id){
						if (res_user_id != authService.getCurrentUser().user_id) {
							var ref2 = firebase.database().ref().child('notifications').child(res_user_id);
							adminchallenge.notification = $firebaseArray(ref2);
							adminchallenge.notification.$add({
								message: authService.getCurrentUser().name + " has liked on your post",
								post_id: post_id,
								image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
								created_at: firebase.database.ServerValue.TIMESTAMP,
								status: 0
							}).then(function (ref) {}, function (err) {});
						}
						// 	}
						// });    
					}, function (err) {});
				}
			});
		};

		adminchallenge.addComment = function (res_user_id, post_id, content) {
			var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments');
			adminchallenge.comment = $firebaseArray(ref1);

			adminchallenge.comment.$add({
				comment_user_id: authService.getCurrentUser().user_id,
				comment_by: authService.getCurrentUser().name,
				comment_title: content,
				image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
				created_at: firebase.database.ServerValue.TIMESTAMP
			}).then(function (ref) {
				if (res_user_id != authService.getCurrentUser().user_id) {
					var ref2 = firebase.database().ref().child('notifications').child(res_user_id);
					adminchallenge.notification = $firebaseArray(ref2);
					adminchallenge.notification.$add({
						message: authService.getCurrentUser().name + " has commented on your post",
						post_id: post_id,
						image_url: adminchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 0
					});
				}
			}, function (err) {});
		};
	}]);

	squatsApp.filter('time_ago', function () {
		return function (input) {
			input = input || '';
			var out = '';
			out = moment(input).fromNow();
			return out;
		};
	});

	module.exports = squatsApp;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	
	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("notificationChallengeCtrl", ['$location', 'uploadImageUrl', 'authService', '$firebaseArray', '$anchorScroll', 'challengeService', 'notify', 'messageService', '$window', function ($location, uploadImageUrl, authService, $firebaseArray, $anchorScroll, challengeService, notify, messageService, $window) {

		var notificationchallenge = this;

		function getAllNotifications() {
			var ref2 = firebase.database().ref().child('notifications').child(authService.getCurrentUser().user_id).orderByChild('status').equalTo(0);
			ref2.on('value', snapshots => {
				notificationchallenge.notify_length = snapshots.numChildren();
			});

			notificationchallenge.allNewNotifications = $firebaseArray(ref2);
			console.log("All notifications-->", notificationchallenge.allNewNotifications);
		}

		getAllNotifications();

		notificationchallenge.markseenNotification = function (notificObj) {
			var ref2 = firebase.database().ref().child('notifications').child(authService.getCurrentUser().user_id).child(notificObj.$id);
			ref2.update({
				message: notificObj.message,
				post_id: notificObj.post_id,
				created_at: notificObj.created_at,
				image_url: notificationchallenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
				status: 1
			});
		};
	}]);

	module.exports = squatsApp;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("overviewChallengeCtrl", ['$location', 'authService', 'challengeService', '$firebase', '$firebaseArray', 'notify', 'messageService', '$mdDialog', '$scope', '$window', '$state', function ($location, authService, challengeService, $firebase, $firebaseArray, notify, messageService, $mdDialog, $scope, $window, $state) {

			var overview = this;
			overview.privacy = "";

			challengeService.fetchChallengePrivacy(function success(res) {
					if (res && res.privacy) {
							overview.privacy = res.privacy;
							$state.go('public-feed');
					} else {
							// $state.go('acceptChallenge');
					}
			});

			overview.acceptChallengeTask = function () {
					challengeService.acceptChallenge("public", function success(res) {
							if (res && res.msg == "Assigned") {
									var ref1 = firebase.database().ref().child('tc4_users');
									var challenger = $firebaseArray(ref1);
									challenger.$add({
											user_id: authService.getCurrentUser().user_id,
											post_type: "public",
											created_at: firebase.database.ServerValue.TIMESTAMP
									});
									$state.go('public-feed');
							}
					}, function error(err) {
							if (err && err.errormsg) {
									console.log(err.errormsg);
							}
					});
			};

			overview.getStarted = function (ev) {
					if (authService.getCurrentUser()) {
							challengeService.fetchChallengePrivacy(function success(res) {
									if (res && res.privacy) {
											overview.privacy = res.privacy;
											$window.location.assign('app#/app/public-feed');
									} else {
											$window.location.assign('app#/app/accept-challenge');
									}
							}, function error(err) {
									console.log(err);
							});
					} else {
							$scope.showLogin(ev);
					}
			};

			overview.acceptChallengeCondition = function () {
					$mdDialog.show({
							controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
									$scope.hide = function () {
											$mdDialog.hide();
									};

									$scope.cancel = function () {
											$mdDialog.cancel();
									};
							}],
							templateUrl: "/ng-tpl/rules-dialog",
							parent: angular.element(document.body),
							// targetEvent: ev,
							clickOutsideToClose: true,
							fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
					}).then(function (answer) {
							challenge.addFile(answer);
							$scope.status = 'You said the information was "' + answer + '".';
					}, function () {
							$scope.status = 'You cancelled the dialog.';
					});
					//$state.go('public-feed');
			};

			overview.showVideo = function (ev) {
					$mdDialog.show({
							controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {

									$scope.video1 = 'https://www.youtube.com/watch?v=AHICULGsoTk';

									$scope.playVideo = function () {
											var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
											player.playVideo();
									};

									$scope.showVideoInfo = function () {
											var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
											player.showVideoInfo();
									};

									$scope.stateChanged = function (e) {
											console.log(e);
									};

									$scope.hide = function () {
											$mdDialog.hide();
									};

									$scope.cancel = function () {
											$mdDialog.cancel();
									};

									$scope.answer = function (answer) {
											$mdDialog.hide(answer);
									};
							}],
							templateUrl: "/ng-tpl/video-dialog",
							parent: angular.element(document.body),
							targetEvent: ev,
							clickOutsideToClose: true,
							fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
					}).then(function (answer) {
							$scope.status = 'You said the information was "' + answer + '".';
					}, function () {
							$scope.status = 'You cancelled the dialog.';
					});
			};
	}]);

	module.exports = squatsApp;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	
	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("mainChallengeCtrl", ['$location', 'authService', '$firebaseArray', 'challengeService', 'notify', 'messageService', '$window', '$mdDialog', '$scope', function ($location, authService, $firebaseArray, challengeService, notify, messageService, $window, $mdDialog, $scope) {

		var mainchallenge = this;

		mainchallenge.admin = false;
		mainchallenge.total_participants = 0;

		firebase.database().ref().child('notifications').child(authService.getCurrentUser().user_id).orderByChild('status').equalTo(0).on('value', snapshots => {
			mainchallenge.notify_length = snapshots.numChildren();
			console.log("number of notifications : " + mainchallenge.notify_length);
		});

		challengeService.fetchAdminCred(function success(res) {
			if (res && res.msg == "Admin") {
				mainchallenge.admin = true;
			} else {
				mainchallenge.admin = false;
			}
		}, function error(res) {
			// console.log(err);
		});

		firebase.database().ref().child('tc4_users').on('value', snapshots => {
			// console.log("Snapshots : " + JSON.stringify(snapshots.val()));
			mainchallenge.total_participants = snapshots.numChildren();
		});

		challengeService.fetchChallengePrivacy(function success(res) {
			if (res && res.privacy) {
				mainchallenge.privacy_cat = res.privacy;
			}
		}, function error(res) {
			// console.log(err);
		});

		mainchallenge.changePrivacy = function (privacy_cat) {
			challengeService.changePrivacyChallenge(privacy_cat, function success(res) {
				mainchallenge.privacy_cat = res.privacy_cat;
			}, function error(err) {});
		};

		mainchallenge.showRules = function (ev) {
			console.log("Clicked showRules");
			// dialogHandle(ev, "/ng-tpl/rules-dialog");
		};

		function dialogHandle(ev, tplPath) {
			$mdDialog.show({
				controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
					$scope.hide = function () {
						$mdDialog.hide();
					};

					$scope.cancel = function () {
						$mdDialog.cancel();
					};

					$scope.answer = function (answer) {
						$mdDialog.hide(answer);
					};
				}],
				templateUrl: tplPath,
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
		};
	}]);

	module.exports = squatsApp;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		// $urlRouterProvider.otherwise('/overview');
		$stateProvider.state('app.overview', {
			url: '/overview',
			templateUrl: '/ng-tpl/challenge-overview'
		}).state('app.acceptChallenge', {
			url: '/accept-challenge',
			templateUrl: '/ng-tpl/challenge-accept'
		}).state('app.mainState', {
			templateUrl: '/ng-tpl/challenge-main-page'
		}).state('notifications', {
			url: '/notifications',
			parent: 'app.mainState',
			views: {
				'main@app.mainState': {
					templateUrl: '/ng-tpl/challenge-notifications'
				}
			}
		}).state('public-feed', {
			url: '/public-feed',
			parent: 'app.mainState',
			views: {
				'main@app.mainState': {
					templateUrl: '/ng-tpl/challenge-public-feed'
				}
			}
		}).state('challenge-rules', {
			url: '/challenge-rules',
			parent: 'app.mainState',
			views: {
				'main@app.mainState': {
					templateUrl: '/ng-tpl/tc-rules'
				}
			}
		}).state('my-feed', {
			url: '/my-feed',
			parent: 'app.mainState',
			views: {
				'main@app.mainState': {
					templateUrl: '/ng-tpl/challenge-my-feed'
				}
			}
		}).state('liked-posts', {
			url: '/liked-posts',
			parent: 'app.mainState',
			views: {
				'main@app.mainState': {
					templateUrl: '/ng-tpl/challenge-liked-posts'
				}
			}
		}).state('following', {
			url: '/following',
			parent: 'app.mainState',
			views: {
				'main@app.mainState': {
					templateUrl: '/ng-tpl/challenge-following-feed'
				}
			}
		}).state('journey', {
			url: '/journey/:userId',
			parent: 'app.mainState',
			views: {
				'main@app.mainState': {
					templateUrl: '/ng-tpl/challenge-journey'
				}
			}
		}).state('admin', {
			url: '/admin',
			parent: 'app.mainState',
			views: {
				'main@app.mainState': {
					templateUrl: '/ng-tpl/challenge-admin-panel'
				}
			}
		}).state('adminReviewed', {
			url: '/admin/reviewed',
			parent: 'admin',
			views: {
				'mainAdmin@admin': {
					templateUrl: '/ng-tpl/challenge-admin-reviewed-posts'
				}
			}
		}).state('adminPublic', {
			url: '/admin/public',
			parent: 'admin',
			views: {
				'mainAdmin@admin': {
					templateUrl: '/ng-tpl/challenge-admin-public-posts'
				}
			}
		}).state('adminPrivate', {
			url: '/admin/private',
			parent: 'admin',
			views: {
				'mainAdmin@admin': {
					templateUrl: '/ng-tpl/challenge-admin-private-posts'
				}
			}
		}).state('adminNotReviewed', {
			url: '/admin/not-reviewed',
			parent: 'admin',
			views: {
				'mainAdmin@admin': {
					templateUrl: '/ng-tpl/challenge-admin-not-reviewed-posts'
				}
			}
		}).state('adminValid', {
			url: '/admin/valid',
			parent: 'admin',
			views: {
				'mainAdmin@admin': {
					templateUrl: '/ng-tpl/challenge-admin-valid-posts'
				}
			}
		}).state('adminInvalid', {
			url: '/admin/invalid',
			parent: 'admin',
			views: {
				'mainAdmin@admin': {
					templateUrl: '/ng-tpl/challenge-admin-invalid-posts'
				}
			}
		}).state('adminSearch', {
			url: '/admin/search',
			parent: 'admin',
			views: {
				'mainAdmin@admin': {
					templateUrl: '/ng-tpl/challenge-admin-searchbyname'
				}
			}
		});
	}]);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	// squatsApp.controller("publicChallengeCtrl", ['$location', '$anchorScroll','challengeService', 'notify', 'messageService', '$mdDialog', 'utilService', 'uploadImageUrl',  '$scope', '$window',function ($location,$anchorScroll,challengeService, notify, messageService, $mdDialog, utilService, uploadImageUrl, $scope, $window) {
	squatsApp.controller("publicChallengeCtrl", ['$location', 'authService', '$firebase', '$firebaseArray', '$anchorScroll', 'challengeService', 'notify', 'messageService', '$mdDialog', 'utilService', 'uploadImageUrl', '$scope', '$window', function ($location, authService, $firebase, $firebaseArray, $anchorScroll, challengeService, notify, messageService, $mdDialog, utilService, uploadImageUrl, $scope, $window) {

		var challenge = this;
		challenge.uploadImageUrl = uploadImageUrl;
		challenge.offset = 0;
		challenge.fetchreqbusy = false;
		challenge.after = '';
		challenge.post = {};
		challenge.post.filesArr = [];
		challenge.createCollage = createCollage;

		// getCollage();

		challenge.gotoTop = function () {
			// set the location.hash to the id of
			// the element you wish to scroll to.
			$location.hash('top');

			// call $anchorScroll()
			$anchorScroll();
		};

		function createCollage() {
			challengeService.createCollage(function success(res) {
				if (res && res.pic_name) {
					challenge.collageImg = res.pic_name;
				}
			}, function error(err) {});
		}

		function getCollage() {
			challengeService.getCollage(function success(res) {
				if (res && res.pic_name) {
					challenge.collageImg = res.pic_name;
				}
			}, function error(err) {});
		}

		challengeService.getAllPosts(challenge.offset, function success(res) {
			if (res) {
				challenge.allPosts = res.PostList;
				// console.log("res", res.Post);
				if (!res.PostList) {
					// console.log("!res.PostList", !res.PostList);
					challenge.nonextpost = true;
				}
				angular.forEach(res.PostList, function (value, index) {
					value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
					// console.log(index + ': ' + JSON.stringify(value));
					var ref1 = firebase.database().ref().child('post_data').child(value.id).child('comments');
					value.comments = $firebaseArray(ref1);
					firebase.database().ref().child('post_data').child(value.id).child('likes').on('value', snapshots => {
						value.like_count = snapshots.numChildren();
					});
					firebase.database().ref().child('post_data').child(value.id).child('comments').on('value', snapshots => {
						// console.log("Snapshots : " + JSON.stringify(snapshots.val()));
						value.com_length = snapshots.numChildren();
					});

					// var ref2 = firebase.database().ref().child('notifications').child(value.user_id);
					// value.notifications = $firebaseArray(ref2);

					// firebase.database().ref().child('notifications').child(value.id).orderByChild('status').equalTo(0).on('value', snapshots => {
					// 	snapshots.forEach(item => {
					// 		value.notifics.push(item.message);
					// 	});
					// });
					// console.log(value.comments);
				});
			}
		}, function error(err) {
			if (err && err.errormsg) {}
		});

		challenge.likeComment = function (post_id, commentObj) {
			firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id).once("value", snapshot => {
				const liked = snapshot.val();
				if (liked) {
					firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id).remove();
				} else {
					var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id);
					challenge.like = $firebaseArray(ref1);

					challenge.like.$add({
						liked_by_id: authService.getCurrentUser().user_id,
						liked_by_name: authService.getCurrentUser().name,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 1
					}).then(function (ref) {
						var ref2 = firebase.database().ref().child('notifications').child(Object.values(commentObj)[2]);
						challenge.notification = $firebaseArray(ref2);
						challenge.notification.$add({
							message: authService.getCurrentUser().name + " has liked your comment",
							post_id: post_id,
							image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
							created_at: firebase.database.ServerValue.TIMESTAMP,
							status: 0
						}).then(function (ref) {}, function (err) {});
					}, function (err) {});
				}
			});
		};

		challenge.addCommentOnComment = function (post_id, commentObj, content) {
			// call it when you add comment under another comment
			// console.log(Object.values(commentObj));
			// console.log(Object.values(commentObj)[5]);
			// console.log(Object.values(commentObj)[6]);
			// console.log(Object.values(commentObj)[7]);
			var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[5]).child('replies');
			// // var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.keys(Object.values(commentObj)[5])[0]).child('replies');
			challenge.comment = $firebaseArray(ref1);
			challenge.comment.$add({
				reply_user_id: authService.getCurrentUser().user_id,
				reply_by: authService.getCurrentUser().name,
				reply_title: content,
				image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
				created_at: firebase.database.ServerValue.TIMESTAMP
			}).then(function (ref) {
				// firebase.database().ref().child("post_data").child(post_id).child("likes").child(authService.getCurrentUser().user_id).once("value",snapshot => {
				var ref2 = firebase.database().ref().child('notifications').child(Object.values(commentObj)[2]); // for notifications
				console.log("Likes on notifications-->", ref2);
				challenge.notification = $firebaseArray(ref2);
				challenge.notification.$add({
					message: authService.getCurrentUser().name + " has commented on your comment",
					post_id: post_id,
					image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
					created_at: firebase.database.ServerValue.TIMESTAMP,
					status: 0
				}).then(function (ref) {}, function (err) {});
			}, function (err) {});
		};

		// challenge.addComment = function(post_id,content) {
		//   challengeService.comment(post_id,content,
		//     function success(res) {
		//       if(res && res.message=="Comment posted") { 
		//         angular.forEach(challenge.allPosts, function(value, key){
		//           console.log(value);
		//           if(value.id == post_id){
		//             challengeService.reloadPost(post_id, 
		//               function success(res) {
		//                 if(res && res.commentList) { 
		//                   value.comments = res.commentList;
		//                 }
		//                 console.log(res);
		//               },
		//               function error(err) {
		//                 if (err && err.errormsg) {
		//                   // console.log(err.errormsg);
		//                 }
		//               });
		//           }
		//         });
		//       }
		//     },
		//     function error(err) {
		//       if (err && err.errormsg) {
		//         // console.log(err.errormsg);
		//       }
		//     });
		// }


		challenge.addComment = function (res_user_id, post_id, content) {
			var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments');
			challenge.comment = $firebaseArray(ref1);

			challenge.comment.$add({
				comment_user_id: authService.getCurrentUser().user_id,
				comment_by: authService.getCurrentUser().name,
				comment_title: content,
				image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
				created_at: firebase.database.ServerValue.TIMESTAMP
			}).then(function (ref) {
				if (res_user_id != authService.getCurrentUser().user_id) {
					var ref2 = firebase.database().ref().child('notifications').child(res_user_id);
					challenge.notification = $firebaseArray(ref2);
					challenge.notification.$add({
						message: authService.getCurrentUser().name + " has commented on your post",
						post_id: post_id,
						image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 0
					});
				}
			}, function (err) {});
		};

		challenge.likePost = function (res_user_id, post_id) {
			firebase.database().ref().child("post_data").child(post_id).child("likes").child(authService.getCurrentUser().user_id).once("value", snapshot => {
				const liked = snapshot.val();
				if (liked) {
					firebase.database().ref().child('post_data').child(post_id).child('likes').child(authService.getCurrentUser().user_id).remove();
				} else {
					var ref1 = firebase.database().ref().child('post_data').child(post_id).child('likes').child(authService.getCurrentUser().user_id);
					challenge.like = $firebaseArray(ref1);

					challenge.like.$add({
						like_by: authService.getCurrentUser().name,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 1
					}).then(function (ref) {
						// angular.forEach(challenge.allPosts, function(value, key){
						// 	// console.log(value.user_id);
						// 	if(value.id == post_id){
						if (res_user_id != authService.getCurrentUser().user_id) {
							var ref2 = firebase.database().ref().child('notifications').child(res_user_id);
							challenge.notification = $firebaseArray(ref2);
							challenge.notification.$add({
								message: authService.getCurrentUser().name + " has liked on your post",
								post_id: post_id,
								created_at: firebase.database.ServerValue.TIMESTAMP,
								image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
								status: 0
							}).then(function (ref) {}, function (err) {});
						}
						// 	}
						// });		
					}, function (err) {});
				}
			});
		};

		challenge.followUser = function (following_id) {
			challengeService.follow(following_id, function success(res) {
				if (res && res.msg == "Followed") {}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		challenge.unfollowUser = function (following_id) {
			challengeService.unfollow(following_id, function success(res) {
				if (res && res.msg == "Unfollowed") {}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		challenge.nextPage = function () {
			if (!challenge.fetchreqbusy && !challenge.nonextpost) {
				challenge.fetchreqbusy = true;
				challenge.offset = challenge.offset + 20;
				challengeService.getAllPosts(challenge.offset, function success(res) {
					if (res && res.PostList) {
						angular.forEach(res.PostList, function (value, index) {
							value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
							challenge.allPosts.push(value);
						});
					} else if (res && !res.PostList) {
						challenge.nonextpost = true;
					}
					challenge.fetchreqbusy = false;
				}, function error(err) {
					// challenge.fetchreqbusy = true;
					if (err && err.errormsg) {}
				});
			}
		};

		challenge.openImageDialog = function (ev, post_pics) {
			$mdDialog.show({
				controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
					$scope.post_pics = post_pics;
					$scope.uploadImageUrl = challenge.uploadImageUrl;
					$scope.hide = function () {
						$mdDialog.hide();
					};

					$scope.cancel = function () {
						$mdDialog.cancel();
					};

					$scope.answer = function (answer) {
						$mdDialog.hide(answer);
					};
				}],
				templateUrl: "/ng-tpl/image-dialog",
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
		};
	}]);

	squatsApp.filter('time_ago', function () {
		return function (input) {
			input = input || '';
			var out = '';
			out = moment(input).fromNow();
			return out;
		};
	});

	module.exports = squatsApp;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('challengeService', ['$http', 'challengeBaseURL', 'Upload', function ($http, challengeBaseURL, Upload) {

	  var config = { headers: {
	      'challengeid': '4'
	    }
	  };

	  function challengeHeaders(privacy_type) {
	    return {
	      headers: {
	        'challengeid': '4',
	        'challengetype': privacy_type
	      }
	    };
	  };

	  function offsetHeader(offset) {
	    return {
	      headers: {
	        'challengeid': '4',
	        'offsetval': offset
	      }
	    };
	  };

	  function likeHeaders(post_id) {
	    return {
	      headers: {
	        'challengeid': '4',
	        'postid': post_id
	      }
	    };
	  };

	  function imgHeaders(img_id, post_id) {
	    return {
	      headers: {
	        'challengeid': '4',
	        'imgid': img_id,
	        'postid': post_id
	      }
	    };
	  };

	  function nameSearchHeaders(searchname) {
	    return {
	      headers: {
	        'challengeid': '4',
	        'searchVal': searchname
	      }
	    };
	  };

	  function userIdHeaders(userId) {
	    return {
	      headers: {
	        'challengeid': '4',
	        'userid': userId
	      }
	    };
	  };

	  this.isChallengeAcceptedUser = function (callback) {

	    $http.get(challengeBaseURL + '/isChallengeAcceptedUser', config).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.changePrivacyChallenge = function (privacy_type, callback) {
	    $http.get(challengeBaseURL + '/changePrivacyChallenge', challengeHeaders(privacy_type)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.acceptChallenge = function (data, callback) {

	    $http.get(challengeBaseURL + '/acceptChallenge', challengeHeaders(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.fetchChallengePrivacy = function (callback) {

	    $http.get(challengeBaseURL + '/fetchChallengePrivacy', config).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.weekPost = function (data, successCallback, errorCallback) {
	    Upload.upload({
	      url: challengeBaseURL + '/addnewPost',
	      data: {
	        'postid': data.id,
	        'statistics_details': data.post_content,
	        'challenge_id': "4",
	        'tran_image': data.filesArr,
	        'post_type': data.privacy_type
	      }
	    }).then(function (resp) {
	      successCallback(resp);
	    }, function (resp) {
	      errorCallback(resp);
	    });
	  };

	  this.getAllWeekPosts = function (callback) {
	    $http.get(challengeBaseURL + '/fetchUserStatictics', config).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.getJourneyAllWeekPosts = function (userId, callback) {
	    $http.get(challengeBaseURL + '/fetchUserJourneyStatictics', userIdHeaders(userId)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.getAllPosts = function (data, callback) {
	    $http.get(challengeBaseURL + '/fetchAllPosts', offsetHeader(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.like = function (data, callback) {
	    $http.get(challengeBaseURL + '/likePost', likeHeaders(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.unlike = function (data, callback) {
	    $http.get(challengeBaseURL + '/unlikePost', likeHeaders(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.removePic = function (imgid, postid, callback) {
	    $http.get(challengeBaseURL + '/removePostImage', imgHeaders(imgid, postid)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.reloadPost = function (data, callback) {
	    $http.get(challengeBaseURL + '/fetchPost', likeHeaders(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.createCollage = function (callback) {
	    $http.get(challengeBaseURL + '/createTransformationCollage').success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.createCollageUser = function (user_id, callback) {
	    $http.get(challengeBaseURL + '/createTransformationCollage', userIdHeaders(user_id)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.getCollage = function (callback) {
	    $http.get(challengeBaseURL + '/getTransformationCollage').success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.comment = function (post_id, comment_content, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': challengeBaseURL + '/postComment',
	      'data': { "post_id": post_id,
	        "desc": comment_content
	      }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.follow = function (following_id, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': challengeBaseURL + '/follow',
	      'data': { "following_id": following_id }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.unfollow = function (following_id, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': challengeBaseURL + '/unfollow',
	      'data': { "following_id": following_id }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.markinvalidpost = function (post_id, message, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': challengeBaseURL + '/markInvalid',
	      'data': { "post_id": post_id, "message": message }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.markvalidpost = function (post_id, message, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': challengeBaseURL + '/markValid',
	      'data': { "post_id": post_id, "message": message }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.deletepost = function (post_id, message, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': challengeBaseURL + '/deletePost',
	      'data': { "post_id": post_id, "message": message }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.fetchAdminCred = function (callback) {
	    $http.get(challengeBaseURL + '/isAdmin').success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.allreviewedposts = function (data, callback) {
	    $http.get(challengeBaseURL + '/fetchReviewedPosts', offsetHeader(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.allnotreviewedposts = function (data, callback) {
	    $http.get(challengeBaseURL + '/fetchNotReviewedPosts', offsetHeader(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.allinvalidposts = function (data, callback) {
	    $http.get(challengeBaseURL + '/fetchInvalidPosts', offsetHeader(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.allvalidposts = function (data, callback) {
	    $http.get(challengeBaseURL + '/fetchValidPosts', offsetHeader(data)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.shortlistedposts = function (callback) {
	    $http.get(challengeBaseURL + '/shortlistedPosts').success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.allnewnotifications = function (callback) {
	    $http.get(challengeBaseURL + '/fetchAllNewNotifications').success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.seenNotification = function (notification_id, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': challengeBaseURL + '/seenNotification',
	      'data': { "notification_id": notification_id }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.deletecomment = function (comment_id, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': challengeBaseURL + '/deleteComment',
	      'data': { "comment_id": comment_id }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.searchchallengepostsbyname = function (searchname, callback) {
	    $http.get(challengeBaseURL + '/fetchChallengeUsersPosts', nameSearchHeaders(searchname)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };
	}]);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("myFeedChallengeCtrl", ['$location', '$anchorScroll', 'authService', 'challengeService', 'notify', 'messageService', '$mdDialog', 'utilService', 'uploadImageUrl', '$scope', '$window', 'Upload', '$firebaseArray', function ($location, $anchorScroll, authService, challengeService, notify, messageService, $mdDialog, utilService, uploadImageUrl, $scope, $window, Upload, $firebaseArray) {

		var challenge = this;
		challenge.uploadImageUrl = uploadImageUrl;
		challenge.offset = 0;

		challenge.myImage = '';
		challenge.myCroppedImage = '';

		challenge.gotoTop = function () {
			console.log("top");
			// set the location.hash to the id of
			// the element you wish to scroll to.
			$location.hash('top');

			// call $anchorScroll()
			$anchorScroll();
		};

		if (authService.getCurrentUser()) {
			challenge.user = authService.getCurrentUser();
		}

		challenge.post = {};
		challenge.post.filesArr = [];

		challengeService.getAllWeekPosts(function (res) {
			challenge.currentweek = utilService.getCurrentWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'));
			if (res.PostList) {
				// console.log(challenge.allUserPosts);
				challenge.lastpostweek = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[0].time));

				if (challenge.currentweek > challenge.lastpostweek) {
					challenge.addnewpost = true;
				}
				if (challenge.currentweek == challenge.lastpostweek) {
					challenge.editpost = true;
				}
				// console.log("Post count: " + res.PostList.length);
				console.log("Current week: " + challenge.currentweek);
				// console.log("Last post week: " + challenge.lastpostweek);

				angular.forEach(res.PostList, function (value, index) {
					value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
					if (index == res.PostList.length - 1 && value["week_no"] == 1) {
						challenge.firstpostavailable = true;
					}
					// console.log(index + ': ' + JSON.stringify(value));


					var ref1 = firebase.database().ref().child('post_data').child(value.id).child('comments');
					value.comments = $firebaseArray(ref1);
					firebase.database().ref().child('post_data').child(value.id).child('likes').on('value', snapshots => {
						value.like_count = snapshots.numChildren();
					});
					firebase.database().ref().child('post_data').child(value.id).child('comments').on('value', snapshots => {
						// console.log("Snapshots : " + JSON.stringify(snapshots.val()));
						value.com_length = snapshots.numChildren();
					});
				});

				console.log("firstpostavailable: " + challenge.firstpostavailable);
				console.log("Add new post: " + challenge.addnewpost);
				console.log("Edit post: " + challenge.editpost);

				challenge.allUserPosts = res.PostList;
			} else {
				if (challenge.currentweek == 1) {
					challenge.addnewpost = true;
					challenge.firstpostavailable = true;
				}
			}
		});

		challenge.newPost = function (post) {
			// console.log(post);
			if (post.id) {
				post.post_content = post.content;
				post.filesArr = challenge.post.filesArr;
				post.privacy_type = post.post_type;
			} else {
				challengeService.fetchChallengePrivacy(function success(res) {
					if (res.privacy) {
						challenge.privacy_cat = res.privacy;
					}
				}, function error(err) {
					console.log(err);
				});
				post.privacy_type = challenge.privacy_cat;
			}
			challengeService.weekPost(post, function success(res) {
				if (res && (res.data.message == "PostAddedSuccessfully" || res.data.message == "PostUpdatedSuccessfully")) {
					if (res.data.message == "PostAddedSuccessfully") {
						notify(messageService.success.newChallengePost);
					}
					if (res.data.message == "PostUpdatedSuccessfully") {
						notify(messageService.success.updateChallengePost);
					}
				};
				$window.location.reload();
			}, function error(err) {
				$window.location.reload();
			});
			// $window.location.reload();
		};

		challenge.addFile = function ($file) {
			if ($file) {
				var croppedFile = Upload.dataUrltoBlob($file, "tc4image" + moment());
				challenge.post.filesArr.push(croppedFile);
				// challenge.myImage = '';
				// challenge.myCroppedImage = '';
				console.log(challenge.post.filesArr);
				// if(challenge.post.filesArr.length<4){

				// }
			} else {
				console.log("no file");
			}
		};

		challenge.cropImageFile = function ($file) {
			challenge.myImage = $file;
			if ($file) {
				$mdDialog.show({
					controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
						// $scope.post_pics = post_pics;
						$scope.imageFile = $file;
						$scope.hide = function () {
							$mdDialog.hide();
						};

						$scope.cancel = function () {
							$mdDialog.cancel();
						};

						$scope.answer = function (answer) {

							$mdDialog.hide(answer);
						};
					}],
					templateUrl: "/ng-tpl/challenge-crop-image-dialog",
					parent: angular.element(document.body),
					// targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
				}).then(function (answer) {
					challenge.addFile(answer);
					$scope.status = 'You said the information was "' + answer + '".';
				}, function () {
					$scope.status = 'You cancelled the dialog.';
				});
			}
			// challenge.myImage = $file;
		};

		challenge.removePics = function (file) {
			for (var f in challenge.post.filesArr) {
				if (challenge.post.filesArr[f] == file) {
					challenge.post.filesArr.splice(f, 1);
				}
			}
		};

		challenge.likeComment = function (post_id, commentObj) {
			firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id).once("value", snapshot => {
				const liked = snapshot.val();
				if (liked) {
					firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id).remove();
				} else {
					var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[4]).child('likes').child(authService.getCurrentUser().user_id);
					challenge.like = $firebaseArray(ref1);

					challenge.like.$add({
						liked_by_id: authService.getCurrentUser().user_id,
						liked_by_name: authService.getCurrentUser().name,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 1
					}).then(function (ref) {
						var ref2 = firebase.database().ref().child('notifications').child(Object.values(commentObj)[2]);
						challenge.notification = $firebaseArray(ref2);
						challenge.notification.$add({
							message: authService.getCurrentUser().name + " has liked your comment",
							post_id: post_id,
							status: 0
						}).then(function (ref) {}, function (err) {});
					}, function (err) {});
				}
			});
		};

		challenge.addCommentOnComment = function (post_id, commentObj, content) {
			// call it when you add comment under another comment
			// console.log(Object.values(commentObj));
			// console.log(Object.values(commentObj)[5]);
			// console.log(Object.values(commentObj)[6]);
			// console.log(Object.values(commentObj)[7]);
			var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.values(commentObj)[5]).child('replies');
			// // var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments').child(Object.keys(Object.values(commentObj)[5])[0]).child('replies');
			challenge.comment = $firebaseArray(ref1);
			challenge.comment.$add({
				reply_user_id: authService.getCurrentUser().user_id,
				reply_by: authService.getCurrentUser().name,
				reply_title: content,
				created_at: firebase.database.ServerValue.TIMESTAMP
			}).then(function (ref) {
				var ref2 = firebase.database().ref().child('notifications').child(Object.values(commentObj)[2]); // for notifications
				challenge.notification = $firebaseArray(ref2);
				challenge.notification.$add({
					message: authService.getCurrentUser().name + " has commented on your comment",
					post_id: post_id,
					status: 0
				}).then(function (ref) {}, function (err) {});
			}, function (err) {});
		};

		challenge.likePost = function (res_user_id, post_id) {
			console.log("Like button is clicked", post_id);
			firebase.database().ref().child("post_data").child(post_id).child("likes").child(authService.getCurrentUser().user_id).once("value", snapshot => {
				const liked = snapshot.val();
				console.log("liked", liked);
				if (liked) {
					firebase.database().ref().child('post_data').child(post_id).child('likes').child(authService.getCurrentUser().user_id).remove();
				} else {
					var ref1 = firebase.database().ref().child('post_data').child(post_id).child('likes').child(authService.getCurrentUser().user_id);
					challenge.like = $firebaseArray(ref1);
					challenge.like.$add({
						like_by: authService.getCurrentUser().name,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 1
					}).then(function (ref) {
						// // angular.forEach(challenge.allPosts, function(value, key){
						// angular.forEach(challenge.allUserPosts, function(value, key){
						// 	// console.log(value.user_id);
						// 	if(value.id == post_id){
						if (res_user_id != authService.getCurrentUser().user_id) {
							var ref2 = firebase.database().ref().child('notifications').child(value.user_id);
							challenge.notification = $firebaseArray(ref2);
							challenge.notification.$add({
								message: authService.getCurrentUser().name + " has liked on your post",
								post_id: post_id,
								image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
								created_at: firebase.database.ServerValue.TIMESTAMP,
								status: 0
							}).then(function (ref) {}, function (err) {});
						}
						// 	}
						// });		
					}, function (err) {});
				}
			});
		};

		challenge.addComment = function (res_user_id, post_id, content) {
			var ref1 = firebase.database().ref().child('post_data').child(post_id).child('comments');
			challenge.comment = $firebaseArray(ref1);

			challenge.comment.$add({
				comment_user_id: authService.getCurrentUser().user_id,
				comment_by: authService.getCurrentUser().name,
				comment_title: content,
				image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
				created_at: firebase.database.ServerValue.TIMESTAMP
			}).then(function (ref) {
				if (res_user_id != authService.getCurrentUser().user_id) {
					var ref2 = firebase.database().ref().child('notifications').child(res_user_id);
					challenge.notification = $firebaseArray(ref2);
					challenge.notification.$add({
						message: authService.getCurrentUser().name + " has commented on your post",
						post_id: post_id,
						image_url: challenge.uploadImageUrl + authService.getCurrentUser().profile_pic,
						created_at: firebase.database.ServerValue.TIMESTAMP,
						status: 0
					});
				}
			}, function (err) {});
		};

		challenge.removeLoadedPics = function (img, post_id) {
			challengeService.removePic(img.id, post_id, function success(res) {
				if (res && res.msg == "Removed image") {
					angular.forEach(challenge.allUserPosts, function (value, key) {
						if (value.id == post_id) {
							value.trans_pics = res.trans_pics;
						}
					});
				}
			}, function error(err) {
				if (err && err.errormsg) {
					// console.log(err.errormsg);
				}
			});
		};

		challenge.openImageDialog = function (ev, post_pics) {
			$mdDialog.show({
				controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
					$scope.post_pics = post_pics;
					$scope.uploadImageUrl = challenge.uploadImageUrl;
					$scope.hide = function () {
						$mdDialog.hide();
					};

					$scope.cancel = function () {
						$mdDialog.cancel();
					};

					$scope.answer = function (answer) {
						$mdDialog.hide(answer);
					};
				}],
				templateUrl: "/ng-tpl/image-dialog",
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
		};

		challenge.share = function (post) {
			FB.ui({
				method: 'feed',
				app_id: '460409420956940',
				redirect_uri: 'https://www.facebook.com/dialog/feed?app_id=460409420956940&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer',
				link: 'https://squats.in/challenge',
				hashtag: 'squats',
				caption: "Join India's biggest fitness challenge!",
				picture: challenge.uploadImageUrl + "posts/" + post.trans_pics[0],
				description: post.content

			}, function (response) {});
		};
	}]);

	squatsApp.filter('time_ago', function () {
		return function (input) {
			input = input || '';
			var out = '';
			out = moment(input).fromNow();
			return out;
		};
	});

	module.exports = squatsApp;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("ChallengeAcceptCtrl", ['$state', 'challengeService', 'notify', 'messageService', '$mdDialog', 'utilService', 'uploadImageUrl', '$window', '$timeout', function ($state, challengeService, notify, messageService, $mdDialog, utilService, uploadImageUrl, $window, $timeout) {

	  var challenge = this;
	  $timeout(function () {
	    challengeService.isChallengeAcceptedUser(function (res) {
	      if (res && res.msg == "Already assigned to you") {
	        challenge.accepted = true;
	        $state.go('public-feed');
	      }
	      if (res.msg == "INVALID_USER") {
	        $window.location.assign('app#/login');
	      }
	    });
	  }, 500);

	  challenge.takePartChallenge = function (privacy_category) {
	    $mdDialog.hide();
	    challengeService.acceptChallenge(privacy_category, function success(res) {
	      if (res && res.msg == "Assigned") {
	        $state.go('public-feed');
	      }
	    }, function error(err) {
	      if (err && err.errormsg) {
	        console.log(err.errormsg);
	      }
	    });
	  };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("journeyChallengeCtrl", ['$location', 'challengeService', 'notify', 'messageService', '$mdDialog', 'utilService', 'uploadImageUrl', '$scope', '$window', '$stateParams', function ($location, challengeService, notify, messageService, $mdDialog, utilService, uploadImageUrl, $scope, $window, $stateParams) {

	  var challenge = this;
	  challenge.uploadImageUrl = uploadImageUrl;
	  challenge.offset = 0;

	  challenge.userId = $stateParams.userId;

	  challenge.post = {};
	  challenge.post.filesArr = [];

	  if (challenge.userId) {
	    challengeService.getJourneyAllWeekPosts(challenge.userId, function (res) {
	      if (res.PostList) {
	        // console.log(challenge.allUserPosts);
	        challenge.currentweek = utilService.getCurrentWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'));
	        challenge.lastpostweek = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[0].time));

	        if (challenge.currentweek > challenge.lastpostweek) {
	          challenge.addnewpost = true;
	        }
	        if (challenge.currentweek == challenge.lastpostweek) {
	          challenge.editpost = true;
	        }
	        // console.log("Post count: " + res.PostList.length);
	        console.log("Current week: " + challenge.currentweek);
	        // console.log("Last post week: " + challenge.lastpostweek);

	        angular.forEach(res.PostList, function (value, index) {
	          value["week_no"] = utilService.getLastPostWeek(new Date('2017-10-01 00:00:00'), new Date('2017-12-23 00:00:00'), new Date(res.PostList[index].time));
	          // console.log(index + ': ' + JSON.stringify(value));
	        });

	        challenge.allUserPosts = res.PostList;
	      }
	    });
	  }

	  challenge.likePost = function (post_id) {
	    challengeService.like(post_id, function success(res) {
	      if (res && (res.msg == "Liked post" || res.msg == "Unliked post")) {
	        angular.forEach(challenge.allUserPosts, function (value, key) {
	          if (value.id == post_id) {
	            challengeService.reloadPost(post_id, function success(res) {
	              if (res && res.like_count) {
	                value.comments = res.commentList;
	                value.like_count = res.like_count;
	              }
	            }, function error(err) {
	              if (err && err.errormsg) {
	                // console.log(err.errormsg);
	              }
	            });
	          }
	        });
	      }
	    }, function error(err) {
	      if (err && err.errormsg) {
	        // console.log(err.errormsg);
	      }
	    });
	  };

	  challenge.addComment = function (post_id, content) {
	    challengeService.comment(post_id, content, function success(res) {
	      if (res && res.message == "Comment posted") {
	        angular.forEach(challenge.allUserPosts, function (value, key) {
	          if (value.id == post_id) {
	            challengeService.reloadPost(post_id, function success(res) {
	              if (res && res.commentList) {
	                value.comments = res.commentList;
	                value.like_count = res.like_count;
	              }
	            }, function error(err) {
	              if (err && err.errormsg) {
	                // console.log(err.errormsg);
	              }
	            });
	          }
	        });
	      }
	    }, function error(err) {
	      if (err && err.errormsg) {
	        // console.log(err.errormsg);
	      }
	    });
	  };

	  challenge.openImageDialog = function (ev, post_pics) {
	    $mdDialog.show({
	      controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
	        $scope.post_pics = post_pics;
	        $scope.uploadImageUrl = challenge.uploadImageUrl;
	        $scope.hide = function () {
	          $mdDialog.hide();
	        };

	        $scope.cancel = function () {
	          $mdDialog.cancel();
	        };

	        $scope.answer = function (answer) {
	          $mdDialog.hide(answer);
	        };
	      }],
	      templateUrl: "/ng-tpl/image-dialog",
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    }).then(function (answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function () {
	      $scope.status = 'You cancelled the dialog.';
	    });
	  };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('paymentService', ['$http', 'serviceBase', 'authService', function ($http, serviceBase, authService) {

	    function consultantHeaders(consultant_id) {
	        return {
	            headers: {
	                'consultantId': consultant_id
	            }
	        };
	    }

	    function guid() {
	        function s4() {
	            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	        }
	        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	    }

	    this.clientTrainerHistory = function (consultant_id, callback) {
	        $http.get(serviceBase + '/isAClientRenewal', consultantHeaders(consultant_id)).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };

	    this.trainerSlotsBooking = function (consultant_id, callback) {
	        $http.get(serviceBase + '/isSlotAvailable', consultantHeaders(consultant_id)).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };

	    this.trainerCorporateSlotsBooking = function (consultant_id, callback) {
	        $http.get(serviceBase + '/isCorporateSlotAvailable', consultantHeaders(consultant_id)).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };

	    this.do = function (amount, trainer_id, pack_id, callback) {
	        var data = {};
	        data.amount = amount;
	        data.trainer_id = trainer_id;
	        data.pack_id = pack_id;
	        $http({
	            'method': 'POST',
	            'url': serviceBase + '/fetchPaymentURL',
	            'data': data,
	            headers: {
	                'content-type': 'application/x-www-form-urlencoded'
	            }
	        }).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };

	    this.dopromocode = function (amount, trainer_id, pack_id, promocode, callback) {
	        var data = {};
	        data.amount = amount;
	        data.trainer_id = trainer_id;
	        data.pack_id = pack_id;
	        data.promocode = promocode;
	        $http({
	            'method': 'POST',
	            'url': serviceBase + '/fetchPaymentURL',
	            'data': data,
	            headers: {
	                'content-type': 'application/x-www-form-urlencoded'
	            }
	        }).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };

	    this.doEnroll = function (amount, course_id, date, successCallback, errorCallback) {
	        var data = {};
	        data.amount = amount;
	        data.course_id = course_id;
	        data.batch_date = date;
	        $http({
	            'method': 'POST',
	            'url': serviceBase + '/fetchPaymentAcademyURL',
	            'data': data,
	            headers: {
	                'content-type': 'application/x-www-form-urlencoded'
	            }
	        }).success(function (response) {
	            successCallback(response);
	        }).error(function (response) {
	            errorCallback(response);
	        });
	    };

	    this.generateChecksum = function (data, successCallback, errorCallback) {

	        $http({
	            'method': 'POST',
	            'url': '/generate_checksum',
	            'data': data
	        }).success(function (response) {
	            if (successCallback) {
	                successCallback(response);
	            }
	        }).error(function (response) {
	            if (errorCallback) {
	                errorCallback(response);
	            }
	        });
	    };

	    this.paytmPay = function (data, successCallback, errorCallback) {
	        $http({
	            'method': 'POST',
	            'url': 'https://secure.paytm.in/oltp-web/processTransaction',
	            'data': data
	        }).success(function (response) {
	            if (successCallback) {
	                successCallback(response);
	            }
	        }).error(function (response) {
	            if (errorCallback) {
	                errorCallback(response);
	            }
	        });
	    };
	}]);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('paymentCtrl', ['authService', 'localStorageService', 'trainerService', 'paymentService', '$window', 'notify', 'messageService', 'utilService', 'fullImageUrl', 'profileService', 'loginService', 'academyService', 'coachService', '$q', '$http', 'serviceBase', function (authService, localStorageService, trainerService, paymentService, $window, notify, messageService, utilService, fullImageUrl, profileService, loginService, academyService, coachService, $q, $http, serviceBase) {

	    var control = this;
	    control.details = {};
	    control.user = authService.getCurrentUser();
	    if (control.user) {
	        control.company = control.user.company;
	        control.company_email = control.user.company_email;
	    }
	    control.imageUrl = fullImageUrl;
	    control.selectedIndex = 0;
	    control.selectedCartScreen = 0;
	    control.view = false;
	    control.viewCheckout = false;

	    control.type = utilService.getParameterByName('t');
	    control.pId = utilService.getParameterByName('p');
	    /*
	     *  if type is coach, cId is consultantId
	     *  if type is course, cId is courseId
	     */
	    control.cId = utilService.getParameterByName('c');

	    control.applyPromocode = function (promocode) {
	        if (promocode == "TECHM10" || promocode == "techm10" || promocode == "Techm10") {
	            control.details.prevfees = control.details.fees;
	            control.details.fees = control.details.fees * 0.9;
	            control.couponOK = true;
	            control.couponNotOK = false;
	        } else if ((promocode == "INFGETFIT" || promocode == "infgetfit" || promocode == "Infgetfit") && control.user.company == "Infosys") {
	            control.details.prevfees = control.details.fees;
	            control.details.fees = 4500;
	            control.couponOK = true;
	            control.couponNotOK = false;
	        } else {
	            control.couponNotOK = true;
	            control.couponOK = false;
	        }
	    };

	    control.isRenewal = function () {
	        return utilService.getParameterByName('step') == "renewal";
	    };
	    control.isAuth = authService.isAuth;
	    if (control.type) {
	        switch (control.type) {
	            case "coach":
	                if (!control.cId) {
	                    return;
	                }
	                if (!control.pId) {
	                    control.enrolPackageScr = true;
	                } else {
	                    control.selectedIndex = 1;
	                }
	                control.view = true;
	                trainer(control.cId, control.pId);
	                break;
	            case "course":
	                if (!control.cId && !control.pId) {
	                    return;
	                }
	                control.selectedIndex = 1;
	                control.view = true;
	                course(control.cId, control.pId);
	                break;
	            default:
	                control.view = false;
	        }
	    }

	    control.summaryScr = function (id) {
	        if (id) {
	            control.pId = id;
	        }
	        control.selectedIndex = 1;control.enrolPackageScr = false;
	        console.log("control.pId-->", control.pId);
	        console.log("control.pId-->", control.pId);
	        trainer(control.cId, control.pId);
	    };
	    control.setPackage = function (id) {
	        control.pId = id;
	    };

	    function trainer(consultantId, packageId) {
	        if (control.user && control.user.company && control.user.company != "" && control.user.company_verified == 1) {
	            trainerService.getTrainerCorporateDetails(consultantId, function (res) {
	                console.log("Response of trainerdetails in payment controller", res);
	                if (res.trainer_details) {
	                    var details = res.trainer_details[0];
	                    if (!packageId) {
	                        control.pId = details.PackageArr[0].service_id;
	                    }

	                    control.details.name = details.name;
	                    control.details.profile_pic = details.profile_pic;

	                    if (details && details.PackageArr) {
	                        angular.forEach(details.PackageArr, function (elem) {
	                            if (control.pId == elem.service_id) {
	                                control.details.packId = elem.service_id;
	                                control.details.fees = elem.pack_price;
	                                control.details.description = elem.pack_des;
	                                control.details.cId = elem.user_id;
	                                control.details.caption = elem.service_caption;
	                                control.details.corporate_flag = elem.corporate_flag;
	                            }
	                        });
	                    }
	                }
	            });
	        } else {

	            trainerService.getTrainerDetails(consultantId, function (res) {
	                if (res.trainer_details) {
	                    var details = res.trainer_details[0];
	                    if (!packageId) {
	                        control.pId = details.PackageArr[0].service_id;
	                    }

	                    control.details.name = details.name;
	                    control.details.profile_pic = details.profile_pic;

	                    if (details && details.PackageArr) {
	                        angular.forEach(details.PackageArr, function (elem) {
	                            if (control.pId == elem.service_id) {
	                                control.details.packId = elem.service_id;
	                                control.details.fees = elem.pack_price;
	                                control.details.description = elem.pack_des;
	                                control.details.cId = elem.user_id;
	                                control.details.caption = elem.service_caption;
	                                control.details.corporate_flag = elem.corporate_flag;
	                            }
	                        });
	                    }
	                }
	            });
	        }
	    }

	    function course(courseId, date) {
	        academyService.getCourse(function (res) {
	            control.academyData = res;
	            if (control.academyData) {
	                angular.forEach(control.academyData, function (elem) {
	                    if (control.cId == elem.course_id) {
	                        control.details.name = elem.course_nm;
	                        control.details.fees = elem.course_price;
	                        control.details.description = elem.course_desc;
	                        control.details.packId = control.pId;
	                        control.details.cId = control.cId;
	                    }
	                });
	            }
	        });
	    }

	    control.goNext = function () {
	        control.viewCheckout = true;
	        if (authService.isAuth()) {
	            if (control.user.tel && control.user.tel != "" && control.user.house_no && control.user.house_no != "" && control.user.street && control.user.street != "" && control.user.city && control.user.city != "" && control.user.state && control.user.state != "" && control.user.country && control.user.country != "" && control.user.pincode && control.user.city != "" && control.user.sex && control.user.sex != "") {
	                control.selectedIndex += 1;
	            } else {
	                control.requireUserProfile = true;
	                control.selectedIndex += 1;
	            }
	        } else {
	            control.selectedIndex += 1;
	        }
	    };

	    control.pay = function () {
	        switch (control.type) {
	            case "coach":
	                if (!control.isRenewal()) {
	                    getCoach();
	                    break;
	                }
	                control.do(control.details.fees, control.details.cId, control.details.packId, control.details.corporate_flag);
	                break;
	            case "course":
	                if (authService.getCurrentUser().userCourseList) {
	                    notify(messageService.error.enrolled);
	                    break;
	                }
	                control.doEnroll(control.details.fees, control.details.cId, control.details.packId);
	                break;
	        }
	    };

	    control.do = function (amount, trainer_id, pack_id, corporate_flag) {
	        control.user = authService.getCurrentUser();
	        if (!control.user) {
	            notify(messageService.required.login);
	            return;
	        } else if (!control.user.tel) {
	            notify(messageService.required.profile);
	            return;
	        }
	        if (control.isRenewal()) {
	            if (control.user && control.user.company_verified == 1 && corporate_flag == 0) {
	                $window.location.href = "https://squats.in/pricing/coaches";
	            } else if (control.user && control.user.company_verified == 1 && corporate_flag == 1) {
	                if (control.user.wincat) {
	                    paymentService.clientTrainerHistory(trainer_id, function (res) {
	                        if (res.consultant_history && res.consultant_history.trainer_name) {
	                            paymentService.do(amount, trainer_id, pack_id, function (res) {
	                                if (res && res.status) {
	                                    switch (res.status) {
	                                        case "OK":
	                                            $window.location.href = res.paymentLink;
	                                    }
	                                }
	                            });
	                        } else {
	                            notify(messageService.error.renewalConsultant);
	                            return;
	                        }
	                    });
	                } else {
	                    notify(messageService.error.takewinassessment);
	                    return;
	                }
	            } else {
	                paymentService.clientTrainerHistory(trainer_id, function (res) {
	                    if (res.consultant_history && res.consultant_history.trainer_name) {
	                        paymentService.do(amount, trainer_id, pack_id, function (res) {
	                            if (res && res.status) {
	                                switch (res.status) {
	                                    case "OK":
	                                        $window.location.href = res.paymentLink;
	                                }
	                            }
	                        });
	                    } else {
	                        notify(messageService.error.renewalConsultant);
	                        return;
	                    }
	                });
	            }
	        } else {
	            if (control.user && control.user.company_verified == 1 && corporate_flag == 0) {
	                $window.location.href = "https://squats.in/pricing/coaches";
	            } else if (control.user && control.user.company_verified == 1 && corporate_flag == 1) {
	                // notify(messageService.success.bookCorporatePackageCheckout);
	                if (control.user.wincat) {
	                    paymentService.trainerCorporateSlotsBooking(trainer_id, function (res) {
	                        if (res.message == "Available") {
	                            if (control.promocode && control.couponOK) {
	                                // control.updateProfile();
	                                paymentService.dopromocode(amount, trainer_id, pack_id, control.promocode, function (res) {
	                                    if (res && res.status) {
	                                        switch (res.status) {
	                                            case "OK":
	                                                $window.location.href = res.paymentLink;
	                                        }
	                                    }
	                                });
	                            } else {
	                                paymentService.do(amount, trainer_id, pack_id, function (res) {
	                                    if (res && res.status) {
	                                        switch (res.status) {
	                                            case "OK":
	                                                $window.location.href = res.paymentLink;
	                                        }
	                                    }
	                                });
	                            }
	                        } else {
	                            notify(messageService.error.slotsFull);
	                            return;
	                        }
	                    });
	                } else {
	                    notify(messageService.error.takewinassessment);
	                    return;
	                }
	            } else if (control.user && control.user.company_verified == 0 && corporate_flag == 1) {
	                $window.location.href = "https://squats.in/pricing/coaches";
	            } else {
	                paymentService.trainerSlotsBooking(trainer_id, function (res) {
	                    if (res.message == "Available") {
	                        paymentService.do(amount, trainer_id, pack_id, function (res) {
	                            if (res && res.status) {
	                                switch (res.status) {
	                                    case "OK":
	                                        $window.location.href = res.paymentLink;
	                                }
	                            }
	                        });
	                    } else {
	                        notify(messageService.error.slotsFull);
	                        return;
	                    }
	                });
	            }
	        }
	    };

	    control.updateProfile = function () {
	        control.user.tel = control.mobile;
	        control.user.sex = control.sex;
	        control.user.house_no = control.house_no;
	        control.user.street = control.street;
	        control.user.city = control.city;
	        control.user.country = control.country;
	        control.user.pincode = control.pincode;
	        // control.user.company = control.company;
	        // control.user.company_email = control.company_email;

	        profileService.update({ tel: control.mobile, sex: control.sex, house_no: control.house_no, street: control.street, city: control.city, state: control.state, country: control.country, pincode: control.pincode }, function (response) {
	            if (response.message == 'UserProfileUpdateSuccess') {
	                profileService.getAutoToken(function (success) {
	                    control.user = authService.getCurrentUser();
	                    notify(messageService.success.profileUpdate);
	                    control.do(control.details.fees, control.details.cId, control.details.packId, control.details.corporate_flag);
	                }, function (error) {
	                    notify(messageService.error.profileUpdate);
	                    console.error(error);
	                });
	            } else {
	                notify(messageService.error.profileUpdate);
	            }
	        }, function (error) {
	            notify(messageService.error.profileUpdate);
	        });
	    };

	    control.doEnroll = function (amount, course_id, date) {
	        if (!control.user) {
	            notify(messageService.required.login);
	            return;
	        } else if (!control.user.tel) {
	            notify(messageService.required.profile);
	            return;
	        }

	        paymentService.doEnroll(amount, course_id, date, function (res) {
	            if (res && res.status) {
	                switch (res.status) {
	                    case "OK":
	                        $window.location.href = res.paymentLink;
	                }
	            }
	        }, function (error) {
	            if (error.errormessage == "BATCH_NOT_EXISTS") {
	                notify(messageService.error.batch);
	            }
	        });
	    };

	    control.loginInfo = {};
	    control.login = function () {
	        control.loginInfo.type = "client";
	        loginService.login(control.loginInfo.email, control.loginInfo.password, control.loginInfo.type, function (response) {
	            if (response.token) {
	                authService.setToken(response.token);
	                var defer = $q.defer();
	                var promises = [];
	                var headers = {
	                    'X-Auth-Token': response.token
	                };
	                promises.push($http.get(serviceBase + '/profile', { "headers": headers }));
	                promises.push($http.get(serviceBase + '/clientTransactionDetails', { "headers": headers }));

	                $q.all(promises).then(function (response) {

	                    control.user = authService.setCurrentUser(response[0].data);
	                    if (response[1].data && response[1].data.transactionData) {
	                        authService.setTransactionDetails(response[1].data.transactionData);
	                    }
	                    notify(messageService.success.login);
	                    if (response[0].data && response[0].data.tel && response[0].data != "") {
	                        setTimeout(function () {
	                            control.selectedIndex = 2;
	                        }, 100);
	                    } else {
	                        control.requireUserProfile = true;
	                        control.selectedIndex = 2;
	                    }
	                });
	            } else {
	                switch (response.errormessage) {
	                    case "CREDENTIAL_MISMATCHED":
	                        notify(messageService.error.login);
	                        break;

	                    case "ACCOUNT_NOT_AUTHENTICATED":
	                        notify(messageService.error.activeateAccount);
	                        break;
	                }
	            }
	        });
	    };

	    function getCoach() {
	        coachService.getCoachDetails(function (response) {
	            if (response && response.packageId) {
	                notify(messageService.error.coachExist);
	            } else {
	                control.do(control.details.fees, control.details.cId, control.details.packId, control.details.corporate_flag);
	            }
	        });
	    }
	}]);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;
	squatsApp.controller('paymentResultCtrl', ['utilService', '$sce', function (utilService, $sce) {
	    var control = this;

	    var message = utilService.getParameterByName('msg');
	    var status = utilService.getParameterByName('status');
	    if (message) {
	        control.message = $sce.trustAsHtml(message);
	    }
	    if (status) {
	        control.status = status;
	    }
	}]);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('profileService', ['$http', 'serviceBase', 'authService', function ($http, serviceBase, authService) {
	  this.get = function (token, callback) {
	    $http({
	      'method': 'GET',
	      'url': serviceBase + '/profile',
	      'headers': {
	        'X-Auth-Token': token
	      }
	    }).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };
	  this.getAutoToken = function (successCallback, errorCallback) {
	    $http({
	      'method': 'GET',
	      'url': serviceBase + '/profile'
	    }).success(function (response) {
	      authService.setCurrentUser(response);
	      if (successCallback) {
	        successCallback(response);
	      }
	    }).error(function (response) {
	      if (errorCallback) {
	        errorCallback(response);
	      }
	    });
	  };

	  this.update = function (data, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/profile',
	      'data': data
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.verifyCompanyEmail = function (data, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/verifyCompanyEmail',
	      'data': data
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.changePassword = function (newPassword, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/changePassword',
	      'data': { 'newPasswd': newPassword }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.removeReport = function (reportId, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/removeMedicalCertificates',
	      'data': { 'id': reportId }
	    }).success(function (response) {
	      if (successCallback) {
	        successCallback(response);
	      }
	    }).error(function (response) {
	      if (errorCallback) {
	        errorCallback(response);
	      }
	    });
	  };

	  this.transDetails = function (successCallback, errorCallback) {
	    $http({
	      'method': 'GET',
	      'url': serviceBase + '/clientTransactionDetails'
	    }).success(function (response) {
	      if (successCallback) {
	        successCallback(response);
	      }
	    }).error(function (response) {
	      if (errorCallback) {
	        errorCallback(response);
	      }
	    });
	  };

	  this.transDetailsAutoToken = function (token, successCallback, errorCallback) {
	    var params = {
	      'method': 'GET',
	      'url': serviceBase + '/clientTransactionDetails'
	    };
	    if (token) {
	      params.headers = {
	        'X-Auth-Token': token
	      };
	    }
	    $http(params).success(function (response) {
	      if (successCallback) {
	        successCallback(response);
	      }
	    }).error(function (response) {
	      if (errorCallback) {
	        errorCallback(response);
	      }
	    });
	  };

	  this.uploadProgress = function (formdata, successCallback, errorCallback) {
	    var request = {
	      method: 'POST',
	      url: serviceBase + '/uploadCertificates',
	      data: formdata,
	      headers: {
	        'Content-Type': undefined
	      }
	    };

	    // SEND THE FILES.
	    $http(request).success(function (resp) {
	      successCallback(resp);
	    }).error(function (error) {
	      errorCallback(error);
	    });
	  };

	  this.uploadProfilePic = function (formdata, successCallback, errorCallback) {
	    var request = {
	      method: 'POST',
	      url: serviceBase + '/uploadProfilePicClient',
	      data: formdata,
	      headers: {
	        'Content-Type': undefined
	      }
	    };

	    // SEND THE FILES.
	    $http(request).success(function (resp) {
	      successCallback(resp);
	    }).error(function (error) {
	      errorCallback(error);
	    });
	  };
	}]);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.controller('profileCtrl', ['authService', 'profileService', 'progressService', 'serviceBase', 'Upload', 'trainingImageUrl', 'thumbImageUrl', 'notify', 'messageService', '$mdDialog', 'utilService', 'uploadImageUrl', '$state', '$timeout', function (authService, profileService, progressService, serviceBase, Upload, trainingImageUrl, thumbImageUrl, notify, messageService, $mdDialog, utilService, uploadImageUrl, $state, $timeout) {
	  var user = this;
	  user.profile = authService.getCurrentUser();
	  // console.log(user.profile);
	  user.selectedIndex = 0;
	  user.progress = {};
	  user.entries = [];
	  user.trainingImageUrl = trainingImageUrl;
	  user.imageUrl = uploadImageUrl;
	  user.thumbImageUrl = thumbImageUrl;
	  user.enabledUpload = false;
	  user.settings = {};
	  user.passwdForm = {};

	  var formdata = new FormData();

	  // var tabs = {
	  //   name: { key: 'name', title: 'name', contentTitle: "What is your name?", type: "text" },
	  //   tel: { key: 'tel', title: 'tel', contentTitle: "What is your contact number", type: "text" },
	  //   height_ft: { key: 'height_ft', title: 'height', contentTitle: "What is your height", type: "text" },
	  //   sex: { key: 'sex', title: 'sex', contentTitle: "What is your gender?", type: "text" },
	  //   diet_type: { key: 'diet_type', title: 'diet type', contentTitle: "What is your diet type?", type: "text" },
	  //   weight: { key: 'weight', title: 'weight', contentTitle: "What is your weight (kg)", type: "text" },
	  //   goal: { key: 'goal', title: 'goal', contentTitle: "what is your goal?", type: "text" },
	  //   details: { key: 'details', title: 'Medical History', contentTitle: "Have you had any past illness?", type: "text" },
	  //   house_no: { key: 'house_no', title: 'House no./Flat no.', contentTitle: "House no./Flat no.?", type: "text" },
	  //   street: { key: 'street', title: 'Street address', contentTitle: "Street address/Society name?", type: "text" },
	  //   city: { key: 'city', title: 'city', contentTitle: "In which city do you live?", type: "text" },         
	  //   country: { key: 'country', title: 'country', contentTitle: "Your country?", type: "text" },
	  //   pincode: { key: 'pincode', title: 'pincode', contentTitle: "What is your pincode?", type: "text" },
	  //   certificates: { key: 'certificates', title: 'Medical Report', contentTitle: "Upload Report", type: "text" },
	  //   age: { key: 'age', title: 'age', contentTitle: 'What is your age?' },
	  //   company_email: { key: 'company_email', title: 'company email', contentTitle: 'What is your company email id?'}
	  // };

	  progressService.get(function (res) {
	    user.progress = res;
	  });

	  var processTabs = function () {
	    var tabs = utilService.profileTabsCalculator(user.profile);
	    if (user.profile.activate_corporate_profile == 1) {
	      tabs = utilService.profileTabsCorporateCalculator(user.profile);
	    } else {
	      tabs = utilService.profileTabsCalculator(user.profile);
	    }
	    user.entries = tabs.entries;
	    user.activeTab = user.entries[user.selectedIndex];
	    user.percent = tabs.percent;
	    if (user.percent == 100) {
	      user.subHeader = "Congratulation, your profile is complete !!";
	    } else {
	      user.subHeader = "Complete your profile now";
	    }
	  };

	  processTabs();

	  user.checkValidation = function (form, tab) {

	    if (tab) {
	      if (tab.key == "height_ft") {
	        return form["height_ft"].$invalid || form["height_in"].$invalid;
	      } else if (form[tab.key]) {
	        return form[tab.key].$invalid;
	      }
	    }
	    return false;
	  };
	  user.updateProfile = function (form) {
	    if (user.enabledUpload) {
	      notify(messageService.progress.uploadPic);
	      profileService.uploadProgress(formdata, uploadSuccess, uploadError);
	      return;
	    }
	    var localUser = {
	      company: user.profile.company,
	      company_email: user.profile.company_email,
	      sex: user.profile.sex,
	      age: user.profile.age,
	      city: user.profile.city,
	      house_no: user.profile.house_no,
	      street: user.profile.street,
	      state: user.profile.state,
	      country: user.profile.country,
	      pincode: user.profile.pincode,
	      tel: user.profile.tel,
	      height_ft: user.profile.height_ft,
	      height_in: user.profile.height_in,
	      weight: user.profile.weight,
	      goal: user.profile.goal,
	      diet_type: user.profile.diet_type,
	      details: user.profile.details,
	      email: user.profile.email,
	      name: user.profile.name,
	      activate_corporate_profile: user.profile.activate_corporate_profile,
	      company_verified: user.profile.company_verified,
	      gstin: user.profile.gstin
	    };

	    if (user.profile.company_email && user.profile.company_email) {
	      if (user.profile.company_email.indexOf("@squats") != -1) {
	        localUser.company = "Infosys";
	        callUpdate(localUser);
	      } else if (user.profile.company_email.indexOf("@infosys") != -1) {
	        localUser.company = "Infosys";
	        callUpdate(localUser);
	      } else if (user.profile.company_email.indexOf("@techmahindra") != -1) {
	        localUser.company = "Tech Mahindra";
	        callUpdate(localUser);
	      } else {
	        localUser.company = "";
	        localUser.company_email = "";
	        localUser.company_verified = 0;
	        localUser.activate_corporate_profile = 0;
	        notify(messageService.error.companyNotAvailable);
	        callUpdate(localUser);
	      }
	    } else {
	      callUpdate(localUser);
	    }
	  };

	  function callUpdate(localUser) {
	    profileService.update(localUser, function (response) {
	      if (response.message == 'UserProfileUpdateSuccess') {
	        profileService.getAutoToken(function (success) {
	          user.profile = authService.getCurrentUser();
	          if (user.profile.company && user.profile.company_email && user.profile.activate_corporate_profile && !user.profile.company_verified) {
	            $timeout(function () {
	              notify(messageService.success.companyEmailVerifySent);
	              $state.go('app.dashboard');
	            }, 1000);
	          } else {
	            notify(messageService.success.profileUpdate);
	          }
	        }, function (error) {
	          notify(messageService.error.profileUpdate);
	          console.error(error);
	        });

	        user.allowEdit = false;
	        processTabs();
	        if (form) {
	          user.activeTab = user.entries[user.selectedIndex];
	          user.checkValidation(form, user.entries[user.selectedIndex]);
	        }
	      } else if (response && response.indexOf("Duplicate entry") > 0 && response.indexOf("key 'email'") > 0) {
	        notify(messageService.error.emailExist);
	      } else {
	        notify(messageService.error.profileUpdate);
	      }
	    }, function (error) {
	      notify(messageService.error.profileUpdate);
	    });
	  }

	  user.changePassword = function () {
	    profileService.changePassword(user.passwdForm.newPassword, function (response) {
	      notify(messageService.success.changePassword);
	    }, function (err) {
	      notify(messageService.error.changePassword);
	    });
	  };

	  user.removeReport = function (reportId) {
	    profileService.removeReport(reportId, function (res) {
	      if (res && res.msg) {
	        notify(messageService.success.removeReport);

	        profileService.getAutoToken(function (success) {
	          user.profile = authService.getCurrentUser();
	          processTabs();
	        }, function (error) {
	          console.error(error);
	        });
	      }
	    }, function (error) {
	      if (error && error.errormessage == "NO_DATA") {
	        notify(messageService.success.removeReport);
	      }
	    });
	  };

	  var uploadSuccess = function (response) {
	    notify(messageService.success.uploadCertificate);
	    profileService.getAutoToken(function (success) {
	      user.profile = authService.getCurrentUser();
	      processTabs();
	    }, function (error) {
	      console.error(error);
	    });
	  };

	  var uploadError = function (err) {
	    console.error(err);
	  };

	  var uploadEvent = function (evt) {
	    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	  };

	  user.getTheFiles = function ($files) {
	    user.enabledUpload = true;
	    angular.forEach($files, function (value, key) {
	      formdata.append('certificates[]', value);
	    });
	    user.updateProfile();
	  };

	  profileService.transDetails(function (res) {
	    if (res && res.transactionData) {
	      user.transactionData = res.transactionData;
	    }
	  });

	  /*Download invoice popup */
	  user.viewInvoice = function (fileUrl) {
	    user.invoiceUrl = fileUrl;
	    $mdDialog.show({
	      controller: ["user", "$mdDialog", function (user, $mdDialog) {
	        user.hide = function () {
	          $mdDialog.hide();
	        };

	        user.cancel = function () {
	          $mdDialog.cancel();
	        };

	        user.answer = function (answer) {
	          $mdDialog.hide(answer);
	        };
	      }],
	      contentElement: '#invoice',
	      parent: angular.element(document.body),
	      clickOutsideToClose: true,
	      fullscreen: user.customFullscreen // Only for -xs, -sm breakpoints. 
	    });
	  };
	}]);

	module.exports = squatsUser;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('app.profile', {
	    url: '/profile',
	    controller: 'profileCtrl',
	    controllerAs: 'user',
	    templateUrl: '/ng-tpl/profile'
	  }).state('app.profileSummary', {
	    url: '/profile/summary',
	    controller: 'profileCtrl',
	    controllerAs: 'user',
	    templateUrl: '/ng-tpl/profile-summary'
	  }).state('app.settings', {
	    url: '/settings',
	    controller: 'profileCtrl',
	    controllerAs: 'user',
	    templateUrl: '/ng-tpl/account-settings'
	  });
	}]);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('trainerService', ['$http', 'serviceBase', function ($http, serviceBase) {
	  this.getTrainerList = function (offset, callback) {
	    $http.get(serviceBase + '/searchtrainers/' + offset).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.getTrainerDetails = function (id, callback) {
	    $http.get(serviceBase + '/trainerdetails/' + id).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.getTrainerCorporateDetails = function (id, callback) {
	    $http.get(serviceBase + '/trainercorporatedetails/' + id).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.searchTrainer = function (filter, successCallback, errorCallBack) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/search-trainer',
	      'data': filter
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallBack(response);
	    });
	  };

	  this.searchTrainerCorporate = function (filter, successCallback, errorCallBack) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/search-trainer-corporate',
	      'data': filter
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallBack(response);
	    });
	  };
	}]);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('trainerCtrl', ['authService', 'trainerService', '$window', '$mdMedia', 'fullImageUrl', 'thumbImageUrl', 'utilService', 'profileService', function (authService, trainerService, $window, $mdMedia, fullImageUrl, thumbImageUrl, utilService, profileService) {
	  var trainerControl = this;

	  // if(trainerControl.user && trainerControl.user.company_verified==1){
	  //   $window.location.href = '/app';
	  // }

	  trainerControl.screenIslarge = $mdMedia('gt-sm');
	  trainerControl.fullImageUrl = fullImageUrl;
	  trainerControl.thumbImageUrl = thumbImageUrl;

	  trainerControl.offset = 0;

	  trainerControl.query = {
	    limit: 9,
	    page: 1
	  };

	  var query = utilService.getParameterByName('q');

	  //experts API
	  trainerControl.categories = [{ value: "Bodybuilding", label: "Body Building" }, { value: "Sports Nutrition", label: "Sports Nutrition" }, { value: "Fat-Loss", label: "Fat-Loss" }, { value: "General well being", label: "General well being" }, { value: "Strength and conditioning", label: "Strength and conditioning" }, { value: "Makeover", label: "Makeover" }, { value: "Transformation", label: "Transformation" }, { value: "Post pregnancy weight loss", label: "Post pregnancy weight loss" }, { value: "Diabetes Reversal", label: "Diabetes Reversal" }, { value: "Specialized packages", label: "Specialized packages" }];

	  trainerControl.resetFilters = function () {
	    trainerControl.fixedfilters = {};
	    trainerControl.partialfilters = { name: query || '' };
	    //trainerControl.categoryfilters = ["Fat-Loss","General well being","Transformation"];
	    trainerControl.categoryfilters = [];
	    // trainerControl.pricingfilters = {min:1,max:50000};
	  };
	  trainerControl.resetFilters();

	  trainerControl.categoryFilterFn = function (row) {
	    if (trainerControl.categoryfilters.length < 1) {
	      return true;
	    }
	    var bool = false;
	    var rowCategories = row.area_exp.split(',');
	    angular.forEach(trainerControl.categoryfilters, function (val) {
	      bool = bool || rowCategories.indexOf(val) !== -1;
	    });
	    return bool;
	  };
	  // trainerControl.pricingFilterFn = function(row){
	  //   if((!trainerControl.pricingfilters.min || trainerControl.pricingfilters.min=='') && (!trainerControl.pricingfilters.max || trainerControl.pricingfilters.max=='')){
	  //     return true
	  //   }
	  //   trainerControl.pricingfilters.min = trainerControl.pricingfilters.min || 0;
	  //   var bool = false;
	  //   angular.forEach(row.plans,function (val) {
	  //     bool = bool || (val.pack_price >= trainerControl.pricingfilters.min && (trainerControl.pricingfilters.max ? val.pack_price <= trainerControl.pricingfilters.max : true));
	  //   });
	  //   return bool
	  // };

	  trainerControl.toggleCategoryFilter = function (category) {
	    var idx = trainerControl.categoryfilters.indexOf(category);

	    // Is currently selected
	    if (idx > -1) {
	      trainerControl.categoryfilters.splice(idx, 1);
	    }

	    // Is newly selected
	    else {
	        trainerControl.categoryfilters.push(category);
	      }
	  };

	  trainerControl.getExperts = function () {
	    //var rCount = ((trainerControl.query.page - 1) * 9)
	    var noncertified = 0;
	    if (trainerControl.user && trainerControl.user.company && trainerControl.user.company != "" && trainerControl.user.company_verified == 1) {
	      trainerService.searchTrainerCorporate({}, function (res) {
	        trainerControl.experts = res.TrainerList[0];
	        trainerControl.experts.forEach(function (element) {
	          if (element.certificate_flag == 'Yes') {
	            element.is_certified = '1';
	          } else {
	            element.is_certified = '0';
	          }
	          if (element.total_slots != element.booked_slots) {
	            element.slots_available = '1';
	          } else {
	            element.slots_available = '0';
	          }
	          if (element.avg_rating) {
	            element.avg_rating = Math.round(element.avg_rating);
	            if (element.avg_rating > 5) {
	              element.avg_rating = 5;
	            }
	          }
	          if (element.img_name) {
	            element.img_name = thumbImageUrl + element.img_name;
	          }
	        });
	      }, function errorCallBack(res) {});
	    } else {
	      trainerService.searchTrainer({}, function (res) {
	        trainerControl.experts = res.TrainerList[0];
	        trainerControl.experts.forEach(function (element) {
	          if (element.certificate_flag == 'Yes') {
	            element.is_certified = '1';
	          } else {
	            element.is_certified = '0';
	          }
	          if (element.total_slots != element.booked_slots) {
	            element.slots_available = '1';
	          } else {
	            element.slots_available = '0';
	          }
	          if (element.avg_rating) {
	            element.avg_rating = Math.round(element.avg_rating);
	            if (element.avg_rating > 5) {
	              element.avg_rating = 5;
	            }
	          }
	          if (element.img_name) {
	            element.img_name = thumbImageUrl + element.img_name;
	          }
	        });
	      }, function errorCallBack(res) {});
	    }
	  };
	  profileService.getAutoToken(function (success) {
	    trainerControl.user = authService.getCurrentUser();
	    trainerControl.getExperts();
	  }, function (error) {
	    trainerControl.getExperts();
	    console.error(error);
	  });

	  trainerControl.calculateSlots = utilService.getAvailableSlotPercent;
	}]);

	module.exports = squatsApp;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('trainerDetailCtrl', ['authService', 'trainerService', '$window', 'fullImageUrl', 'nutritionFiles', 'thumbImageUrl', 'uploadImageUrl', 'utilService', function (authService, trainerService, $window, fullImageUrl, nutritionFiles, thumbImageUrl, uploadImageUrl, utilService) {
	  var trainerDetail = this;
	  trainerDetail.fullImageUrl = fullImageUrl;
	  trainerDetail.nutritionFiles = nutritionFiles;
	  trainerDetail.thumbImageUrl = thumbImageUrl;
	  trainerDetail.uploadImageUrl = uploadImageUrl;

	  trainerDetail.user = authService.getCurrentUser();

	  trainerDetail.get = function (id) {
	    if (trainerDetail.user && trainerDetail.user.company && trainerDetail.user.company != "" && trainerDetail.user.company_verified == 1) {
	      trainerService.getTrainerCorporateDetails(id, function (res) {
	        console.log("response in trainer details", res);
	        if (res.trainer_details) {
	          var details = res.trainer_details[0];
	          if (details.transFormPics) {
	            details.transFormPics.forEach(function (element) {
	              element.pic_name = element.pic_name ? trainerDetail.nutritionFiles + element.pic_name : '/images/no_image.png';
	            });
	          }
	          trainerDetail.details = details;
	        }
	      });
	    } else {
	      trainerService.getTrainerDetails(id, function (res) {
	        if (res.trainer_details) {
	          var details = res.trainer_details[0];
	          if (details.transFormPics) {
	            details.transFormPics.forEach(function (element) {
	              element.pic_name = element.pic_name ? trainerDetail.nutritionFiles + element.pic_name : '/images/no_image.png';
	            });
	          }
	          trainerDetail.details = details;
	        }
	      });
	    }
	  };

	  trainerDetail.id = $window.location.pathname.split('/').slice(-1)[0];
	  if (trainerDetail.id) {
	    if (trainerDetail.id == "checkout") {
	      trainerDetail.id = utilService.getParameterByName("c");
	    }
	    trainerDetail.get(trainerDetail.id);
	  }

	  trainerDetail.packageId = 0;
	  trainerDetail.setPackage = function (id) {
	    trainerDetail.packageId = id;
	  };

	  trainerDetail.showPackage = function (id) {
	    return trainerDetail.packageId == id;
	  };

	  trainerDetail.navigate = function (consultantId, packageId) {
	    $window.location = "/checkout" + "?t=coach" + "&p=" + packageId + "&c=" + consultantId;
	  };

	  trainerDetail.calculateSlots = utilService.getAvailableSlotPercent;
	}]);

	module.exports = squatsApp;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('toolsService', ['$http', 'serviceBase', function ($http, serviceBase) {

	  this.save = function (data, successCallback, errorCallBack) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/updateClientStatistics',
	      'data': data
	    }).success(function (response) {
	      if (successCallback) {
	        successCallback(response);
	      }
	    }).error(function (response) {
	      if (errorCallBack) {
	        errorCallBack(response);
	      }
	    });
	  };
	}]);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("toolsCtrl", ['authService', 'utilService', 'toolsService', 'profileService', 'crmService', function (authService, utilService, toolsService, profileService, crmService) {

	    var tools = this;

	    tools.isAuth = authService.isAuth;

	    // default screen
	    tools.screen = "bmr";
	    tools.selectedIndex = 0;

	    // default tools values
	    tools.bmr = {
	        "weightParam": "kgs",
	        "heightParam": "cms"
	    };
	    tools.bodyFat = {
	        "weightParam": "kgs"
	    };
	    tools.macro = {};
	    tools.macroPreset = { "carb": 0, 'protein': 0, 'fat': 0 };

	    tools.profile = authService.getCurrentUser();
	    tools.updateProfile = function () {
	        profileService.getAutoToken(function (res) {
	            tools.profile = res;
	        });
	    };

	    if (tools.profile && tools.profile.extraStatistics[0]) {
	        var data = tools.profile.extraStatistics[0];
	        tools.bmr.activity = data.exerciseLevel;
	        tools.teeResult = data.calories;
	        tools.bmr.fpercent = data.fat;
	        tools.bodyFat.waist = data.waist;
	        tools.bodyFat.wrist = data.wrist;
	        tools.bodyFat.hip = data.hip;
	        tools.bodyFat.forearm = data.forearm;
	    }

	    if (tools.profile) {
	        tools.gender = tools.profile.sex;
	        tools.bmr.age = tools.profile.age;
	        tools.bmr.weight = tools.profile.weight;
	        tools.bmr.height = utilService.toCentimeter(tools.profile.height_ft, tools.profile.height_in);
	        tools.bmr.heightFt = tools.profile.height_ft;
	        tools.bmr.heightIn = tools.profile.height_in;
	        tools.bodyFat.weight = tools.profile.weight;
	    }

	    tools.saveLead = function () {
	        var leadDetails = [];
	        if (tools.fitness) {
	            leadDetails['email'] = tools.fitness.email;
	            leadDetails['lastname'] = tools.fitness.name;
	            switch (tools.fitness.goal) {
	                case "lean_gain":
	                    leadDetails['goal'] = "Gain lean muscle";
	                    break;
	                case "lose_fat":
	                    leadDetails['goal'] = "Lose fat";
	                    break;
	                case "ectomorph_muscle_building":
	                    leadDetails['goal'] = "Gain maximum muscle";
	                    break;
	                case "maintenance":
	                    leadDetails['goal'] = "Maintenance";
	                    break;
	            }
	            if (leadDetails['email'] && leadDetails['lastname']) {
	                crmService.saveLead(leadDetails, function (res) {
	                    // console.log(res);
	                });
	            }
	        }
	    };

	    tools.setScreen = function (screen) {
	        tools.screen = screen;
	    };
	    tools.viewScreen = function (screen) {
	        return tools.screen == screen;
	    };

	    tools.setBodyType = function (type) {
	        switch (type) {
	            case "very-lean":
	                tools.bmr.fpercent = 6;break;
	            case "lean":
	                tools.bmr.fpercent = 10;break;
	            case "slightly-heavy":
	                tools.bmr.fpercent = 15;break;
	            case "heavy":
	                tools.bmr.fpercent = 20;break;
	            case "pretty-heavy":
	                tools.bmr.fpercent = 25;break;
	            case "f-slim":
	                tools.bmr.fpercent = 15;break;
	            case "f-average":
	                tools.bmr.fpercent = 20;break;
	            case "f-heavy":
	                tools.bmr.fpercent = 25;break;
	            case "f-pretty-heavy":
	                tools.bmr.fpercent = 35;break;
	        }
	        tools.setTab('bmr-cal');
	    };

	    tools.calculateBMR = function () {
	        var weight = tools.bmr.weight;
	        var height = tools.bmr.height;

	        if (tools.bmr.weightParam == "lbs") {
	            weight = 0.45359237 * weight;
	        }

	        //saving user profile
	        var localUser = {};
	        localUser.sex = tools.gender;
	        localUser.age = tools.bmr.age;
	        localUser.weight = weight;

	        if (tools.bmr.heightParam == "feet") {
	            height = utilService.toCentimeter(tools.bmr.heightFt, tools.bmr.heightIn);
	            tools.bmr.height = height;
	            localUser.height_ft = tools.bmr.heightFt;
	            localUser.height_in = tools.bmr.heightIn;
	        }

	        if (tools.bmr.heightParam == "cms") {
	            var feetRes = utilService.toFeet(height);
	            localUser.height_ft = feetRes.feet;
	            localUser.height_in = feetRes.inches;
	            tools.bmr.heightFt = feetRes.feet;
	            tools.bmr.heightIn = feetRes.inches;
	        }

	        var result = utilService.calculateBMR(tools.bmr.activity, tools.gender, tools.bmr.age, weight, height, tools.bmr.fpercent);
	        tools.bmrResult = result.bmr;
	        tools.teeResult = result.tee;

	        if (tools.isAuth()) {
	            var data = {};
	            data.exerciseLevel = tools.bmr.activity;
	            data.calories = tools.teeResult;
	            data.fat = tools.bmr.fpercent;
	            toolsService.save(data, tools.updateProfile());

	            tools.updateProfile(localUser);
	        }
	        tools.setScreen('bmr-result');
	    };

	    tools.clearBMR = function () {
	        tools.bmr = {
	            "weightParam": "kgs",
	            "heightParam": "cms"
	        };
	    };

	    //MACRO
	    tools.macroPreset = { "carb": 0, 'protein': 0, 'fat': 0 };

	    tools.viewMacroPreset = function (preset) {
	        return tools.macroPresetStr == preset;
	    };

	    function calculateMacro(carb, protein, fat, totalCal) {
	        var carCal = 0,
	            proCal = 0,
	            fatCal = 0;
	        var errorMessage = "";
	        var nutrients = {};
	        var totalPercent = carb + protein + fat;
	        nutrients.percent = totalPercent;
	        if (totalPercent < 100) {
	            errorMessage = "Total percent is less than 100%";
	            nutrients.error = errorMessage;
	        } else if (totalPercent > 100) {
	            errorMessage = "Total percent cannot be greater than 100%";
	            nutrients.error = errorMessage;
	        } else {
	            errorMessage = "";
	        }
	        if (totalCal || totalCal == 0) {
	            carCal = carb * totalCal / 100;
	            nutrients['carb'] = (carCal / 4).toFixed(2) + ' gm';
	            proCal = protein * totalCal / 100;
	            nutrients['protein'] = (proCal / 4).toFixed(2) + ' gm';
	            fatCal = fat * totalCal / 100;
	            nutrients['fat'] = (fatCal / 9).toFixed(2) + ' gm';
	        }
	        return nutrients;
	    }

	    tools.calculateMacro = function () {
	        if (!tools.macro.calories) {
	            tools.error = "Field required: calories";
	            return;
	        }

	        var macroRes = calculateMacro(tools.macroPreset.carb, tools.macroPreset.protein, tools.macroPreset.fat, tools.macro.calories);
	        if (macroRes.error) {
	            tools.error = macroRes.error;
	        } else {
	            tools.error = "";
	        }
	        tools.macroNutrients = macroRes;
	    };

	    tools.setMacroPreset = function (preset) {
	        tools.macroPresetStr = preset;
	        switch (preset) {
	            case 'high-carb':
	                tools.macroPreset.carb = 60;
	                tools.macroPreset.protein = 25;
	                tools.macroPreset.fat = 15;
	                break;

	            case 'moderate-carb':
	                tools.macroPreset.carb = 50;
	                tools.macroPreset.protein = 30;
	                tools.macroPreset.fat = 20;
	                break;

	            case 'zone-diet':
	                tools.macroPreset.carb = 40;
	                tools.macroPreset.protein = 30;
	                tools.macroPreset.fat = 30;
	                break;

	            case 'low-carb':
	                tools.macroPreset.carb = 25;
	                tools.macroPreset.protein = 35;
	                tools.macroPreset.fat = 40;
	                break;

	            case 'keto-diet':
	                tools.macroPreset.carb = 5;
	                tools.macroPreset.protein = 35;
	                tools.macroPreset.fat = 60;
	                break;
	        }

	        tools.calculateMacro();
	    };

	    tools.setTab = function (name) {
	        if (!name) {
	            return false;
	        }
	        switch (name) {
	            case 'bmr-cal':
	                tools.selectedIndex = 0;break;

	            case 'macro-cal':
	                if (tools.teeResult) {
	                    tools.macro.calories = tools.teeResult;
	                }
	                tools.selectedIndex = 1;break;

	            case 'body-fat':
	                tools.selectedIndex = 2;break;

	            case 'heart-rate':
	                tools.selectedIndex = 3;break;

	            case 'diet-tool':
	                tools.selectedIndex = 4;break;

	            case 'workout-tool':
	                tools.selectedIndex = 5;break;

	            case 'fitness-plan':
	                tools.setScreen('fitness-form');
	                tools.selectedIndex = 6;break;
	        }
	        return true;
	    };

	    tools.calBodyfat = function () {
	        var weight = tools.bodyFat.weight;
	        if (tools.bodyFat.weightParam == "lbs") {
	            weight = 0.45359237 * weight;
	        }

	        tools.bodyfatRes = utilService.bodyFatPercent(tools.gender, weight, tools.bodyFat.waist, tools.bodyFat.wrist, tools.bodyFat.hip, tools.bodyFat.forearm);

	        tools.bodyfatRes = tools.bodyfatRes.toFixed(2);
	        tools.bmr.fpercent = tools.bodyfatRes;

	        if (tools.isAuth()) {
	            var data = {};
	            data.fat = tools.bmr.fpercent;
	            data.waist = tools.bodyFat.waist;
	            data.wrist = tools.bodyFat.wrist, data.hip = tools.bodyFat.hip, data.forearm = tools.bodyFat.forearm, toolsService.save(data, tools.updateProfile());

	            //saving user profile
	            var localUser = {};
	            localUser.weight = weight;
	            localUser.sex = tools.gender;
	            tools.updateProfile(localUser);
	        }
	        tools.setScreen('bodyfat-res');
	    };

	    // height, weight parameter setters
	    tools.setWeightParam = function (param, section) {
	        tools[section].weightParam = param;
	    };
	    tools.setHeightParam = function (param, section) {
	        tools[section].heightParam = param;
	    };

	    tools.updateProfile = function (userDetails) {
	        profileService.update(userDetails, function (response) {
	            if (response.message == 'UserProfileUpdateSuccess') {
	                profileService.getAutoToken(function (success) {
	                    tools.profile = authService.getCurrentUser();
	                }, function (error) {

	                    console.error(error);
	                });
	            }
	        }, function (error) {});
	    };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('app.tools', {
	    url: '/tools',
	    templateUrl: '/ng-tpl/tools'
	  });
	}]);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('wellnessService', ['$http', 'serviceBase', function ($http, serviceBase) {

	  // this.save = function (data, successCallback, errorCallBack) {
	  //   $http({
	  //     'method': 'POST',
	  //     'url': serviceBase + '/updateClientStatistics',
	  //     'data': data
	  //   })
	  //     .success(function (response) {
	  //         if(successCallback) {
	  //           successCallback(response);
	  //         }
	  //     })
	  //     .error(function (response) {
	  //         if(errorCallBack) {
	  //           errorCallBack(response);
	  //         }

	  //     });
	  // };

	  this.wellnessIndex = function (data, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/wellnessIndex',
	      'data': data
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };
	}]);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("wellnessCtrl", ['authService', 'utilService', 'wellnessService', 'profileService', 'notify', 'messageService', function (authService, utilService, wellnessService, profileService, notify, messageService) {

	    var wellness = this;
	}]);

	module.exports = squatsApp;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('app.wellness', {
	    url: '/wellness',
	    templateUrl: '/ng-tpl/wellness'
	  });
	}]);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.controller('progressCtrl', ['$scope', 'progressService', 'coachService', 'authService', 'notify', 'messageService', 'uploadImageUrl', 'utilService', '$mdDialog', '$state', function ($scope, progressService, coachService, authService, notify, messageService, uploadImageUrl, utilService, $mdDialog, $state) {
	    var progress = this;

	    progress.user = authService.getCurrentUser();

	    if (!progress.user.house_no || !progress.user.street || !progress.user.city || !progress.user.state || !progress.user.country || !progress.user.pincode || !progress.user.tel) {
	        notify(messageService.required.profile);
	        $state.go('app.profile');
	    }
	    progress.currentWeek = 0;
	    progress.statistics = {};
	    progress.user = authService.getCurrentUser();
	    progress.gettingStarted = true;
	    progress.uploadImageUrl = uploadImageUrl;
	    progress.filesArr = [];
	    var formdata = new FormData();
	    progress.fileName = "";
	    var transDetails = authService.getTransactionDetails();

	    Date.prototype.getWeek = function () {
	        var onejan = new Date(this.getFullYear(), 0, 1);
	        return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
	    };

	    progress.extraStats = utilService.toolsUsed(progress.user);

	    progress.setWeekView = function (id) {
	        if (progress.currentWeek == id) {
	            progress.currentWeek = -1;
	        }
	        progress.currentWeek = id;
	    };
	    progress.weekView = function (id) {
	        return progress.currentWeek == id;
	    };

	    progress.setWeekStatusUpdate = function (weekData) {
	        var returnState = true;
	        angular.forEach(weekData, function (val) {
	            if (val.week.week_no == progress.weekNumber && val.week.hasOwnProperty('weight')) {
	                progress.dialogStats = val.week;
	                returnState = false;
	            }
	        });
	        return returnState;
	    };

	    var processProgress = function (start, end, historicalData) {
	        progressService.get(function (res) {
	            progress.data = res;
	            if (res.week_data) {
	                var weekCharts = utilService.weekStatisticsCalculator(start, end, res);
	                progress.weekNumber = utilService.getCurrentWeek(start, end);
	                var index = progress.weekNumber - 1;
	                if (index > -1 && !weekCharts[index].week.hasOwnProperty('weight')) {
	                    weekCharts.splice(index, 1);
	                }
	                progress.weekCharts = weekCharts;
	                progress.enableProgressUpload = progress.setWeekStatusUpdate(progress.weekCharts);
	                progress.current_card = 'weeks';
	            } else if (historicalData) {
	                progress.enabled = false;
	            } else {
	                progress.current_card = 'welcome';
	            }
	        });
	    };

	    var getProgress = function () {
	        coachService.getCoachDetails(function (res) {
	            if (res && res.consultant_name && res.package_start_dt && res.package_end_dt) {
	                progress.enabled = true;

	                var start = new Date(res.package_start_dt.replace(/\s/, 'T'));
	                var end = new Date(res.package_end_dt.replace(/\s/, 'T'));
	                progress.historicalData = false;
	                processProgress(start, end, progress.historicalData);
	            } else if (transDetails != null) {
	                if (transDetails[0] && transDetails[0].assign_date && transDetails[0].assign_end_date) {
	                    var start = new Date(transDetails[0].assign_date.replace(/\s/, 'T'));
	                    var end = new Date(transDetails[0].assign_end_date.replace(/\s/, 'T'));
	                    progress.historicalData = true;
	                    processProgress(start, end, progress.historicalData);
	                    progress.enabled = true;
	                } else {
	                    progress.enabled = false;
	                }
	            } else {
	                progress.enabled = false;
	            }
	        });
	    };

	    getProgress();

	    // upload progress data functionality
	    var uploadSuccess = function (resp) {
	        if (resp.msg) {
	            notify(messageService.success.uploadStatistics);
	            formdata = new FormData();
	            getProgress();
	        } else {
	            notify(messageService.error.uploadStatistics);
	        }
	    };

	    var uploadError = function (resp) {
	        notify(messageService.error.uploadStatistics);
	    };

	    var uploadEvent = function (evt) {
	        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	    };

	    progress.addFile = function ($file) {
	        if ($file) {
	            progress.filesArr.push($file);
	        }
	    };

	    progress.save = function () {
	        var data = {};
	        progress.statistics.thigh = '';
	        data = progress.statistics;
	        for (var data in progress.statistics) {
	            formdata.append(data, progress.statistics[data]);
	        }
	        angular.forEach(progress.filesArr, function (value, key) {
	            formdata.append('week_pic[]', value);
	        });
	        formdata.delete('client_name');
	        notify(messageService.progress.uploadPic);
	        progressService.uploadProgress(formdata, uploadSuccess, uploadError, uploadEvent);
	    };

	    progress.edit = function (stats) {
	        stats.thigh = '';
	        for (var data in stats) {
	            formdata.append(data, stats[data]);
	        }
	        formdata.delete('client_name');
	        notify(messageService.progress.uploadPic);
	        progressService.uploadProgress(formdata, uploadSuccess, uploadError, uploadEvent);
	        progress.enableUpdate = false;
	    };
	    /*Upload week popup */
	    progress.uploadPicsDialog = function (weekProgress) {
	        progress.dialogStats = weekProgress;

	        $mdDialog.show({
	            controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {}],
	            controllerAs: 'picsCtrl',
	            contentElement: '#uploadPics',
	            parent: angular.element(document.body),
	            clickOutsideToClose: true,
	            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints. 
	        });
	    };

	    progress.cancel = function () {
	        $mdDialog.cancel();
	    };

	    progress.removePics = function (file) {
	        for (var f in progress.filesArr) {
	            if (progress.filesArr[f] == file) {
	                progress.filesArr.splice(f, 1);
	            }
	        }
	        var files = formdata.getAll("week_pic[]");
	        formdata.delete("week_pic[]");

	        for (var pair of files) {
	            if (pair != file) {
	                formdata.append("week_pic[]", pair);
	            }
	        }
	    };

	    progress.viewPicsDialog = function (weekProgress) {
	        progress.dialogStats = weekProgress;

	        $mdDialog.show({
	            controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {

	                $scope.hide = function () {
	                    $mdDialog.hide();
	                };

	                $scope.cancel = function () {
	                    $mdDialog.cancel();
	                };

	                $scope.answer = function (answer) {
	                    $mdDialog.hide(answer);
	                };
	            }],
	            contentElement: '#viewPics',
	            parent: angular.element(document.body),
	            clickOutsideToClose: true,
	            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints. 
	        });
	    };
	}]);

	module.exports = squatsUser;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.service('progressService', ['$http', 'serviceBase', 'Upload', function ($http, serviceBase, Upload) {
	  this.get = function (callback) {
	    $http({
	      'method': 'GET',
	      'url': serviceBase + '/clientWeeklyStatus'
	    }).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.upload = function (file, successCallback, errorCallback, eventCallback) {
	    Upload.upload({
	      url: serviceBase + '/uploadWeeklyDetails',
	      data: { file: file }
	    }).then(function (resp) {
	      successCallback(resp);
	    }, function (resp) {
	      errorCallback(resp);
	    }, function (evt) {
	      eventCallback(evt);
	    });
	  };

	  this.uploadProgress = function (formdata, successCallback, errorCallback) {
	    var request = {
	      method: 'POST',
	      url: serviceBase + '/uploadWeeklyDetails',
	      data: formdata,
	      headers: {
	        'Content-Type': undefined
	      }
	    };

	    // SEND THE FILES.
	    $http(request).success(function (resp) {
	      successCallback(resp);
	    }).error(function (error) {
	      errorCallback(error);
	    });
	  };
	}]);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('app.progress', {
	    url: '/my-progress',
	    templateUrl: '/ng-tpl/my-progress'
	  });
	}]);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('coachCtrl', ['$window', 'coachService', 'progressService', 'utilService', 'notify', 'messageService', 'fullImageUrl', 'uploadImageUrl', 'authService', '$mdDialog', '$scope', '$state', '$http', '$q', 'serviceBase', function ($window, coachService, progressService, utilService, notify, messageService, fullImageUrl, uploadImageUrl, authService, $mdDialog, $scope, $state, $http, $q, serviceBase) {
	    var coach = this;
	    coach.user = authService.getCurrentUser();

	    if (!coach.user.house_no || !coach.user.street || !coach.user.city || !coach.user.state || !coach.user.country || !coach.user.pincode || !coach.user.tel) {
	        notify(messageService.required.profile);
	        $state.go('app.profile');
	    }
	    coach.monthNames = utilService.months;
	    coach.enableCharts = false;
	    coach.chartMessage = "";
	    coach.chart = 'nutrition';
	    coach.fullImageUrl = fullImageUrl;
	    coach.imageUrl = uploadImageUrl;
	    var transDetails = null;
	    coachService.clientTransactionDetails(function (res) {
	        if (res) {
	            transDetails = res.transactionData;
	        } else {
	            transDetails = null;
	        }
	    });
	    coach.feedbacksuccess = false;
	    coach.currentDate = new Date();
	    coach.maxDate = new Date(coach.currentDate.getFullYear(), coach.currentDate.getMonth(), coach.currentDate.getDate() + 13);
	    coach.daysAvailability = [];
	    coach.disabledates = [];

	    coach.steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'];

	    coach.selection = coach.steps[0];

	    coach.getCurrentStepIndex = function () {
	        // Get the index of the current step given selection
	        return coach.steps.indexOf(coach.selection);
	    };

	    coach.hasNextStep = function () {
	        var stepIndex = coach.getCurrentStepIndex();
	        var nextStep = stepIndex + 1;
	        // Return true if there is a next step, false if not
	        return !angular.isUndefined(coach.steps[nextStep]);
	    };

	    coach.hasPreviousStep = function () {
	        var stepIndex = coach.getCurrentStepIndex();
	        var previousStep = stepIndex - 1;
	        // Return true if there is a next step, false if not
	        return !angular.isUndefined(coach.steps[previousStep]);
	    };

	    coach.incrementStep = function () {
	        if (coach.hasNextStep()) {
	            var stepIndex = coach.getCurrentStepIndex();
	            var nextStep = stepIndex + 1;
	            coach.selection = coach.steps[nextStep];
	        }
	    };

	    coach.decrementStep = function () {
	        if (coach.hasPreviousStep()) {
	            var stepIndex = coach.getCurrentStepIndex();
	            var previousStep = stepIndex - 1;
	            coach.selection = coach.steps[previousStep];
	        }
	    };

	    var processCoach = function (res) {
	        var start = new Date(res.package_start_dt.replace(/\s/, 'T'));
	        var end = new Date(res.package_end_dt.replace(/\s/, 'T'));
	        var now = new Date();
	        now.setHours(0, 0, 0, 0);
	        coach.endIn = utilService.dateDiff.inDays(now, end);

	        if (coach.endIn < 0) {
	            coach.programMessage = "Your program has expired";
	        } else {

	            if (renewalExists(end, transDetails)) {
	                coach.renewalExists = true;
	            } else {
	                coach.programMessage = "Your program is ending in " + coach.endIn + " days";
	                coach.renewalExists = false;
	            };
	        }
	        coach.data = res;
	        coach.data.start = start.getDate() + "-" + coach.monthNames[start.getMonth()] + "-" + start.getFullYear();
	        coach.data.end = end.getDate() + "-" + coach.monthNames[end.getMonth()] + "-" + end.getFullYear();

	        var getProgress = function (start, end) {
	            progressService.get(function (res) {
	                if (res.dietChart_data || res.trainingChart_data) {
	                    coach.weekCharts = utilService.weekStatisticsCalculator(start, end, res);
	                    coach.weekCharts.reverse();
	                    coach.enableCharts = true;
	                    coach.progress = res;
	                    coach.currentNutritionPackageList = coach.currentNutritionPackage(start, res);
	                    coach.currentTrainingPackageList = coach.currentTrainingPackage(start, res);
	                    coach.chartData = coach.currentNutritionPackageList;
	                    coach.historicalPackageList = coach.historicalPackage(start, res);
	                }
	            });
	        }(start, end);
	    };
	    var getCoach = function () {
	        coachService.getCoachDetails(function (res) {
	            if (res && res.consultant_name && res.package_start_dt && res.package_end_dt) {
	                coach.enabled = true;
	                processCoach(res);
	                getSlots(res.consultantId);
	            }
	            // else{
	            //     coachService.getCoachDetails(function (res) {
	            // }
	            else if (transDetails != null) {
	                    coach.enabled = true;
	                    if (!coach.data) {
	                        coach.data = {};
	                    }
	                    coach.data.consultantId = transDetails[0].trainer_id;
	                    coach.data.consultant_name = transDetails[0].trainer_name;
	                    coach.data.consultant_pic = transDetails[0].trainer_pic;
	                    coach.data.packageId = transDetails[0].pack_id;
	                    coach.data.packageName = transDetails[0].pack_name || transDetails[0].old_package_name;
	                    coach.data.package_end_dt = transDetails[0].assign_end_date;
	                    coach.data.package_start_dt = transDetails[0].assign_date;
	                    if (res && res.consultant_history) {
	                        coach.data.consultant_history = res.consultant_history;
	                    }
	                    processCoach(coach.data);

	                    getSlots(coach.data.consultantId);
	                } else {
	                    coach.enabled = false;
	                }
	        });
	    };
	    getCoach();

	    var getSlots = function (consultantId) {
	        coachService.getSlotDetails(consultantId, function (res) {
	            if (res && res.Slotlist) {
	                coach.Slotlist = res.Slotlist;
	                angular.forEach(res.Slotlist, function (value, key) {
	                    switch (value.week_day) {
	                        case "Monday":
	                            coach.daysAvailability.push(1);
	                            break;
	                        case "Tuesday":
	                            coach.daysAvailability.push(2);
	                            break;
	                        case "Wednesday":
	                            coach.daysAvailability.push(3);
	                            break;
	                        case "Thursday":
	                            coach.daysAvailability.push(4);
	                            break;
	                        case "Friday":
	                            coach.daysAvailability.push(5);
	                            break;
	                        case "Saturday":
	                            coach.daysAvailability.push(6);
	                            break;
	                        case "Sunday":
	                            coach.daysAvailability.push(0);
	                            break;
	                    }
	                });
	            }
	        });
	    };

	    var dayName = function (day) {
	        switch (day) {
	            case 1:
	                return "Monday";
	            case 2:
	                return "Tuesday";
	            case 3:
	                return "Wednesday";
	            case 4:
	                return "Thursday";
	            case 5:
	                return "Friday";
	            case 6:
	                return "Saturday";
	            case 0:
	                return "Sunday";
	        }
	    };

	    coach.onlyWeekendsPredicate = function (date) {
	        var day = date.getDay();
	        var datevalid = false;
	        angular.forEach(coach.daysAvailability, function (value, key) {
	            if (day == value) {
	                datevalid = true;
	            } else {}
	        });
	        return datevalid;
	    };

	    coach.loadtimeHourOptions = function (date) {
	        var day = date.getDay();
	        var daynm = dayName(day);
	        angular.forEach(coach.Slotlist, function (value, key) {
	            if (daynm == value.week_day) {
	                setTimeHour(value.start_time, value.end_time);
	            }
	        });
	    };

	    var setTimeHour = function (start, end) {
	        var options = [];
	        coach.rep = 0;
	        angular.forEach(coach.timeframe, function (value, key) {
	            if (end == value && options.length > 0) {
	                coach.rep = 1;
	            }
	            if (start == value) {
	                options.push(value);
	            }
	            if (options.length > 0 && coach.rep == 0) {
	                options.push(value);
	            }
	        });
	        coach.timeHourOptions = options;
	        //console.log(coach.timeHourOptions);
	    };

	    coach.timeframe = ["12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];

	    coach.setChartData = function (type) {
	        switch (type) {
	            case "nutrition":
	                coach.chart = "nutrition";
	                if (coach.currentNutritionPackageList) {
	                    coach.chartData = coach.currentNutritionPackageList;
	                }
	                break;
	            case "training":
	                coach.chart = "training";
	                if (coach.currentTrainingPackageList) {
	                    coach.chartData = coach.currentTrainingPackageList;
	                }
	                break;
	        }
	    };

	    coach.renewPackage = function () {
	        $window.location.href = '/checkout?t=coach' + "&c=" + coach.data.consultantId + "&step=renewal";
	    };

	    coach.historicalPackage = function (startDate, progress) {
	        var historicalResult = [];
	        var localDate;
	        for (var diet in progress.dietChart_data) {
	            localDate = new Date(progress.dietChart_data[diet].post_date.replace(/\s/, 'T'));
	            if (localDate < startDate) {
	                historicalResult.push(progress.dietChart_data[diet]);
	            }
	        }
	        for (var training in progress.trainingChart_data) {
	            localDate = new Date(progress.trainingChart_data[training].post_date.replace(/\s/, 'T'));
	            if (localDate < startDate) {
	                historicalResult.push(progress.trainingChart_data[training]);
	            }
	        }
	        return historicalResult;
	    };

	    coach.currentNutritionPackage = function (startDate, progress) {
	        var currentResult = [];
	        var localDate;
	        for (var diet in progress.dietChart_data) {
	            localDate = new Date(progress.dietChart_data[diet].post_date.replace(/\s/, 'T'));
	            if (localDate > startDate) {
	                currentResult.push(progress.dietChart_data[diet]);
	            }
	        }
	        return currentResult;
	    };

	    coach.currentTrainingPackage = function (startDate, progress) {
	        var currentResult = [];
	        var localDate;
	        for (var training in progress.trainingChart_data) {
	            localDate = new Date(progress.trainingChart_data[training].post_date.replace(/\s/, 'T'));
	            if (localDate > startDate) {
	                currentResult.push(progress.trainingChart_data[training]);
	            }
	        }
	        return currentResult;
	    };

	    var renewalExists = function (packageEndDate, transDetails) {
	        var localDate;
	        if (!transDetails) {
	            return false;
	        }
	        for (var details in transDetails) {
	            if (transDetails[details] && transDetails[details].assign_date) {
	                localDate = new Date(transDetails[details].assign_date.replace(/\s/, 'T'));
	                if (localDate >= packageEndDate) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    };

	    /**
	     * Feedback Form
	     */
	    coach.feedbackForm = function () {

	        $mdDialog.show({

	            controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {

	                $scope.hide = function () {
	                    $mdDialog.hide();
	                };

	                $scope.cancel = function () {
	                    $mdDialog.cancel();
	                };

	                $scope.answer = function (answer) {
	                    $mdDialog.hide(answer);
	                };
	            }],
	            contentElement: '#feedback',
	            parent: angular.element(document.body),
	            clickOutsideToClose: true,
	            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints. 
	        });
	    };

	    coach.feedbackList = [{
	        'id': '1',
	        'question': 'Was your Coach professional, courteous and respectful every time you interacted with him/her?'
	    }, {
	        'id': '2',
	        'question': 'Did your Coach reply to your requests within a reasonable timeframe (24 hours excluding Sundays)?'
	    }, {
	        'id': '3',
	        'question': 'How often your coach conducted progress check-in?'
	    }, {
	        'id': '4',
	        'question': 'How happy are you with your transformation?'
	    }, {
	        'id': '5',
	        'question': 'How likely would you recommend us to others?'
	    }, {
	        'id': '6',
	        'question': 'Did your Coach conduct regular progress check-ups (minimum twice a month)?'
	    }, {
	        'id': '7',
	        'question': 'Would you like to share your progress stats ( Before - After weight, muscle mass and body fat percentage)?'
	    }, {
	        'id': '8',
	        'question': 'Would you like us to use your Transformation pictures on our Social handles and website?'
	    }];

	    coach.submitFeedback = function (fb) {
	        var feedbackReq = {};
	        var key, val;
	        for (var list in coach.feedbackList) {
	            if (list >= 5) {
	                break;
	            }
	            //add question
	            key = "ques_" + coach.feedbackList[list].id;
	            val = coach.feedbackList[list].question;
	            feedbackReq[key] = val;

	            //add rating
	            key += "_rating";
	            val = coach.feedbackList[list].rating;
	            feedbackReq[key] = val;
	        }
	        feedbackReq.feedback = coach.userFeedback;
	        feedbackReq.trainer_id = coach.data.consultantId;

	        coachService.saveFeedback(feedbackReq, function success(res) {
	            if (res && res.msg) {
	                notify(messageService.success.submitFeedback);
	                coach.incrementStep();
	            }
	        }, function error(err) {
	            if (err && err.errormsg) {
	                switch (err.errormsg) {
	                    case "NO_TRAINER_EXISTS":
	                        notify(messageService.error.coachIdNotExist);
	                        break;
	                }
	            }
	        });
	    };

	    coach.bookAppointment = function () {

	        if (validateTime(coach.timeHour)) {
	            var appointmentReq = {};
	            appointmentReq.trainer_id = coach.data.consultantId;
	            appointmentReq.date = coach.coachDate.toString();
	            appointmentReq.timeHour = coach.timeHour;

	            console.log(appointmentReq.date);
	            coachService.bookAppointment(appointmentReq, function success(res) {
	                if (res && res.msg) {
	                    notify(messageService.success.bookAppointment);
	                    coach.coachDate = "";
	                    coach.timeHour = "";
	                    coach.callType = "";
	                }
	                if (res && res.errormsg) {
	                    switch (res.errormsg) {
	                        case "NO_TRAINER_EXISTS":
	                            notify(messageService.error.coachIdNotExist);
	                            break;
	                        case "Sorry this appointment slot is not available, please choose another time slot.":
	                            notify(messageService.error.slotNotAvailable);
	                        case "Sorry you have already booked an appointment today.":
	                            notify(messageService.error.alreadyBookedappointment);
	                            break;
	                    }
	                }
	            }, function error(err) {
	                if (err && err.errormsg) {
	                    switch (err.errormsg) {
	                        case "NO_TRAINER_EXISTS":
	                            notify(messageService.error.coachIdNotExist);
	                            break;
	                        case "Sorry this appointment slot is not available, please choose another time slot.":
	                            notify(messageService.error.slotNotAvailable);
	                            break;
	                    }
	                }
	            });
	        }

	        function validateTime(timeHour, timeMin, timeAMPM) {
	            if ((timeHour == "1" || timeHour == "2" || timeHour == "3" || timeHour == "4" || timeHour == "5" || timeHour == "6" || timeHour == "7" || timeHour == "8" || timeHour == "9") && timeAMPM == "am") return false;else if ((timeHour == "7" || timeHour == "8" || timeHour == "9" || timeHour == "10" || timeHour == "11" || timeHour == "12") && timeAMPM == "pm") return false;else return true;
	        }
	    };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('coachService', ['$http', 'serviceBase', function ($http, serviceBase) {

	  function consultantHeaders(consultant_id) {
	    return {
	      headers: {
	        'consultantId': consultant_id
	      }
	    };
	  };

	  this.getCoachDetails = function (callback) {
	    $http.get(serviceBase + '/clientTrainerDetails').success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.clientTransactionDetails = function (callback) {
	    $http.get(serviceBase + '/clientTransactionDetails').success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.saveFeedback = function (data, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/createTestimonials',
	      'data': data
	    }).success(function (response) {
	      if (successCallback) {
	        successCallback(response);
	      }
	    }).error(function (error) {
	      if (errorCallback) {
	        errorCallback(error);
	      }
	    });
	  };

	  this.bookAppointment = function (data, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/createAppointment',
	      'data': data
	    }).success(function (response) {
	      if (successCallback) {
	        successCallback(response);
	      }
	    }).error(function (error) {
	      if (errorCallback) {
	        errorCallback(error);
	      }
	    });
	  };

	  this.getSlotDetails = function (consultant_id, callback) {
	    $http.get(serviceBase + '/fetchslotDetails', consultantHeaders(consultant_id)).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };
	}]);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('app.myCoach', {
	    url: '/my-coach',
	    templateUrl: '/ng-tpl/my-coach',
	    controller: 'coachCtrl',
	    controllerAs: 'coach'
	  });
	}]);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.service('helpdeskService', ['$http', 'serviceBase', function ($http, serviceBase) {
	  this.getClientTickets = function (callback) {
	    $http({
	      'method': 'GET',
	      'url': serviceBase + '/clientTickets'
	    }).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.createTicket = function (ticketData, callback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/createTicket',
	      'data': ticketData
	    }).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.updateStatus = function (id, status, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/updateTicketStatus',
	      'data': { ticket_id: id, status: status }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };

	  this.postReply = function (id, reply, successCallback, errorCallback) {
	    $http({
	      'method': 'POST',
	      'url': serviceBase + '/postTicketReply',
	      'data': { ticket_id: id, reply_text: reply }
	    }).success(function (response) {
	      successCallback(response);
	    }).error(function (response) {
	      errorCallback(response);
	    });
	  };
	}]);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.controller('helpdeskCtrl', ['helpdeskService', 'coachService', 'utilService', '$state', 'notify', 'messageService', function (helpdeskService, coachService, utilService, $state, notify, messageService) {

	    var helpdesk = this;
	    helpdesk.ticket = {
	        'counterparty': 0
	    };

	    helpdesk.ticketOptions = [{ value: "Other" }];

	    helpdesk.reply = {};

	    coachService.getCoachDetails(function (res) {
	        if (res && res.consultant_name && res.package_start_dt && res.package_end_dt) {

	            var startDate = new Date(res.package_start_dt.replace(/\s/, 'T'));
	            var now = new Date();
	            var diff = utilService.dateDiff.inDays(startDate, now);
	            if (diff <= 32 && diff >= 0) {
	                helpdesk.ticketOptions.push({ value: "Request refund" }, { value: "Request coach change" });
	            }
	        }
	    });

	    var getClientTickets = function () {
	        helpdeskService.getClientTickets(function (res) {
	            helpdesk.clientTickets = res.ticketsList;
	            if ($state.params && res.ticketsList) {
	                helpdesk.ticketDetail = res.ticketsList.filter(function (obj) {
	                    return obj.ticket_id == $state.params.id;
	                });
	            }
	        });
	    };

	    getClientTickets();

	    helpdesk.createTicket = function (form) {
	        helpdeskService.createTicket(helpdesk.ticket, function (res) {
	            if (res.msg) {
	                notify(messageService.success.submitTicket);
	                helpdesk.ticket = {
	                    'counterparty': 0
	                };
	                form.$setPristine();
	                form.$setUntouched();
	                getClientTickets();
	            } else {
	                notify(messageService.error.submitTicket);
	            }
	        });
	    };

	    helpdesk.updateStatus = function (id, status) {
	        helpdeskService.updateStatus(id, status, function (res) {
	            if (res.msg) {
	                notify(messageService.success.updateTicket);
	                getClientTickets();
	            } else {
	                notify(messageService.error.updateTicket);
	            }
	        }, function (res) {
	            notify(messageService.error.updateTicket);
	        });
	    };

	    helpdesk.postReply = function () {
	        helpdeskService.postReply(helpdesk.ticketDetail[0].id, helpdesk.reply.message, function (res) {
	            if (res.msg) {
	                form.$setPristine();
	                form.$setUntouched();
	                notify(messageService.success.updateTicket);
	                getClientTickets();
	            } else {
	                notify(messageService.error.updateTicket);
	            }
	            helpdesk.reply = {};
	        }, function (res) {
	            notify(messageService.error.updateTicket);
	        });
	    };
	}]);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('app.helpdesk', {
	    url: '/helpdesk',
	    templateUrl: '/ng-tpl/helpdesk',
	    controller: 'helpdeskCtrl',
	    controllerAs: 'helpdesk'
	  }).state('app.helpdeskTickets', {
	    url: '/helpdesk/tickets',
	    templateUrl: '/ng-tpl/helpdesk-tickets',
	    controller: 'helpdeskCtrl',
	    controllerAs: 'helpdesk'
	  }).state('app.helpdeskTicketDetail', {
	    url: '/helpdesk/tickets/:id',
	    templateUrl: '/ng-tpl/helpdesk-ticket-detail',
	    controller: 'helpdeskCtrl',
	    controllerAs: 'helpdesk'
	  });
	}]);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('contactService', ['$http', 'serviceBase', function ($http, serviceBase) {

	  this.do = function (form, callback) {
	    $http.post(serviceBase + '/contact', form).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };

	  this.submitWellness = function (form, callback) {
	    $http.post(serviceBase + '/corporate-wellness-form', form).success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };
	}]);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('contactCtrl', ['$scope', 'contactService', 'notify', 'messageService', function ($scope, contactService, notify, messageService) {
	    var contact = this;
	    contact.form = {};
	    contact.do = function (form) {
	        contactService.do(contact.form, function (res) {
	            //if (res.errormessage) {
	            //    notify(messageService.error.submitForm);
	            //}
	            //else {
	            notify(messageService.success.submitForm);
	            //}
	            contact.form = {};
	            form.$setPristine();
	            form.$setUntouched();
	        });
	    };
	    contact.submitWellness = function (form) {
	        contactService.submitWellness(contact.form, function (res) {
	            //if (res.errormessage) {
	            //    notify(messageService.error.submitForm);
	            //}
	            //else {
	            notify(messageService.success.submitForm);
	            //}
	            contact.form = {};
	            form.$setPristine();
	            form.$setUntouched();
	        });
	    };
	}]);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('academyService', ['$http', 'serviceBase', function ($http, serviceBase) {

	  this.getCourse = function (callback) {
	    $http.get(serviceBase + '/courseList').success(function (response) {
	      callback(response);
	    }).error(function (response) {
	      callback(response);
	    });
	  };
	}]);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("academyCtrl", ['$scope', 'academyService', 'coachService', 'authService', '$window', 'notify', 'messageService', function ($scope, academyService, coachService, authService, $window, notify, messageService) {
		var academy = this;
		academy.auth = authService.isAuth;

		academyService.getCourse(function (res) {
			academy.accordianData = res;
		});

		academy.setCourse = function (course, index) {
			academy.batches_active = [];
			if (course.batches_active) {
				academy.batches_active = course.batches_active.replace(/['"]+/g, '').split(",");
				academy.batches_active.forEach(function (elem, index, data) {
					data[index] = new Date(elem);
				});
			}

			academy.batches_booked = [];
			if (course.batches_booked) {
				academy.batches_booked = course.batches_booked.replace(/['"]+/g, '').split(",");
				academy.batches_booked.forEach(function (elem, index, data) {
					data[index] = new Date(elem);
				});
			}

			academy.batches_old = [];
			if (course.batches_old) {
				academy.batches_old = course.batches_old.replace(/['"]+/g, '').split(",");
				academy.batches_old.forEach(function (elem, index, data) {
					data[index] = new Date(elem);
				});
			}
		};

		academy.slots = function (date) {
			var enabled = false;
			for (var i = 0; i < academy.batches_active.length; i++) {
				if (academy.batches_active[i].setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0)) {
					return true;
				};
			}
			return false;
		};

		academy.navigate = function (courseId, date) {

			if (date == undefined || date == "") {
				notify(messageService.required.date);
				return;
			}
			if (authService.isAuth() && authService.getCurrentUser().userCourseList) {
				notify(messageService.error.enrolled);
			}

			var dateObj = new Date(date);
			function nFix(n) {
				return n > 9 ? "" + n : "0" + n;
			}
			var dateStr = dateObj.getFullYear() + "-" + nFix(dateObj.getMonth() + 1) + "-" + nFix(dateObj.getDate());
			$window.location = "/checkout" + "?t=course" + "&p=" + dateStr + "&c=" + courseId;
		};
	}]);

	module.exports = squatsApp;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsUser = __webpack_require__(1).squatsUser;

	squatsUser.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('app.academy', {
	    url: '/academy',
	    templateUrl: '/ng-tpl/academy',
	    controller: 'academyCtrl',
	    controllerAs: 'acad'
	  });
	}]);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('homeService', ['$http', 'serviceBase', function ($http, serviceBase) {
	    this.getTestimonials = function (offset, callback) {
	        $http({
	            'method': 'GET',
	            'url': serviceBase + '/testimonials/' + offset
	        }).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };

	    this.getTrainers = function (offset, callback) {
	        $http({
	            'method': 'GET',
	            'url': serviceBase + '/searchtrainers/' + offset
	        }).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };
	}]);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller("homeCtrl", ["$scope", "authService", 'localStorageService', 'homeService', "$mdSidenav", "$mdDialog", "$window", "thumbImageUrl", "crmService", function ($scope, authService, localStorageService, homeService, $mdSidenav, $mdDialog, $window, thumbImageUrl, crmService) {
	    var home = this;

	    home.currentTrainerId = 3;
	    home.imageUrl = thumbImageUrl;

	    homeService.getTestimonials(Math.floor(Math.random() * 600), function (res) {
	        home.testimonials = res.Testimonials[0];
	    });

	    home.swCoach = {};

	    homeService.getTrainers(0, function (res) {
	        home.trainers = res.ConsultantList[0];
	    });

	    home.searchTrainer = function () {
	        $window.location.href = '/pricing/coaches?q=' + home.searchIn;
	    };

	    home.setTrainer = function (id) {
	        home.currentTrainerId = id;
	    };
	    home.isTrainer = function (id) {
	        return home.currentTrainerId == id;
	    };

	    home.setPrev = function () {
	        if (home.currentTrainerId > 0 && home.currentTrainerId <= 6) {
	            home.currentTrainerId -= 1;
	        }
	    };
	    home.setNext = function () {
	        if (home.currentTrainerId >= 0 && home.currentTrainerId < 6) {
	            home.currentTrainerId += 1;
	        }
	    };

	    home.bmr = {};

	    home.screen = "bmrCal";

	    home.setScreen = function (screen) {
	        home.screen = screen;
	    };
	    home.viewScreen = function (screen) {
	        return home.screen == screen;
	    };

	    function calculateBMR(clientActivity, gender, clientAge, clientWt, clientHt, clientFat) {
	        var addFactor, wtMultiple, htMultiple, ageMultiple, tee;
	        switch (gender) {
	            case 'Male':
	                addFactor = 66.5;
	                wtMultiple = 13.75;
	                htMultiple = 5.003;
	                ageMultiple = 6.755;
	                break;
	            default:
	                addFactor = 655.1;
	                wtMultiple = 9.563;
	                htMultiple = 1.850;
	                ageMultiple = 4.676;
	        }
	        var teeMultiple = 0;
	        switch (clientActivity) {
	            case 1:
	                teeMultiple = 1.2;
	                break;
	            case 2:
	                teeMultiple = 1.375;
	                break;
	            case 3:
	                teeMultiple = 1.55;
	                break;
	            case 4:
	                teeMultiple = 1.725;
	                break;
	            case 5:
	                teeMultiple = 1.9;
	                break;
	        }
	        var localClientWt = clientFat < 20 ? clientWt : clientWt - .2 * clientWt;
	        var bmr = addFactor + wtMultiple * localClientWt + htMultiple * clientHt - ageMultiple * clientAge;
	        bmr = Math.round(bmr * 100) / 100;
	        tee = Math.round(bmr * teeMultiple * 100) / 100;
	        return {
	            'bmr': bmr,
	            'tee': tee
	        };
	    }

	    home.setBodyType = function (type) {
	        switch (type) {
	            case "very-lean":
	                home.bmr.fpercent = 6;break;
	            case "lean":
	                home.bmr.fpercent = 10;break;
	            case "slightly-heavy":
	                home.bmr.fpercent = 15;break;
	            case "heavy":
	                home.bmr.fpercent = 20;break;
	            case "pretty-heavy":
	                home.bmr.fpercent = 25;break;
	            case "f-slim":
	                home.bmr.fpercent = 15;break;
	            case "f-average":
	                home.bmr.fpercent = 20;break;
	            case "f-heavy":
	                home.bmr.fpercent = 25;break;
	            case "f-pretty-heavy":
	                home.bmr.fpercent = 35;break;
	        }
	        $mdDialog.cancel();
	    };

	    home.calculateBMR = function () {
	        var weight = home.bmr.weight;
	        if (home.bmr.weightParam == "Pound") {
	            weight = 0.45359237 * weight;
	        }
	        var result = calculateBMR(home.bmr.activity, home.bmr.gender, home.bmr.age, weight, home.bmr.height, home.bmr.fpercent);
	        home.bmrResult = result.bmr;
	        home.teeResult = result.tee;

	        if (result.bmr) {
	            home.setScreen('bmr-result');
	        }
	    };

	    home.clearBMR = function () {
	        home.bmr = {};
	    };

	    home.showBodyFat = function () {
	        $mdDialog.show({
	            controller: ["$scope", "$mdDialog", function ($scope, $mdDialog) {
	                $scope.hide = function () {
	                    $mdDialog.hide();
	                };

	                $scope.cancel = function () {
	                    $mdDialog.cancel();
	                };

	                $scope.answer = function (answer) {
	                    $mdDialog.hide(answer);
	                };
	            }],
	            contentElement: '#bmrCal',
	            parent: angular.element(document.body),
	            clickOutsideToClose: true,
	            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints. 
	        });
	    };

	    home.onReadySwiper = function (s) {
	        setTimeout(function () {
	            home.setTrainer(home[s].realIndex);
	            home[s].on('onSlideChangeEnd', function (swiper) {
	                home.setTrainer(swiper.realIndex);
	                $scope.$apply();
	            });
	        }, 300);
	    };

	    home.captureLead = function (lead) {
	        var leadDetails = [];
	        leadDetails['email'] = lead.email;
	        leadDetails['gender'] = lead.gender;
	        leadDetails['height'] = lead.height;
	        leadDetails['weight'] = lead.weight;
	        leadDetails['age'] = lead.age;
	        leadDetails['lastname'] = lead.email;
	        switch (lead.fitness_goal) {
	            case "lean_gain":
	                leadDetails['goal'] = "Gain lean muscle";
	                break;
	            case "lose_fat":
	                leadDetails['goal'] = "Lose fat";
	                break;
	            case "ectomorph_muscle_building":
	                leadDetails['goal'] = "Gain maximum muscle";
	                break;
	            case "maintenance":
	                leadDetails['goal'] = "Maintenance";
	                break;
	        }
	        if (leadDetails['email'] && leadDetails['lastname']) {
	            crmService.saveLead(leadDetails, function (res) {
	                // console.log(res);
	            });
	        }
	    };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('pricingService', ['$http', 'serviceBase', function ($http, serviceBase) {
	    this.getPackages = function (callback) {
	        $http({
	            'method': 'GET',
	            'url': serviceBase + '/plansNpackages'
	        }).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };
	}]);

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('pricingCtrl', ['pricingService', function (pricingService) {
	    var pricing = this;

	    pricing.packageView = false;

	    pricingService.getPackages(function (res) {
	        pricing.packageList = res.packages[0];
	    });

	    pricing.packageId = 0;
	    pricing.setPackage = function (id) {
	        pricing.packageId = id;
	    };

	    pricing.showPackage = function (id) {
	        return pricing.packageId == id;
	    };

	    pricing.setPlan = function (name) {
	        pricing.packageView = true;
	    };
	}]);

	module.exports = squatsApp;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('partnerService', ['$http', 'serviceBase', function ($http, serviceBase) {
	    this.get = function (callback) {
	        $http({
	            'method': 'GET',
	            'url': serviceBase + '/partners'
	        }).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };
	}]);

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('partnerCtrl', ['partnerService', function (partnerService) {
	    var partner = this;
	    partnerService.get(function (res) {
	        partner.partnersList = res.partners[0];
	    });
	}]);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('utilService', ['$window', function ($window) {
	    var util = this;

	    util.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    util.toCentimeter = function (feet, inches) {
	        if (feet == 0) {
	            return;
	        }
	        if (!inches || inches == undefined) {
	            inches = 0;
	        }
	        return parseInt((feet * 12 + parseInt(inches)) * 2.54);
	    };

	    util.toFeet = function (centimeter) {
	        centimeter = parseInt(centimeter);
	        var realFeet = centimeter * 0.393700 / 12;
	        var feet = Math.floor(realFeet);
	        var inches = Math.round((realFeet - feet) * 12);
	        return {
	            'feet': feet,
	            'inches': inches
	        };
	    };

	    util.profileTabsCorporateCalculator = function (profile) {
	        var entries = [];
	        var tabs = {
	            name: { key: 'name', title: 'name', contentTitle: "What is your name?", type: "text" },
	            tel: { key: 'tel', title: 'contact', contentTitle: "What is your contact number", type: "text" },
	            age: { key: 'age', title: 'age', contentTitle: 'What is your age?' },
	            height_ft: { key: 'height_ft', title: 'height', contentTitle: "What is your height", type: "text" },
	            sex: { key: 'sex', title: 'sex', contentTitle: "What is your gender?", type: "text" },
	            diet_type: { key: 'diet_type', title: 'food preference', contentTitle: "What is your food preference?", type: "text" },
	            weight: { key: 'weight', title: 'weight', contentTitle: "What is your weight (kg)", type: "text" },
	            goal: { key: 'goal', title: 'goal', contentTitle: "what is your goal?", type: "text" },
	            details: { key: 'details', title: 'Medical History', contentTitle: "Have you had any past illness?", type: "text" },
	            house_no: { key: 'house_no', title: 'House no./Flat no.', contentTitle: "House no./Flat no.?", type: "text" },
	            street: { key: 'street', title: 'Street address', contentTitle: "Street address/Society name?", type: "text" },
	            city: { key: 'city', title: 'city', contentTitle: "In which city do you live?", type: "text" },
	            country: { key: 'country', title: 'country', contentTitle: "Your country?", type: "text" },
	            state: { key: 'state', title: 'state', contentTitle: "In which state do you live?", type: "text" },
	            pincode: { key: 'pincode', title: 'pincode', contentTitle: "What is your pincode?", type: "text" },
	            certificates: { key: 'certificates', title: 'Medical Report', contentTitle: "Upload Report", type: "text" },
	            company_email: { key: 'company_email', title: 'company email', contentTitle: 'What is your company email id?' }

	        };
	        var elemList = ["name", "tel", "age", "height_ft", "sex", "diet_type", "weight", "goal", "details", "house_no", "street", "city", "country", "state", "pincode", "company_email"];
	        for (var key in profile) {
	            if (profile[key] == "" || profile[key] == null || profile[key] == undefined) {
	                if (elemList.indexOf(key) >= 0) {
	                    var tab = tabs[key];
	                    entries.push(tab);
	                }
	            }
	        }

	        var totalEnt = elemList.length - 1;
	        totalEnt += 2; //user email and name is part of calculation
	        var filledEntries = entries.length;
	        var percent = parseInt((totalEnt - filledEntries) * 100 / totalEnt);
	        return {
	            entries: entries,
	            percent: percent
	        };
	    };

	    util.profileTabsCalculator = function (profile) {
	        var entries = [];
	        var tabs = {
	            name: { key: 'name', title: 'name', contentTitle: "What is your name?", type: "text" },
	            tel: { key: 'tel', title: 'contact', contentTitle: "What is your contact number", type: "text" },
	            age: { key: 'age', title: 'age', contentTitle: 'What is your age?' },
	            height_ft: { key: 'height_ft', title: 'height', contentTitle: "What is your height", type: "text" },
	            sex: { key: 'sex', title: 'sex', contentTitle: "What is your gender?", type: "text" },
	            diet_type: { key: 'diet_type', title: 'food preference', contentTitle: "What is your food preference?", type: "text" },
	            weight: { key: 'weight', title: 'weight', contentTitle: "What is your weight (kg)", type: "text" },
	            goal: { key: 'goal', title: 'goal', contentTitle: "what is your goal?", type: "text" },
	            details: { key: 'details', title: 'Medical History', contentTitle: "Have you had any past illness?", type: "text" },
	            house_no: { key: 'house_no', title: 'House no./Flat no.', contentTitle: "House no./Flat no.?", type: "text" },
	            street: { key: 'street', title: 'Street address', contentTitle: "Street address/Society name?", type: "text" },
	            city: { key: 'city', title: 'city', contentTitle: "In which city do you live?", type: "text" },
	            country: { key: 'country', title: 'country', contentTitle: "Your country?", type: "text" },
	            state: { key: 'state', title: 'state', contentTitle: "In which state do you live?", type: "text" },
	            pincode: { key: 'pincode', title: 'pincode', contentTitle: "What is your pincode?", type: "text" },
	            certificates: { key: 'certificates', title: 'Medical Report', contentTitle: "Upload Report", type: "text" }
	        };
	        var elemList = ["name", "tel", "age", "height_ft", "sex", "diet_type", "weight", "goal", "details", "house_no", "street", "city", "country", "state", "pincode"];
	        for (var key in profile) {
	            if (profile[key] == "" || profile[key] == null || profile[key] == undefined) {
	                if (elemList.indexOf(key) >= 0) {
	                    var tab = tabs[key];
	                    entries.push(tab);
	                }
	            }
	        }

	        var totalEnt = elemList.length - 1;
	        totalEnt += 2; //user email and name is part of calculation
	        var filledEntries = entries.length;
	        var percent = parseInt((totalEnt - filledEntries) * 100 / totalEnt);
	        return {
	            entries: entries,
	            percent: percent
	        };
	    };

	    util.toolsUsed = function (profileData) {
	        var stats = false;
	        if (profileData && profileData.extraStatistics[0]) {
	            if (profileData.extraStatistics[0].exerciseLevel && profileData.extraStatistics[0].exerciseLevel != "") {
	                stats = profileData.extraStatistics[0];
	                var height = util.toCentimeter(profileData.height_ft, profileData.height_in);
	                var bmrResult = util.calculateBMR(stats.exerciseLevel, profileData.sex, profileData.age, profileData.weight, height, stats.fat);
	                stats.bmr = bmrResult.bmr;
	                stats.message = {};
	                var gender = profileData.sex;
	                gender = gender.toLowerCase();
	                if (stats.fat < 20 && gender == "female" || stats.fat < 10 && gender == "male") {
	                    stats.message.l1 = "You’re doing";
	                    stats.message.l2 = "superb !";
	                } else if (stats.fat == 20 && gender == "female" || gender == "male" && stats.fat >= 10 && stats.fat <= 15) {
	                    stats.message.l1 = "It seems you’re in";
	                    stats.message.l2 = "good shape";
	                } else if (stats.fat > 20 && stats.fat <= 25 && gender == "female" || stats.fat > 15 && stats.fat <= 20 && gender == "male") {
	                    stats.message.l1 = "It seems you’re still a little";
	                    stats.message.l2 = "overweight";
	                } else if (stats.fat > 25 && gender == "female" || stats.fat > 20 && gender == "male") {
	                    stats.message.l1 = "You need to get your fat % lower,";
	                    stats.message.l2 = "keep pushing further";
	                }
	                return stats;
	            }
	        }
	        return stats;
	    };

	    util.calculateBMR = function (clientActivity, gender, clientAge, clientWt, clientHt, clientFat) {
	        var addFactor, wtMultiple, htMultiple, ageMultiple, tee;
	        switch (gender) {
	            case 'Male':
	                addFactor = 66.5;
	                wtMultiple = 13.75;
	                htMultiple = 5.003;
	                ageMultiple = 6.755;
	                break;
	            default:
	                addFactor = 655.1;
	                wtMultiple = 9.563;
	                htMultiple = 1.850;
	                ageMultiple = 4.676;
	        }
	        var teeMultiple = 0;
	        switch (parseInt(clientActivity)) {
	            case 1:
	                teeMultiple = 1.2;
	                break;
	            case 2:
	                teeMultiple = 1.375;
	                break;
	            case 3:
	                teeMultiple = 1.55;
	                break;
	            case 4:
	                teeMultiple = 1.725;
	                break;
	            case 5:
	                teeMultiple = 1.9;
	                break;
	        }
	        var localClientWt = clientFat < 20 ? clientWt : clientWt - .2 * clientWt;
	        var bmr = addFactor + wtMultiple * localClientWt + htMultiple * clientHt - ageMultiple * clientAge;
	        bmr = Math.round(bmr * 100) / 100;
	        tee = Math.round(bmr * teeMultiple * 100) / 100;
	        return {
	            'bmr': bmr,
	            'tee': tee
	        };
	    };

	    util.bodyFatPercent = function (gender, weight, waist, wrist, hip, forearm) {
	        // convert weight to pound
	        weight = parseInt(weight) * 2.20462;
	        waist = parseInt(waist);
	        wrist = parseInt(wrist);
	        hip = parseInt(hip);
	        forearm = parseInt(forearm);

	        var factor1 = 0,
	            factor2 = 0;
	        var leanBodyMass = 0,
	            bodyFatWeight = 0,
	            bodyFatPercent = 0;
	        if (gender == 'Female') {
	            factor1 = weight * 0.732 + 8.987;
	            factor2 = wrist / 3.140;
	            var factor3 = waist * 0.157;
	            var factor4 = hip * 0.249;
	            var factor5 = forearm * 0.434;
	            leanBodyMass = factor1 + factor2 - factor3 - factor4 + factor5;
	        } else {
	            factor1 = weight * 1.082 + 94.42;
	            factor2 = waist * 4.15;
	            leanBodyMass = factor1 - factor2;
	        }
	        bodyFatWeight = weight - leanBodyMass;
	        bodyFatPercent = bodyFatWeight * 100 / weight;
	        return bodyFatPercent;
	    };

	    util.dateDiff = {

	        inDays: function (d1, d2) {
	            var t2 = d2.getTime();
	            var t1 = d1.getTime();

	            return parseInt((t2 - t1) / (24 * 3600 * 1000));
	        },

	        inWeeks: function (d1, d2) {
	            var t2 = d2.getTime();
	            var t1 = d1.getTime();

	            return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
	        },

	        inMonths: function (d1, d2) {
	            var d1Y = d1.getFullYear();
	            var d2Y = d2.getFullYear();
	            var d1M = d1.getMonth();
	            var d2M = d2.getMonth();

	            return d2M + 12 * d2Y - (d1M + 12 * d1Y);
	        },

	        inYears: function (d1, d2) {
	            return d2.getFullYear() - d1.getFullYear();
	        }
	    };

	    util.getCurrentWeek = function (startDate, endDate) {
	        startDate.setHours(0, 0, 0, 0);
	        endDate.setHours(0, 0, 0, 0);

	        var weekDate = new Date(startDate);
	        var today = new Date();

	        today.setHours(0, 0, 0, 0);
	        weekDate.setHours(0, 0, 0, 0);
	        var weeks = 0;
	        while (weekDate < endDate && weekDate <= today) {
	            weekDate.setDate(weekDate.getDate() + 7);
	            weeks++;
	        }
	        return weeks;
	    };

	    util.getLastPostWeek = function (startDate, endDate, postDate) {
	        startDate.setHours(0, 0, 0, 0);
	        endDate.setHours(0, 0, 0, 0);

	        var weekDate = new Date(startDate);
	        var postWeekDate = new Date(postDate);

	        postWeekDate.setHours(0, 0, 0, 0);
	        weekDate.setHours(0, 0, 0, 0);
	        var weeks = 0;
	        while (weekDate < endDate && weekDate <= postWeekDate) {
	            weekDate.setDate(weekDate.getDate() + 7);
	            weeks++;
	        }
	        return weeks;
	    };

	    util.getParameterByName = function (name, url) {
	        if (!url) {
	            url = $window.location.href;
	        }
	        name = name.replace(/[\[\]]/g, "\\$&");
	        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	            results = regex.exec(url);
	        if (!results) return null;
	        if (!results[2]) return '';
	        return decodeURIComponent(results[2].replace(/\+/g, " "));
	    };

	    util.getAvailableSlotPercent = function (bookedSlots, totalSlots) {
	        if (!bookedSlots || !totalSlots) {
	            return 0;
	        }
	        return bookedSlots / totalSlots * 100;
	    };

	    util.weekStatisticsCalculator = function (startDate, endDate, stats) {
	        startDate.setHours(0, 0, 0, 0);
	        endDate.setHours(0, 0, 0, 0);

	        var weekDate = new Date(startDate);
	        var today = new Date();

	        today.setHours(0, 0, 0, 0);
	        weekDate.setHours(0, 0, 0, 0);

	        var weekArray = [];
	        var localDate;
	        var weeks = 0;

	        var nutrition = {};
	        var training = {};

	        while (weekDate < endDate && weekDate <= today) {

	            var weekend = new Date(weekDate);
	            weekend.setDate(weekDate.getDate() + 7);

	            nutrition[weeks] = [];
	            for (var dc in stats.dietChart_data) {
	                if (stats.dietChart_data[dc].post_date) {
	                    localDate = new Date(stats.dietChart_data[dc].post_date.replace(/\s/, 'T'));
	                    if (localDate >= weekDate && localDate <= weekend) {
	                        nutrition[weeks].push(stats.dietChart_data[dc]);
	                    }
	                }
	            }
	            training[weeks] = [];
	            for (var tc in stats.trainingChart_data) {
	                if (stats.trainingChart_data[tc].post_date) {
	                    localDate = new Date(stats.trainingChart_data[tc].post_date.replace(/\s/, 'T'));
	                    if (localDate >= weekDate && localDate <= weekend) {
	                        training[weeks].push(stats.trainingChart_data[tc]);
	                    }
	                }
	            }

	            weekArray[weeks] = {
	                training: training[weeks],
	                nutrition: nutrition[weeks]
	            };

	            for (var wd in stats.week_data) {
	                if (stats.week_data[wd].post_date) {
	                    localDate = new Date(stats.week_data[wd].post_date.replace(/\s/, 'T'));
	                    if (localDate >= weekDate && localDate <= weekend) {
	                        stats.week_data[wd].week_no = weeks + 1;
	                        weekArray[weeks].week = stats.week_data[wd];
	                    }
	                }
	            }
	            weekDate.setDate(weekDate.getDate() + 7);
	            weekDate.setHours(0, 0, 0);
	            weeks++;
	        }

	        for (var count in weekArray) {
	            if (!weekArray[count].week) {
	                weekArray[count].week = {
	                    'week_no': parseInt(count) + 1
	                };
	            }
	        }

	        return weekArray;
	    };

	    // get week by of present year
	    util.getWeek = function () {
	        Date.prototype.getWeek = function () {
	            var onejan = new Date(this.getFullYear(), 0, 1);
	            return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
	        };
	        var weekNumber = new Date().getWeek();
	        return weekNumber;
	    };
	}]);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('messageService', [function () {

	    return {
	        success: {
	            profileUpdate: { message: "Success, profile updated.", classes: "alert-success notify-success" },
	            changePassword: { message: "Success, password changed.", classes: "alert-success notify-success" },
	            uploadCertificate: { message: "Success, certificate uploaded.", classes: "alert-success notify-success" },
	            uploadStatistics: { message: "Success, progress data uploaded.", classes: "alert-success notify-success" },
	            submitTicket: { message: "Your ticket has been submitted.", classes: "alert-success notify-success" },
	            updateTicket: { message: "Your ticket has been updated.", classes: "alert-success notify-success" },
	            uploadPic: { message: "Profile picture uploaded.", classes: "alert-success notify-success" },
	            submitForm: { message: "Thank you for contacting us, we will get in touch with you soon !", classes: "alert-success notify-success" },
	            login: { message: "Login success.", classes: "alert-success notify-success" },
	            passwordReset: { message: "We have sent your login details, please check your inbox.", classes: "alert-success notify-success" },
	            signup: { message: "User registered successfully, we have sent a verification link on your email ID.", classes: "alert-success notify-success" },
	            activateAccount: { message: "Congratulations! your account has been verified.", classes: "alert-success notify-success" },
	            removeReport: { message: "Report has been deleted.", classes: "alert-success notify-success" },
	            submitFeedback: { message: "Thanks for providing feedback.", classes: "alert-success notify-success" },
	            bookAppointment: { message: "Your appointment is booked.", classes: "alert-success notify-success" },
	            newChallengePost: { message: "Your post is created.", classes: "alert-success notify-success" },
	            updateChallengePost: { message: "Your post is updated.", classes: "alert-success notify-success" },
	            postMarkedValid: { message: "Post is marked valid.", classes: "alert-success notify-success" },
	            postMarkedInvalid: { message: "Post is marked invalid.", classes: "alert-success notify-success" },
	            postDeleted: { message: "Post is deleted.", classes: "alert-success notify-success" },
	            challengepostvalid: { message: "Your post is marked valid by the admins", classes: "alert-success notify-success" },
	            company_email_verify: { message: "Your corporate account is verified", classes: "alert-success notify-success" },
	            companyEmailVerifySent: { message: "Thank you, We have sent a link on your corporate id. Please click on the link to activate your corporate profile", classes: "alert-success notify-success" },
	            bookCorporatePackageCheckout: { message: "To activate your corporate profile please verify the email we sent on your corporate email id, else select 'None' in company email", classes: "alert-success notify-success" },
	            corporateProfileDeactivated: { message: "Your corporate profile is deactivated", classes: "alert-success notify-success" },
	            winReport: { message: "We have sent you the detailed wellness report on your corporate email-id.", classes: "alert-success notify-success" }
	        },
	        error: {
	            takewinassessment: { message: "Please take the wellness assessment to proceed with the enrollment.", classes: "alert-danger notify-danger" },
	            slotsFull: { message: "Error, slots are not available, please try enrolling again.", classes: "alert-danger notify-danger" },
	            renewalConsultant: { message: "You haven't enrolled with this mentor before, please try as a fresh enrollment.", classes: "alert-danger notify-danger" },
	            profileUpdate: { message: "Error, cannot update profile, please try again.", classes: "alert-danger notify-danger" },
	            changePassword: { message: "Error, cannot update password.", classes: "alert-danger notify-danger" },
	            uploadStatistics: { message: "Error, cannot upload progress.", classes: "alert-danger notify-danger" },
	            submitTicket: { message: "Error, cannot submit ticket.", classes: "alert-danger notify-danger" },
	            updateTicket: { message: "Error, cannot update ticket.", classes: "alert-danger notify-danger" },
	            uploadPic: { message: "Error, cannot upload profile picture.", classes: "alert-danger notify-danger" },
	            submitForm: { message: "Error, Please try again.", classes: "alert-danger notify-danger" },
	            login: { message: "Wrong Email or password, please try again.", classes: "alert-danger notify-danger" },
	            passwordReset: { message: "User with this email address does not exist.", classes: "alert-danger notify-danger" },
	            emailExist: { message: "User with this email address already exist.", classes: "alert-danger notify-danger" },
	            dietChartData: { message: "Your coach has not uploaded any diet charts.", classes: "alert-danger notify-danger" },
	            trainingChartData: { message: "Your coach has not uploaded any training charts.", classes: "alert-danger notify-danger" },
	            batch: { message: "Batch not available for this date.", classes: "alert-danger notify-danger" },
	            verify: { message: "User not verified, please check your inbox for verification link." },
	            activeateAccount: { message: "Oops! Your account is not verified, please check your email for verification link.", classes: "alert-danger notify-danger" },
	            auth: { message: "Unauthorized access.", classes: "alert-danger notify-danger" },
	            enrolled: { message: "You're already enrolled for this course.", classes: "alert-danger notify-danger" },
	            coachExist: { message: "You're already enrolled with a Coach.", classes: "alert-danger notify-danger" },
	            removeReport: { message: "Report does not exist.", classes: "alert-danger notify-danger" },
	            coachIdNotExist: { message: "Error, Coach does not exist", classes: "alert-danger notify-danger" },
	            challengepostdeleted: { message: "Your post is deleted by the admins for not meeting the guidelines", classes: "alert-danger notify-danger" },
	            challengepostinvalid: { message: "Your post is marked invalid by the admins for not meeting the guidelines", classes: "alert-danger notify-danger" },
	            slotNotAvailable: { message: "Sorry this appointment slot is not available, please choose another time slot.", classes: "alert-danger notify-danger" },
	            invalidCompanyEmail: { message: "Not a valid company email.", classes: "alert-danger notify-danger" },
	            company_email_verify: { message: "Couldn't verify Please try again.", classes: "alert-danger notify-danger" },
	            companyNotAvailable: { message: "Sorry your company is currently not available.", classes: "alert-danger notify-danger" },
	            winReport: { message: "Unable send the detailed report, please try again.", classes: "alert-danger notify-danger" },
	            corporateProfileActivate: { message: "Sorry, we couldn't activate your corporate profile, please try again!", classes: "alert-danger notify-danger" },
	            alreadyBookedappointment: { message: "Sorry you have already booked an appointment today.", classes: "alert-danger notify-danger" }

	        },
	        progress: {
	            uploadPic: { message: "Uploading... Please wait", classes: "alert-success notify-success" },
	            loading: { message: "Please wait...", classes: "alert-success notify-success" }
	        },
	        required: {
	            login: { message: "Please log in to enrol." },
	            date: { message: "Please select the date." },
	            profile: { message: "Please update your profile first." }
	        }
	    };
	}]);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('crmService', ['$http', 'crmBaseUrl', function ($http, crmBaseUrl) {

	    this.saveLead = function (leadDetails, callback) {
	        $http({
	            'method': 'POST',
	            'data': { "email": leadDetails['email'],
	                "gender": leadDetails['gender'],
	                "height": leadDetails['height'],
	                "weight": leadDetails['weight'],
	                "age": leadDetails['age'],
	                "lastname": leadDetails['lastname'],
	                "goal": leadDetails['goal']
	            },
	            'url': crmBaseUrl + 'postCrmLead'
	        }).success(function (response) {
	            callback(response);
	        }).error(function (response) {
	            callback(response);
	        });
	    };
	}]);

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.service('careerService', ['$http', 'serviceBase', 'Upload', function ($http, serviceBase, Upload) {
	  this.submitForm = function (form, file, postCategory, successCallback, errorCallback) {
	    Upload.upload({
	      url: serviceBase + '/careers',
	      data: { 'form': form, 'category': postCategory },
	      file: file
	    }).then(function (resp) {
	      successCallback(resp);
	    }, function (resp) {
	      errorCallback(resp);
	    });
	  };
	}]);

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	var squatsApp = __webpack_require__(1).squatsApp;

	squatsApp.controller('careerCtrl', ['$scope', 'careerService', 'notify', 'messageService', 'serviceBase', '$http', '$window', function ($scope, careerService, notify, messageService, serviceBase, $http, $window) {
	    var career = this;
	    var formdata = new FormData();
	    career.selectedIndex = 0;
	    career.form = {};
	    career.submitForm = function () {
	        careerService.submitForm(career.form, career.file, career.category, function (res) {
	            notify(messageService.success.submitForm);
	            career.selectedIndex = 0;
	            career.form = {};
	            career.file = null;
	        });
	    };

	    career.jobApply = function (category) {
	        career.apply = true;
	        career.selectedIndex = 1;
	        switch (category) {
	            case 'Sr-Android-dev':
	                career.category = 'Sr. Android developer';
	                break;

	            case 'Sr-iOS-dev':
	                career.category = 'Sr. iOS developer';
	                break;

	            case 'Sr-Full-Stack-dev':
	                career.category = 'Sr. Full stack developer';
	                break;

	            case 'AI-dev':
	                career.category = 'AI developer';
	                break;
	        }
	    };
	}]);

/***/ })
/******/ ]);
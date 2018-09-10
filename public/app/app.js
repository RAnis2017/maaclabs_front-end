var newmanApp = angular.module('newmanApp', ['auth0.auth0', 'angular-storage', 'angular-jwt', 'ngRoute', 'google-signin', 'ui.router', 'facebook', 'ngSanitize', 'rzModule', 'ezfb']);

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'config.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }
 newmanApp.run(function($rootScope, $http) {
      loadJSON(function(response) {
      // Parse JSON string into object
        $rootScope.filesVersion = JSON.parse(response).version;
        $rootScope.apiUrl = JSON.parse(response).apiUrl;
        $http({
            method: 'POST',
            url: $rootScope.apiUrl+'visitors'
        }).then(function successCallback(response) {
            console.log(response.data.apiToken);
            localStorage.setItem('api_access_token', response.data.apiToken);

        }, function errorCallback(response) {
            console.log(response)
        });
     });

 })
newmanApp.config(['jwtInterceptorProvider', '$httpProvider', 'angularAuth0Provider', '$provide', '$routeProvider', '$stateProvider', '$locationProvider', function(jwtInterceptorProvider, $httpProvider, angularAuth0Provider, $provide, $routeProvider, $stateProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.view.html'
        })
        .when('/workout', {
            templateUrl: 'views/workout.view.html'
        })
        .when('/workout/:id', {
            templateUrl: 'views/single-workout.view.html'
        })
        .when('/exercise', {
            templateUrl: 'views/exercise.view.html'
        })
        .when('/exercise/:id', {
            templateUrl: 'views/single-exercise.view.html'
        })
        .when('/trainers', {
            templateUrl: 'views/trainers.view.html'
        })
        .when('/trainers/:id', {
            templateUrl: 'views/single-trainer.view.html'
        })
        .when('/exercisegroup/:id', {
            templateUrl: 'views/group-exercise.view.html'
        })
        .when('/diet', {
            templateUrl: 'views/recipes.view.html'
        })
        .when('/recipe/:id', {
            templateUrl: 'views/single-recipe.view.html'
        })
        .when('/contactus', {
            templateUrl: 'views/contact.view.html'
        })
        .when('/about', {
            templateUrl: 'views/about.view.html'
        })
        .when('/privacypolicy', {
            templateUrl: 'views/privacypolicy.view.html'
        })
        .when('/calculators', {
            templateUrl: 'views/calculators.view.html'
        })
        .when('/404', {
            templateUrl: 'views/404.view.html'
        })
        .otherwise('/404');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.view.html'
        })
        .state('trainer', {
            url: '/trainer',
            templateUrl: 'views/exercise.view.html'

        })
        // $stateProvider
        //     .state('login', {
        //         url: '/login/:username',
        //         templateUrl: 'login.html'
        //     }).state('workoutsingle', {
        //         url: '/workout/single/:workout',
        //         templateUrl: 'views/single-workout.view.html',
        //         controller: 'SingleWorkout',
        //         params: {
        //             paramOne: { singleworkout: "there is no workout" }, //default value

    //         }
    //     })
    angularAuth0Provider.init({
        clientID: 'VhwnayuYEAyzgrzb_u3BR7WKO4X_YQa3',
        domain: 'gym-genhex.auth0.com',
        responseType: 'token id_token',
        audience: 'https://gym-genhex.auth0.com/userinfo',
        redirectUri: 'http://localhost:81/newman/public/user/',
        scope: 'openid'
    });
}]);
newmanApp.service('authService', authService);

authService.$inject = ['$state', 'angularAuth0', '$timeout'];

function authService($state, angularAuth0, $timeout) {

    function login() {
        angularAuth0.authorize();
    }

    return {
        login: login
    }
}

newmanApp.controller("vm", function($scope, $element) {

    //FIND script and eval
    var js = $element.find("script")[0].innerHTML;
    eval(js);

});
// GOOGLE AUTH
newmanApp.config(['GoogleSigninProvider', function(GoogleSigninProvider) {
    GoogleSigninProvider.init({
        client_id: '466493020051-3kp7ja1o86oteptsrp8hvavc17mdr484.apps.googleusercontent.com',
    });
}]);
newmanApp.config(function(FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('433847516707016');
})

.controller('authenticationCtrl', function($scope, Facebook) {

    $scope.login = function() {
        // From now on you can use the Facebook service just as Facebook api says
        Facebook.login(function(response) {
            // Do something with response.
        });
    };

    $scope.getLoginStatus = function() {
        Facebook.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
        });
    };

    $scope.me = function() {
        Facebook.api('/me', function(response) {
            $scope.user = response;
        });
    };
});
newmanApp.controller('AuthCtrl', ['$scope', "$state", 'GoogleSignin', '$http', '$window', 'Facebook', '$rootScope', function($scope, $state,

    GoogleSignin, $http, $window, Facebook, $rootScope) {

    $scope.loginStatus = 'disconnected';
    $scope.facebookIsReady = false;
    $scope.user = null;
    $scope.loginFB = function() {
        Facebook.login(function(response) {
            $scope.loginStatus = response.status;
        });
    };
    $scope.removeAuth = function() {
        Facebook.api({
            method: 'Auth.revokeAuthorization'
        }, function(response) {
            Facebook.getLoginStatus(function(response) {
                $scope.loginStatus = response.status;
            });
        });
    };
    $scope.api = function() {
        Facebook.api('/me', function(response) {
            $scope.user = response;
        });
    };
    $scope.$watch(function() {
        return Facebook.isReady();
    }, function(newVal) {
        if (newVal) {
            $scope.facebookIsReady = true;
        }
    });
    $scope.user = "";
    $scope.login = function() {
        GoogleSignin.signIn().then(function(user) {
            console.log(user.w3.ig);
            $scope.user = user.w3.ig;
            console.log("WORKS");
            $state.go("login", { username: user.w3.ig });
        }, function(err) {
            console.log(err);
        });
    };
    $scope.type = 3;
    $scope.success = 0;
    $scope.loginmanual = function() {
        $http({
            method: 'POST',
            url: $rootScope.apiUrl+'users/login',
            data: {
                "email": $scope.email,
                "password": $scope.password,
                "type": $scope.type
            }
        }).then(function successCallback(response) {

            console.log(response)
            localStorage.setItem('access_token', response.data.token);


            $scope.success = 1;
            $scope.email = "";
            $scope.password = "";
            $scope.type = "";
            $window.location.reload();
        }, function errorCallback(response) {
            console.log(response)
        });

    };
}]);
newmanApp.controller('secondCtrl', ["$scope", "$state", "$stateParams", function($scope, $state, $stateParams) {
    $scope.username = $stateParams.username;
}]);


// FACEBOOK AUTH


// newmanApp.config(function(FacebookProvider) {
//     // Set your appId through the setAppId method or
//     // use the shortcut in the initialize method directly.
//     FacebookProvider.init('1622696361096342');
// })

// newmanApp.controller('authenticationCtrl', function($scope, Facebook) {

//     $scope.loginfb = function() {
//         // From now on you can use the Facebook service just as Facebook api says
//         Facebook.login(function(response) {
//             // Do something with response.
//             console.log(response);
//         });
//     };

//     $scope.getLoginStatus = function() {
//         Facebook.getLoginStatus(function(response) {
//             if (response.status === 'connected') {
//                 $scope.loggedIn = true;
//             } else {
//                 $scope.loggedIn = false;
//             }
//         });
//     };

//     $scope.me = function() {
//         Facebook.api('/me', function(response) {
//             $scope.user = response;
//         });
//     };
// });
// $scope.$watch(function() {
//     // This is for convenience, to notify if Facebook is loaded and ready to go.
//     return Facebook.isReady();
// }, function(newVal) {
//     // You might want to use this to disable/show/hide buttons and else
//     $scope.facebookReady = true;
// });
window.onload = function() {
    //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        //loop: true,
        mousewheelControl: true,
        paginationClickable: true,
        keyboardControl: true,

        // If we need pagination
        pagination: '.swiper-pagination',

        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    })
};

newmanApp.controller('swiperCtrl', ['$scope', function($scope) {
    $scope.coaches = [{
        name: "Dhishant Abrol",
        intro: `Congratulations and welcome to my profile.

        Hi, I am Dhishant Abrol your fitness and nutrition coach.

        - I am an INFS Certified Expert Consultant.
        My total experience is 2 years.
        I specialize in Fat loss,Bodybuilding, Genera...`,
        coachpic: "images/trainer1.png",
        id: 2332
    }, {
        name: "Sanne Leenman",
        intro: `Online physique coach, international public speaker, international model, WBFF fitness competitor and entrepreneur, I'm Sanne Leenman. I started out as a chubby, unhealthy teenager that wanted to transform. `,
        coachpic: "images/trainer2.png",
        id: 2333
    }, {
        name: "Dipankar Mazumder",
        intro: `Hi I am Dipankar Mazumder and I am certified by the International Sports Science Association (ISSA) in Sports Nutrition. I have been able to guide more than 700 individuals till now to transform their physical condition`,
        coachpic: "images/trainer3.png",
        id: 2334
    }, {
        name: "Aditya Tiwari",
        intro: `Hello, I am Aditya Tiwari, certified by INFS (Expert level). I specialise in Fat loss, Transformations, general well-being, and muscle building. While you are reading this, I can assure you that you are just a step away from a com`,
        coachpic: "images/trainer4.png",
        id: 2335
    }];


}]);

(function() {

    'use strict';

    angular
        .module('tokenAuthApp.components.auth', [])
        .controller('authLoginController', authLoginController);

    authLoginController.$inject = [];

    function authLoginController() {
        /*jshint validthis: true */
        const vm = this;
        vm.test = 'just a test';
    }

})();

newmanApp.controller('CoachController', ['$scope', function($scope) {
    $scope.coaches = [{
        name: "Dhishant Abrol",
        intro: `Congratulations and welcome to my profile.

        Hi, I am Dhishant Abrol your fitness and nutrition coach.

        - I am an INFS Certified Expert Consultant.
        My total experience is 2 years.
        I specialize in Fat loss,Bodybuilding, Genera...`,
        coachpic: "images/trainer1.png",
        id: 2332
    }, {
        name: "Sanne Leenman",
        intro: `Online physique coach, international public speaker, international model, WBFF fitness competitor and entrepreneur, I'm Sanne Leenman. I started out as a chubby, unhealthy teenager that wanted to transform. `,
        coachpic: "images/trainer2.png",
        id: 2333
    }, {
        name: "Dipankar Mazumder",
        intro: `Hi I am Dipankar Mazumder and I am certified by the International Sports Science Association (ISSA) in Sports Nutrition. I have been able to guide more than 700 individuals till now to transform their physical condition`,
        coachpic: "images/trainer3.png",
        id: 2334
    }, {
        name: "Aditya Tiwari",
        intro: `Hello, I am Aditya Tiwari, certified by INFS (Expert level). I specialise in Fat loss, Transformations, general well-being, and muscle building. While you are reading this, I can assure you that you are just a step away from a com`,
        coachpic: "images/trainer4.png",
        id: 2335
    }];
}])



newmanApp.controller('workoutsController', ['$scope', '$http', '$window','$rootScope', function($scope, $http, $window, $rootScope) {
        $scope.workouts = []
        $scope.workoutg = []
        $scope.loadworkouts = function() {
            $http({
                method: 'GET',
                url: $rootScope.apiUrl+'workouts/getworkouts/'+localStorage.getItem('api_access_token'),
            }).then(function successCallback(response) {
                for (i = 0; i < response.data.length; i++) {
                    response.data[i].workoutdays = $.parseJSON(response.data[i].workoutdays);
                }
                $scope.workouts = response.data;
                console.log(response)
            }, function errorCallback(response) {
                console.log(response)
            });
            $http({
                method: 'GET',
                url: $rootScope.apiUrl+'workouts/getworkoutgroups/'+localStorage.getItem('api_access_token'),
            }).then(function successCallback(response) {
                $scope.workoutg = response.data;
                console.log(response)
            }, function errorCallback(response) {
                console.log(response)
            });

            // if ($window.location.href.indexOf('#loaded') == -1) {
            //     $window.location = window.location + '#loaded';
            //     $window.location.reload();
            // }

        };

    }]).directive("owlCarousel", function() {
        return {
            restrict: 'E',
            transclude: false,
            link: function(scope) {
                scope.initCarousel = function(element) {
                    // provide any default options you want
                    var defaultOptions = {};
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for (var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    // init carousel
                    $(element).owlCarousel(defaultOptions);
                };
            }
        };
    })
    .directive('owlCarouselItem', [function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element) {
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }]);

newmanApp.controller('recipesController', ['$scope', '$http','$rootScope', function($scope, $http ,$rootScope) {
    $scope.recipes = [];
    $scope.loadrecipes = function() {
        $http({
            method: 'GET',
            url: $rootScope.apiUrl+'recipes/getrecipes/'+localStorage.getItem('api_access_token'),
        }).then(function successCallback(response) {
            for (i = 0; i < response.data.length; i++) {
                response.data[i].ingredients = $.parseJSON(response.data[i].ingredients);
                response.data[i].directions = $.parseJSON(response.data[i].directions);
            }
            $scope.recipes = response.data;
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
        });

    };

}]);

newmanApp.controller('calculatorsController', ['$scope', '$http', function($scope, $http) {
    $scope.calculator = 0;
    $scope.bpf = 0;
    $scope.bpfF = {};
    $scope.bpfM = {};
    $scope.solved = 0;
    $scope.solvedM = 0;
    $scope.solvedBMI = 0;
    $scope.solvedTDE = 0;
    $scope.solvedBFM = 0;
    $scope.solvedLEAN = 0;
    $scope.solvedRMR = 0;
    $scope.solvedBMR = 0;
    $scope.solvedWTH = 0;
    $scope.bmi = {};
    $scope.tde = {};
    $scope.lean = {};
    $scope.rmr = {};
    $scope.bmr = {};
    $scope.wth = {};
    $scope.bodyfatmass = {};
    $scope.bpfcalc = function() {
        $scope.bpfF.bweight = ($scope.bpfF.bweight * 0.732) + 8.987
        $scope.bpfF.wrist = ($scope.bpfF.wrist / 3.140)
        $scope.bpfF.waist = ($scope.bpfF.waist * 0.157)
        $scope.bpfF.hip = ($scope.bpfF.hip * 0.249)
        $scope.bpfF.forearm = ($scope.bpfF.forearm * 0.434)
        $scope.bpfF.lean = ($scope.bpfF.bweight + $scope.bpfF.wrist - $scope.bpfF.waist - $scope.bpfF.hip + $scope.bpfF.forearm)
        $scope.bpfF.fat = $scope.bpfF.bweight - $scope.bpfF.lean
        $scope.bpfF.fatpercentage = ($scope.bpfF.fat * 100) / $scope.bpfF.bweight
        $scope.solved = 1;
    }
    $scope.bpfcalcMale = function() {
        $scope.bpfM.bweight = ($scope.bpfM.bweight * 1.082) + 94.42
        $scope.bpfM.waist = ($scope.bpfM.waist * 4.15)
        $scope.bpfM.lean = ($scope.bpfM.bweight - $scope.bpfM.waist)
        $scope.bpfM.fat = $scope.bpfM.bweight - $scope.bpfM.lean
        $scope.bpfM.fatpercentage = ($scope.bpfM.fat * 100) / $scope.bpfM.bweight
        $scope.solvedM = 1;
    }
    $scope.bmicalc = function() {
        $scope.bmi.calc = ($scope.bmi.weight / Math.pow($scope.bmi.height, 2));
        $scope.solvedBMI = 1;
    }
    $scope.tdecalc = function() {
        $scope.tde.calc = ($scope.tde.rmr * $scope.tde.af);
        $scope.solvedTDE = 1;
    }
    $scope.fatmass = function() {
        $scope.bodyfatmass.calc = ($scope.bodyfatmass.fatpercentage * $scope.bodyfatmass.weight);
        $scope.solvedBFM = 1;
    }
    $scope.leanmass = function() {
        $scope.lean.calc = ($scope.lean.weight - $scope.lean.fatmass);
        $scope.solvedLEAN = 1;
    }
    $scope.rmr = function() {
        $scope.rmr.calc = ($scope.rmr.weight * 10);
        $scope.solvedRMR = 1;
    }

    $scope.bmr = function() {
        $scope.bmr.calcF = 655 + (4.35 * $scope.bmr.weight) + (4.7 * $scope.bmr.height) - (4.7 * $scope.bmr.age);
        $scope.bmr.calcM = 66 + (6.23 * $scope.bmr.weight) + (12.7 * $scope.bmr.height) - (6.8 * $scope.bmr.age);
        $scope.solvedBMR = 1;
    }
    $scope.wth = function() {
        $scope.wth.calc = ($scope.wth.waist / $scope.wth.hip);
        $scope.solvedWTH = 1;
    }
}]);

newmanApp.controller('trainersController', ['$scope', '$http','$rootScope', function($scope, $http,$rootScope) {
    $scope.trainers = []
    $scope.priceSlider1 = 0;
    $scope.priceSlider2 = 7500;
    $scope.search = {};
    $scope.loadtrainers = function() {
        $http({
            method: 'GET',
            url: $rootScope.apiUrl+'trainers/getAll/'+localStorage.getItem('api_access_token'),
        }).then(function successCallback(response) {

            $scope.trainers = response.data.user;
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
        });
    };

}]);

newmanApp.controller('exercisesController', ['$state', '$scope', '$routeParams', '$http', '$sce','$rootScope', function($state, $scope, $routeParams, $http, $sce,$rootScope) {
    $scope.exercises = []
    $scope.id = $routeParams.id;

    $scope.loadexercises = function() {
        $http({
            method: 'GET',
            url: $rootScope.apiUrl+'exercises/getexercises/'+localStorage.getItem('api_access_token'),
        }).then(function successCallback(response) {

            $scope.exercises = response.data;
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
        });

    };

}]);

newmanApp.controller('Controllersignup', ['$state', '$scope', '$routeParams', '$http', '$sce', '$window','$rootScope', function($state, $scope, $routeParams, $http, $sce, $window,$rootScope) {

    $scope.success = 0;
    $scope.signup = function() {
        $http({
            method: 'POST',
            url: $rootScope.apiUrl+'users/signup',
            data: {
                "name": $scope.name,
                "email": $scope.email,
                "password": $scope.password,
                "type": $scope.type
            }
        }).then(function successCallback(response) {

            console.log(response)
            localStorage.setItem('access_token', response.data.token);
            $scope.success = 1;
            $window.location.reload();
        }, function errorCallback(response) {
            console.log(response)
        });

    };

}]);

newmanApp.controller('navbar', ['$state', '$scope', '$routeParams', '$http', '$sce', '$window','$rootScope', function($state, $scope, $routeParams, $http, $sce, $window,$rootScope) {

    $scope.loggedIn = 0;


    $scope.checkAuth = function() {
        $http({
            method: 'POST',
            url: $rootScope.apiUrl+'users/authenticate',
            data: {
                "token": localStorage.getItem('access_token')
            }
        }).then(function successCallback(response) {

            console.log(response)
            if (response.data.user[0].type == 1) {
                $scope.loggedIn = 1;
            } else if (response.data.user[0].type == 2) {
                $scope.loggedIn = 2;
            } else if (response.data.user[0].type == 3) {
                $scope.loggedIn = 3;
            } else {
                $scope.loggedIn = 0;
            }
        }, function errorCallback(response) {
            console.log(response)
            $scope.loggedIn = 0;
        });

    };

    $scope.logout = function() {
        localStorage.removeItem('access_token');
        $window.location.reload();
    }

}]);

newmanApp.controller('SingleWorkout', ['$state', '$scope', '$routeParams', '$http', '$sce','$rootScope', function($state, $scope, $routeParams, $http, $sce,$rootScope) {

    // $scope.paramOne = $stateParams.paramOne;
    // console.log($stateParams.workout);
    $scope.id = $routeParams.id;
    $scope.loadworkouts = function() {
        $http({
            method: 'GET',
            url: $rootScope.apiUrl+'workouts/getworkout/' + $scope.id +'/'+localStorage.getItem('api_access_token'),
        }).then(function successCallback(response) {
            response.data[0].workoutdays = $.parseJSON(response.data[0].workoutdays);
            $scope.workout = response.data;
            $scope.fulldescription = $sce.trustAsHtml($scope.workout.fulldescription);

            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
        });
        $scope.deliberatelyTrustDangerousSnippet = function() {
            return $sce.trustAsHtml($scope.fulldescription);
        };
    }

}]);

newmanApp.controller('SingleRecipe', ['$state', '$scope', '$routeParams', '$http', '$sce','$rootScope', function($state, $scope, $routeParams, $http, $sce,$rootScope) {

    // $scope.paramOne = $stateParams.paramOne;
    // console.log($stateParams.workout);
    $scope.id = $routeParams.id;

    $scope.loadrecipe = function() {
        $http({
            method: 'GET',
            url: $rootScope.apiUrl+'recipes/getrecipe/' + $scope.id +'/'+localStorage.getItem('api_access_token'),
        }).then(function successCallback(response) {
            console.log(response)
            response.data.recipe[0].ingredients = $.parseJSON(response.data.recipe[0].ingredients);
            response.data.recipe[0].directions = $.parseJSON(response.data.recipe[0].directions);
            $scope.recipe = response.data.recipe[0];
            $scope.description = $sce.trustAsHtml($scope.recipe.description);


        }, function errorCallback(response) {
            console.log(response)
        });
        $scope.deliberatelyTrustDangerousSnippet = function() {
            return $sce.trustAsHtml($scope.description);
        };
    }

}]);


newmanApp.controller('SingleTrainer', ['$state', '$scope', '$routeParams', '$http', '$sce','$rootScope', function($state, $scope, $routeParams, $http, $sce,$rootScope) {

    // $scope.paramOne = $stateParams.paramOne;
    // console.log($stateParams.workout);
    $scope.trainer = []
    $scope.packages = []
    $scope.transformations = []
    $scope.pictures = []
    $scope.certificates = []
    $scope.socials = []
    $scope.success = 0;
    $scope.id = $routeParams.id;
    $scope.loadtrainers = function() {
        $http({
            method: 'POST',
            url: $rootScope.apiUrl+'users/authenticate',
            data: {
                "token": localStorage.getItem('access_token')
            }
        }).then(function successCallback(response) {

            console.log(response)
            if (response.data.user[0].type == 1) {
                $scope.loggedIn = 1;
            } else if (response.data.user[0].type == 2) {
                $scope.loggedIn = 2;
            } else if (response.data.user[0].type == 3) {
                $scope.loggedIn = 3;
            } else {
                $scope.loggedIn = 0;
            }
        }, function errorCallback(response) {
            console.log(response)
            $scope.loggedIn = 0;
        });
        $http({
            method: 'GET',
            url: $rootScope.apiUrl+'trainers/getAllWhere/' + $scope.id +'/'+localStorage.getItem('api_access_token'),
        }).then(function successCallback(response) {



            $scope.trainer = response.data.user[0];
            $scope.packages = JSON.parse(response.data.user[0].package);
            $scope.transformations = JSON.parse(response.data.user[0].transformation);
            $scope.pictures = JSON.parse(response.data.user[0].pictures);
            $scope.certificates = JSON.parse(response.data.user[0].certification);
            $scope.socials = JSON.parse(response.data.user[0].social);
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
        });
        $scope.deliberatelyTrustDangerousSnippet = function() {
            return $sce.trustAsHtml($scope.trainer.experience);
        };
        $scope.deliberatelyTrustDangerousSnippet1 = function() {
            return $sce.trustAsHtml($scope.trainer.about);
        };

    }
    $scope.loggedIn = 0;

    $scope.trainerApprove = function(i) {
        $scope.trainer.approved = i;
    }
    $scope.updateTrainer = function() {
        $http({
            method: 'POST',
            url: $rootScope.apiUrl+'users/trainer/adminUpdate',
            data: {
                "token": localStorage.getItem('access_token'),
                "price": $scope.trainer.price,
                "packagetype": $scope.trainer.packagetype,
                "approved": $scope.trainer.approved,
                "id": $scope.trainer.id
            }
        }).then(function successCallback(response) {
            if (response.data.success == 1) {
                $scope.success = 1;
            }
            console.log(response)

        }, function errorCallback(response) {
            console.log(response)

        });

    };
}]);


newmanApp.controller('SingleExercise', ['$state', '$scope', '$routeParams', '$http', '$sce','$rootScope', function($state, $scope, $routeParams, $http, $sce,$rootScope) {

    // $scope.paramOne = $stateParams.paramOne;
    // console.log($stateParams.workout);
    $scope.id = $routeParams.id;
    $scope.loadexercises = function() {
        $http({
            method: 'GET',
            url: $rootScope.apiUrl+'exercises/getexercise/' + $scope.id +'/'+localStorage.getItem('api_access_token'),
        }).then(function successCallback(response) {
            $scope.exercise = response.data;
            $scope.description = $sce.trustAsHtml($scope.exercise.description);

            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
        });
        $scope.deliberatelyTrustDangerousSnippet = function() {
            return $sce.trustAsHtml($scope.description);
        };
    }

}]);

newmanApp.controller('TestimonialController', ['$scope', function($scope) {
    $scope.testimonials = [{
        clientname: "Swati Prajapati",
        coachname: "Monika Sharma",
        clientpic: "images/client1.jpg",
        coachpic: "images/home-3-2-571x483.jpg",
        intro: `Monika is very encouraging,supportive and always reachable. She never gave up on me,11kgs lighter,all because of her. She is an amazing mentor!`,
        id: 2332
    }, {
        clientname: "Swati Prajapati",
        coachname: "Monika Sharma",
        clientpic: "images/client1.jpg",
        coachpic: "images/home-3-3-571x483.jpg",
        intro: `Monika is very encouraging,supportive and always reachable. She never gave up on me,11kgs lighter,all because of her. She is an amazing mentor!`,
        id: 2332
    }, {
        clientname: "Swati Prajapati",
        coachname: "Monika Sharma",
        clientpic: "images/client1.jpg",
        coachpic: "images/home-3-4-571x483.jpg",
        intro: `Monika is very encouraging,supportive and always reachable. She never gave up on me,11kgs lighter,all because of her. She is an amazing mentor!`,
        id: 2332
    }, {
        clientname: "Swati Prajapati",
        coachname: "Monika Sharma",
        clientpic: "images/client1.jpg",
        coachpic: "images/home-3-2-571x483.jpg",
        intro: `Monika is very encouraging,supportive and always reachable. She never gave up on me,11kgs lighter,all because of her. She is an amazing mentor!`,
        id: 2332
    }];
}])

newmanApp.controller('quickLinksController', ['$scope', function($scope) {
    $scope.links = [{
        linkname: "Who We Are",
        info: "Get to know more about us. Get to know more about us. Get to know more about us. Get to know more about us",
        url: "whoweare.html"
    }, {
        linkname: "Hot Offers",
        info: "See all the hot new offers. See all the hot new offers. See all the hot new offers. See all the hot new offers",
        url: "hotoffers.html"
    }, {
        linkname: "Top Diets",
        info: "Get to know the top diets. Get to know the top diets. Get to know the top diets. Get to know the top diets",
        url: "topdiets.html"
    }, {
        linkname: "Useful Info",
        info: "Other very useful other information. Other very useful other information. Other very useful other information. Other very useful other information",
        url: "usefulinfo.html"
    }];
}])

var newmanApp = angular.module('newmanApp', ['ngRoute', 'google-signin', 'ui.router', 'facebook', 'ngSanitize']);

newmanApp.config(['$routeProvider', '$stateProvider', '$locationProvider', function($routeProvider, $stateProvider, $locationProvider) {
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
        }).otherwise('/');

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
}]);

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
newmanApp.controller('AuthCtrl', ['$scope', "$state", 'GoogleSignin', function($scope, $state,
    GoogleSignin) {
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

newmanApp.controller('workoutsController', ['$scope', '$http', function($scope, $http) {
    $scope.workouts = []
    $scope.workoutg = []
    $scope.loadworkouts = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:81/newmanapi/public/workouts/getworkouts',
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
            url: 'http://localhost:81/newmanapi/public/workouts/getworkoutgroups',
        }).then(function successCallback(response) {
            $scope.workoutg = response.data;
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
        });
    };

}]);

newmanApp.controller('exercisesController', ['$scope', '$http', function($scope, $http) {
    $scope.exercises = []
    $scope.loadexercises = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:81/newmanapi/public/exercises/getexercises',
        }).then(function successCallback(response) {

            $scope.exercises = response.data;
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
        });

    };

}]);

newmanApp.controller('SingleWorkout', ['$state', '$scope', '$routeParams', '$http', '$sce', function($state, $scope, $routeParams, $http, $sce) {

    // $scope.paramOne = $stateParams.paramOne;
    // console.log($stateParams.workout);
    $scope.id = $routeParams.id;
    $scope.loadworkouts = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:81/newmanapi/public/workouts/getworkout/' + $scope.id,
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

newmanApp.controller('SingleExercise', ['$state', '$scope', '$routeParams', '$http', '$sce', function($state, $scope, $routeParams, $http, $sce) {

    // $scope.paramOne = $stateParams.paramOne;
    // console.log($stateParams.workout);
    $scope.id = $routeParams.id;
    $scope.loadexercises = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:81/newmanapi/public/exercises/getexercise/' + $scope.id,
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
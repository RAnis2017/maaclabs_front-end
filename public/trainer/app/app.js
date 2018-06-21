var userApp = angular.module('userApp', ['ngRoute', 'wingify.timePicker', 'plotly', 'ngQuill', 'ngSanitize']);

userApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html'
        })
        .when('/mycoach', {
            templateUrl: 'views/mycoach.html'
        })
        .when('/myprogress', {
            templateUrl: 'views/myprogress.html'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html'
        }).otherwise({
            redirectTo: '/dashboard'
        });
}]);
userApp.directive("fileread", [function() {
    return {
        scope: {
            fileread: "="
        },
        link: function(scope, element, attributes) {
            element.bind("change", function(changeEvent) {
                var reader = new FileReader();
                reader.onload = function(loadEvent) {
                    scope.$apply(function() {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
userApp.controller('UserAuth', ['$window', '$scope', '$routeParams', '$http', '$sce', function($window, $scope, $routeParams, $http, $sce) {
    $scope.loggedIn = 0;
    $scope.certificate = {};
    $scope.package = {};
    $scope.social = {};
    $scope.transformation = {};
    $scope.picture = {};
    $scope.tpicture = {};
    $scope.video = {};
    $scope.certificates = [];
    $scope.socials = [];
    $scope.transformations = [];
    $scope.pictures = [];
    $scope.packages = [];
    $scope.tpictures = [];
    $scope.videos = [];
    $scope.success = 3;
    $scope.addCert = function() {
        $scope.certificates.push({
            title: $scope.certificate.title,
            date: $scope.certificate.date,
            description: $scope.certificate.description,
        })
    }
    $scope.addSocial = function() {
        $scope.socials.push({
            website: $scope.social.website,
            username: $scope.social.username,
            link: $scope.social.link,
        })
    }
    $scope.addPackage = function() {
        $scope.packages.push({
            name: $scope.package.name,
            duration: $scope.package.duration,
            description: $scope.package.description,
            support: $scope.package.support,
            dayfrom: $scope.package.dayfrom,
            dayto: $scope.package.dayto,
            time: $scope.package.time,
            price: "",
        })
    }
    $scope.addTransformation = function() {
        $scope.transformations.push({
            name: $scope.transformation.name,
            description: $scope.transformation.description,
            pictures: $scope.tpictures
        })
    }
    $scope.addPicture = function() {
        $scope.pictures.push({
            picture: $scope.picture.picture
        })
    }
    $scope.addPictureTransformation = function() {
        $scope.tpictures.push({
            picture: $scope.tpicture.picture
        })
    }

    $scope.addVideo = function() {
        $scope.videos.push({
            video: $scope.video.text
        })
    }
    $scope.save = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:81/newmanapi/public/users/trainer/update',
            data: {
                "token": localStorage.getItem('access_token'),
                "id": $scope.user.id,
                "name": $scope.user.name,
                "gender": $scope.user.gender,
                "email": $scope.user.email,
                "phone": $scope.user.phone,
                "dob": $scope.user.dob,
                "experience": $scope.user.experience,
                "profile_pic": $scope.user.profile_pic,
                "about": $scope.user.about,
                "max_client": $scope.user.max_client,
                "certification": JSON.stringify($scope.certificates),
                "pictures": JSON.stringify($scope.pictures),
                "videos": JSON.stringify($scope.videos),
                "transformation": JSON.stringify($scope.transformations),
                "social": JSON.stringify($scope.socials),
                "package": JSON.stringify($scope.packages)

            }
        }).then(function successCallback(response) {

            console.log(response);
            try {
                if (response.data.success == 1) {
                    console.log(response)
                    $scope.success = 1;

                } else {
                    $scope.success = 0;
                }
            } catch (err) {
                $scope.success = 0;
            }
        }, function errorCallback(response) {
            $scope.success = 2;
        });
    }
    $scope.user;
    $scope.redirect = 'http://localhost:81/newman/public/';
    $scope.checkAuth = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:81/newmanapi/public/users/authenticate',
            data: {
                "token": localStorage.getItem('access_token')
            }
        }).then(function successCallback(response) {

            if (response.data.hasOwnProperty("user")) {
                if (response.data.user[0].type == "1") {
                    console.log(response)
                    $scope.loggedIn = 1;
                    $scope.user = response.data.user[0];
                    $scope.certificates = JSON.parse($scope.user.certification);
                    $scope.pictures = JSON.parse($scope.user.pictures);
                    $scope.videos = JSON.parse($scope.user.videos);
                    $scope.transformations = JSON.parse($scope.user.transformation);
                    $scope.socials = JSON.parse($scope.user.social);
                    $scope.packages = JSON.parse($scope.user.package);
                    $scope.user.dob = new Date($scope.user.dob.split('T')[0]);
                }
            } else {
                $window.location.href = $scope.redirect; //You should have http here.
            }
        }, function errorCallback(response) {
            console.log(response)
            $window.location.href = $scope.redirect; //You should have http here.
        });

    };
    $scope.logout = function() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
    }
}])
userApp.controller('profile', ['$scope', function($scope) {
    // Set initial time range to be 05:30 - 10:10
    $scope.settings = {
        dropdownToggleState: false,
        time: {
            fromHour: '05',
            fromMinute: '30',
            toHour: '10',
            toMinute: '10'
        },
        theme: 'dark',
        noRange: false,
        format: 24,
        noValidation: false
    };
    $scope.settings1 = {
        dropdownToggleState: false,
        time: {
            fromHour: '05',
            fromMinute: '30',
            toHour: '10',
            toMinute: '10'
        },
        theme: 'dark',
        noRange: false,
        format: 24,
        noValidation: false
    };
    $scope.onApplyTimePicker = function() {
        console.log('Time range applied.');
    };
    $scope.onClearTimePicker = function() {
        console.log('Time range current operation cancelled.');
    };
    $scope.onApplyTimePicker1 = function() {
        console.log('Time range applied.');
    };
    $scope.onClearTimePicker1 = function() {
        console.log('Time range current operation cancelled.');
    };
}])

userApp.controller('plotly', function($scope, $timeout) {
    var weight = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter',
        name: 'Weight'
    };
    var bodyfat = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter',
        name: 'Body Fat'
    };
    var waist = {
        x: [1, 2, 3, 4],
        y: [11, 12, 13, 18],
        type: 'scatter',
        name: 'Waist'
    };
    var chest = {
        x: [1, 2, 3, 4],
        y: [26, 25, 21, 29],
        type: 'scatter',
        name: 'Chest'
    };
    var arm = {
        x: [1, 2, 3, 4],
        y: [20, 25, 23, 27],
        type: 'scatter',
        name: 'Arm'
    };
    var quads = {
        x: [1, 2, 3, 4],
        y: [23, 25, 29, 39],
        type: 'scatter',
        name: 'Quads'
    };
    var musclemass = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter',
        name: 'Muscle Mass'
    };
    $scope.data = [
        weight,
        bodyfat,
        waist,
        chest,
        arm,
        quads,
        musclemass

    ];


    $scope.layout = { height: 600, width: 1200, title: 'Progress Graph' };
    $scope.options = { showLink: false, displayLogo: false };
    $scope.movePoint = function() {
        // deep watch will pick up change.
        $scope.data[0].y[40]++;
    }
    $scope.NumberOfSelectedPoints = 0;
    $scope.plotlyEvents = function(graph) {
        // Create custom events that subscribe to graph
        graph.on('plotly_selected', function(event) {
            if (event) {
                $timeout(function() {
                    $scope.NumberOfSelectedPoints = event.points.length;
                });
            }
        });
    };
});
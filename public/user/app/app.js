var userApp = angular.module('userApp', ['ngRoute', 'wingify.timePicker', 'plotly']);

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
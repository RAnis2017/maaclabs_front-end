var userApp = angular.module('userApp', ['ngRoute', 'wingify.timePicker', 'plotly']);
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../config.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }
 userApp.run(function($rootScope) {
      loadJSON(function(response) {
      // Parse JSON string into object
        $rootScope.filesVersion = JSON.parse(response).version;
        $rootScope.apiUrl = JSON.parse(response).apiUrl;

        console.log($rootScope.filesVersion);
     });

 })
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
        .when('/calculators', {
            templateUrl: 'views/calculators.html'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html'
        }).otherwise({
            redirectTo: '/dashboard'
        });
}]);
userApp.controller('calculatorsController', ['$scope', '$http', function($scope, $http) {
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

userApp.controller('UserAuth', ['$window', '$scope', '$routeParams', '$http', '$sce', '$rootScope', function($window, $scope, $routeParams, $http, $sce, $rootScope) {
    $scope.loggedIn = 0;

    $scope.checkAuth = function() {
        setTimeout(function(){
          $http({
              method: 'POST',
              url: $rootScope.apiUrl+'users/authenticate',
              data: {
                  "token": localStorage.getItem('access_token')
              }
          }).then(function successCallback(response) {


              try {
                  if (response.data.user[0].type == 2) {
                      console.log(response)
                      $scope.loggedIn = 1;
                  } else {
                      $window.location.href = '/newman/public/'; //You should have http here.
                  }
              } catch (err) {
                  $window.location.href = '/newman/public/'; //You should have http here.
              }
          }, function errorCallback(response) {
              console.log(response)
              $window.location.href = '/newman/public/'; //You should have http here.
          });
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

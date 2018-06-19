var adminApp = angular.module('adminApp', ['ngRoute', 'ngQuill']);

adminApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/admin', {
            templateUrl: 'views/dashboard.html'
        })
        .when('/managetrainers', {
            templateUrl: 'views/managetrainers.html'
        })
        .when('/totaltrainers', {
            templateUrl: 'views/totaltrainers.html'
        })
        .when('/totalusers', {
            templateUrl: 'views/totalusers.html'
        })
        .when('/manageexercise', {
            templateUrl: 'views/manageexercise.html'
        })
        .when('/manageworkout', {
            templateUrl: 'views/manageworkout.html'
        })
        .when('/managerecipes', {
            templateUrl: 'views/managerecipes.html'
        })
        .when('/managedietplans', {
            templateUrl: 'views/managediet.html'
        })
        .when('/manageoffers', {
            templateUrl: 'views/manageoffers.html'
        }).otherwise({
            redirectTo: '/admin'
        });
}]);
adminApp.controller("vm", function($scope, $element) {

    //FIND script and eval
    var js = $element.find("script")[0].innerHTML;
    eval(js);

});
adminApp.service('sharedProperties', function() {
    var formExercises = [{
        id: 0,
        name: "Dumbells",
        description: "Use dumbells for this exercise",
        videoUrl: "https://youtu.be/y1r9toPQNkM"
    }];

    var duration = [];
    var exerciseID = [];
    var exerciseName = [];
    var exerciseDescription = [];
    var exerciseVideoUrl = [];
    return {
        getformExercises: function() {
            return formExercises;
        },
        getDuration: function() {
            return duration;
        },
        getExerciseID: function() {
            return exerciseID;
        },
        getExerciseName: function() {
            return exerciseName;
        },
        getExerciseDescription: function() {
            return exerciseDescription;
        },
        getExerciseVideoUrl: function() {
            return exerciseVideoUrl;
        },
        setformExercises: function(value) {
            formExercises = value;
        }
    };
});
adminApp.factory('dataService', function() {

    // private variable
    var _dataObj = {};

    // public API
    return {
        dataObj: _dataObj
    };
})
adminApp.controller('workoutdayController', ['$scope', 'sharedProperties', 'dataService', '$rootScope', '$http', function($scope, shared, dataService, $rootScope, $http) {
    $scope.formExercises = shared.getformExercises();

    $scope.removeExercise = function(exercise) {
        var removedExercise = $scope.exercises.indexOf(exercise);
        $scope.exercises.splice(removedExercise, 1);
    };
    $scope.removeFormExercise = function(exercise) {
        var removedExercise = $scope.formExercises.indexOf(exercise);
        $scope.formExercises.splice(removedExercise, 1);
        shared.setformExercises($scope.formExercises.splice(removedExercise, 1));
    };
    $scope.dayexercises = [];
    $scope.exercises = [{
            id: 0,
            name: "Dumbells",
            description: "Use dumbells for this exercise",
            videoUrl: "https://youtu.be/y1r9toPQNkM",

        },
        {
            id: 1,
            name: "Pullups",
            description: "Use rod to pull yourself up for this exercise",
            videoUrl: "https://youtu.be/y1r9toPQNkM"
        },
        {
            id: 2,
            name: "Pushups",
            description: "Use ground for this exercise",
            videoUrl: "https://youtu.be/y1r9toPQNkM"
        },
        {
            id: 3,
            name: "Squats",
            description: "Use dumbells to do better squats for this exercise",
            videoUrl: "https://youtu.be/y1r9toPQNkM"
        }
    ];
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
    $scope.dayexercisesmod = [];
    $scope.addExercise = function(exercise, index) {

        $scope.dayexercises.push({
            id: $scope.dayexercises.length + 1,
            name: exercise.name,
            reps: $scope.dayexercisesmod[index].reps,
            sets: $scope.dayexercisesmod[index].sets
        });

        $scope.dayexercisesmod[index].name = "";
        $scope.dayexercisesmod[index].reps = "";
        $scope.dayexercisesmod[index].sets = "";


    };

    $scope.workoutday = [];
    $scope.addWorkoutDay = function() {
        $scope.workoutday.push({
            id: $scope.workoutday.length + 1,
            name: $scope.workoutday.name,
            description: $scope.workoutday.description,
            exercises: $scope.dayexercises,
        });
        $scope.workoutday.name = "";
        $scope.workoutday.description = "";
        $scope.dayexercises = [];
        dataService.workoutday = $scope.workoutday;
    };
    $rootScope.$on("CallParentMethod", function() {
        $scope.parentmethod();
    });

    $scope.parentmethod = function() {
        $scope.workoutday = [];
    }
}])
adminApp.controller('exerciseController', ['$scope', 'sharedProperties', 'dataService', '$rootScope', '$http', function($scope, shared, dataService, $rootScope, $http) {
    $scope.exegroups = ['Full Body', 'Neck', 'Shoulders', 'Chest', 'Biceps', 'Forearms', 'Abs', 'Quads', 'Traps', 'Triceps', 'Lats', 'Middle Back', 'Lower Back', 'Glutes', 'Hamstrings', 'Calves']
    $scope.removeExercise = function(exercise) {
        var removedExercise = $scope.exercises.indexOf(exercise);
        $scope.exercises.splice(removedExercise, 1);
    };

    $scope.exercises = [{
            id: 0,
            name: "Dumbells",
            description: "Use dumbells for this exercise",
            videoUrl: "https://youtu.be/y1r9toPQNkM"
        },
        {
            id: 1,
            name: "Pullups",
            description: "Use rod to pull yourself up for this exercise",
            videoUrl: "https://youtu.be/y1r9toPQNkM"
        },
        {
            id: 2,
            name: "Pushups",
            description: "Use ground for this exercise",
            videoUrl: "https://youtu.be/y1r9toPQNkM"
        },
        {
            id: 3,
            name: "Squats",
            description: "Use dumbells to do better squats for this exercise",
            videoUrl: "https://youtu.be/y1r9toPQNkM"
        }
    ];
    $scope.addExercise = function() {
        $scope.exercises.push({
            id: $scope.exercises.length + 1,
            name: $scope.newexercise.name,
            description: $scope.newexercise.description,
            group1: $scope.newexercise.group1,
            type: $scope.newexercise.type,
            equipment: $scope.newexercise.equipment,
            level: $scope.newexercise.level,
            secondary: $scope.newexercise.secondary,
            videoUrl: $scope.newexercise.video,
            image: $scope.newexercise.image,
            groupid: $scope.newexercise.groupid
        });
        $scope.successE = 0;
        console.log($scope.newexercise.groupid);
        $http({
            method: 'POST',
            url: 'http://localhost:81/newmanapi/public/exercises/addexercise',
            data: {
                "name": $scope.newexercise.name,
                "videourl": $scope.newexercise.video,
                "group1": $scope.newexercise.group1,
                "type": $scope.newexercise.type,
                "equipment": $scope.newexercise.equipment,
                "level": $scope.newexercise.level,
                "secondary": $scope.newexercise.secondary,
                "description": $scope.newexercise.description,
                "image": $scope.newexercise.image,
                "group_id": $scope.newexercise.groupid
            }
        }).then(function successCallback(response) {
            $scope.successE = 1
            console.log(response)
            $scope.newexercise.name = "";
            $scope.newexercise.videourl = "";
            $scope.newexercise.description = "";
            $scope.newexercise.image = "";
        }, function errorCallback(response) {
            $scope.successE = 2
            console.log(response)
        });

    };
    $scope.updateExercise = function(id, exercise) {
        $scope.successEU = 0
        $http({
            method: 'PUT',
            url: 'http://localhost:81/newmanapi/public/exercises/updateexercise/' + id,
            data: {
                "name": exercise.name,
                "videourl": exercise.videourl,
                "group1": exercise.group1,
                "type": exercise.type,
                "equipment": exercise.equipment,
                "level": exercise.level,
                "secondary": exercise.secondary,
                "description": exercise.description,
                "image": exercise.image,
                "group_id": exercise.group_id
            }
        }).then(function successCallback(response) {
            $scope.successEU = 1
            console.log(response)

        }, function errorCallback(response) {
            $scope.successEU = 2
            console.log(response)
        });
    };
    $scope.deleteExercise = function(id) {
        $scope.successED = 0;

        $http({
            method: 'DELETE',
            url: 'http://localhost:81/newmanapi/public/exercises/deleteexercise/' + id,
        }).then(function successCallback(response) {
            $scope.successED = 1
            console.log(response)

        }, function errorCallback(response) {
            $scope.successED = 2
            console.log(response)
        });
    };
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
    $scope.formExercises = shared.getformExercises();

    $scope.addToForm = function(exercise) {
        $scope.formExercises.push({
            id: exercise.id,
            name: exercise.name,
            description: exercise.description,
            videoUrl: exercise.video,
        });
        shared.setformExercises($scope.formExercises);
    };
}]);

adminApp.directive("fileread", [function() {
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

adminApp.controller('workoutController', ['$scope', 'sharedProperties', 'dataService', '$rootScope', '$http', function($scope, shared, dataService, $rootScope, $http) {


    $scope.removeWorkout = function(workout) {
        var removedExercise = $scope.workouts.indexOf(workout);
        $scope.workouts.splice(removedExercise, 1);
    };

    $scope.removeWorkoutExercise = function(exercise) {
        var removedExercise = $scope.workoutexercises.indexOf(exercise);
        $scope.workoutexercises.splice(removedExercise, 1);
    };
    $scope.successWOU = 0;
    $scope.updateWorkout = function(id, wd) {
        $http({
            method: 'PUT',
            url: 'http://localhost:81/newmanapi/public/workouts/updateworkout/' + id,
            data: {
                "name": wd.name,
                "videourl": wd.videourl,
                "description": wd.description,
                "group": wd.group_id,
                "position": wd.position,
                "fulldescription": wd.fulldesc,
                "result": wd.result,
                "type": wd.type,
                "level": wd.level,
                "duration": wd.duration,
                "daysperworkout": wd.daysperworkout,
                "timeperworkout": wd.timeperworkout,
                "equipment": wd.equipment,
                "targetgender": wd.targetgender,
                "supplements": wd.supplements,
                "author": wd.author,
                "pdf": wd.pdf,
                "image": wd.image,
                "workoutdays": wd.workoutdays
            }
        }).then(function successCallback(response) {
            $scope.successWOU = 1
            console.log(response)

        }, function errorCallback(response) {
            $scope.successWOU = 2
            console.log(response)
        });
    };
    $scope.successWOD = 0
    $scope.deleteWorkout = function(id) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:81/newmanapi/public/workouts/deleteworkout/' + id,
        }).then(function successCallback(response) {
            $scope.successWOD = 1
            console.log(response)

        }, function errorCallback(response) {
            $scope.successWOD = 2
            console.log(response)
        });
    };

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


    $scope.workouts = [{
            id: 0,
            name: "7 Day Workout",
            description: "Use dumbells for this workout",
            result: "Slim Fitness",
            from: 1,
            to: 20,
            exercises: [{
                id: 0,
                name: "Dumbells",
                description: "Use dumbells for this exercise",
                videoUrl: "asdf",
                duration: 6
            }, {
                id: 2,
                name: "Bench",
                description: "Use Bench for this exercise",
                videoUrl: "asdf",
                duration: 9
            }, {
                id: 1,
                name: "Rod",
                description: "Use Rod for this exercise",
                videoUrl: "asdf",
                duration: 2
            }],

        },
        {
            id: 1,
            name: "Muscle Building Workout",
            description: "Use benching for this workout",
            result: "Build Muscle",
            from: 20,
            to: 40,
            exercises: [{
                id: 2,
                name: "Dumbells",
                description: "Use dumbells for this exercise",
                videoUrl: "asdf",
                duration: 6
            }, {
                id: 1,
                name: "Butterfly",
                description: "Use machine for this exercise",
                videoUrl: "asdf",
                duration: 9
            }, {
                id: 3,
                name: "Rod",
                description: "Use Rod for this exercise",
                videoUrl: "asdf",
                duration: 2
            }],

        }
    ];
    $scope.workoutexercises = [];
    $scope.addtoExercises = function(exercise, duration) {
        $scope.workoutexercises.push({
            id: exercise.id,
            name: exercise.name,
            description: exercise.description,
            videoUrl: exercise.videoUrl,
            duration: duration
        });
    }
    $scope.workoutday = dataService.workoutday;

    $scope.workoutg = [{
        id: 0,
        name: "Fat Loss Exercises"
    }];
    $scope.newworkoutgroup = {};
    $scope.showw = false;
    $scope.success = 0;
    $scope.addWorkoutGroup = function() {
        $scope.workoutg.push({
            id: $scope.workoutg.length + 1,
            name: $scope.newworkoutgroup.gname,
            position: $scope.newworkoutgroup.gposition
        });

        $http({
            method: 'POST',
            url: 'http://localhost:81/newmanapi/public/workouts/addworkoutgroup',
            data: {
                "name": $scope.newworkoutgroup.gname,
                "position": $scope.newworkoutgroup.gposition
            }
        }).then(function successCallback(response) {
            $scope.success = 1
            console.log(response)
            $scope.newworkoutgroup.gname = "";
        }, function errorCallback(response) {
            $scope.success = 2
            console.log(response)
        });
    }

    $scope.addWorkout = function() {

        $scope.workouts.push({
            id: $scope.workouts.length + 1,
            name: $scope.newworkout.name,
            videourl: $scope.newworkout.videourl,
            description: $scope.newworkout.description,
            group: $scope.newworkout.group,
            position: $scope.newworkout.position,
            fulldescription: $scope.newworkout.fulldesc,
            result: $scope.newworkout.result,
            type: $scope.newworkout.type,
            level: $scope.newworkout.level,
            duration: $scope.newworkout.duration,
            daysperworkout: $scope.newworkout.daysperworkout,
            timeperworkout: $scope.newworkout.timeperworkout,
            equipment: $scope.newworkout.equipment,
            targetgender: $scope.newworkout.targetgender,
            supplements: $scope.newworkout.supplements,
            author: $scope.newworkout.author,
            pdf: $scope.newworkout.pdf,
            image: $scope.newworkout.image,
            workoutdays: dataService.workoutday

        });
        $scope.successWO = 0;

        $http({
            method: 'POST',
            url: 'http://localhost:81/newmanapi/public/workouts/addworkout',
            data: {
                "name": $scope.newworkout.name,
                "videourl": $scope.newworkout.videourl,
                "description": $scope.newworkout.description,
                "group": $scope.newworkout.group,
                "position": $scope.newworkout.position,
                "fulldescription": $scope.newworkout.fulldesc,
                "result": $scope.newworkout.result,
                "type": $scope.newworkout.type,
                "level": $scope.newworkout.level,
                "duration": $scope.newworkout.duration,
                "daysperworkout": $scope.newworkout.daysperworkout,
                "timeperworkout": $scope.newworkout.timeperworkout,
                "equipment": $scope.newworkout.equipment,
                "targetgender": $scope.newworkout.targetgender,
                "supplements": $scope.newworkout.supplements,
                "author": $scope.newworkout.author,
                "pdf": $scope.newworkout.pdf,
                "image": $scope.newworkout.image,
                "workoutdays": dataService.workoutday
            }
        }).then(function successCallback(response) {
            $scope.successWO = 1
            console.log(response)
            $scope.newworkout.name = "";
            $scope.newworkout.videourl = "";
            $scope.newworkout.description = "";
            $scope.newworkout.fulldesc = "";
            $scope.newworkout.result = "";
            $scope.newworkout.type = "";
            $scope.newworkout.level = "";
            $scope.newworkout.duration = "";
            $scope.newworkout.daysperworkout = "";
            $scope.newworkout.timeperworkout = "";
            $scope.newworkout.equipment = "";
            $scope.newworkout.targetgender = "";
            $scope.newworkout.supplements = "";
            $scope.newworkout.author = "";
            $scope.newworkout.pdf = "";
            $scope.newworkout.image = "";
            dataService.workoutday = [];
            $scope.workoutday = [];
        }, function errorCallback(response) {
            $scope.successWO = 2
            console.log(response)
        });

        $rootScope.$emit("CallParentMethod", {});

    };


}]);

adminApp.controller('recipesController', ['$scope', 'sharedProperties', 'dataService', '$rootScope', '$http', function($scope, shared, dataService, $rootScope, $http) {

    $scope.ingredients = [];
    $scope.directions = [];
    $scope.removeRecipe = function(recipe) {
        var removedRecipe = $scope.recipes.indexOf(recipe);
        $scope.recipes.splice(removedRecipe, 1);
    };

    $scope.removeIngredient = function(ingre) {
        var removedIngre = $scope.ingredients.indexOf(ingre);
        $scope.ingredients.splice(removedIngre, 1);
    };

    $scope.addIngre = function(name, qty) {
        $scope.ingredients.push({
            name: name,
            quantity: qty
        });
    };

    $scope.removeDescription = function(des) {
        var removedDes = $scope.directions.indexOf(des);
        $scope.directions.splice(removedDes, 1);
    };

    $scope.addDescription = function(name, image) {
        $scope.directions.push({
            direction: name,
            image: image

        });
    };
    $scope.removeRecipe = function(id) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:81/newmanapi/public/recipes/deleterecipe/' + id,
        }).then(function successCallback(response) {
            $scope.successRD = 1
            console.log(response)

        }, function errorCallback(response) {
            $scope.successRD = 2
            console.log(response);
        });
    };


    $scope.recipes = [];
    $scope.loadrecipes = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:81/newmanapi/public/recipes/getrecipes',
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
    $scope.updateRecipe = function(id, rd) {
        $http({
            method: 'PUT',
            url: 'http://localhost:81/newmanapi/public/recipes/updaterecipe',
            data: {
                "id": rd.id,
                "name": rd.name,
                "short": rd.short,
                "description": rd.description,
                "image": rd.image,
                "time": rd.time,
                "ingredients": JSON.stringify(rd.ingredients),
                "directions": JSON.stringify(rd.directions),
                "carbs": rd.carbs,
                "proteins": rd.proteins,
                "fat": rd.fats,
                "servings": rd.servings
            }
        }).then(function successCallback(response) {
            $scope.successRU = 1
            console.log(response)

        }, function errorCallback(response) {
            $scope.successRU = 2
            console.log(response)
        });
    };
    $scope.addRecipe = function() {

        $scope.recipes.push({
            id: $scope.recipes.length + 1,
            name: $scope.recipe.name,
            short: $scope.recipe.short,
            description: $scope.recipe.description,
            image: $scope.recipe.image,
            time: $scope.recipe.time,
            ingredients: $scope.ingredients,
            directions: $scope.directions,
            carbs: $scope.recipe.carb,
            proteins: $scope.recipe.prot,
            fat: $scope.recipe.fat,
            servings: $scope.recipe.serv

        });
        $scope.successR = 0;

        $http({
            method: 'POST',
            url: 'http://localhost:81/newmanapi/public/recipes/addrecipe',
            data: {
                "name": $scope.recipe.name,
                "short": $scope.recipe.short,
                "description": $scope.recipe.description,
                "image": $scope.recipe.image,
                "time": $scope.recipe.time,
                "ingredients": JSON.stringify($scope.ingredients),
                "directions": JSON.stringify($scope.directions),
                "carbs": $scope.recipe.carb,
                "proteins": $scope.recipe.prot,
                "fat": $scope.recipe.fat,
                "servings": $scope.recipe.serv
            }
        }).then(function successCallback(response) {
            $scope.successR = 1
            console.log(response)
            $scope.recipe.name = "";
            $scope.recipe.short = "";
            $scope.recipe.time = "";
            $scope.recipe.image = "";
            $scope.ingredients = [];
            $scope.directions = [];
            $scope.recipe.description = "";
            $scope.recipe.carb = "";
            $scope.recipe.prot = "";
            $scope.recipe.fat = "";
            $scope.recipe.serv = "";
        }, function errorCallback(response) {
            $scope.successR = 2
            console.log(response);
        });


    };


}]);

adminApp.controller('dietController', ['$scope', 'sharedProperties', function($scope, shared) {


    $scope.linkedRecipes = [];

    $scope.removeAddedRecipe = function(recipe) {
        var removedRecipe = $scope.linkedRecipes.indexOf(recipe);
        $scope.linkedRecipes.splice(removedRecipe, 1);
    };

    $scope.removeDiet = function(diet) {
        var removedDiet = $scope.diets.indexOf(diet);
        $scope.diets.splice(removedDiet, 1);
    };

    $scope.addToForm = function(recipe) {
        $scope.linkedRecipes.push(recipe);
    };
    $scope.diets = [{
            id: 0,
            name: "Smoothie",
            description: "This is a very important diet",
            linked: [{
                    id: 0,
                    name: "Smoothie",
                    ingredients: [{
                        name: "Whatever Ingredient",
                        quantity: 9
                    }, {
                        name: "Another Whatever Ingredient",
                        quantity: 12
                    }],
                    directions: [{
                        direction: "Whatever Directions",

                    }, {
                        direction: "Another Whatever Directions",

                    }],
                    carbs: 42,
                    proteins: 142,
                    fat: 42,
                    servings: 8

                },
                {
                    id: 1,
                    name: "Diet Cake",
                    ingredients: [{
                        name: "Whatever Ingredient",
                        quantity: 9
                    }, {
                        name: "Another Whatever Ingredient",
                        quantity: 12
                    }],
                    directions: [{
                        direction: "Whatever Directions",

                    }, {
                        direction: "Another Whatever Directions",

                    }],
                    carbs: 42,
                    proteins: 142,
                    fat: 42,
                    servings: 8

                }
            ]

        },
        {
            id: 1,
            name: "Smoothie 2nd ",
            description: "This is a very important diet 2",
            linked: [{
                    id: 1,
                    name: "Smoothie",
                    ingredients: [{
                        name: "Whatever Ingredient",
                        quantity: 9
                    }, {
                        name: "Another Whatever Ingredient",
                        quantity: 12
                    }],
                    directions: [{
                        direction: "Whatever Directions",

                    }, {
                        direction: "Another Whatever Directions",

                    }],
                    carbs: 42,
                    proteins: 142,
                    fat: 42,
                    servings: 8

                },
                {
                    id: 1,
                    name: "Diet Cake",
                    ingredients: [{
                        name: "Whatever Ingredient",
                        quantity: 9
                    }, {
                        name: "Another Whatever Ingredient",
                        quantity: 12
                    }],
                    directions: [{
                        direction: "Whatever Directions",

                    }, {
                        direction: "Another Whatever Directions",

                    }],
                    carbs: 42,
                    proteins: 142,
                    fat: 42,
                    servings: 8

                }
            ]

        }
    ];

    $scope.addDiet = function() {

        $scope.diets.push({
            id: $scope.diets.length + 1,
            name: $scope.diet.name,
            description: $scope.diet.description,
            linked: $scope.linkedRecipes

        });
        $scope.diet.name = "";
        $scope.linkedRecipes = [];
        $scope.diet.description = "";

    };


}]);

adminApp.controller('offerController', ['$scope', 'sharedProperties', function($scope, shared) {


    $scope.removeOffer = function(offer) {
        var removedOffer = $scope.offers.indexOf(offer);
        $scope.offers.splice(removedOffer, 1);
    };

    $scope.offers = [];

    $scope.addOffer = function() {

        $scope.offers.push({
            id: $scope.offers.length + 1,
            name: $scope.offer.name,
            description: $scope.offer.description,

        });
        $scope.diet.name = "";
        $scope.diet.description = "";

    };


}]);
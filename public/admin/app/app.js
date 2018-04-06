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
adminApp.controller('workoutdayController', ['$scope', 'sharedProperties', function($scope, shared) {
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
            exercises: $scope.dayexercises[$scope.workoutday.length + 1],
        });
        $scope.workoutday.name = "";
        $scope.workoutday.description = "";
        // $scope.dayexercises = [];
    };
}])
adminApp.controller('exerciseController', ['$scope', 'sharedProperties', function($scope, shared) {



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
            videoUrl: $scope.newexercise.video,
        });
        $scope.newexercise.name = "";
        $scope.newexercise.description = "";
        $scope.newexercise.video = "";
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


adminApp.controller('workoutController', ['$scope', 'sharedProperties', function($scope, shared) {


    $scope.removeWorkout = function(workout) {
        var removedExercise = $scope.workouts.indexOf(workout);
        $scope.workouts.splice(removedExercise, 1);
    };

    $scope.removeWorkoutExercise = function(exercise) {
        var removedExercise = $scope.workoutexercises.indexOf(exercise);
        $scope.workoutexercises.splice(removedExercise, 1);
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
    $scope.addWorkout = function() {





        $scope.workouts.push({
            id: $scope.workouts.length + 1,
            name: $scope.newworkout.name,
            description: $scope.newworkout.description,
            result: $scope.newworkout.result,
            from: $scope.newworkout.from,
            to: $scope.newworkout.to,
            exercises: $scope.workoutexercises

        });
        $scope.newworkout.name = "";
        $scope.newworkout.description = "";
        $scope.newworkout.result = "";
        $scope.newworkout.from = "";
        $scope.newworkout.to = "";
        $scope.formExercises = [];
        $scope.workoutexercises = [];
    };


}]);

adminApp.controller('recipesController', ['$scope', 'sharedProperties', function($scope, shared) {

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

    $scope.addDescription = function(name) {
        $scope.directions.push({
            direction: name

        });
    };
    $scope.recipes = [{
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
    ];

    $scope.addRecipe = function() {

        $scope.recipes.push({
            id: $scope.recipes.length + 1,
            name: $scope.recipe.name,
            ingredients: $scope.ingredients,
            directions: $scope.directions,
            carbs: $scope.recipe.carb,
            proteins: $scope.recipe.prot,
            fat: $scope.recipe.fat,
            servings: $scope.recipe.serv

        });
        $scope.recipe.name = "";
        $scope.ingredients = [];
        $scope.directions = [];
        $scope.recipe.carb = "";
        $scope.recipe.prot = "";
        $scope.recipe.fat = "";
        $scope.recipe.serv = "";
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
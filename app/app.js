var newmanApp = angular.module('newmanApp', ['ngRoute']);

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

newmanApp.controller('TestimonialController', ['$scope', function($scope) {
    $scope.testimonials = [{
        clientname: "Swati Prajapati",
        coachname: "Monika Sharma",
        clientpic: "images/client1.jpg",
        coachpic: "images/coach1.png",
        intro: `Monika is very encouraging,supportive and always reachable. She never gave up on me,11kgs lighter,all because of her. She is an amazing mentor!`,
        id: 2332
    }, {
        clientname: "Swati Prajapati",
        coachname: "Monika Sharma",
        clientpic: "images/client1.jpg",
        coachpic: "images/coach1.png",
        intro: `Monika is very encouraging,supportive and always reachable. She never gave up on me,11kgs lighter,all because of her. She is an amazing mentor!`,
        id: 2332
    }, {
        clientname: "Swati Prajapati",
        coachname: "Monika Sharma",
        clientpic: "images/client1.jpg",
        coachpic: "images/coach1.png",
        intro: `Monika is very encouraging,supportive and always reachable. She never gave up on me,11kgs lighter,all because of her. She is an amazing mentor!`,
        id: 2332
    }, {
        clientname: "Swati Prajapati",
        coachname: "Monika Sharma",
        clientpic: "images/client1.jpg",
        coachpic: "images/coach1.png",
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
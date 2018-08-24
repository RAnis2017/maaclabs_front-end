<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

// Get all cutomers

$app->get('/customers', function(Request $request, Response $response){
    echo "Customers";
});
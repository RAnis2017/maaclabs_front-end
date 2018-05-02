<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

// Get all cutomers

$app->get('/workouts/addworkoutgroup', function(Request $request, Response $response){
    $name = $request->getParam('name');
    $sql = "INSERT INTO workouts_group (name) VALUES (:name)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name',$name);

        $stmt->execute();

        echo '{"notice": {"text": "Workout Group Added"}}';
    }
    catch(PDOException $e){
        echo '{"error":{"text": '.$e->getMessage().'}}';
    }
    
    
    $response->getBody()->write("Hello, $name");

    return $response;
});
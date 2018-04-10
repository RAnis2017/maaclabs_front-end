<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

require '../vendor/autoload.php';
require '../src/config/db.php';

$app = new \Slim\App;
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});
$app->post('/workouts/addworkoutgroup', function (Request $request, Response $response, array $args) {
    $name = $request->getParam('name');
    $sql = "INSERT INTO workouts_group (`name`) VALUES (:name)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);

        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Workout Group Added"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . $request->getParam('name') . '}}';
    }

    return $response;
});
$app->get('/workouts/getworkouts', function (Request $request, Response $response, array $args) {
    $sql = "SELECT * FROM workouts";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $workouts = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo json_encode($workouts);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->get('/workouts/getworkoutgroups', function (Request $request, Response $response, array $args) {
    $sql = "SELECT * FROM workouts_group";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $workoutsg = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo json_encode($workoutsg);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
function save_base64_image($base64_image_string, $output_file_without_extension, $path_with_end_slash = "")
{
    //usage:  if( substr( $img_src, 0, 5 ) === "data:" ) {  $filename=save_base64_image($base64_image_string, $output_file_without_extentnion, getcwd() . "/application/assets/pins/$user_id/"); }
    //
    //data is like:    data:image/png;base64,asdfasdfasdf
    $splited = explode(',', substr($base64_image_string, 5), 2);
    $mime = $splited[0];
    $data = $splited[1];

    $mime_split_without_base64 = explode(';', $mime, 2);
    $mime_split = explode('/', $mime_split_without_base64[0], 2);
    if (count($mime_split) == 2) {
        $extension = $mime_split[1];
        if ($extension == 'jpeg') {
            $extension = 'jpg';
        }

        //if($extension=='javascript')$extension='js';
        //if($extension=='text')$extension='txt';
        $output_file_with_extension = $output_file_without_extension . '.' . $extension;
    }
    file_put_contents($path_with_end_slash . $output_file_with_extension, base64_decode($data));
    return $output_file_with_extension;
}
function randomKey($length)
{
    $pool = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z'));
    $key = "";
    for ($i = 0; $i < $length; $i++) {
        $key .= $pool[mt_rand(0, count($pool) - 1)];
    }
    return $key;
}
$app->post('/workouts/addworkout', function (Request $request, Response $response, array $args) {
    $name = $request->getParam('name');
    $videourl = $request->getParam('videourl');
    $description = $request->getParam('description');
    $group = $request->getParam('group');
    $position = $request->getParam('position');
    $fulldescription = $request->getParam('fulldescription');
    $result = $request->getParam('result');
    $type = $request->getParam('type');
    $level = $request->getParam('level');
    $duration = $request->getParam('duration');
    $daysperworkout = $request->getParam('daysperworkout');
    $timeperworkout = $request->getParam('timeperworkout');
    $equipment = $request->getParam('equipment');
    $targetgender = $request->getParam('targetgender');
    $supplements = $request->getParam('supplements');
    $author = $request->getParam('author');
    $pdf = $request->getParam('pdf');
    $image = $request->getParam('image');
    $workoutdays = json_encode($request->getParam('workoutdays'));
    $image = save_base64_image($image, randomKey(20), '../../newman/public/images/workouts/');
    $pdf = save_base64_image($pdf, randomKey(20), '../../newman/public/images/workouts/');
    $sql = "INSERT INTO workouts (`name`,`videourl`,`description`,`group_id`,`position`,`fulldescription`,`result`,`type`,`level`,`duration`,`daysperworkout`,`timeperworkout`,`equipment`,`targetgender`,`supplements`,`author`,`pdf`,`image`,`workoutdays`) VALUES (:name,:videourl,:description,:group_id,:position,:fulldescription,:result,:type,:level,:duration,:daysperworkout,:timeperworkout,:equipment,:targetgender,:supplements,:author,:pdf,:image,:workoutdays)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':videourl', $videourl);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':group_id', $group);
        $stmt->bindParam(':position', $position);
        $stmt->bindParam(':fulldescription', $fulldescription);
        $stmt->bindParam(':result', $result);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':level', $level);
        $stmt->bindParam(':duration', $duration);
        $stmt->bindParam(':daysperworkout', $daysperworkout);
        $stmt->bindParam(':timeperworkout', $timeperworkout);
        $stmt->bindParam(':equipment', $equipment);
        $stmt->bindParam(':targetgender', $targetgender);
        $stmt->bindParam(':supplements', $supplements);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':pdf', $pdf);
        $stmt->bindParam(':image', $image);
        $stmt->bindParam(':workoutdays', $workoutdays);

        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Workout Added"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->put('/workouts/updateworkout/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $name = $request->getParam('name');
    $videourl = $request->getParam('videourl');
    $description = $request->getParam('description');
    $group = $request->getParam('group');
    $position = $request->getParam('position');
    $fulldescription = $request->getParam('fulldescription');
    $result = $request->getParam('result');
    $type = $request->getParam('type');
    $level = $request->getParam('level');
    $duration = $request->getParam('duration');
    $daysperworkout = $request->getParam('daysperworkout');
    $timeperworkout = $request->getParam('timeperworkout');
    $equipment = $request->getParam('equipment');
    $targetgender = $request->getParam('targetgender');
    $supplements = $request->getParam('supplements');
    $author = $request->getParam('author');
    $pdf = $request->getParam('pdf',"");
    $image = $request->getParam('image',"");
    $workoutdays = json_encode($request->getParam('workoutdays'));

    if ($pdf == "" && $image != "") {
        $image = save_base64_image($image, randomKey(20), '../../newman/public/images/workouts/');
        $sql = "UPDATE workouts SET
                `name` = :name,
                `videourl` = :videourl,
                `description` = :description,
                `group_id` = :group_id,
                `position` = :position,
                `fulldescription` = :fulldescription,
                `result` = :result,
                `type` = :type,
                `level` = :level,
                `duration` = :duration,
                `daysperworkout` = :daysperworkout,
                `timeperworkout` = :timeperworkout,
                `equipment` = :equipment,
                `targetgender` = :targetgender,
                `supplements` = :supplements,
                `author` = :author,

                `image` = :image,
                `workoutdays` = :workoutdays
            WHERE id = $id";
    } else if ($image == "" && $pdf != "") {
        $pdf = save_base64_image($pdf, randomKey(20), '../../newman/public/images/workouts/');
        $sql = "UPDATE workouts SET
                `name` = :name,
                `videourl` = :videourl,
                `description` = :description,
                `group_id` = :group_id,
                `position` = :position,
                `fulldescription` = :fulldescription,
                `result` = :result,
                `type` = :type,
                `level` = :level,
                `duration` = :duration,
                `daysperworkout` = :daysperworkout,
                `timeperworkout` = :timeperworkout,
                `equipment` = :equipment,
                `targetgender` = :targetgender,
                `supplements` = :supplements,
                `author` = :author,
                `pdf` = :pdf,

                `workoutdays` = :workoutdays
            WHERE id = $id";
    } else if ($image == "" && $pdf == "") {
        $sql = "UPDATE workouts SET
                `name` = :name,
                `videourl` = :videourl,
                `description` = :description,
                `group_id` = :group_id,
                `position` = :position,
                `fulldescription` = :fulldescription,
                `result` = :result,
                `type` = :type,
                `level` = :level,
                `duration` = :duration,
                `daysperworkout` = :daysperworkout,
                `timeperworkout` = :timeperworkout,
                `equipment` = :equipment,
                `targetgender` = :targetgender,
                `supplements` = :supplements,
                `author` = :author,

                `workoutdays` = :workoutdays
            WHERE id = $id";
    } else {
        $image = save_base64_image($image, randomKey(20), '../../newman/public/images/workouts/');
        $pdf = save_base64_image($pdf, randomKey(20), '../../newman/public/images/workouts/');
        $sql = "UPDATE workouts SET
                `name` = :name,
                `videourl` = :videourl,
                `description` = :description,
                `group_id` = :group_id,
                `position` = :position,
                `fulldescription` = :fulldescription,
                `result` = :result,
                `type` = :type,
                `level` = :level,
                `duration` = :duration,
                `daysperworkout` = :daysperworkout,
                `timeperworkout` = :timeperworkout,
                `equipment` = :equipment,
                `targetgender` = :targetgender,
                `supplements` = :supplements,
                `author` = :author,
                `pdf` = :pdf,
                `image` = :image,
                `workoutdays` = :workoutdays
            WHERE id = $id";
    }
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':videourl', $videourl);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':group_id', $group);
        $stmt->bindParam(':position', $position);
        $stmt->bindParam(':fulldescription', $fulldescription);
        $stmt->bindParam(':result', $result);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':level', $level);
        $stmt->bindParam(':duration', $duration);
        $stmt->bindParam(':daysperworkout', $daysperworkout);
        $stmt->bindParam(':timeperworkout', $timeperworkout);
        $stmt->bindParam(':equipment', $equipment);
        $stmt->bindParam(':targetgender', $targetgender);
        $stmt->bindParam(':supplements', $supplements);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':pdf', $pdf);
        $stmt->bindParam(':image', $image);
        $stmt->bindParam(':workoutdays', $workoutdays);

        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Workout Updated"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->delete('/workouts/deleteworkout/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $sql = "DELETE FROM workouts 
            WHERE id = $id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $workoutsg = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo '{"notice": {"text": "Workout Deleted"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->get('/workouts/getworkout/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $sql = "SELECT * FROM workouts 
            WHERE id = $id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $workout = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo json_encode($workout);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->run();

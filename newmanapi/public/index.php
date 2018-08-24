<?php
use ReallySimpleJWT\Token;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require '../src/config/db.php';
require 'src/Token.php';
use \Psr\Http\Message\ServerRequestInterface as Request;

$app = new \Slim\App;
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});
$app->post('/workouts/addworkoutgroup', function (Request $request, Response $response, array $args) {
    $name = $request->getParam('name');
    $position = $request->getParam('position');

    $sql = "INSERT INTO workouts_group (`name`,`position`) VALUES (:name,:position)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':position', $position);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Workout Group Added"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . $request->getParam('name') . '}}';
    }

    return $response;
});
$app->post('/opt-ins', function (Request $request, Response $response, array $args) {
    $name = $request->getParam('name');
    $email = $request->getParam('email');

    $sql = "INSERT INTO opt_ins (`name`,`email`) VALUES (:name,:email)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Added to Newsletter"}, success:"1"}';
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
$app->post('/exercises/addexercise', function (Request $request, Response $response, array $args) {
    $name = $request->getParam('name');
    $videourl = $request->getParam('videourl');
    $description = $request->getParam('description');
    $group1 = $request->getParam('group1');
    $type = $request->getParam('type');
    $equipment = $request->getParam('equipment');
    $level = $request->getParam('level');
    $secondary = $request->getParam('secondary');

    $image = $request->getParam('image');
    $group_id = $request->getParam('group_id');
    $image = save_base64_image($image, randomKey(20), '../../newman/public/images/exercises/');
    $sql = "INSERT INTO exercises (`name`,`videourl`,`description`,`image`,`group1`,`type`,`equipment`,`level`,`secondary`,`group_id`) VALUES (:name,:videourl,:description,:image,:group1,:type,:equipment,:level,:secondary,:group_id)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':videourl', $videourl);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':image', $image);
        $stmt->bindParam(':group1', $group1);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':equipment', $equipment);
        $stmt->bindParam(':level', $level);
        $stmt->bindParam(':secondary', $secondary);
        $stmt->bindParam(':group_id', $group_id);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Exercise Added"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->post('/recipes/addrecipe', function (Request $request, Response $response, array $args) {
    $name = $request->getParam('name');
    $short = $request->getParam('short');
    $description = $request->getParam('description');
    $time = $request->getParam('time');
    $carbs = $request->getParam('carbs');
    $proteins = $request->getParam('proteins');
    $fats = $request->getParam('fat');
    $servings = $request->getParam('servings');
    $ingredients = $request->getParam('ingredients');
    $directions = $request->getParam('directions');

    $image = $request->getParam('image');
    $image = save_base64_image($image, randomKey(20), '../../newman/public/recipes/');
    $directionspics = json_decode($directions, true);
        for($idx = 0; $idx < count($directionspics); $idx++){
            $objtpictures = (Array)$directionspics[$idx]['image'];
            
            if (strlen($directionspics[$idx]['image'])>26) {
                $directionspics[$idx]['image'] = save_base64_image($directionspics[$idx]['image'], randomKey(20), '../../newman/public/recipes/');
            }
        }
        $directionspics = json_encode($directionspics);

    $sql = "INSERT INTO recipes (`name`,`short`,`description`,`time`,`carbs`,`proteins`,`fats`,`servings`,`ingredients`,`directions`,`image`) VALUES 
    (:name,:short,:description,:time,:carbs,:proteins,:fats,:servings,:ingredients,:directions,:image)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':short', $short);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':time', $time);
        $stmt->bindParam(':carbs', $carbs);
        $stmt->bindParam(':proteins', $proteins);
        $stmt->bindParam(':fats', $fats);
        $stmt->bindParam(':servings', $servings);
        $stmt->bindParam(':ingredients', $ingredients);
        $stmt->bindParam(':directions', $directionspics);
        $stmt->bindParam(':image', $image);

        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Recipe Added"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->post('/users/signup', function (Request $request, Response $response, array $args) {
    $name = $request->getParam('name');
    $email = $request->getParam('email');
    $password = md5($request->getParam('password'));
    $type = $request->getParam('type');

    $sql = "INSERT INTO users (`name`,`email`,`password`,`type`) VALUES (:name,:email,:password,:type)";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':type', $type);
        $stmt->execute();
        $id = $db->lastInsertId();

        $db = null;
        $startDate = time();

        $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

        $token = Token::getToken('' . $id, 'se123!fe213$c!ReT423*&', $date, 'razaanis');

        echo '{"notice": {"text": "User Added"}, "token": "' . $token . '"}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->post('/users/authenticate', function (Request $request, Response $response, array $args) {
    $token = $request->getParam('token');

    $result = Token::validate($token, 'se123!fe213$c!ReT423*&');
    if ($result) {
        $result = Token::getPayload($token);
        $data = json_decode($result, true);
        $sql = "SELECT * FROM users WHERE id=" . $data['user_id'];
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->query($sql);
            $user = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            $data = json_encode($user);
            echo '{"notice": {"text": "User Authenticated"}, "success": "1", "user": ' . $data . '}';

        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }

    } else {
        echo '{"notice": {"text": "User Not Authenticated"}, "success": "0"}';
    }
    return $response;
});
$app->get('/trainers/getAll', function (Request $request, Response $response, array $args) {
    
    $sql = "SELECT * FROM users WHERE type=1";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $user = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($user);
        echo '{"notice": {"text": "Trainers Retrieved"}, "success": "1", "user": ' . $data . '}';

    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->get('/trainers/getAllWhere/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $sql = "SELECT * FROM users WHERE type=1 AND id=$id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $user = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($user);
        echo '{"notice": {"text": "Trainers Retrieved"}, "success": "1", "user": ' . $data . '}';

    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->get('/recipes/getrecipe/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $sql = "SELECT * FROM recipes WHERE id=$id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $rec = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($rec);
        echo '{"notice": {"text": "Recipe Retrieved"}, "success": "1", "recipe": ' . $data . '}';

    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->post('/users/trainer/update', function (Request $request, Response $response, array $args) {
    $token = $request->getParam('token');

    $result = Token::validate($token, 'se123!fe213$c!ReT423*&');
    if ($result) {
        $id = $request->getParam('id');
        $name = $request->getParam('name');
        $gender = $request->getParam('gender');
        $email = $request->getParam('email');
        $phone = $request->getParam('phone');
        $dob = $request->getParam('dob');
        $experience = $request->getParam('experience');
        $profile_pic = $request->getParam('profile_pic');
        $about = $request->getParam('about');
        $max_client = $request->getParam('max_client');
        $certification = $request->getParam('certification');
        $pictures = $request->getParam('pictures');
        $videos = $request->getParam('videos');
        $transformation = $request->getParam('transformation');
        $social = $request->getParam('social');
        $package = $request->getParam('package');
        $pictures = json_decode($pictures, true);
        for($idx = 0; $idx < count($pictures); $idx++){
            $obj = (Array)$pictures[$idx];
            if (@strlen($pictures[$idx]['picture'])>26) {
                $pictures[$idx]['picture'] = save_base64_image($pictures[$idx]['picture'], randomKey(20), '../../newman/public/trainer/users/');
            }
        }
        $tpictures = json_decode($transformation, true);
        for($idx = 0; $idx < count($tpictures); $idx++){
            $objtpictures = (Array)$tpictures[$idx]['pictures'];
            for($idxj = 0; $idxj < count($objtpictures); $idxj++){
            $obj = (Array)$objtpictures[$idxj]['picture'];
            if (@strlen($objtpictures[$idxj]['picture'])>26) {
                $tpictures[$idx]['pictures'][$idxj]['picture'] = save_base64_image($objtpictures[$idxj]['picture'], randomKey(20), '../../newman/public/trainer/users/');
            }
            }
        }
        if (strlen($profile_pic)>26) {
            $profile_pic = save_base64_image($profile_pic, randomKey(20), '../../newman/public/trainer/users/');
        }

        $pictures = json_encode($pictures);
        $transformation = json_encode($tpictures);
        $sql = "UPDATE users SET
                `name` = :name,
                `gender` = :gender,
                `email` = :email,
                `phone` = :phone,
                `dob` = :dob,
                `experience` = :experience,
                `profile_pic` = :profile_pic,
                `about` = :about,
                `max_client` = :max_client,
                `certification` = :certification,
                `pictures` = :pictures,
                `videos` = :videos,
                `transformation` = :transformation,
                `social` = :social,
                `package` = :package
                
            WHERE id = $id";
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':gender', $gender);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':dob', $dob);
            $stmt->bindParam(':experience', $experience);
            $stmt->bindParam(':profile_pic', $profile_pic);
            $stmt->bindParam(':about', $about);
            $stmt->bindParam(':max_client', $max_client);
            $stmt->bindParam(':certification', $certification);
            $stmt->bindParam(':pictures', $pictures);
            $stmt->bindParam(':videos', $videos);
            $stmt->bindParam(':transformation', $transformation);
            $stmt->bindParam(':social', $social);
            $stmt->bindParam(':package', $package);
            $stmt->execute();
            $db = null;
            echo '{"notice": {"text": "User Trainer Updated"}, "success": "1"}';
        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }
     
    } else {
        echo '{"notice": {"text": "User Trainer NotUpdated"}, "success": "0"}';
    }
    return $response;
});
$app->post('/users/trainer/adminUpdate', function (Request $request, Response $response, array $args) {
    $token = $request->getParam('token');

    $result = Token::validate($token, 'se123!fe213$c!ReT423*&');
    if ($result) {
        $id = $request->getParam('id');
        $price = $request->getParam('price');
        $packagetype = $request->getParam('packagetype');
        $approved = $request->getParam('approved');
        
        $sql = "UPDATE users SET
                `price` = :price,
                `packagetype` = :packagetype,
                `approved` = :approved
                
            WHERE id = $id";
        try {
            $db = new db();
            $db = $db->connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':packagetype', $packagetype);
            $stmt->bindParam(':approved', $approved);
            $stmt->execute();
            $db = null;
            echo '{"notice": {"text": "User Trainer Updated"}, "success": "1"}';
        } catch (PDOException $e) {
            echo '{"error":{"text": ' . $e->getMessage() . '}}';
        }
     
    } else {
        echo '{"notice": {"text": "User Trainer NotUpdated"}, "success": "0"}';
    }
    return $response;
});
$app->post('/users/login', function (Request $request, Response $response, array $args) {
    $email = $request->getParam('email');
    $password = md5($request->getParam('password'));
    $type = $request->getParam('type');
    $sql = "SELECT * FROM users WHERE email='" . $email . "' AND password='" . $password . "' AND type=" . $type;
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $user = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $data = json_encode($user);
        $decoded = json_decode($data, true);
        $startDate = time();

        $date = date('Y-m-d H:i:s', strtotime('+1 day', $startDate));

        $token = Token::getToken('' . $decoded[0]['id'], 'se123!fe213$c!ReT423*&', $date, 'razaanis');
        echo '{"notice": {"text": "User Authenticated"}, "id": ' . $decoded[0]['id'] . ', "success": "1", "user": ' . $data . ',"token":"' . $token . '"}';

    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->get('/exercises/getexercises', function (Request $request, Response $response, array $args) {
    $sql = "SELECT * FROM exercises";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $exercises = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo json_encode($exercises);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->get('/recipes/getrecipes', function (Request $request, Response $response, array $args) {
    $sql = "SELECT * FROM recipes";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $recipes = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo json_encode($recipes);
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->delete('/exercises/deleteexercise/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $sql = "DELETE FROM exercises
            WHERE id = $id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $workoutsg = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo '{"notice": {"text": "Exercise Deleted"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->delete('/recipes/deleterecipe/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $sql = "DELETE FROM recipes
            WHERE id = $id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $workoutsg = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo '{"notice": {"text": "Recipe Deleted"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->put('/recipes/updaterecipe', function (Request $request, Response $response, array $args) {
    $id = $request->getParam('id');
    $name = $request->getParam('name');
    $short = $request->getParam('short');
    $description = $request->getParam('description');
    $time = $request->getParam('time');
    $carbs = $request->getParam('carbs');
    $proteins = $request->getParam('proteins');
    $fats = $request->getParam('fat');
    $servings = $request->getParam('servings');
    $ingredients = $request->getParam('ingredients');
    $directions = $request->getParam('directions');

    $image = $request->getParam('image');
    if (strlen($image)>26) {
    $image = save_base64_image($image, randomKey(20), '../../newman/public/recipes/');
    }
    $directionspics = json_decode($directions, true);
        for($idx = 0; $idx < count($directionspics); $idx++){
            $objtpictures = (Array)$directionspics[$idx]['image'];
            
            if (strlen($directionspics[$idx]['image'])>26) {
                $directionspics[$idx]['image'] = save_base64_image($directionspics[$idx]['image'], randomKey(20), '../../newman/public/recipes/');
            }
        }
        $directionspics = json_encode($directionspics);

    $sql = "INSERT INTO recipes (`name`,`short`,`description`,`time`,`carbs`,`proteins`,`fats`,`servings`,`ingredients`,`directions`,`image`) VALUES 
    (:name,:short,:description,:time,:carbs,:proteins,:fats,:servings,:ingredients,:directions,:image)";
    $sql = "UPDATE recipes SET
    `name` = :name,
    `short` = :short,
    `description` = :description,
    `time` = :time,
    `carbs` = :carbs,
    `proteins` = :proteins,
    `fats` = :fats,
    `servings` = :servings,
    `ingredients` = :ingredients,
    `directions` = :directions,
    `image` = :image
WHERE id = $id";

    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':short', $short);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':time', $time);
        $stmt->bindParam(':carbs', $carbs);
        $stmt->bindParam(':proteins', $proteins);
        $stmt->bindParam(':fats', $fats);
        $stmt->bindParam(':servings', $servings);
        $stmt->bindParam(':ingredients', $ingredients);
        $stmt->bindParam(':directions', $directionspics);
        $stmt->bindParam(':image', $image);

        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Recipe Updated"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->put('/exercises/updateexercise/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $name = $request->getParam('name');
    $videourl = $request->getParam('videourl');
    $description = $request->getParam('description');
    $image = $request->getParam('image', "");

    $group1 = $request->getParam('group1');
    $type = $request->getParam('type');
    $equipment = $request->getParam('equipment');
    $level = $request->getParam('level');
    $secondary = $request->getParam('secondary');
    $group_id = $request->getParam('group_id');
    if (strlen($image)>36) {
        $image = save_base64_image($image, randomKey(20), '../../newman/public/images/exercises/');
        }

    $sql = "UPDATE exercises SET
            `name` = :name,
            `videourl` = :videourl,
            `description` = :description,
            `image` = :image,
            `group1` = :group1,
            `type` = :type,
            `equipment` = :equipment,
            `level` = :level,
            `secondary` = :secondary,
            `group_id` = :group_id
        WHERE id = $id";

    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':videourl', $videourl);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':image', $image);

        $stmt->bindParam(':group1', $group1);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':equipment', $equipment);
        $stmt->bindParam(':level', $level);
        $stmt->bindParam(':secondary', $secondary);
        $stmt->bindParam(':group_id', $group_id);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Exercise Updated"}}';
    } catch (PDOException $e) {
        echo '{"error":{"text": ' . $e->getMessage() . '}}';
    }

    return $response;
});
$app->get('/exercises/getexercise/{id}', function (Request $request, Response $response, array $args) {
    $id = $request->getAttribute('id');
    $sql = "SELECT * FROM exercises
            WHERE id = $id";
    try {
        $db = new db();
        $db = $db->connect();
        $stmt = $db->query($sql);
        $exercise = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        echo json_encode($exercise);
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
    $pdf = $request->getParam('pdf', "");
    $image = $request->getParam('image', "");
    $workoutdays = json_encode($request->getParam('workoutdays'));
    if (strlen($image)>36) {
        $image = save_base64_image($image, randomKey(20), '../../newman/public/images/workouts/');
    }
    if (strlen($pdf)>36) {
        $pdf = save_base64_image($pdf, randomKey(20), '../../newman/public/images/workouts/');
    }
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

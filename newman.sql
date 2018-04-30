-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2018 at 11:22 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newman`
--

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `videourl` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `group1` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `equipment` text NOT NULL,
  `level` varchar(255) NOT NULL,
  `secondary` text NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`id`, `name`, `description`, `videourl`, `image`, `group1`, `type`, `equipment`, `level`, `secondary`, `group_id`) VALUES
(4, 'Push ups', '<p>Something here!</p>', 'https://www.youtube.com/watch?v=xRr7aGPuLzw', '1b991pCo9iC79VUAgsOY.jpg', 'Shoulders', 'Strength', 'Barbells, Bench', 'Intermediate', 'Everything Else!', 0),
(6, 'Pull Ups', '<p>Random Text</p>', 'http://www.putlockers.lc/episodes/the-walking-dead-season-8-episode-9/', 'PUEDo7IAMfc79oAiukaf.jpg', 'Muscle Building', 'Strength', 'Barbells, Rod', 'Intermediate', 'Chest and Forearms', 3);

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `videourl` text NOT NULL,
  `description` text NOT NULL,
  `group_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `fulldescription` text NOT NULL,
  `result` text NOT NULL,
  `type` text NOT NULL,
  `level` text NOT NULL,
  `duration` text NOT NULL,
  `daysperworkout` text NOT NULL,
  `timeperworkout` text NOT NULL,
  `equipment` text NOT NULL,
  `targetgender` text NOT NULL,
  `supplements` text NOT NULL,
  `author` text NOT NULL,
  `pdf` text NOT NULL,
  `image` text NOT NULL,
  `workoutdays` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`id`, `name`, `videourl`, `description`, `group_id`, `position`, `fulldescription`, `result`, `type`, `level`, `duration`, `daysperworkout`, `timeperworkout`, `equipment`, `targetgender`, `supplements`, `author`, `pdf`, `image`, `workoutdays`, `date`) VALUES
(4, '17 Days Extreme Workout', 'https://www.youtube.com/watch?v=SphTGtDlhHw&list=RDsyhBqULC99I&index=27', 'This is valid syntax', 1, 2, '<p>Something Cool</p>', 'Get Slim', 'Fat Loss', 'Master', '3 Weeks', '4 days', '4 hours', 'Dumbells, Rod, Bench', 'Male, Female', 'All', 'Raza Anis', '0Xekh7qKplxJ3UpmJD1C.png', 'bg-10.jpg', '[{"id":1,"name":"Day 1","description":"Get Buffed!","exercises":[{"id":1,"name":"Dumbells","reps":"1,2,1","sets":"23,23,23"},{"id":2,"name":"Pullups","reps":"2,3,3","sets":"12,23,12"}]}]', '2018-04-10 00:21:05'),
(5, 'Shoulder Building Exercise', 'https://www.youtube.com/watch?v=SphTGtDlhHw&list=RDsyhBqULC99I&index=27', 'Best Exercise Out There', 2, 1, '<h3>Task 2: Classification with localization</h3><p><span style="color: rgb(31, 31, 31);">In this task, an algorithm will produce 5 class labels&nbsp;l</span></p><p><span style="color: rgb(31, 31, 31);">j</span></p><p><span style="color: rgb(31, 31, 31);">,j=1,...,5</span></p><p><span style="color: rgb(31, 31, 31);">lj,j=1,...,5&nbsp;and 5 bounding boxes&nbsp;b</span></p><p><span style="color: rgb(31, 31, 31);">j</span></p><p><span style="color: rgb(31, 31, 31);">,j=1,...5</span></p><p><span style="color: rgb(31, 31, 31);">bj,j=1,...5, one for each class label. The ground truth labels for the image are&nbsp;g</span></p><p><span style="color: rgb(31, 31, 31);">k</span></p><p><span style="color: rgb(31, 31, 31);">,k=1,...,n</span></p><p><span style="color: rgb(31, 31, 31);">gk,k=1,...,n&nbsp;with n classes labels. For each ground truth class label&nbsp;g</span></p><p><span style="color: rgb(31, 31, 31);">k</span></p><p><span style="color: rgb(31, 31, 31);">gk, the ground truth bounding boxes are&nbsp;z</span></p><p><span style="color: rgb(31, 31, 31);">km</span></p><p><span style="color: rgb(31, 31, 31);">,m=1,...M</span></p><p><span style="color: rgb(31, 31, 31);">k</span></p><p><span style="color: rgb(31, 31, 31);">,</span></p><p><span style="color: rgb(31, 31, 31);">zkm,m=1,...Mk,&nbsp;where&nbsp;M</span></p><p><span style="color: rgb(31, 31, 31);">k</span></p><p><span style="color: rgb(31, 31, 31);">Mk&nbsp;is the number of instances of the&nbsp;k</span></p><p><span style="color: rgb(31, 31, 31);">th</span></p><p><span style="color: rgb(31, 31, 31);">kth&nbsp;object in the current image. The error of the algorithm for that image would be</span></p><p class="ql-align-center">e=1</p><p class="ql-align-center">n</p><p class="ql-align-center"><br></p><p class="ql-align-center">â‹…âˆ‘</p><p class="ql-align-center">k</p><p class="ql-align-center">min</p><p class="ql-align-center">j</p><p class="ql-align-center">min</p><p class="ql-align-center">M</p><p class="ql-align-center">k</p><p class="ql-align-center">m</p><p class="ql-align-center">max{d(l</p><p class="ql-align-center">j</p><p class="ql-align-center">,g</p><p class="ql-align-center">k</p><p class="ql-align-center">),f(b</p><p class="ql-align-center">j</p><p class="ql-align-center">,z</p><p class="ql-align-center">km</p><p class="ql-align-center">)}</p><p class="ql-align-center">e=1nâ‹…âˆ‘kminjminmMkmax{d(lj,gk),f(bj,zkm)}</p><p><span style="color: rgb(31, 31, 31);">where&nbsp;f(b</span></p><p><span style="color: rgb(31, 31, 31);">j</span></p><p><span style="color: rgb(31, 31, 31);">,z</span></p><p><span style="color: rgb(31, 31, 31);">k</span></p><p><span style="color: rgb(31, 31, 31);">)=0</span></p><p><span style="color: rgb(31, 31, 31);">f(bj,zk)=0&nbsp;if&nbsp;b</span></p><p><span style="color: rgb(31, 31, 31);">j</span></p><p><span style="color: rgb(31, 31, 31);">bj&nbsp;and&nbsp;z</span></p><p><span style="color: rgb(31, 31, 31);">mk</span></p><p><span style="color: rgb(31, 31, 31);">zmk&nbsp;has over 50% overlap, and&nbsp;f(b</span></p><p><span style="color: rgb(31, 31, 31);">j</span></p><p><span style="color: rgb(31, 31, 31);">,z</span></p><p><span style="color: rgb(31, 31, 31);">mk</span></p><p><span style="color: rgb(31, 31, 31);">)=1</span></p><p><span style="color: rgb(31, 31, 31);">f(bj,zmk)=1&nbsp;otherwise. In other words, the error will be the same as defined in task 1 if the localization is correct(i.e. the predicted bounding box overlaps over 50% with the ground truth bounding box, or in the case of multiple instances of the same class, with any of the ground truth bounding boxes). otherwise the error is 1(maximum).</span></p><h3>Task 3: Fine-grained classification</h3><h2><span style="color: rgb(31, 31, 31);">This year we introduce a third task: fine-grained classification on 100+ dog categories. For each of the dog categories predict if a specified dog (indicated by their bounding box) in a test image is of a particular category. The output from your system should be a real-valued confidence that the dog is of a particular category so that a precision/recall curve can be drawn. The fine-grained classification task will be judged by the precision/recall curve. The principal quantitative measure used will be the average precision (AP) on individual categories and the mean average precision (mAP) across all categories.</span><span style="color: rgb(31, 31, 31); background-color: rgb(255, 255, 255);">Tentative Timetable</span></h2><ul><li>June 15 2012: Development kit (training and validation data plus evaluation software) to be made available.</li><li>Early July, 2012: Test data to be released.</li><li>September 30, 2012 (Sunday, 23:00 GMT): Deadline for submission of results (no more extension).</li><li>October 12, 2012: Pascal Challenge Workshop in association with&nbsp;<a href="http://eccv2012.unifi.it/" target="_blank" style="color: rgb(51, 51, 51);">ECCV 2012</a>, Florence, Italy.</li></ul><p><br></p>', 'Build Muscle!', 'Muscle Building', 'Expert', '23 weeks', '4 days', '4 hours', 'Dumbells, Rod, Bench', 'Male', 'Chicken, Protein Bars, Smoothies', 'Raza Anis', 'lJmvUnSGJ1thypbvthd8.png', 'Wd3TVde1F43mkqfZB9IE.jpg', '[{"id":1,"name":"Day 1","description":"First do to do things","exercises":[{"id":1,"name":"Dumbells","reps":"2,3,2","sets":"21,23,12"},{"id":2,"name":"Pullups","reps":"4,2,4","sets":"23,23,23"}]},{"id":2,"name":"Day 2","description":"You are ready!","exercises":[{"id":1,"name":"Pushups","reps":"2,2,2","sets":"23,32,23"},{"id":2,"name":"Squats","reps":"3,4,2","sets":"23,23,12"}]}]', '2018-04-09 21:21:31');

-- --------------------------------------------------------

--
-- Table structure for table `workouts_group`
--

CREATE TABLE `workouts_group` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workouts_group`
--

INSERT INTO `workouts_group` (`id`, `name`) VALUES
(1, 'Muscle Building Exercises'),
(2, 'Fat Loss Workouts');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workouts_group`
--
ALTER TABLE `workouts_group`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `workouts_group`
--
ALTER TABLE `workouts_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

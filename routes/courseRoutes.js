import express from "express";
import {
  addLecture,
  createCourse,
  createCourseReview,
  deleteCourse,
  deleteLecture,
  deleteReview,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import {
  authorizeAdmin,
  isAuthenticated,
  authorizeSubscribers,
  isSubscribed,
} from "../middlewares/auth.js";

const router = express.Router();

// Get All courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, createCourse);
router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

router.route("/review").put(isAuthenticated, isSubscribed, createCourseReview)

router.route("/review").delete(isAuthenticated, isSubscribed, deleteReview)

export default router;

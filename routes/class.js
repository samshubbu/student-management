const express = require("express");
const router = express.Router();
const CourseClass = require("../models/class");


router.get("/", (req, res) => {
  console.log(req.query);
  CourseClass.find({ course_id: req.query.course_id }, (err, courseClasses) => {
    console.log(err, courseClasses);
    res.status(200).send({ courseClasses });
  });
});

// Create Class
router.put("/", async (req, res) => {
  try {
    const courseExists = await CourseClass.count({ name: req.body.name }).exec();
    if (courseExists > 0) {
      res.status(400).send({ message: "Course with same name already exists" });
    } else {
      const _class = await CourseClass.create({
        name: req.body.name,
        course_id: req.body.course_id
      });
      res.status(200).send(_class);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete Class
router.delete("/:id", async (req, res) => {
  try {
    const courseExists = await CourseClass.count({ _id:req.params.id }).exec();
    if (courseExists == 0) {
      res.status(400).send({ message: "No course Found" });
    } else {
       await CourseClass.remove({
        _id: req.params.id
      });
      res.status(200).send({success: true});
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update Class
router.post("/", async (req, res) => {
  try {
    const courseExists = await CourseClass.count({ _id: req.body.id }).exec();
    if (courseExists == 0) {
      res.status(400).send({ message: "No course Found" });
    } else {
      const courseClass = await CourseClass.update({
        _id: req.body.id
      },req.body.details);
      res.status(200).send({success: true,courseClass});
    }
  } catch (error) {
    res.status(500).send({ message: error.message,error });
  }
});

module.exports = router;

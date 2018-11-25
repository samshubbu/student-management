const express = require("express");
const router = express.Router();
const Course = require("../models/courses");
router.get("/", (req, res) => {
  Course.find({}, (err, courses) => {
    res.status(200).send({ courses });
  });
});

// Create Courses
router.put("/", async (req, res) => {
  try {
    const courseExists = await Course.count({ name: req.body.name }).exec();
    if (courseExists > 0) {
      res.status(400).send({ message: "Course with same name already exists" });
    } else {
      const course = await Course.create({
        name: req.body.name
      });
      res.status(200).send(course);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete Courses
router.delete("/:id", async (req, res) => {
  try {
    const courseExists = await Course.count({ _id: req.params.id }).exec();
    if (courseExists == 0) {
      res.status(400).send({ message: "No course Found" });
    } else {
      await Course.remove({
        _id: req.params.id
      });
      res.status(200).send({ success: true });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update Courses
router.post("/", async (req, res) => {
  try {
    const courseExists = await Course.count({ _id: req.body.id }).exec();
    if (courseExists == 0) {
      res.status(400).send({ message: "No course Found" });
    } else {
      const course = await Course.update(
        {
          _id: req.body.id
        },
        req.body.details
      );
      res.status(200).send({ success: true, course });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

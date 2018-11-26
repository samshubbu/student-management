const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// get student by class_id
router.get("/", (req, res) => {
  Student.find({ class_id: req.query.class_id }, (err, students) => {
    res.status(200).send({ students });
  });
});

// create student
router.put("/", async (req, res) => {
  try {
    console.log(req.body);
    const courseExists = await Student.count({ name: req.body.name }).exec();
    if (courseExists > 0) {
      res.status(400).send({ message: "Course with same name already exists" });
    } else {
      const _class = await Student.create({
        name: req.body.name,
        class_id: req.body.class_id
      });
      res.status(200).send(_class);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// delete student
router.delete("/:id", async (req, res) => {
  try {
    const courseExists = await Student.count({ _id: req.params.id }).exec();
    if (courseExists == 0) {
      res.status(400).send({ message: "No course Found" });
    } else {
      await Student.remove({
        _id: req.params.id
      });
      res.status(200).send({ success: true });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update student
router.post("/", async (req, res) => {
  try {
    const courseExists = await Student.count({ _id: req.body.id }).exec();
    if (courseExists == 0) {
      res.status(400).send({ message: "No course Found" });
    } else {
      const student = await Student.update(
        {
          _id: req.body.id
        },
        req.body.details
      );
      res.status(200).send({ success: true });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

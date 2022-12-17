const express = require("express");
const { JobModel } = require("../models/Job.model");
const jobPostRouter = express.Router();

jobPostRouter.post("/", async (req, res) => {
  let today = new Date().toISOString().slice(0, 10);
  req.body.postedAt = today;
  await JobModel.insertMany([req.body]);
  res.send("Job added successfully");
});

module.exports = { jobPostRouter };

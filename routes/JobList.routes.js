const express = require("express");
const { JobModel } = require("../models/Job.model");
const jobListRouter = express.Router();

jobListRouter.get("/", async (req, res) => {
  page = req.query.page;
  const job = await JobModel.find();
  if (page !== undefined) {
    let limit = 10;
    let end = page * limit;
    let start = end - limit;
    let jobData = job.slice(start, end);
    res.send(jobData);
  } else {
    res.send(job);
  }
});

jobListRouter.get("/search", async (req, res) => {
  let query = req.query.q;
  if (query !== undefined) {
    let job = await JobModel.find({ language: { $regex: query } });
    if (job.length !== 0) {
      res.send(job);
    } else {
      res.status(404).send(`Search related to ${query} not matched!`);
    }
  } else {
    res.status(500).send("Please type your query");
  }
});
jobListRouter.get("/sort", async (req, res) => {
  let query = req.query.q;
  if (query !== undefined) {
    if (query === "asc") {
      let job = await JobModel.find({}).sort({
        postedAt: -1,
      });
      res.send(job);
    } else {
      let job = await JobModel.find({}).sort({ postedAt: 1 });
      res.send(job);
    }
  } else {
    res.status(500).send("Please type your query");
  }
});
jobListRouter.get("/filter", async (req, res) => {
  let filter = req.query.filter;
  if (filter !== undefined) {
    let job = await JobModel.find({ role: filter });
    if (job.length !== 0) {
      res.send(job);
    } else {
      res.status(404).send("Job is not available");
    }
  } else {
    res.status(500).send("Please type your filter");
  }
});

module.exports = { jobListRouter };

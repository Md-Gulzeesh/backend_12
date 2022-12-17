require("dotenv").config();
const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { jobPostRouter } = require("./routes/JobPost.routes");
const { jobListRouter } = require("./routes/JobList.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/jobpost", jobPostRouter);
app.use("/joblist", jobListRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Error while connecting to db");
    console.log(error);
  }
  console.log(`Server started on port ${process.env.PORT}`);
});

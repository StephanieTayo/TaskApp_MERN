var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://admin:adTR4semMAHm8lUk@cluster0.2vr2w8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME = "taskappdb";

var database;

app.listen(5038, () => {
  Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASENAME);
    console.log("CONNECTION SUCCESSFUL");
  });
});

app.get("/api/taskapp/GetTasks", (req, res) => {
  database
    .collection("taskappcollection")
    .find({})
    .toArray((err, result) => {
      res.send(result);
    });
});

app.post("/api/taskapp/AddTasks", multer().none(), (req, res) => {
  database.collection("taskappcollection").count({}, function (err, numOfDocs) {
    database.collection("taskappcollection").insertOne({
      id: (numOfDocs + 1).toString(),
      description: req.body.newNotes,
    });
    res.json("Task Added Successfully");
  });
});

app.delete("/api/taskapp/DeleteTasks", (req, res) => {
  database.collection("taskappcollection").deleteOne({
    id: req.query.id,
  });
  res.json("Task Deleted Successfully");
});

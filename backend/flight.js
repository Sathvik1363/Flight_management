var express = require("express");
const { MongoClient } = require("mongodb");
var app = express();
var cors = require("cors");
app.use(cors());
const client = new MongoClient("mongodb://localhost:27017/flight2024");
app.use(express.json());

//****************************mmongodb get api**************************//
app.get("/flightlist", async (req, res) => {
  await client.connect(); //connect the mongodb
  const database = client.db("flight2024");
  const flight = database.collection("flight"); //collection name
  let list = await flight.find().toArray(); //gets the data from the collection and print in the console
  res.json(list);
  // console.log(req['query']['name']);
  res.end("this is get method");
});

//**********************mongodb post api***************************//

app.post("/flightdata", async (req, res) => {
  let body = req["body"];
  await client.connect(); //connect the mongodb
  const database = client.db("flight2024");
  const flight = database.collection("flight"); //collection name
  let data = {
    flightname: body["flightname"],
    price: body["price"],
    description: body["description"],
    travelling_date: body["travelling_date"],
    from_location: body["from_location"],
    to_location: body["to_location"],
  };

  await flight.insertOne(data);
  res.json({ message: "data is inserted!!" });
  res.end();
});

//http://localhost:8080

//starting server
app.listen(8080, () => {
  console.log("server started");
});

// **********************************mongodb to get limited flights  api***********************

app.get("/flightlistlimit", async (req, res) => {
  let query = req["query"];
  console.log(query);
  let from = query["from_location"];
  let to = query["to_location"];
  await client.connect(); //connect the mongodb
  console.log(from, to);
  const database = client.db("flight2024");
  const flight = database.collection("flight"); //collection name
  let list = await flight
    .find({ from_location: from, to_location: to })
    .toArray(); //gets the data from the collection and print in the console
  res.json(list);
  // console.log(req['query']['name']);
});

// **********************************mongodb to post limited flights post api***********************

app.post("/flightsplace", async (req, res) => {
  let body = req["body"];
  await client.connect(); //connect the mongodb
  const database = client.db("flight2024");
  const flight = database.collection("flight"); //collection name
  let data = {
    from_location: body["from_location"],
    to_location: body["to_location"],
  };

  await flight.insertOne(data);
  res.json({ message: "data is inserted!!" });
  res.end();
});

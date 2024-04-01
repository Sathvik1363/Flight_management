import "./App.css";
import { useState } from "react";

function Limit() {
  // const [flightname, setflightname] = useState("");
  // const [price, setprice] = useState("");
  // const [description, setdescription] = useState("");
  // const [travelling_date, settravelling_date] = useState("");
  const [from_location, setfrom_location] = useState("");
  const [to_location, setto_location] = useState("");
  const [flightList, setFlightList] = useState([]);

  const getUser = async () => {
    let response = await fetch(
      "http://localhost:8080/flightlistlimit?from_location=" +
        from_location +
        "&to_location=" +
        to_location,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    let json = await response.json();
    setFlightList(json);
    console.log(json);
  };
  const btnClicked = async () => {
    let data = {
      from_location: from_location,
      to_location: to_location,
    };

    let response = await fetch("http://localhost:8080/flightdatasend", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    console.log(response);
  };
  return (
    <div className="App">
      <input
        type="text"
        value={from_location}
        onChange={(e) => setfrom_location(e.target.value)}
        placeholder="enter from_location"
      />
      <input
        type="text"
        value={to_location}
        onChange={(e) => setto_location(e.target.value)}
        placeholder="enter to_location"
      />
      <button onClick={getUser}>click to get flightlist</button>
      <button onClick={btnClicked}>click to post users</button>
      <div>
        {flightList.map((flight, index) => (
          <div key={index}>
            <h2>{flight.flightname}</h2> <p>Price: {flight.price}</p>
            <p>Description: {flight.description}</p>
            <p>Travelling Date: {flight.travellingDate}</p>{" "}
            <p>From: {flight.from_location}</p>
            <p>To: {flight.to_location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Limit;

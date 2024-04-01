import { useState } from "react";
import './admin.css'
// import { log } from "console";

export default function Admin(){
    const [name, setname] = useState("");
    const [startlocation, setstartlocation] = useState("");
    const [destination, setdestination] = useState("");
    const [expenses, setexpenses] = useState("");
    const [Date, setdate] = useState("");
    const [list , setlist] = useState([]);

    const getflights = async() =>{
        let response = await fetch("http://localhost:8001/getflight",{
            method:"GET",
            headers: {"content-type":"application/json"}
        });
        let json = await response.json();
        setlist(json);
        console.log(json);
    }

    const update = async()=>{
        let data = {
            name: name,
            startlocation: startlocation,
            destination: destination,
            expenses: expenses,
            Date: Date
          };
        let res = await fetch("http://localhost:8001/update",{
            method:"POST",
            body: JSON.stringify(data),
      headers: { "content-type": "application/json" }
        });
        let resdata = await res.json();
        console.log(res);
    }
    const del= async(id)=>{

        let res = await fetch('http://localhost:8001/delete?id='+ id ,{method:"DELETE",
    headers: {"content-type":"application/json"}});
    let da = await res.json();
    getflights();
    console.log(res);
    }

    return(
        <div className="admin">
            <div>
            <h1>Flight Management</h1>
            </div>
            <h2>Admin Page</h2>
            <input 
            value={name} 
            type="text" 
            placeholder="Enter Flight Name"
            onChange={(e) => setname(e.target.value)}
            
            />
            <input 
            value={startlocation} 
            type="text" 
            placeholder="Enter Starting point"
            onChange={(e) => setstartlocation(e.target.value)}
            />
            <input 
            value={destination} 
            type="text" 
            placeholder="Enter Destination"
            onChange={(e) => setdestination(e.target.value)}
            />
            <input 
            value={expenses} 
            type="number" 
            placeholder="Enter Travelling price"
            onChange={(e) => setexpenses(e.target.value)}/>
            <input type="date"
            placeholder="Enter Date of traveling"
            value={Date}
            onChange={(e)=>setdate(e.target.value)}/>
            <button onClick={()=>update()} >Update</button>
            <button onClick={()=>getflights()}>Get flight list</button>
            <div>
                <button onClick={()=>del()} >Delete Flight</button>
            </div>
            <div>
                {list.map((flights,index)=> (
                    <div key={index}>
                        <h2>{flights.name}</h2>
                        <p>startlocation :{flights.startlocation}</p>
                        <p>Destination :{flights.destination}</p>
                        <p>expenses :{flights.expenses}</p>
                        <p>Date of traveling :{flights.Date}</p>
                        <div>
                <button onClick={()=>del(flights._id)} >Delete Flight</button>
            </div>
                    </div>
                ))}

            </div>

        </div>
    );
}
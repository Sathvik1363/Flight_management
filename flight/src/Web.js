import { useState } from "react";
import './admin.css'

export default function Web(){
    const [startlocation, setstartlocation] = useState("");
    const [destination, setdestination] = useState("");
    const [list , setlist] = useState([]);

    const get = async() =>{
        let response = await fetch("http://localhost:8001/usersearch? startlocation=" + startlocation + "&destination=" + destination ,{
            method:"GET",
            headers: {"content-type":"application/json"}
        });
        let json = await response.json();
        setlist(json);
        console.log(json);
    }

    return(
        <div className="admin">
            <div>
            <h1>Flight Management</h1>
            </div>
           
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
            <button onClick={()=>get()}>Get flight list</button>
            <div>
                {list.map((flights,index)=> (
                    <div key={index}>
                        <h2>{flights.name}</h2>
                        <p>startlocation :{flights.startlocation}</p>
                        <p>Destination :{flights.destination}</p>
                        <p>expenses :{flights.expenses}</p>
                    </div>
                ))}

            </div>

        </div>
    );
}
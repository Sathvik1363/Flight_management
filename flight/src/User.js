import React, { useState } from 'react'
import './user.css'

export default function User() {
    const [start, setstart] = useState("")
    const [dest, setdest] = useState("");
    const [flist , setflist] = useState([]);

    const btn = async() =>{
        let response = await fetch("http://localhost:8001/usersearch?startlocation=" + start + "&destination=" + dest ,{
             method:"GET",
            headers: {"content-type":"application/json"}
        });
        let json = await response.json();
        setflist(json);
        console.log(json);
    }

    return (
        <div className='user'>
            <h2>User Page</h2>
            <input
                value={start} type='text' placeholder='Enter start location'
                onChange={(e) => setstart(e.target.value)} />

            <input value={dest}
                type='text' placeholder='Enter destination' 
                onChange={(e) => setdest(e.target.value)}/>

            <button onClick={()=>btn()}> Get list</button>
            
            <div>
            {flist && flist.map((flights,index)=> (
                    <div key={index}>
                        <h2>{flights.name}</h2>
                        <p>startlocation :{flights.startlocation}</p>
                        <p>Destination :{flights.destination}</p>
                        <p>expenses :{flights.expenses}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


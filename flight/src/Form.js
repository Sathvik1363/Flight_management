import "./form.css";
import { useState } from "react";
import {useRef} from "react";
export default function Form() {
  let h1txt = useRef();
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [author, setauthor] = useState("");
  const [category, setcategory] = useState("");
  const [list, setList] = useState([]);

  const btn = async () => {
    if(name == ""|| price==""||author==""||category==""){
      h1txt.current.innerHTML = "Enter the Details"
    }else{


    let data = {
      name: name,
      price: price,
      author: author,
      category: category,
    };

    let response = await fetch("http://localhost:8080/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    let resData = await response.json();
    // console.log(resData);
    console.log(response);
    };
  }
    const getlist = async()=>{
      
      let  list = await fetch('http://localhost:8080/getbook',{
        method:"GET",
        headers:{"content-type":'application/json'}
      });
      let json = await list.json();
      setList(json);
      console.log(json);

      }
   
  


    return (
      <div className="container">
        <h1>Book Management System</h1>
        <div className="form">
          <input 
          value={name}  
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Book Name" />

          <input 
          value={price} 
          onChange={(e)=>setprice(e.target.value)} 
          type="number"
           placeholder="Enter Price" />

          <input 
          value={author}  
          onChange={(e)=>setauthor(e.target.value)}
          type="text"
           placeholder="Enter Author" />

          <input 
          value={category}
           type="text" 
           onChange={(e)=>setcategory(e.target.value)}
           placeholder="Enter Category" />

          <button className="btn" onClick={() =>btn()}>
            Submit
          </button>
          <button onClick={()=>getlist()}>Show List</button>

        </div>
        
          <div>

          {list.map((books, i) => (
          <div key={i}>
            <h2>{books.name}</h2> <p>Price: {books.price}</p>
            <p>Author: {books.author}</p>
            <p>Category: {books.category}</p>
          </div>
        ))}
  </div>
          
        <p ref={h1txt}></p>
      </div>
    );
  };

import "./ProfilePage.css";
import authService from "../../services/auth.service";
import React, { useState , useEffect} from 'react';

function ProfilePage() {

  const [data, setData] = useState([]);

  useEffect(  ()=>{
    async function start(){

      let {data} = await authService.api("/api/orders/history")
      setData(data)
    }
    start()
  },[])




  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Profile page</h1>
{
  data.map(order=>(
    <div className="card">{order.createdAt}</div>
  ))
}

      <div>
        <hr></hr>
        {JSON.stringify(data)}
      </div>
    </div>
  );
}

export default ProfilePage;




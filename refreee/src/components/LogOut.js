import React from 'react'
import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";

function LogOut() {
    
    const handleclick = () => {
       
        /* Getting the data from local storage. */
        const userData = JSON.parse(localStorage.getItem("Users")) || [];
    
        /* Updating the isLogin property of the userData object. */
        const updateData=userData.map((item) => {
          toast.success("successfully logOut")
          return{
            ...item,
            isLogin:false
          }
        });
      
        localStorage.setItem("Users", JSON.stringify(updateData));

         /* Removing the item from local storage. */
         JSON.parse(localStorage.removeItem("isactive"))

      };
    

  return (
    <>
    
<Link to="/login" className="ms-1 btn btn-secondary" onClick={()=> handleclick()}>LogOut</Link>
      
    </>
  ) 
}

export default LogOut
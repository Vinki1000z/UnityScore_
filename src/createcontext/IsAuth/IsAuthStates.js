import React, { useEffect, useState } from "react";
import IsAuth from "./IsAuthContext"
export default function SearchModalState(props) {
    const[auth,setAuth]=useState(false);
    const handleAuth=(val)=>{
        setAuth(val)
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setAuth(true)
            }
            else {
                setAuth(false)
                }
    }, [])
    
  return (
    <>
      <IsAuth.Provider value={{ auth,handleAuth }}>
        {props.children}
      </IsAuth.Provider>
    </>
  );
}

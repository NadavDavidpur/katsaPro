import React, { useEffect } from 'react';
import "./Spinner.css";

function Loading() {
  
  useEffect(()=>{
    // window.location.reload(false)
  },[])
  return (
    <div className="spinner-container">
      <div className="loading-spinner position-absolute bottom-50 end-50 top-50 start-50 ">
      </div>
  </div>
  )
}

export default Loading;
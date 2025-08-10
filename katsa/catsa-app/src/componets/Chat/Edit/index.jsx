import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import APIService from "../../help/APIService";
import { FaWindowClose } from "react-icons/fa"
import './style.css';

function Edit({body,setMessageBody, setshow, commentsProjectRisk, setcommentsProjectRisk}){
    
    const [id,setId] = useState(JSON.parse(window.localStorage.getItem('Edit')).id)
    
    
    useEffect(()=>{
        //console.log(JSON.parse(window.localStorage.getItem('Edit')).description)
        // console.log(body,id)
       setMessageBody(JSON.parse(window.localStorage.getItem('Edit')).description)
       
    },[])
   //const [messageBody, setMessageBody] = useState(body)
   const hundleEdit = () =>{
        // console.log(0)


        const newList = commentsProjectRisk.map((item) => {
            if (item.id === id) {
              const updatedItem = {
                ...item,
                description: body,
              };
      
              return updatedItem;
            }
      
            return item;
          });
          
          setcommentsProjectRisk(newList);
        



        //console.log(id)
        APIService.updateCommon({'id':id,'body':body})
        setshow(false)
   }
    return(
        <div>
         
            <div className="popup-container1">
                <div className="popup-body1">
                    <div className="container">
                        <div className="row">
                            <button className="btn text-start" onClick={()=>(setshow(false))}><FaWindowClose color="red" className="text-start" /></button>
                        </div>
                        <div className='row' dir='ltr'>
                            <input value={body} onChange={(e)=>{setMessageBody(e.target.value)}} />
                            <button className="btn btn-primary" onClick={hundleEdit}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}
export default Edit;
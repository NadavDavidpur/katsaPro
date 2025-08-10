import React, { useEffect, useState, useRef } from "react";
import APIService from "../help/APIService";
import './style.css'
import Loading from "../Loading";
import MessageMe from "./message/meesage-me";
import MessageAnouther from "./message/message-anouther";
import Navbar from "../Navbar";
import { format } from 'date-fns-tz';

// import {FaBeer} from 'react-icons/fa';
import {FaEllipsisV, FaRocketchat } from "react-icons/fa"
// import DeleteIcon from '@mui/icons-material/Delete';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
import Edit from "./Edit";
import ScrollableFeed from 'react-scrollable-feed'
import { CompressOutlined } from "@mui/icons-material";


function Chat({  user,setUser, project, setProject, risksList, setRisksList, risk, setrisk})
{
    const divRef = useRef(null);
    //const [messageBody, setMessageBody] = useState('')
    const [chatInput,setChatInput] =useState()
    const [show, setshow] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [commentsProjectRisk, setcommentsProjectRisk] = useState(null)
    // const [risk, setrisk] = useState(null)
    
    useEffect(()=>{
        APIService.comments().then(res=>{
            setcommentsProjectRisk((res.data.filter(comment=>comment.ProjectRiskId==window.location.pathname.split('/')[4] && comment.inactive===1)))
            


        })


        setUser(JSON.parse(window.localStorage.getItem('user')))

        setAvatar(window.localStorage.getItem('avatar'))

        // setrisk(JSON.parse(window.localStorage.getItem('risk')))
        // console.log(risk)
    },[])


    useEffect(()=>{
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
          }
        


    },[commentsProjectRisk])
    const hundlesubmit = async ()=>{
        setChatInput('')
        // const currentTime = new Date();

        //console.log(33)
         APIService.newComment({'workerName':user.username, 'description':chatInput, 'ProjectRiskId':window.location.pathname.split('/')[4]}).then(res=>{
            // console.log(34)
            // console.log(res.data)
            setcommentsProjectRisk((res.data.filter(comment=>comment.ProjectRiskId==window.location.pathname.split('/')[4] && comment.inactive===1)))
         })
    
        
    }

    const changeStatus= () =>{
        APIService.changeRiskStatus(window.location.pathname.split('/')[4]).then(res=>{
            setRisksList((res.data).filter(item=>item.projectId==project.id && item.inactive==1))
          //  console.log((res.data).filter(item=>item.projectId==project.id && item.inactive==1 && item.id==risk.id)[0])
            setrisk((res.data).filter(item=>item.projectId==project.id && item.inactive==1 && item.id==risk.id)[0])
            // setrisk(risk=>({
            //     ...risk,

            // }))
        })
    }




    const formatdate = (date1)=>{
       // console.log(date1," ddddd");
        const dateObject = new Date(date1); // יצירת אובייקט תאריך מהתאריך הנכנס

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // להשתמש בפורמט של 24 שעות
    timeZone: 'UTC', // התאמה לאזור הזמן של ישראל
  };
      //  console.log(date1)
        // const dateString = date1;
        // const dateObject = new Date(dateString);
      //  dateObject.setHours(dateObject.getHours()-2)
        // const options = {
        //   day: '2-digit',
        //   month: '2-digit',
        //   year: 'numeric',
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   second: '2-digit',
        //   hour12: false, // Use 24-hour format
        //   timeZone:  'Asia/Jerusalem', // Assuming your original date string is in GMT
        // };
        
        // const formattedDate = new Intl.DateTimeFormat('he-IL', options).format(dateObject);

        const formattedDate = new Intl.DateTimeFormat('he-IL', options).format(dateObject);

        return formattedDate



        
    }
    

    return(
        <div>

        {
        user.isActive==1 ?
            <div>
                <Navbar user={user} />
                {/* <ScrollableFeed> */}
                    <div>
                    {/* {each.StatusId != 4 ? 
                                       
                                       :<></>} */}
                        {user.isManager==1 && risk.StatusId != 4  ? 
                            <div>
                                <button type="submit" className="btn btn-primary btn-flat" onClick={changeStatus}>
                                    אשר סיכון
                                </button>



                            </div> :<></>}
                    </div>

                    <div ref={divRef} className="box-body">
                        {/* <ScrollableFeed> */}
                            {
                            commentsProjectRisk != null ?
                                commentsProjectRisk.map((comment,i) => (     
                        
                            <div key={comment.id}>
                            {
                                
                                comment.workerName==user.username ?
                                    <MessageMe body={comment.description} workerName={comment.workerName} date={formatdate(comment.date)} avatar={comment.avatar} show={show} setshow={setshow} id={comment.id} i={i} commentsProjectRisk={commentsProjectRisk} setcommentsProjectRisk={setcommentsProjectRisk}  />
                                :
                                    <MessageAnouther body={comment.description} workerName={comment.workerName} date={formatdate(comment.date)} avatar={comment.avatar} />
                            }
                            
                            </div>
                            ))
                            :
                                <Loading />
                            }

                            <div className="box-footer">

                                <div className="input-group">
                                    
                                    <textarea name="message" placeholder="Type Message ..."  type="textarea" value={chatInput} onChange={(e)=> {setChatInput(e.target.value)}} required className="form-control" id="chatInput" />
                                    
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-primary btn-flat" onClick={hundlesubmit}> Send</button>
                                    </span>
                                </div>

                            </div>
                        {/* </ScrollableFeed> */}
                    </div>  
                

            </div>
        :
        <div>
            <p>העובד לא קיים יותר</p>
        </div>  
        
        }
            
        </div>
    )
}

export default Chat ;
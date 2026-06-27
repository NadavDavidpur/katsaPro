import React, { useEffect, useState, useRef } from "react";
import APIService from "../help/APIService";
import './style.css'
import Loading from "../Loading";
import MessageMe from "./message/meesage-me";
import MessageAnouther from "./message/message-anouther";
import Navbar from "../Navbar";
import { useAuth } from "../../context/AuthContext";
import {FaEllipsisV } from "react-icons/fa"
import Edit from "./Edit";
import ScrollableFeed from 'react-scrollable-feed'


function Chat({ project, setProject, risksList, setRisksList, risk, setrisk})
{
    const { user } = useAuth();
    const divRef = useRef(null);
    const [chatInput, setChatInput] = useState('');
    const [show, setshow] = useState(false);
    const [commentsProjectRisk, setcommentsProjectRisk] = useState(null);

    useEffect(() => {
        APIService.comments().then(res => {
            setcommentsProjectRisk(res.data.filter(
                comment => comment.ProjectRiskId == window.location.pathname.split('/')[4] && comment.inactive === 1
            ));
        });
    }, []);


    useEffect(()=>{
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
          }
        


    },[commentsProjectRisk])
    const hundlesubmit = async () => {
        if (!chatInput.trim()) return;
        const text = chatInput;
        setChatInput('');
        APIService.newComment({
            'workerName': user.username,
            'description': text,
            'ProjectRiskId': window.location.pathname.split('/')[4]
        }).then(res => {
            setcommentsProjectRisk(res.data.filter(
                comment => comment.ProjectRiskId == window.location.pathname.split('/')[4] && comment.inactive === 1
            ));
        }).catch(() => {
            setChatInput(text);
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            hundlesubmit();
        }
    };

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




    const formatdate = (date1) => {
        return new Intl.DateTimeFormat('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Jerusalem',
        }).format(new Date(date1));
    };
    

    return(
        <div>

        {
        user.isActive==1 ?
            <div>
                <Navbar />
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
                                    
                                    <textarea name="message" placeholder="כתוב הודעה... (Enter לשליחה)" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={handleKeyDown} className="form-control" id="chatInput" />

                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-primary btn-flat" onClick={hundlesubmit}>שלח</button>
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
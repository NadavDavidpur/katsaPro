import { useEffect, useState } from 'react';
import { FaBeer,FaEllipsisV,FaPen,FaTrash, FaLocationArrow } from 'react-icons/fa'
import Popup from "reactjs-popup";
import APIService from '../../../help/APIService';
import Edit from '../../Edit';
import moment from 'moment-timezone';
import '../style.css'
function MessageMe({body,workerName,date, avatar, show, setshow, id, i, commentsProjectRisk, setcommentsProjectRisk})
{
    const [messageBody, setMessageBody] = useState('')
    const [shouldDisplayPopup, setShouldDisplayPopup] = useState(false);

 


    useEffect(() => {
        // פונקציה שבודקת אם לא עברו יותר משעתיים מאז התאריך הנתון
        const isWithinTwoHours = (date) => {
          const parts = date.split(/[\s,\.:\-]+/);
          if (parts.length < 6) {
            console.error("Invalid date format. Expected format: dd mm yyyy hh:mm:ss");
            return false;
          }
      
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // חודש מתחיל מ-0
          const year = parseInt(parts[2], 10);
          const hours = parseInt(parts[3], 10);
          const minutes = parseInt(parts[4], 10);
          const seconds = parseInt(parts[5], 10);
      
          // יצירת אובייקט תאריך מתוך החלקים
          const dateObject = new Date(year, month, day, hours, minutes, seconds);
      
          // בדיקת חוקיות התאריך (שהוא לא NaN)
          if (isNaN(dateObject.getTime())) {
            console.error("Invalid date object");
            return false;
          }
      
          // הזמן הנוכחי
          const now = new Date();
      
          // חישוב ההפרש במילישניות
          const timeDifference = now.getTime() - dateObject.getTime();
      
          // החזרת true אם ההפרש קטן משעתיים (7200000 מילישניות)
          return timeDifference <= 7200000 && timeDifference >= 0;
        };
      
        // בדיקה מחזורית כל שנייה אם לא עברו יותר משעתיים
        const intervalId = setInterval(() => {
          const isOver = isWithinTwoHours(date);
          setShouldDisplayPopup(isOver);
        }, 1000);
      
        // ניקוי ה-interval כשהקומפוננטה מתנתקת
        return () => clearInterval(intervalId);
      }, [date]);
      
   

    
    const hundleEdit = (id,body) =>{
        // return (

            setshow(true)
            // console.log(comments[i].description)
            window.localStorage.setItem('Edit',JSON.stringify({'id':id, 'description':body}))

       

    }

    const hundleDelete = (id) =>{
            //console.log(id)
            

              setcommentsProjectRisk(commentsProjectRisk.filter(comment=> comment.id!=id))

            APIService.DeleteCommon({'id':id})
    }



    return(
        <div>
                <div className="direct-chat-info clearfix">
                    <span className="direct-chat-name text-right">{workerName}</span>
                   {<span className="direct-chat-timestamp text-left">{date}</span>} 
                </div>
            <div className="d-flex flex-row justify-content-start mb-4">
           
                <img
                    src={avatar}
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                />
                <div
                    className="p-3 ms-3 position-relative"
                    style={{
                        borderRadius: "20px",
                        backgroundColor: "rgba(57, 192, 237,.2)",
                    }}
                    >
                    <p className="small mb-0 d-inline" >
                       {body}
                    </p>

{/* editTimeOver(date) */}
                   { shouldDisplayPopup ?

                    <Popup
                        trigger={<button className='btn absolute'><FaEllipsisV className="absolute d-inline" /></button>}
                        position="top center"
                        closeOnDocumentClick
                        on="hover"
                        // contentStyle={{ padding: "0px", border: "none" }}
                    >
                        <div className="menu">
                    
                            <FaPen className='menu-item' onClick={()=>{hundleEdit(id,body)}}/> 
                            <FaTrash className='menu-item' onClick={()=>{hundleDelete(id,body)}} />
                        </div>
                    </Popup>:<></>}
                  {show ?  <Edit body={messageBody} setMessageBody={setMessageBody} setshow={setshow} commentsProjectRisk={commentsProjectRisk} setcommentsProjectRisk={setcommentsProjectRisk} /> :<></>}
                    
            
                </div>
            </div>
        </div>
    )
}
export default MessageMe;
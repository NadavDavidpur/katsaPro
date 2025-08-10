import { useEffect } from "react";
import Loading from "../Loading";
import Navbar from "../Navbar";
import { FaMinus, FaPlus } from "react-icons/fa";
import APIService from "../help/APIService";
import { useNavigate } from "react-router";
import './style.css'

function Workers({workers,setWorkers, user,setUser})
{
    const hundleClick = (id) =>{
        APIService.DeleteWorker({'id':id}).then(res=>{
            setWorkers(res.data)
            window.localStorage.setItem('workers',JSON.stringify(res.data))
   
        })

        // const newList =  {
            
            //   const updateduser = {
            //     ...user,
            //     isActive: 0,
            //   }
      
            //    setUser(updateduser);
            //    window.localStorage.setItem('user',JSON.stringify(updateduser))
      
        
    }
  
    useEffect(()=>{
        setWorkers(JSON.parse(window.localStorage.getItem('workers')))
         setUser(JSON.parse(window.localStorage.getItem('user')))
        APIService.workers().then(res=>{
            setWorkers(res.data)
         })
    },[])
    const navigate = useNavigate()
    return(
        <div>
        {
            user.isActive ==1 ?
            <div dir="rtl">
                <Navbar user={user} />
                <div className="workers-title">
                        <h1>עובדים</h1>
                        <button className="mt-2 btn-circle" onClick={()=>{navigate('/newWorker')}}><FaPlus className='text-center' /></button>
                    </div>
                <div className="grid" dir="rtl">
                {
                    workers!=null ?        workers.map((worker,i)=>(
                            
                        <div key={worker.id} className="grid-item worker">
                            שם: { worker.name }
                            <br></br>
                            תעודת זהות: {worker.id }
                            <br></br>
                            מנהל: 
                            {worker.isManager == 1 ? <>כן</> : <>לא</>}
                            <br></br>
                            מחלקה: {worker.class}
                            <br></br>
                            פעיל: {worker.isActive == 1 ? <>כן</> : <>לא</>}
                            <br></br>
                            {worker.isActive == 1 ?
                            <button onClick={()=>hundleClick(worker.id)} className="btn-primary btn">
                                {/* <FaMinus color="red" /> */}
                                הפוך ללא פעיל
                            </button>
                            :<></>}
                        </div>
                        
                                
                    ))
                    : <Loading />
                        }


                </div>

            </div>
            :
            <div dir="rtl">
                <p>
                    העובד לא פעיל
                </p>
            </div>
        }


    </div>







    )
}
export default Workers;
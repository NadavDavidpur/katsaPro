import { useEffect, useState } from "react";
import APIService from "../help/APIService";
import { useNavigate } from "react-router";

import './style.css';


function Login({user, setUser, userIn, setUserin, setProjects,projects,setRisks, workers, setWorkers}){
    const [username, setUserName] =useState('')
    const [id, setid] = useState('')
    const [user1, setUser1] =useState({
      username:'',
      id:''
    })
    

    useEffect(  ()=>{
      APIService.workers().then((res)=>{
        setWorkers(res.data)
        console.log(res.data)
      })
      APIService.risks().then(res=>{
        window.localStorage.setItem('risks',JSON.stringify(res.data))
        setRisks(res.data)
      })
      // await delay(1000);
      // console.log(21)
      APIService.projects().then(res=>{
          // console.log(res.data)
          setProjects(res.data)
        })
      
    },[])




    const navigate = useNavigate()
    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    const hundleSumbit = async (e) => 
    {
      
        if((workers.filter(worker=>worker.name==user1.username && worker.id==user1.id)).length==0){
          await setUserin(false)
          // console.log(userIn)
        }
        else{
         console.log(workers.filter(worker=>worker.name==user1.username && worker.id==user1.id)[0])
          setUser((workers.filter(worker=>worker.name==user1.username && worker.id==user1.id))[0])
          
          window.localStorage.setItem('user',JSON.stringify({"username":user1.username, "id":user1.id, "isManager":workers.filter(worker=>worker.name==user1.username && worker.id==user1.id)[0].isManager, "isActive":workers.filter(worker=>worker.name==user1.username && worker.id==user1.id)[0].isActive}))
          
          console.log((user))
          window.localStorage.setItem('avatar',JSON.stringify(workers.filter(worker=>worker.name==user1.username && worker.id==user1.id)[0].avatar))
          setUserin(true)
          navigate('/Projects')
        }


    }
    const hundleChangeUserName = (event) =>{
      event.preventDefault()
      setUserName(event.tasrget.value)
    }
    const hundleChange= (e) =>{
      setUser1({
        ...user1,
        [e.target.name]:e.target.value
      })
    }
    


    return(
        <div className="container login-page" dir="rtl">
          <div className="a">
           
              <div className="mb-4 text-center row my-auto mt-3">
                <div className="col-6 text-center">
                  <label>שם משתמש</label>
                </div>
                <div className="col-6">
                  <input type="text" id="form2Example1" placeholder="username"  name="username" onChange={hundleChange} className="form-control" />
                  {/* setUser({"username":e.target.value, "id":id}) value={username}
                  
                  (e)=>{{setUserName(e.target.value)}}
                  
                  */}
                
                </div>
                
                
              </div>

            
              <div className="mb-4 text-center row my-auto mt-3 ">
                <div className="col-6 text-center">
                  <label className="">תעודת זהות</label>
                </div>
                <div className="col-6">
                  <input type="text" id="form2Example2" placeholder="id" name="id" onChange={hundleChange} className="form-control" />
                  {/* setUser({"username":username, "id":e.target.value}) */}
                </div>
                  
              </div>
            

            {/* </div> */}
          
{/* disabled={!username || !id} */}
            <div className="row" >
              <div className="col-12 text-center">
                <button type="button" data-testid="login-btn" className="btn btn-primary btn-block mb-4"   onClick={hundleSumbit}>התחבר</button>
              </div>
              {/* <div >
                  <span color="red" data-testid="error1" className="cl-red">שם משתמש או התעודת זהות לא נכונה</span>
                </div>  */}
              {
              userIn==false ? 
                <div >
                  <span color="red" data-testid="error1" className="cl-red">שם משתמש או התעודת זהות לא נכונה</span>
                </div> 
              :<></>}
              
            </div>
          </div>
        </div>
        
    );

}
export default Login
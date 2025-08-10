import { useEffect,useState } from "react";
import APIService from '../../help/APIService';
import Risk from "../../Risks/ChosseRisk";
import { useNavigate } from "react-router";
//import Loading from "./Loading";
import Navbar from "../../Navbar/index";
import worker_icon from '../../pictures/worker-icon.jpg'
import description from '../../pictures/description.jpg'
import OptionsList from "../../help/option";
//import {FcHeadset} from "react-icons/fc" 
import { FaRocketchat, FaExclamationTriangle, FaPlus, FaComment, FaRegTrashAlt, FaMapMarkerAlt, FaTools } from "react-icons/fa"
function Project({project, setProject, risks, setRisks, setProjects, user, setUser, risksList, setRisksList, risk, setrisk})
{
    const [showpopup, setshowpopup] = useState(false)
    // const [risksList, setRisksList] = useState([])
 //   const [RisksProjects, setRisksProjects] =useState([])
    const [Statuses, setStatuses] = useState([])
    const [status,setStatus] =useState(project.StatusName)
    

    useEffect(()=>{
        console.log(project.StatusName)
        //console.log(JSON.parse(window.localStorage.getItem('project')),status)
        setUser(JSON.parse(window.localStorage.getItem('user')))
       // setProject(JSON.parse(window.localStorage.getItem('project')))
       setRisks(JSON.parse(window.localStorage.getItem('risks')))
        APIService.projects().then(res=>{
           setProject((res.data).filter(project=>project.id==window.location.pathname.split('/')[2])[0])
            setProjects(res.data)
    
        })
       
       

        APIService.Status().then(res=>{
            setStatuses(res.data)
        })



        APIService.ProjectRisk().then(
            res=>{

                setRisksList((res.data).filter(item=>item.projectId==window.location.pathname.split('/')[2] && item.inactive==1))
            }   
        )

    },[])




    const hundlechange =() =>{
    //    console.log(project.id)
        APIService.UpdateProjectStatus({"Id":project.id,"StatusId":Statuses.filter(stat=>stat.name==status)[0].id}).then(res=>{
           // console.log(1)
            setProjects(res.data)
            //window.localStorage.setItem('project',JSON.stringify((res.data).filter(pro=>pro.id=project.id)[0]))
        })
    }
    


      

    const hundleAdd = () =>{
            APIService.risks().then(res=>{
            setRisks(res.data)
            // console.log(res.data)
        })
        setshowpopup(!showpopup)
    }


    const hundleRemove = (each) =>{
       // console.log(each)  each.name
    //    console.log(each.id)
       APIService.DeleteRisk({"id":each.id}).then(res=>{
          //  console.log((res.data).filter(item=>item.projectId==project.id))
            setRisksList((res.data).filter(item=>item.projectId==project.id && item.inactive==1))

       })


       //setRisksList(risksList.filter(risk => risk!=each))
    }
    const navigate = useNavigate()

    const hundleInfo = (each) =>{
        setrisk(each)
        APIService.UpdateRiskStatus(each.id).then(res=>{
        //    console.log(111)
            setRisksList((res.data).filter(item=>item.projectId==project.id && item.inactive==1))
        })
        //console.log(1)
        navigate("risk/"+each.id)
    }

    return(
        <div>
            {user.isActive===1 ? 
            <div>
                <Navbar user={user} />
                {project ?
                    <div className="container" dir="rtl">
                       
                        <div className="row mt-3">

                            <div className="col-6 h1 text-center">
                                {project.name}
                            </div>
                            {
                                project.StatusId != 3 ? 
                                <div className="col-4 mt-2">
                                    <p>סטטוס:{status}</p>
                                    <OptionsList optionsList={Statuses.filter(status=> status.name!="חדש")} InputValue={status} setInputValue={setStatus} />
                                    <button className="btn btn-primary" onClick={hundlechange}>
                                        שנה סטטוס    
                                    </button> 
                                </div>
                            :
                            <></>

                            }
                           
                        </div>
                        <div className="row mt-3">
                            <div className="col-3"><p  className="h5 text-end text-right">שם קבלן<img src={worker_icon} width="25"/></p></div>
                            <div className="col-2">{project.contractorName}</div>
                        </div>
                        <div className="row mt-3">
                                <div className="col-3">
                                    <p  className="h5 text-end text-right">
                                        שם פקח
                                        <img src={worker_icon} width="25"/>
                                    </p>
                                </div>
                            <div className="col-2">{project.supervisorName}</div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-3"><p className="h5 text-end text-right">מיקום<FaMapMarkerAlt /></p></div>
                            <div className="col-2">{project.location}</div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-3">
                                <p className="h5 text-end text-right">תיאור  <img src={description} width="25"/></p></div>
                            <div className="col-2">{project.description}</div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-3"><p className="h5 text-end text-right">כלים<FaTools /></p></div>
                            <div className="col-2">{project.Tool}</div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-12">
                            {
                                project.StatusId != 3 ?
                                <h4 className="text-right text-end">סיכונים <FaExclamationTriangle />   <button className="btn btn-primary" onClick={hundleAdd}><FaPlus /></button></h4>
                                :<></>
                            }
                                {showpopup ? <Risk risks={risks.filter(risk=>risk.inactive==1)}  setshowpopup={setshowpopup} setInputs={setRisksList} Inputs={risksList} setRisks={setRisks} projectId={window.location.pathname.split('/')[2]}  /> :<></>}
                            </div>
                        </div>
                        {
                        risksList.length>0 && risksList!=null ? 
                            risksList.filter(res => project.id==res.projectId && res.inactive==1).map((each,index)=>(
                                <div key={each.id} className="row mt-2">
                                    <div className="col-3">
                                        <p className="text-end">
                                            {index+1}.{each.RiskName}
                                        </p>
                                        <p>
                                            {each.status}
                                        </p>

                                    </div>
                                    <div className="col-1">
                                        <button onClick={()=>hundleRemove(risksList[index])} className="btn btn-xs text-right"><FaRegTrashAlt /></button>
                                    </div>
                                    {each.StatusId != 4 ? 
                                        <div className="col-1">
                                            <button className="btn" onClick={()=>hundleInfo(risksList[index])}><FaRocketchat /></button>
                                        </div>
                                    :<></>}
                                   {/* {each.StatusId != 4 ? 
                                       
                                    :<></>} */}
                                </div>
                            ))
                            :<></>
                        }
                        
                    </div>:
                        <div className="text-end" dir="rtl">
                            אין פרוייקט ב   id הזה
                        </div>
                    }
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
    // <Loading />
}
export default Project;
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { FaPlus } from "react-icons/fa";
import NewRisk from "./newRisk";
import APIService from "../help/APIService";




const Risks =({user,setUser,risks,setRisks})=>{
    const [showNewRisk, setShowNewRisk] = useState(false)
    useEffect(()=>{
        setUser(JSON.parse(window.localStorage.getItem('user')))
        // setRisks(JSON.parse(window.localStorage.getItem('risks')))
        APIService.risks().then(res=>{
            setRisks(res.data)
        })
    },[])
    return(
        <div>
            {
            user.isActive==1 ?
            <div>
                <Navbar user={user} />
                <div dir="rtl">
                    <div className="d-flex mt-3">
                        <p className="h5">סיכונים</p>
                        <button className="btn-circle" onClick={()=>setShowNewRisk(true)}><FaPlus className='text-center' /></button>
                    </div>
                    {
                        showNewRisk ?
                        <NewRisk setshowpopup={setShowNewRisk} risks={risks} setRisks={setRisks} />
                         :<></>
                    }
                    <div className="mt-2">
                    {
                        risks!=null ?
                        (risks.filter(risk=>risk.inactive==1)).map((risk,i)=>(
                            <div>
                                <p>{risk.name}</p>
                            </div>
                        ))
                        :<></>
                    }
                    </div>
                </div>
            </div>:<></>
            }
        </div>
    )
}
export default Risks;
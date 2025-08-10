import CloseButton from 'react-bootstrap/CloseButton'
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import OptionsList from "../../help/option";
import NewRisk from '../newRisk';
import APIService from '../../help/APIService';
//import Project from './Project';



function Risk({risks, setshowpopup,setInputs, Inputs, setRisks,projectId})
{
    
    const [risk, setRisk] = useState('')

    const hundleAdd = async () =>{
        
        // for(var i=0; i<Inputs.length-1; i++){
            
        //     if(Inputs[i].RiskName===risk)
        //     {
        //        //console.log(1)
        //         bool=true
        //     }
        // } 

        console.log(Inputs.some(item => item.RiskName === risk && item.inactive == 1  && item.projectId==projectId) )
     //   Inputs.some(item => item.RiskName === risk)
       
        if((Inputs.some(item => item.RiskName === risk && item.inactive == 1  && item.projectId==projectId)) || risk=="ריק" || risk == ""){
    
                alert("הוספת סיכון זה/ זה ריק")

       }
        else{
            APIService.NewRiskProject({"projectId":projectId, "RiskName":risk}).then(res=>{
              //ss console.log((res.data))
                setInputs((res.data).filter(item=>item.projectId==projectId))
            })      
        }       
  
   
            setshowpopup(false)
       // }
    }
 
    return(
        // <div className="">
        //     <div className="">
                <div className="container">

                    <div className='row'>
                        <p className='text-end sticky-middle'> בחר סיכון</p>
                    </div>
                    <div className="row">
                        
                        <div className="col-6 mt-2">
                            <OptionsList optionsList={risks} InputValue={risk} setInputValue={setRisk} />
                        </div>
                        <div className="col-4">          
                            <button onClick={hundleAdd} className="btn btn-primary sticky-middle">הוסף</button>
                        </div>



                        {/* <div className="col-4"> ------------הוספת סיכון חדש לדי בי

                            <button onClick={hundleOpen} className="btn btn-primary">סיכון חדש</button>
                            {showpopupNewRisk ? <NewRisk setshowpopup={setshowpopupNewRisk} risks={risks} setRisks={setRisks} /> : <></> }

                         
                            
                        </div> */}
                    </div>
                    {/* <div className="row">
                        <button onClick={()=>setshowpopup(false)}>close</button>
                        <CloseButton  onClick={()=>setshowpopup(false)} />
                    </div> */}
                </div>
        //     </div>
        // </div>
    )
    //לעשות אופשיין ליסט קומפוננטה ולעשות פונקציב שסוגרת םופאפ
}
export default  Risk;
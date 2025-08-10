import { useState } from "react"
import CloseButton from 'react-bootstrap/CloseButton'
import APIService from "../../help/APIService"



function NewRisk({setshowpopup, risks, setRisks})
{
    const [newRisky, setNewRisky] = useState('')
    // const [risks1,setrisks1]=useState(JSON.parse(window.localStorage.getItem('risks')))
    const hundleAdd =()=>{
        console.log(11)
        if(newRisky!='')
        {
            // console.log(risks)
            // // console.log(risks[risks.length - 1].id)
            // if(risks !=null || risks!=[]){

            //     setRisks(prew => [...prew, {'id':risks[risks.length - 1].id+1, 'name':newRisky, 'inactive':1}])
            //     window.localStorage.setItem('risks',JSON.stringify(risks))
            // }
            // else{
            //     console.log(2)
            //     setRisks([{'id':1, 'name':newRisky, 'inactive':1}])
            // }
            // APIService.risks().then(res=>{
            //     // setRisks(res.data)
                
            //     // window.localStorage.setItem('risks',JSON.stringify(res.data))
            //     // setRisks(res.data)
            // })

            console.log(1)
            if(risks==[]){
                console.log(2)
                setRisks(prew => [...prew,{'id':1, 'name':newRisky, 'inactive':1}])
            }
            else{
                 setRisks(prew => [...prew,{'id':risks[risks.length - 1].id+1, 'name':newRisky, 'inactive':1}])
            }
           
            // window.localStorage.setItem('risks',JSON.stringify(risks))
            //     APIService.risks().then(res=>{
            //     setRisks(res.data)
                
            //     window.localStorage.setItem('risks',JSON.stringify(res.data))
            //     // setRisks(res.data)
            // })
            // setRisks(risks)
            // setRisks(prew => [...prew, {"id":risks[risks.length - 1].id+1, "name":newRisky}])
            APIService.NewRisk({"RiskName":newRisky})
            setshowpopup(false)
        }
        else{
            alert("הוספת סיכון זה/ זה ריק")
        }
        // console.log(risks)
}
    return(
        <div className="popup-container1">
            <div className="popup-body1">
                <div className="container">
                    <div className='row' dir='ltr'>
                         <div className='col-12 close'>
                            {/* <p>iii</p> */}
                            {/* <button>x</button> */}
                            <CloseButton className=''  variant="red" onClick={()=>setshowpopup(false)} />   
                            
                        </div>  
                    </div> 
                    <div className="row">
                        <h3>סיכון חדש</h3>
                    </div>
                    <div className="row">
                        <div className="col-10">
                            <label>שם הסיכון:</label>
                            <input 
                                type="text"
                                onChange={(e)=>setNewRisky(e.target.value)}
                                value={newRisky}
                                />

                        </div>
                        <div className="col-2">
                            <button onClick={hundleAdd} className="btn btn-primary">הוסף</button>
                        </div>
                    </div>
                {/* <div className="row">
                    <button onClick={()=>setshowpopup(false)}>close</button>
                    <CloseButton  onClick={()=>setshowpopup(false)} />
                </div> */}
                </div>
            </div>
        </div>
    )
}
export default NewRisk;
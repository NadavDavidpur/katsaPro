import React from "react";
import { useState } from "react"
// import {Dropdown} from 'semantic-ui-react'
import Select, { components } from "react-select";

//import { FaRocketchat, FaExclamationTriangle, FaPlus, FaComment, FaRegTrashAlt, FaMapMarkerAlt } from "react-icons/fa"
import { FaUser, FaEnvelope, FaPhone,FaAngleLeft } from "react-icons/fa";
import ProfileOptionList from '../../optionListPicture'
// import axios from "axios";
import ApiServices from "../../help/APIService";
import { useNavigate } from "react-router";
// import ReactUIDropdown from "react-ui-dropdown";
// import { Title } from "@mui/icons-material";
//import ImageSelect from 'react-image-select';


function NewWorker() {
    // const [Name, setName] = useState('')
    // const [Id, setId] = useState(0)
    // const [PhoneNumber, setphoneNumber] = useState('')
    // const [inspectorname, setinspectorname] = useState('')
   // const [Class, setClass] = useState('')
    // const [selected, setSelected] = useState(0);
    // const [descriptionWork, setDescriptionWork] = useState('')
    // const [Tool, setTool] = useState('')
   // const [img, setimg] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp')
    const [Newworker, setNewworker] =useState({
      Name:'',
      Id:0,
      PhoneNumber:'',
      Class:'',
      img: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp',
      manager:false,
    })

    const navigate = useNavigate()

    // const handleDropdownChange = (selectedItems) => {
    //   //  console.log(selectedItems);
    //   };


  const [checked, setChecked] = useState(false);

  const handleChangeCheckBox = (e) => {
    setChecked(!checked);
    setNewworker({
         ...Newworker,
         manager:!checked
        })
  };

    //const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    // const handleChange = (value) => {
    //   setSelectedCountry(value);
    // };

    // const SingleValue = ({ children, ...props }) => (
    //   <components.SingleValue {...props}>
    //     <img src={selectedCountry.icon} alt="s-logo" className="selected-logo" />
    //     {children}
    //   </components.SingleValue>
    // );

  const hundleChange = (e) =>{
    setNewworker({
      ...Newworker,
      [e.target.name]:e.target.value
    })
    
  }








    const handleSubmit = (event)=>{

      ApiServices.newWorker(Newworker)



        navigate('/workers')



  };
  return (

  
    <div className='container' dir="rtl">
   


       <div className='row'>
           <div className='col-12'>
            <h1>
                  עובד חדש
            </h1>
          </div>
        
          <div className='row'>
            <div className='col-12 mt-3'>
              <h5 className='bg-light p-1 px-3'>פרטי העובד:</h5>
            </div>
          </div> 
          <div className="row">
            <div className='col-12'> 
              <div className='form-group'>
                <label className='form-check-label'>שם העובד:</label>
                <input type="text" className="form-control" name="Name" onChange={hundleChange} id="name" />
              </div>
          
            </div> 
          </div>
          <div className=''>
            <label className='form-check-label'>תעודת זהות:</label>
            <input type="text" className="form-control" name="Id" onChange={hundleChange} id="id" />

          </div>
          </div>
          <div className='form-group mt-3'>
            <label className='form-check-label'>מספר טלפון:</label>
            <input type="text" className="form-control" name="PhoneNumber" onChange={hundleChange} id="phoneNumber" />

          </div>
          <div className='form-group mt-3'>
            <label className='form-check-label'>מחלקה:</label>
            <input type="text" className="form-control" id="class" name='Class' onChange={hundleChange}  />
          </div>
          <div>
            <label className='form-check-label'>מנהל:</label>

             <input
              type="checkbox"
              name="manager"
              checked={checked}
              onChange={handleChangeCheckBox}
            />
          </div>
          <div className="">
              <ProfileOptionList setNewworker={setNewworker} Newworker={Newworker} />
          </div> 
          <button className="btn btn-primary mt-2 col-3 t-center" onClick={handleSubmit}>צור עובד</button>
         
        

      </div> 

   
 
  )
    
    }


export default NewWorker;
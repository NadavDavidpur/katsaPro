import { useState,useEffect } from 'react';
import { FaAngleLeft, FaAngleRight} from "react-icons/fa";
import Carousel from 'react-bootstrap/Carousel';
import './style.css';

// const CarouselProfile=({profiles})=>{
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };
//   return(
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//     {
//     profiles.map(profile=>{
//       <Carousel.Item>
//           {/* <ProfileListItem key={profile.id} profile={profile}  img={img} /> */}
//           <img src={profile.avatar} alt={profile.name} width='100' className='d-inline-block' />
//       </Carousel.Item>
//     })}
//   </Carousel>
//   )
// }

function ProfileListItem({ profile, img }) {
  

  return (
    <div>
        <li className='lessPoint'>
        {/* <h5>{profile.name}</h5> */}
        {/* <p>{profile.bio}</p> */}
        <img src={img} alt={profile.name} width='100' className='d-inline-block' />
        {/* <input type="checkbox" checked={isSelected} onChange={handleSelect}  /> */}
        </li>
    </div>
  );
}

//export default ProfileListItem;





//import { useState, useEffect } from 'react';
//import ProfileListItem from './ProfileListItem';, img,setimg

const ProfileList = ({Newworker, setNewworker}) => {
  const [profiles, setProfiles] = useState([{id:1, name:'1', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'},{id:2, name:'2', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'},{id:3, name:'3', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp'},{id:4, name:'4', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp'},{id:5, name:'5', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp'},{id:6, name:'6', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp'}]);
  //const [selectedProfile, setSelectedProfile] = useState(null);
  const [index, setIndex] = useState(1)
//   useEffect(() => {
//     //setimg(profiles[0].avatar)
//     //setProfiles([{id:1, name:'1', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'},{id:2, name:'2', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'},{id:3, name:'3', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp'},{id:4, name:'4', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp'},{id:5, name:'5', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp'},{id:6, name:'6', avatar:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp'}])
//   }, []);
    useEffect(()=>{
      //  console.log(profiles.filter((profile => profile.id==index))[0].avatar)
    //    setimg(profiles.)
    setNewworker({
      ...Newworker,
      img:profiles.filter((profile => profile.id==index))[0].avatar
    })
        //setimg(profiles.filter((profile => profile.id==index))[0].avatar)
    },[index])
    const arrowLeft = () =>{
        if(index==1){
          setIndex(5)      
        }
        if(index>1){
          setIndex(index-1)
        }
      }

      const arrowRight= () =>{
        if(index==5){
          setIndex(1)                     
        }
        if(index<5)
        {
            setIndex(index+1)
        }
      }
  return (
    <div>
      <h1>Profile</h1>
      <ul dir='ltr'>
        
        <div className='container'>
            <div className='image-container' >
                <button onClick={()=>{
                    //console.log(index)
                    arrowLeft()
                   
                }} className='btn'><FaAngleLeft  /></button>
                {
                profiles.filter((profile => profile.id===index)).map(profile=>
                    <ProfileListItem key={profile.id} profile={profile}  img={Newworker.img} />
                )}
                <button className='btn d-inline-block'  onClick={()=>{
                  arrowRight()
                }}><FaAngleRight /></button>
            </div>
                
       
        </div>
      </ul>
    
    </div>

    //<CarouselProfile profiles={profiles}/>



    






  );
}

export default ProfileList;

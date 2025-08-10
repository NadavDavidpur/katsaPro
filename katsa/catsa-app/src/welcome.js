import React,{ useState, useEffect } from "react"
import axios from "axios";
import TodoApp from "./TodoApp";
import NewData from "./projectsfile";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// export default function Welcome (){
//     const [block, setBlock] = useState(0);

//     useEffect(() => {
//         console.log('dddd')
//       fetch('http://127.0.0.1:5000/video', {mode:'no-cors'}).then(res => res.json()).then(data => {
//         setBlock(data.text);
//         console.log(data.text);
//       });
//     }, []);
  
//     return (
//       <div className="App">
//         <header className="App-header">
//           <p>Text: {block}</p>
//         </header>
//       </div>
//     );
//   }

//   export default function Welcome() {
//     const [data, setData] = useState([]);
//     const headers = {
//         "Content-Type": "application/json",
//         "'Access-Control-Allow-Origin": "*"
//         // Authorization: apiKey,
//       };
//     const getData = async () => {
//       const { data } = await axios.get(`http://127.0.0.1:5000/video`,{headers});
//       setData(data);
//     };
  
//     useEffect(() => {
//       getData();
//     }, []);
  
//     return <div>{JSON.stringify(data)}</div>;
// }
  

// import React from "react";
// class Welcome extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             data1:null
//         }
//     }
//     componentDidMount() {
//         // Simple GET request using fetch
//         fetch('http://127.0.0.1:5000/users',{
//             headers:{
//                 'Access-Control-Allow-Origin': '*',
//                 'Content-Type': 'application/json'
//             },
//             'method':'GET'
//         })
//             .then(response => response.json())
//             .then(data => this.setState({ data1: data.total }));
//     }
//     render(){
//         const {data1} =this.state
//         {console.log(data1)}
//         return(
//             <div>
//                     {data1}
//             </div>
//         )
//     }
// } 


// import json



function Nav1() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/data">HOME</Link>
            </li>
            <li>
              <Link to="/add">ADD</Link>
            </li>
            {/* <li>
              <Link to="/users">Users</Link>
            </li> */}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/data">
            <NewData />
          </Route>
          <Route path="/add">
            <TodoApp />
          </Route>
          {/* <Route path="/">
            
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}



export default Nav1;





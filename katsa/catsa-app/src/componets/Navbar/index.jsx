import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './style.css';



export default function Navbar({user}) { 
  const clearLocal =() =>{
    window.localStorage.clear()
  }
  if(user.isManager==1){
    return (

      <nav className="nav" dir="rtl">
        {/* <Link to="/" c>
          Site Name
        </Link> */}
        <ul>
          <li className="site-title">שלום {user.username}</li>
          <CustomLink to="/projects">פרוייקטים</CustomLink>
          
          <CustomLink to="/workers">עובדים</CustomLink>
          {/* <CustomLink to="/risks">סיכונים</CustomLink> */}
          <CustomLink to="/" onClick={()=>clearLocal()} className="text-start position-absolute start-0 mt-2">התנתק</CustomLink>
        </ul>
      </nav>
    )
  }
  else{
    return (

      <nav className="nav" dir="rtl">
        {/* <Link to="/" c>
          Site Name
        </Link> */}
        <ul>
          <li  className="site-title">שלום {user.username}</li>
          <CustomLink to="/projects">פרוייקטים</CustomLink>
          <CustomLink className="text-start position-absolute start-0 mt-2" onClick={()=>clearLocal()} to="/">התנתק</CustomLink>
        </ul>
      </nav>
    )
  }

}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={(isActive ? "active" : "")+ props.className}>
      <Link to={to} {...props} className="w-25 lihover">
        {children}
      </Link>
    </li>
  )
}

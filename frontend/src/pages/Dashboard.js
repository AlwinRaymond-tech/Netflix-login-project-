import "./Dashboard.css"
import { useNavigate } from "react-router-dom"

function Dashboard(){

const navigate = useNavigate()

const handleLogout = ()=>{

navigate("/")

}

return(

<div className="dashboard-container">

<nav className="navbar">

<h1 className="logo">
NETFLIX
</h1>

<button
className="logout-btn"
onClick={handleLogout}
>
Logout
</button>

</nav>

<div className="dashboard-content">

<h1>
Welcome to Dashboard
</h1>

<p>
Login Successful 🎉
</p>

<div className="cards">

<div className="card">
<h3>Trending</h3>
<p>Popular movies and shows</p>
</div>

<div className="card">
<h3>My List</h3>
<p>Your saved content</p>
</div>

<div className="card">
<h3>New Releases</h3>
<p>Latest content updates</p>
</div>

</div>

</div>

</div>

)

}

export default Dashboard
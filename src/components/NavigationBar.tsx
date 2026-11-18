import { NavLink } from "react-router"

function NavigationBar(){
    return(
        <nav>
            <NavLink 
            to="/" end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Home    
            </NavLink>

            <NavLink 
            to="/pokedex" 
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Pokedex    
            </NavLink>
        </nav>
    )
    
}
export default NavigationBar
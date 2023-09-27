import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="content">
      <nav className="nav">

 
          <>
             <Link to="/">
              <button>Home</button>
            </Link>
          </>
        
        

        { isLoggedIn && (
          <>
            <button onClick={logOutUser}>Logout</button>  
          </>
        )}

         {/* solo si la variable user existe y si el valor de user.isAdmin es false.*/}
        {user && !user.isAdmin && (  
          <>
            <Link to="/profile">
              <button>Profile    <span>{ user.name}</span> </button>
              {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
            </Link>
          </>
        )}

        {user && user.isAdmin && (
          <>
             <Link to="/admin/product">
              {" "}
              <button>admin</button>{" "}
            </Link>
          </>
        )}
            


        {!isLoggedIn && (
          <>
            <Link to="/signup">
              {" "}
              <button>Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
           
          </>
        )}
      </nav>

    </div>
  );
}

export default Navbar;

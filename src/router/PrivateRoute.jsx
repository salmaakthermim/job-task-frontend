import { useContext } from "react";
// import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthContext from "../Provider/AuthContext";
// import LoadingSpinner from "../components/LoadingSpinner";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user){
        return children
    }
    return <Navigate to="/login" state={location?.pathname}></Navigate>
};

export default PrivateRoute;
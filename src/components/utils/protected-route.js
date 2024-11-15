import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { getFromLocalStorage } from './local-storage';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../context/store";

const ProtectedRoute = (props, {children}) => {
    const {next} = props;
    const [state, dispatch] = useContext(Context);
    const user = getFromLocalStorage("user");
    return user?.token ? children : <Navigate to={`/login?next=${next}`} />;
}

export default ProtectedRoute;

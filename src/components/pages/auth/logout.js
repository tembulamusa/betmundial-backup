import React, {useContext, useEffect } from "react";
import { Context } from "../../../context/store";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [_, dispatch] = useContext(Context);
        

        useEffect(() => {
            localStorage.clear();
            localStorage.clear();
            dispatch({type: "DEL", key: "user"});
            dispatch({type: "DEL", key: "mybets"});
            window.location.href = "/";
        }, [])
    
    return null
}

export default React.memo(Logout);
import React, { useCallback, useContext, useEffect } from "react";
import { Context } from "../../../context/store";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [_, dispatch] = useContext(Context);
    localStorage.clear();
    const out = useCallback(() => {
        localStorage.clear();
        dispatch({type: "DEL", key: "user"});
        window.location.href = "/";
    }, []);
    useEffect(() => {
        out();
    }, [out]);
    
    return null
}

export default React.memo(Logout);
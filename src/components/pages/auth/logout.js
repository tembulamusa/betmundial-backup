import React, {useContext, useEffect } from "react";
import { Context } from "../../../context/store";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [_, dispatch] = useContext(Context);
        

        useEffect(async () => {

            try {
                localStorage.clear();
                console.log('localStorage cleared successfully.');
            } catch (error) {
                console.error('Error clearing localStorage:', error);
            }
            await dispatch({type: "DEL", key: "user"});
            await dispatch({type: "DEL", key: "mybets"});
            window.location.href = "/";
        }, [])
    
    return null
}

export default React.memo(Logout);
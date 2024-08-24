import React, { useContext, useEffect } from "react";
import { Context } from "../../context/store";

const MobileLoggedInBals = (props) => {
    const [, dispatch] = useContext(Context);
    useEffect(() => {
        dispatch({type:"SET", key:"loadbalssection", payload: true});
        return () => {
            dispatch({type:"SET", key:"loadbalssection", payload: false});

        }
    },[])
    return (
        <>
            <div>Balance <span></span></div>
            <div>Bonus <span></span></div>
        </>
    )
}

export default React.memo(MobileLoggedInBals);
import React, { useContext, useEffect } from "react";
import { Context } from "../../context/store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faDollarSign } from "@fortawesome/free-solid-svg-icons";
// import { FaDollarSign } from "react-icons/";

const MobileLoggedInBals = (props) => {
    const [state, dispatch] = useContext(Context);
    useEffect(() => {
        dispatch({type:"SET", key:"loadbalssection", payload: true});
        return () => {
            dispatch({type:"SET", key:"loadbalssection", payload: false});

        }
    },[])
    return (
        <div className="text-center">
            {/* <div style={{color:"#dddddd", fontWeight:"500"}} className="capitalize px-3 col-6">
                <div style={{}}>Balance <span className="secondary-text font-bold">{state?.user ? state?.user?.balance : "--"}</span></div>
                <div style={{}}>Bonus <span className="secondary-text font-bold">{state?.user ? state?.user?.bonus : "--"}</span></div>
            </div> */}
                <div className="text-white">
                    <Link to='/deposit' className="btn btn-deposit-withdraw text-white mr-2">
                        <FontAwesomeIcon icon={faCoins} className="text-white text-2xl mr-4"/>Deposit
                    </Link>
                    {/* <Link to='/withdraw' className="btn btn-deposit-withdraw text-white">
                        <FontAwesomeIcon icon={faDollarSign} className="bright-blue-text text-2xl mr-2"/>Withdraw
                    </Link> */}
            </div>
        </div>
    )
}

export default React.memo(MobileLoggedInBals);
import React, { useContext } from "react";
import { Context } from "../../context/store";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileRightMenu = (props) => {
    const [state, _] = useContext(Context);

    const MobileSearch = (props) => {

        return (
            <>
                <FaSearch className="inline-block mx-6"/>
            </>
        )
    }

    const LoginLink = () => {

        return (
            !state?.user && <Link to={"/login"} className="top-login-btn mobile-top-login rounded-md uppercase !px-4 inline-block !text-sm mx-2 py-2" style={{}}>
                Login
            </Link>
        )
    }


    const MobileRegisterLink = (props) => {

        return (
            <>                    
                <Link className="top-login-btn btn yellow-btn ml-3" to="/signup" >
                    Register
                </Link>
            </>
            
        )
    }

    return (
        <>
            <div className=" mt-2 mr-4">
                <MobileSearch />
                <LoginLink />                
                <MobileRegisterLink />
            </div>
        </>
    )
}

export default React.memo(MobileRightMenu);
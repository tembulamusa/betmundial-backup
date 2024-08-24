import React, { useContext } from "react";
import { Context } from "../../context/store";
import { FaFileAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileRightMenu = (props) => {
    const [state, _] = useContext(Context);

    const MobileSearch = (props) => {

        return (
            <>
                <FaSearch className="inline-block mx-2"/>
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
    const MobileSlipLink = (props) => {

        return (
            <>
                <a href="#betslip" className="uppercase mobile-betslip-link text-center inline-block float-end ml-2" >
                    <div className="relative">
                        <FaFileAlt className="text-center m-auto" size={15}/>
                        <span className="secondary-bg slip-counter">{ Object.entries(state?.betslip || {}).length}</span>
                    </div>
                    <div className="mt-1 text-sm font-bold">betslip</div>
                </a>
            </>
        )
    }

    return (
        <>
            <div className=" mt-2 mr-4">
                <LoginLink />
                <MobileSearch />
                <MobileSlipLink />
            </div>
        </>
    )
}

export default React.memo(MobileRightMenu);
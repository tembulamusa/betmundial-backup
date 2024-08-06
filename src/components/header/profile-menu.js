import React from "react";
import { faUser, faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utils/betslip";
import { Link } from "react-router-dom";
import {Navbar} from "react-bootstrap";

const ProfileMenu = (props) => {
  const { user } = props;
  return (
    <>
      {user && (
        <>
        <div className="ale ss profile  flex-row row  tablet-design float-end hidden md:d-flex md:flex md:block">
            <div className="user-menu-col {'mt-1'} col-md-2 d-flex flex-column justify-content-start space-deposit">
            <Link
              to={{ pathname: "/deposit" }}
              className={"btn   "}
              style={{ fontSize: "16px", fontWeight: "bold !important", background:"rgba(255,255,255,0.2)", borderRadius:"10px",padding:"5px 26px", width:"max-content"}}
            >
              <span className="uppercase overflow-hidden justify-content-center  rescale">
               <span className=" space-icons"> <FontAwesomeIcon className="secondary-text" icon={faCoins} /></span> Deposit 
              </span>
            </Link>
          </div>
          
          <div className="user-menu-col col-md-3  d-flex flex-column right justify-content-end w-change1">
          <div>
              <span className="font-tbt py-2 px-2">Bonus  <span className="ml-1 tertiary-text font-bold">KSH {formatNumber(user.bonus) || 0} </span></span>
              </div>
              <div>
              <Link to={{ pathname: "/my-bets" }} className={"btn text-white w-100 d-content"}>
                <span className="font-tbt pad-2 font-bold">
                <span className=" space-icons"><FontAwesomeIcon icon={faCoins} /> </span>My Bets
                </span>
              </Link>
              </div>
          </div>
         

          <div className=" user-menu-col col-md-3 d-flex flex-column right justify-content-end w-change2">
              <div>
              <span className="font-tbt py-2 flex-wrap text-gray-200">Balance <span className="font-bold ml-1 secondary-text"> KSH {formatNumber(user.balance) || 0} </span></span>
              </div>
              <div>
              <Link to={{ pathname: "/withdraw" }} className={"btn text-white w-100 d-content"}>
                <span className="font-tbt font-bold pad-2">
                <span className=" space-icons"><FontAwesomeIcon icon={faCoins} /> </span>Withdraw
                </span>
              </Link>
              </div>
             
          </div>

          <div className="user-menu-col col-md-3 d-flex flex-column nav-option-content w-change2">
            <div>
              <span className="font-tbt py-1">
              <span className=" space-icons"><FontAwesomeIcon icon={faUser} /> </span>{user?.msisdn}
              </span>
            </div>
            <div>
              <a href="/logout">
                <span className="font-tbt py-1 font-bold">
                <span className=" space-icons"> <FontAwesomeIcon icon={faLock} /> </span>Logout
                </span>
              </a>
            </div>
          </div>
          <div className="col-1 button-toggle space-button">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} className="px-3 py-3"/>
          </div>
        
        </div>
        </>
      )}
    </>
  );
};

export default ProfileMenu;

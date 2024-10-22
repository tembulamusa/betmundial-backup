import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
const Header = React.lazy(()=>import('../../header/header'));
const SideBar = React.lazy(()=>import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(()=>import('../../footer/footer'));
const Right = React.lazy(()=>import('../../right/index'));

const CookiePolicy = () => {
    return (
        <>        
            <div className='col-md-12 bg-primary p-4 text-center profound-text'>
                <h4 className="inline-block"> Cookie Policy </h4>
            </div>                                                  
            <div className="col-md-12 py-5 px-4"> 
                <p>Cookies are files with small amount of data that are commonly used an anonymous unique identifier. These are
                sent to your browser from the website that you visit and are stored on your phone/computer. We use cookies
                for the following purposes:</p>
                <ul>
                <li>to identify the Account Holder's (as defined in our Terms and Conditions) preferred language, so it can
                be automatically selected when the Account Holder returns to the Website;</li>
                <li>to ensure that bets placed by the Account Holder are associated with the Account Holder's betting
                coupon and Account;</li>
                <li>to ensure that the Account Holder receives any bonuses for which they are eligible, and for
                analysis of the Website traffic, so as to allow us to make suitable improvements.</li>
                </ul>
                <p>You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your
                phone/computer. If you choose to refuse our cookies, you may not be able to use some features of our Services.
                </p>

            </div>
        </>
    )
}

export default CookiePolicy

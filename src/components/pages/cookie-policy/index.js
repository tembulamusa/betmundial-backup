import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));

const CookiePolicy = () => {
    return (
        <>
            <div className='col-md-12 bg-primary p-4 text-center profound-text'>
                <h4 className="inline-block"> Cookie Policy </h4>
            </div>
            <div className="col-md-12 py-5 px-4">
                <p>
                    Cookies are files with small amounts of data, often used as an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your device. We use cookies for the following purposes:
                </p>

            </div>
            <div className="col-md-12 py-2 px-4">

                <Accordion allowZeroExpanded>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Preferred Language Identification
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                We use cookies to identify the Account Holder's preferred language, so it can be automatically selected when the Account Holder returns to the Website.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Betting Association
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Cookies help ensure that bets placed by the Account Holder are associated with the Account Holder's betting coupon and Account.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Bonus Eligibility & Traffic Analysis
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                We use cookies to ensure that the Account Holder receives any eligible bonuses and for analyzing Website traffic to make improvements.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Your Cookie Choices
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                You have the option to either accept or refuse these cookies and can know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some features of our Services.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
}

export default CookiePolicy;

import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Complaints = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    COMPLAINTS
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>

                <p>
                    majesticbet is committed to provide the best quality of support for our
                    players.
                </p>
                <p>
                    One of the ways in which we can continue to improve our service is by
                    listening and responding to the views of our Clients and, in particular,
                    by
                    responding positively to complaints. However, we do admit that reaching
                    a
                    unanimous outcome in all cases is not always possible.
                </p>
                <p>
                    If a Client wishes to make a compliant or feels that their case might
                    need
                    further escalation, they should contact our customer support agents by
                    email
                    on customercare@majesticbet.com. A customer care representative shall acknowledge
                    the
                    receipt of the complaint to the Client in a maximum period of 3 working
                    days.

                </p>
                <p>
                    Our agents are also available on live chat, official social media
                    handles
                    and via phone, as we strive to ensure that making a complaint is as
                    accessible as possible. The 'Help' section on our website is there to
                    assist
                    the player in selecting the most appropriate communication channel to
                    reach
                    our customer support.
                </p>
                <p>
                    Please be advised that in order for us to take action on a complaint in
                    the
                    shortest time frame possible, it must contain clear and concise
                    information
                    about the Client’s identity (name, surname, username, bet id, game id,
                    mobile number), as well as all relevant details about the case (the name
                    of
                    the game, the time and date of the incident with a clear explanation).
                </p>
                <p>
                    No complaints with regard to the acceptance, settlement or resettlement
                    of a
                    bet will be heard by us if they are not raised through our Customer
                    Services
                    within 30 days from the event occurrence which the bet related to
                    occurred.
                </p>
                <p>
                    Offensive or rude language, as well as malicious or damaging comments,
                    will
                    not be tolerated while contacting our staff or while discussing our
                    products
                    and services in any media, social network or forum. Any infringement of
                    this
                    policy will result in a suspension of the Account or in every additional
                    action as may be required in order to ensure compliance.
                </p>

            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Complaints

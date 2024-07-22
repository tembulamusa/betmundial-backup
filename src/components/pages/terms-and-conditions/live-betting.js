import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const LiveBetting = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    LIVE BETTING
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>

                <p>Live bets are accepted on main markets and additional markets.
                </p>
                <p>Live bets shall be deemed accepted once they have been registered on the
                    server and online confirmation has been received. You may not alter the
                    bet
                    once it has been accepted.
                </p>
                <p>Live feeds broadcasted from the TV, Radio and Internet are subject to
                    delays
                    and as such a CLIENT may experience events ahead or behind of others.
                </p>
                <p>As a result of the delay experienced before placing live bets, Clients
                    will
                    be given the option of placing their bets at new odds or not placing the
                    bet
                    at all.
                </p>

                <p>majesticbet reiterates that any live scores displayed on its sites during
                    live
                    events remain placed for guidance purposes only and that majesticbet will
                    not
                    take any responsibility for any errors and inaccuracies on the same.
                </p>
                <p>majesticbet reserves the right to void any bets placed after the outcome of
                    an
                    event is known. Should a bet be placed with incorrect odds due to
                    delayed
                    ‘Live’ coverage of an event and where a team has gained a significant
                    advantage as stated above bets will be voided.
                </p>

                <p>Odds on all selections change regularly to reflect fluctuations in the
                    market or changes in the events themselves. In some cases, the odds may
                    change between the time you put your bet on the bet slip and the time
                    you
                    place the bet.
                </p>

                <p>If the current odds are different from the odds on the bet slip you will
                    be
                    required to confirm whether you wish to place the bet with the new odds.
                </p>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default LiveBetting

import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const ApplicableLaw = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    APPLICABLE LAW AND PLACE OF JURISDICTION
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <p>
                    This agreement and use of the company’s website and services shall be
                    governed by the applicable provisions of the Betting, Lotteries and
                    Gaming Act, CAP. 131 and any Regulations and Rules made in terms
                    thereof, as amended from time to time. It shall be the responsibility of
                    the Customer to ensure that he/she is aware of these provisions.
                </p>
                <p> Any and all legal relationship between the CLIENT and the Company, for
                    every circumstance not regulated by the Terms and Conditions of Use,
                    will be subject to laws of the Republic of Kenya.

                </p>
                <p>
                    If the CLIENT places of a bet from a location falling outside Kenya,
                    such bet shall be subject to all appropriate exchange control
                    regulations and the laws of the foreign jurisdiction from which such
                    communication originates and it shall be the responsibility of the
                    CLIENT to ensure full compliance with same. betmundial makes no warranties
                    and shall not be liable to the CLIENT if it is not able to remit any
                    monies held by it to any account held by the CLIENT in a foreign
                    jurisdiction.
                </p>

                <p>
                    All winnings on bets placed are subject to 20% tax payable to the
                    Republic of Kenya.
                </p>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default ApplicableLaw

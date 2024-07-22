import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Indemnification = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    INDEMNIFICATION
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <p>
                    The CLIENT agrees to defend and indemnify majesticbet and its officers,
                    directors, and employees, and to hold them harmless from and against any
                    and all claims, liabilities, damages, losses, and expenses, including
                    without limitation reasonable attorney's fees and costs, arising out of
                    or in any way connected with:
                </p>
                <ul>
                    <li>
                        CLIENT's access to or use of the Website or Services;
                    </li>
                    <li>
                        CLIENT’s violation of any of the terms of this Agreement; or
                    </li>
                    <li>
                        CLIENT’s breach of any applicable laws or regulations.
                    </li>
                </ul>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Indemnification

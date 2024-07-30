import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const DisputeResolution = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    DISPUTE RESOLUTION
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <p>
                    In the event of a dispute arising between us and you, we each agree to
                    follow the procedure set out in our Dispute Resolution policy as amended
                    from time to time.
                </p>
                <p>
                    If surebet is unable to settle the dispute, surebet will refer the
                    dispute to an arbiter, whose decision will be final (save in respect of
                    any manifest error) subject to full representation given to all parties
                    involved. No dispute regarding any bet/wager will result in litigation,
                    court action or objection to a bookmaker’s licence or permit (including
                    any remote operator’s licence or personal licence) unless surebet fails
                    to implement the decision given by arbitration.
                </p>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default DisputeResolution

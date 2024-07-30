import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const ErrorsOrOmissions = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    ERRORS OR OMISSIONS
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <p>
                    A number of circumstances may arise where a bet or wager is accepted, or
                    a payment is made, by us in error. A non-exhaustive list of such
                    circumstances is as follows:
                </p>
                <ul>
                    <li>
                        where we mis-state any odds or terms of a bet or gaming wager to You
                        as a result of obvious error or omission in inputting the
                        information or setting up a market, or as a result of a computer
                        malfunction;
                    </li>
                    <li>
                        where we have made a 'palpable error'. A palpable error occurs
                        where:
                    </li>
                    <li>
                        in relation to bets placed prior to an event taking place, the
                        prices/terms offered are materially different from those available
                        in
                        the general market; or
                    </li>
                    <li>
                        in relation to any event, the price/terms offered at the time the
                        bet is placed are clearly incorrect given the probability of the
                        event
                        occurring;
                    </li>
                    <li>
                        where we have continued to accept bets on a market which should have
                        been suspended, including where the relevant event is in progress
                        (except where 'in-running' bets are accepted) or had already
                        finished
                        (sometimes referred to as 'late bets');
                    </li>
                    <li>
                        where an error has been made as a result of a Prohibited Practice;
                        vii. where we should not have accepted, or have the right to cancel
                        or
                        re-settle, a bet pursuant to the Betting Rules (for example due to
                        'Related Contingencies');
                    </li>
                    <li>
                        where an error is made by us as to the amount of winnings/returns
                        that are paid to You, including as a result of a manual or computer
                        input error; or
                    </li>
                    <li>
                        where an error has been made by us as to the amount of free bets
                        and/or bonuses that are credited to Your Account,
                        such circumstances being referred to as an "Error"
                    </li>
                </ul>
                <p>
                    surebet reserves the right to:
                </p>
                <ul>
                    <li>
                        correct any Error made on a bet placed and re-settle the same at the
                        correct price or terms which were available or should have been
                        available
                        through the Operator (absent the publishing error) at the time that
                        the bet
                        was placed and the bet will be deemed to have taken place on the
                        terms which
                        were usual for that bet; or
                    </li>
                    <li>
                        where it is not reasonably practicable to correct and re-settle
                        under
                        18.2.1 above, to declare the bet void and return Your stake into
                        Your
                        Account; or
                    </li>
                    <li>
                        in circumstances where the Error has resulted from a Prohibited
                        Practice, to take necessary steps to amend this.
                    </li>
                    <li>
                        Any monies which are credited to Your Account, or paid to You as a
                        result of an Error shall be deemed, pending resolution under clause
                        iii
                        above, to be held by You on trust for us and shall be immediately
                        repaid to
                        us when a demand for payment is made by us to You. Where such
                        circumstances
                        exist, if You have monies in Your Account we may reclaim these
                        monies from
                        Your Account. We agree that we shall use all reasonable endeavours
                        to detect
                        any Errors and inform You of them as soon as reasonably practicable.
                    </li>
                    <li>
                        Neither we (including our employees or agents) nor our partners or
                        suppliers shall be liable for any loss, including loss of winnings,
                        that
                        results from any Error by us or an error by You.
                    </li>
                    <li>
                        You shall inform us as soon as reasonably practicable should You
                        become
                        aware of any Error.
                    </li>
                    <li>
                        Where You have used monies which have been credited to Your Account
                        or
                        awarded to You as a result of an Error to place subsequent bets or
                        play
                        games, we may cancel such bets and/or withhold any winnings which
                        You may
                        have won with such monies, and if we have paid out on any such bets
                        or
                        gaming activities, such amounts shall be deemed to be held by You on
                        trust
                        for us and You shall immediately repay to us any such amounts when a
                        demand
                        for repayment is made by us to You.
                    </li>
                </ul>

            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default ErrorsOrOmissions

import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Deposits = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    DEPOSITS
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ol>
                    <li>
                        In order to fund a player account one can, do so by utilizing the
                        deposit methods availed on the company’s website. Further
                        information
                        about the deposit methods are included in the Deposit section on the
                        website (www.betmundial.com).
                    </li>
                    <li>
                        betmundial reserves the right to impose certain conditions on the use
                        of
                        particular payment methods, only but not limited if enforced by
                        payment
                        providers’ requirements, or regulatory requirements in connection to
                        Social Responsibility Code of the license or if is connected to the
                        suspicious activity of the particular player. betmundial retains the
                        right
                        to change the payment methods available.
                    </li>
                    <li>
                        betmundial does not guarantee that all methods of payment are available
                        at all times but will do utmost to provide customers with continuous
                        service.
                    </li>
                    <li>
                        A deposit request via mobile money into a player account, funds the
                        account in real time, other methods might take longer to process.
                    </li>
                    <li>
                        betmundial reserves the right to request further information and
                        documentation regarding CLIENT'S age, identity and place of
                        residence
                        following any deposits or prior to any withdrawals, in particular
                        prior
                        to first withdrawal, in order to prove CLIENT'S identity before we
                        release funds. We also reserve the right to request such information
                        and
                        documentation about any person who affects a deposit on CLIENT'S
                        Account. Such information and documentation (as Driving License,
                        Government issued ID, and Passport, utility bill, Bank/Credit card
                        Statement) will enable us to check that the personal data given
                        during
                        registration corresponds to data on the document. In the event of
                        diverging data, we reserve the right to cancel the bets along with
                        the
                        payment of the account balance, unless the CLIENT can demonstrate
                        entitlement to the balance by some other means. betmundial reserves the
                        right to request an image of both sides of the debit/credit card
                        used to
                        deposit as supporting evidence in case a deposit comes from a non 3D
                        secure scheme (additional fraud prevention system processing) or if
                        a
                        customer is processing large or multiple transactions. In order to
                        reflect the best security practices, the CLIENT will always be asked
                        to
                        hide the CVV number and wipe out certain card numbers. In small
                        number
                        of cases, we might require additional proof of residence or
                        transaction
                        in PDF format.
                    </li>
                    <li>
                        Betting limits can be set by the player in the ‘Responsible Gaming’
                        page.
                    </li>
                    <li>
                        The player acknowledges that betmundial reserves the right to request
                        proof of payments to player’s accounts to confirm a depositing
                        source or
                        complete verification process.
                    </li>
                    <li>
                        All payments into the Account must be from a payment source in which
                        the Player is the named account holder.
                    </li>
                </ol>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Deposits

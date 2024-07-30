import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Withdrawals = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    WITHDRAWALS
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ol>
                    <li>
                        A request for withdrawal cannot be made while the User is involved
                        in
                        a gaming session.
                    </li>
                    <li>
                        surebet’ finance department will handle all withdrawal requests.
                        surebet reserves the right to verify the account holder's
                        eligibility
                        for any requests and, in case of doubt, refuse to process the
                        withdrawal, leading to the return of the funds back to the player's
                        account. Valid documents issued by government (Passport, Identity
                        Card)
                        must be submitted in order to process a withdrawal. However, surebet
                        reserves the right to verify the User’s identity, age, address and
                        location at any time before processing any amount of requested
                        withdrawal.
                    </li>
                    <li>
                        Withdrawal methods information is included in the Withdrawal section
                        on the website www.surebet.com.
                    </li>
                    <li>
                        Any expense related to withdrawal requests, if applicable and
                        explicitly announced on the website, shall be charged to the
                        receiver.
                    </li>
                    <li>
                        The account holder's personal data in their Gaming Account and Bank
                        Account (or for any other payment method) must correspond. surebet
                        reserves the right to withhold withdrawal until to request further
                        documentation, as proof of identity, as well as additional
                        verification
                        of the payment method in question.
                    </li>
                    <li>
                        The maximum self-service withdrawal amount per day will be Kenya
                        Shillings Twenty Thousand Only (Kshs. 20,000.00).
                    </li>
                    <li>
                        Withdrawals from a User’s Account can only be addressed strictly to
                        the person registered on the Account and as per the conditions
                        specified
                        on the surebet WEBSITE.
                    </li>

                    <li>
                        Withdrawals can only be paid-out to the same account and payment
                        method from which player's deposits have originated.
                    </li>
                    <li>
                        Once a withdrawal request is submitted it can take surebet up to
                        forty eight (48) hours to process the request. However, surebet will
                        be
                        doing its best to process withdrawal requests immediately.
                    </li>
                    <li>
                        In the instance a CLIENT attempts to withdraw funds that were
                        deposited but not used for staking, surebet may levy a processing
                        fee of
                        20% upon such withdrawals. surebet reserves the right to investigate
                        any
                        and all suspicious activities related to such withdrawals and report
                        the
                        same to the relevant authorities. Additionally, the CLIENT will lose
                        all
                        the deposited funds.

                    </li>
                    <li>
                        Payouts handled manually through an ordinary bank transfer are
                        processed within Seventy-Two (72) banking hours and are subject to
                        additional carrier fees. However, the CLIENT acknowledges that we
                        are at
                        the mercy of the banks and Payment service providers in this regard
                        and
                        cannot do anything to speed up this process.

                    </li>
                    <li>
                        The CLIENT agrees not to attempt any chargebacks, reversals or
                        otherwise cancel any deposit previously made in his/her Account.
                        Whenever any such event should occur the CLIENT commits to refund
                        surebet for the unpaid deposits and for possible expenses resulting
                        from
                        the recollection of the misplaced money.
                    </li>
                    <li>
                        Kindly note that surebet will hold the funds deposited in the
                        Account
                        as trustee for the CLIENT and not as his/her banker or debtor.
                        Accordingly, there will be no obligation on the part of surebet
                        Kenya to
                        repay money to the Customer as his/her debtor. Additionally, no
                        interest
                        shall accrue from funds deposited into the CLIENTS’s account be it
                        in
                        the form of deposits, winnings or any other method.
                    </li>
                    <li>
                        surebet at all times reserves the right to refuse and/ or limit
                        bets.
                    </li>
                </ol>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Withdrawals

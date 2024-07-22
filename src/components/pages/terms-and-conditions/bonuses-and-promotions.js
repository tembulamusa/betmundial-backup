import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const BonusesAndPromotions = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    BONUSES AND PROMOTIONS
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <p>
                    Bonuses being offered and their details of crediting bonus money will be available on the
                    bonus/promotions section of the website. The amount of bonus money is determined by majesticbet and set
                    out on the website.
                </p>

                <p>The CLIENT binds himself/herself not to abuse the ability of opening accounts in order to benefit
                    from bonus credits and other promotional offers that may be offered. The company reserves the right
                    in case of an abusive behavior on the CLIENT’S part as related to bonus credits and/or to
                    promotional offered by majesticbet to rescind or block CLIENT accounts created to that end as well as
                    their transactions.</p>
                <p>majesticbet reserves the right to revoke and/or cancel any bonus and/or promotional winnings which are
                    deemed to have occurred due to abuse and/or misuse of any promotional system. In the event of any
                    dispute the general conditions set out in the complaints procedure on the company’s website will
                    apply.</p>

                <p>The bonus money will be kept separately from the CASH on the account. The BONUS will not be paid
                    directly until it has been transformed into REAL CASH winnings.
                    If the cash account contains both BONUS and CASH, the bet used for wages will be subject to BONUS
                    BET conditions.</p>


                <p>Specific bonus bet conditions will be published on the website.
                    Any indication of fraud, manipulation, cash-back arbitrage or other forms of deceitful or fraudulent
                    activity based on the provision of the bonus will render the account inactive along with any and all
                    profits and losses generated.

                </p>
                <p>
                    ALL BONUSES and PROMOTIONAL OFFERS are subject to the terms ad conditions made available when
                    communicating the bonus offer
                </p>
                <p>
                    If the cash account contains both Bonus and real money, the total
                    bet
                    used
                    for wagers will be subject to bonus bet conditions. Specific bonus
                    bet
                    conditions will be published on the website.
                </p>
                <p>
                    Any indication of fraud, manipulation, cash-back arbitrage, or other
                    forms
                    of deceitful or fraudulent activity based on the provision of the
                    bonus
                    will
                    render the account inactive along with any and all profits or losses
                    generated.
                </p>
                <p>
                    All bonuses and promotional offers are subject to the terms and
                    conditions
                    made available when communicating the bonus offer.
                </p>
                Rules on majesticbet Bonuses
                <br/>
                <strong className="text-decoration-underline">GENERAL BONUS/PROMOTION RULES</strong>
                <br/>
                <ol>
                    <li>
                         Apart from the JACKPOT BONUS, any other bonus CANNOT be WITHDRAWN. However, bonus winnings
                        derived from the bets placed successfully with the bonus can be withdrawn.
                    </li>
                    <li>
                        If majesticbet notices something suspicious about your activities with the bonus, then we may
                        take it away. This includes very similar betting patterns between the referrer and the referred
                        account.
                    </li>
                    <li>
                        	EACH bonus offer will have its own “TERMS & CONDITIONS” and Customers should ensure that the terms and conditions associated with each individual bonus offer are read and understood prior to accepting the bonus.
                    </li>
                    <li>
                        	Bonus expiry is midnight (all bonuses)
                    </li>
                    <li>
                        	Maximum games per slip on bonus related bets is 4
                    </li>
                    <li>
                        	Minimum odds per game on bonus related bets is 1.8
                    </li>
                    <li>
                        	Minimum total odds per bonus bet is 10.00
                    </li>
                    <li>
                        	The maximum pays-out from bonus bets - KES.1,000 per betslip.
                    </li>
                    <li>
                        	All rules on bonus bets will apply.
                    </li>
                    <li>
                        	Promotions are subject to change. All management decisions are final.
                    </li>
                    <li>
                       	In the event of an error when attributing a bonus to a customer account, the company reserves the right to correct such errors by removing any funds that were put into the customer’s account erroneously and by avoid
                    </li>
                </ol>
                <p><strong><strong>NB;</strong> APART FROM JACKPOT BONUSES , THE REST CANNOT BE WITHDRAWN</strong></p>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default BonusesAndPromotions

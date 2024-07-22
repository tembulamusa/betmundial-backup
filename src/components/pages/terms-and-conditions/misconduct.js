import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Misconduct = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    MISCONDUCT
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ol>
                    <li>
                        Misconduct by CLIENTS is forbidden on the website. CLIENT’s behavior
                        is deemed as a violation of these Terms and Conditions, whenever,
                        but
                        not exclusively, if the CLIENT:
                    </li>
                    <ul>
                        <li>
                            intentionally provides inaccurate or incomplete information;
                        </li>
                        <li>
                            attempts to manipulate the result of games through concerted
                            practices, alterations of the program or in any other undue way;
                        </li>
                        <li>
                            deliberately cause malfunctions or defects of the website in
                            order
                            to undermine the natural flow of the game;
                        </li>
                        <li>
                            sets up more than one account per person; or any other
                            regulations
                            set out in these Terms and Conditions is violated; and
                        </li>
                        <li>
                            uses abusive or offensive language in email messages and/or
                            during
                            live chat, makes matrimonial offers, pornographic references or
                            sexual
                            comments, sends spam, threatening messages, uses verbal abuse or
                            slurs
                            majesticbet’s and its employees. Any violation of this policy will
                            result in
                            the end of the conversation and suspension of player’s account
                            for an
                            indefinite period of time.
                        </li>
                    </ul>
                    <li>
                        The CLIENT will not decompile or attempt to decompile the software
                        on
                        the company’s website or develop software that interferes with the
                        Client-Server-Communication software used on its website.
                    </li>
                    <li>
                        The use of any software program which facilitates artificial
                        intelligence is strictly prohibited. Prohibited software may include
                        software which majesticbet believes allows player to cheat or gives one
                        player an unjust advantage while wagering on the website. The
                        Company
                        reserves the right to take action in order to detect and prevent the
                        use
                        of such software by Players. Should the company identify or suspect
                        for
                        good reason the use of prohibited programs, the company reserves the
                        right to freeze the relevant Player’s account for a period of at
                        least
                        six (6) months, to confiscate any funds in that account and/or to
                        suspend the Player from using the services of the company.
                    </li>
                    <li>
                        In the event of misconduct by a CLIENT, the company is entitled to
                        immediately terminate the Agreement with the CLIENT and exclude him
                        from
                        further use of the website. Furthermore, the company is entitled to
                        interrupt and terminate on-going games, block the CLIENT’s account
                        with
                        or without prior notice and to retain the User’s credit and winnings
                        achieved through misconduct until clarification of the situation is
                        reached.
                    </li>
                </ol>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Misconduct

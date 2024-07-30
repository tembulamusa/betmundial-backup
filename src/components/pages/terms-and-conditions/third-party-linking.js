import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const ThirdPartyLinking = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    THIRD PARTY LINKING
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <p>
                    At the company’s discretion, the Websites or other Services may contain
                    links to third party websites. These links are provided solely as a
                    convenience to you and not as an endorsement by surebet of the contents
                    on such third party websites. surebet will not be responsible for the
                    content of linked third party sites and does not make any
                    representations regarding the content or accuracy of materials on such
                    third party sites. LINKS TO ANY SERVICES PROVIDED BY A THIRD PARTY ARE
                    NOT INTENDED FOR TRADING OR INVESTING PURPOSES AND THE COMPANY WILL
                    ACCEPT NO LIABILITY FOR ANY DIRECT, CONSEQUENTIAL, INCIDENTAL, INDIRECT,
                    PUNITIVE OR ANY OTHER LOSSES OR DAMAGES ARISING OUT OF YOUR ACCESS TO
                    AND USE OF THE INFORMATION PROVIDED. IF YOU DECIDE TO ACCESS LINKED
                    THIRD PARTY WEBSITES, YOU DO SO AT YOUR OWN RISK.
                </p>
                <p>
                    surebet does not permit linking from its Websites or its Services to
                    third party websites or services or the display of third party content
                    on top of, or in addition or as an alternative to, our Websites or
                    Services without our express written consent. In particular, surebet
                    expressly prohibits third parties from framing, similar techniques or
                    other acts of impairment of a user's experience when they visit our
                    Websites or engage with our Services. To this end, and by your
                    acceptance of these Terms of Use whether as registered member or
                    otherwise, you hereby acknowledge that where you engage in any of the
                    foregoing prohibited actions:
                </p>
                <ul>
                    <li>
                        That damages may not be an adequate remedy for any infringement and
                        that the company will be entitled to the remedies of injunction,
                        specific performance, an order to deliver up materials which
                        infringe
                        our intellectual property rights and any other statutory or
                        equitable
                        relief and that no proof of special damages is necessary for
                        reliance on
                        such remedies; and
                    </li>
                    <li>
                        That you shall indemnify us for any liabilities, losses or damages
                        (including reasonable legal fees), however caused, that may arise as
                        a
                        result of or in connection with your non-compliance with this
                        Clause.
                    </li>
                </ul>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default ThirdPartyLinking

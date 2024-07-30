import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const IntellectualProperty = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    INTELLECTUAL PROPERTY
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ul>
                    <li>
                        All content, trademarks, services marks, trade names and logos are
                        the property of surebet and are protected by copyright laws,
                        international treaties and provisions.
                    </li>
                    <li>
                        The CLIENT agrees not to delete any copyright notices or other
                        indications of protected intellectual property rights from materials
                        that the CLIENT receives from surebet or surebet’ WEBSITES. The
                        CLIENT
                        will not obtain any intellectual property rights in, or any right or
                        license to use such materials or the WEBSITES, other than as set out
                        in
                        this Agreement.
                    </li>
                    <li>
                        The CLIENT agrees not to resell marketing materials provided to them
                        by surebet or permit secured access of the Website to others, and
                        not to
                        copy any materials appearing on the Website for resale or for any
                        other
                        purpose to others without the prior written consent of surebet. The
                        same
                        rule applies to all users of the Website not limited to the Account
                        holders.
                    </li>
                    <li>
                        Images displayed on the Website are either the property of surebet
                        or
                        to be used with permission. The CLIENT agrees not to upload, post,
                        reproduce or distribute any information, software or other material
                        protected by copyright or any other intellectual property rights (as
                        well as rights of publicity and privacy) without first obtaining the
                        permission of the owner of such rights and the prior written consent
                        of
                        surebet.
                    </li>
                </ul>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default IntellectualProperty

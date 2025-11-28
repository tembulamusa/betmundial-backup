import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));

const ResponsibleGambling = () => {
    return (
        <>
            <div className='col-md-12 bg-primary p-4 text-center profound-text'>
                <h4 className="inline-block">Responsible Gambling</h4>
            </div>
            <div className="col-md-12 mt-2 py-2 px-4">
                <Accordion allowZeroExpanded>
                    {/* Introduction */}
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                1. Introduction
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>As betmundial we are committed to responsible gambling and take our customers and our social
                                responsibility very seriously. Our products are designed for your entertainment and enjoyment
                                and we are committed to providing a secure, fair and socially responsible service. We want you
                                to enjoy our products safely and responsibly.</p>

                            <p>We believe in a firm but fair approach to responsible gambling. That is why to assist you, we
                                offer a range of advice and options to help you manage your gaming and ensure that everyone
                                who enjoys our service can do so in as safe a way as possible.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    {/* Responsible Gambling Tips */}
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                2. Responsible Gambling Tips
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>We believe that gambling should always be an enjoyable leisure activity. Remembering these
                                simple tips can help make sure your gambling does not become a problem.</p>

                            <p>1. Gambling should be entertaining and not seen as a way of making money.</p>

                            <p>2. Bet sensibly and never chase losses.</p>

                            <p>3. Only gamble what you can afford to lose.</p>

                            <p>4. Monitor the amount of time you spend playing.</p>

                            <p>5. Balance gambling with other activities. If gambling is your only form of entertainment,
                                think about whether you are still having fun.</p>

                            <p>6. Take regular breaks from gambling. Gambling continuously will cause you to lose track
                                of time and perspective.</p>

                            <p>7. Do not gamble when under the influence of alcohol or any substance/circumstance that
                                may impair your judgment or when you are upset or depressed.</p>

                            <p>8. Think about how much money you spend gambling. You can track your activity in your
                                bet history.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    {/* Self-Exclusion */}
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                3. Self-Exclusion
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>For a few customers gambling might become a serious problem. We offer a self-exclusion
                                option that can be easily implemented by a customer's request.</p>

                            <p>To self-exclude from accessing our products,</p>

                            <p>1. Please contact Customer Services and give clear written instructions of the self-exclsion
                                measure you would like implemented on your specific account;<br />
                                the customer ought to be diligent to ensure that the withdrawal has been made from
                                their betmundial wallet and all the information and documentation above has been sent in
                                full;</p>

                            <p>Once the self-exclusion application is made by you, you are advised not to place any
                                bets as that would rescind the existing application. Any running bets placed prior to self-
                                exclusion applied will continue to be in place and any winnings will be credited into your
                                account as soon as the event is settled.</p>

                            <p>Once you make an application to self-exclude, or communicate with our customer
                                service team on email, refrain from accessing your account under any circumstance. In
                                circumstances where this is not possible, we will contact you for the sole purpose of
                                obtaining alternative refund method details. Refunds to such alternative method shall be
                                processed subject to it being successfully verified.</p>

                            <p>Access to account and our games and services will be restricted throughout the self-exclusion
                                period, or permanently if permanent self-exclusion was applied.<br />
                                If permanent exclusion is applied, your account will be permanently blocked and no re-activation is possible.</p>

                            <p>2. betmundial reserves the right to exclude a customer for a longer period at our discretion. This may
                                include instances where betmundial is informed by legitimate sources (e.g. regulators or other
                                authorities, authorized professional organizations, authorized medical professional etc.) that may warrant extension of a customer's self-exclusion period.</p>

                            <p>3.  We may receive problem gambler or problem gambling related information concerning our
                                customers from third parties from time to time. Such information will be acted upon ONLY IF
                                they are received directly from the following legitimate third parties:</p>

                            <p>a) Regulators or other similar authorities;</p>

                            <p>b) Authorized professional organizations that help and provide support to problem
                                gamblers; or</p>

                            <p>c) The customer's authorized medical general practitioner.</p>

                            <p>Information received from any other third parties will be afforded due consideration, but will not
                                be acted upon in isolation. Activities of a customer who has been reported as problem gambler
                                by such third parties will be monitored to establish if the person displays any signs of gambling
                                problem. Whilst we recognize that information may be provided by such third parties with good
                                intentions and for appropriate reasons, it may not always be the case. Rather than acting solely
                                based on unverified information received, we will undertake appropriate monitoring and
                                assessment of suspected problem gamblers to identify if the reported customer is potentially a
                                problem gambler. We will not, at any point, discuss and/or disclose any aspect of customer's
                                account with such third parties (related or otherwise).</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    {/* Preventing Underage Gambling */}
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                4. Preventing Underage Gambling
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>It is illegal for anyone under the age of 18 to gamble. betmundial takes its responsibilities to
                                prevent access by persons under the permitted age very seriously. We make it clear in our Terms
                                and Conditions and in the account registration process that underage gambling is illegal. We
                                reserve the right to carry out verification checks to ensure that all account holders are at least 18
                                years old and may suspend an account until adequate verification is received.</p>

                            <p>It is unlawful to allow minors to gamble and we ask our customers to do their part in ensuring
                                that this does not happen. We ask all of our customers, and in fact it is the responsibility of our
                                customers, to ensure that their account is not used for under aged gambling. Some suggestions
                                on how to make sure this does not happen are provided below:</p>

                            <p>a) Do not leave your computer unattended when you are logged on to our website.</p>
                            <p>b) Make sure to logout when you leave our website.</p>
                            <p>c) Do not share your Mobile Money account details. </p>
                            <p>d) Do not leave the "Save Password" option enabled.</p>

                            <p>e) Use child protection software.</p>
                            <p>f) Create separate computer profiles for your children.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    {/* Complaints */}
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                5. Complaints
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>betmundial endeavours to make a customer's experience with us an enjoyable one. However, there
                                may be occasions where a customer feels dissatisfied with the quality of our product/s or our
                                customer service. A customer may raise a complaint by sending an e-mail to our Customer
                                Service.</p>

                            <p>We will endeavor to handle complaints as soon as practicable. We request our clients to be
                                patient with our internal processes owing to the number of requests we receive on a daily basis,
                                system upgrades, changes requested by the regulator and new instructions from the customer.</p>

                            <p>A complaint shall be deemed to have been submitted in a valid manner when it contains clear
                                information regarding the customer's identity and gives all relevant details giving rise to the
                                complaint.</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};

export default ResponsibleGambling;

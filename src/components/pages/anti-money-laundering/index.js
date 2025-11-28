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
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));

const AntiMoneyLaundering = () => {
    return (
        <>
            <div className='col-md-12 bg-primary p-4 text-center profound-text'>
                <h4 className="inline-block"> Anti Money Laundering </h4>
            </div>
            <div className="col-md-12 py-2 px-4">
                <Accordion allowMultipleExpanded>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Purpose
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>The purpose of this policy is to prohibit and actively prevent money laundering and any activity that facilitates money laundering or the funding of terrorist or criminal activities within betmundial by complying with all applicable requirements under the Proceeds of Crime and Anti-Money Laundering (Amendment) Act of Kenya, 2017 and its implementing regulations.</p>
                            <p>The scope of this process applies to all who use betmundial’s money remittance services as well as betmundial’s employees.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Objectives
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>The objectives of this AML policy include:</p>
                            <ol>
                                <li>Enable betmundial to identify, assess, monitor, manage and mitigate the risks associated with money laundering and financing of terrorism.</li>
                                <li>Create awareness to betmundial’s employees, clients and other stakeholders with regard to AML.</li>
                                <li>Ensure compliance with Kenyan laws and regulations on AML.</li>
                            </ol>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Policies
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p><strong>Definition of Money Laundering</strong></p>
                            <p>a) Money laundering is generally defined as engaging in acts designed to conceal or disguise the true origins of criminally derived proceeds so that the proceeds appear to have derived from legitimate origins or constitute legitimate assets.</p>
                            <p>b) Terrorist financing may not involve the proceeds of criminal conduct, but rather an attempt to conceal either the origin of the funds or their intended use, which could be for criminal purposes.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                betmundial’s AML Approach
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>a) In order to ensure that betmundial does not promote ML/TF activities, the company is keen to foster and promote the following culture of compliance including:</p>
                            <ul>
                                <li>Establishing a system of internal controls and policies and procedures to assure ongoing compliance with AML requirements;</li>
                                <li>Ensuring independent testing of AML compliance, of a scope and frequency that matches the money laundering and terrorist financing risks present;</li>
                                <li>Training staff, as warranted for individual jobs, in the identification of unusual financial transactions or suspicious activities, in the recording and aggregation of currency transactions, and all legal requirements and betmundial’s compliance policies and procedures;</li>
                                <li>Designating an individual or individuals responsible for assuring day-to-day AML compliance within betmundial.</li>
                                <li>Carrying out regular monitoring and review exercises to ensure AML compliance.</li>
                            </ul>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                AML Strategies
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>betmundial will implement the following strategies in addressing AML compliance:</p>
                            <p><b>AML Risk Management</b></p>
                            <p>a) As part of betmundial’s Enterprise Risk Management Framework, risks as a result of ML/TF will be identified, assessed, evaluated, treated, monitored and reported regularly.</p>
                            <p>b) ML/TF risks will be identified across all stages associated with ML activities i.e. placement, layering and integration.</p>
                            <p>c) A risk register will be used to record ML/TF risks and communicated to key stakeholders.</p>
                            <p>d) ML/TF risk treatment measures will be regularly audited to ensure that new or changed risks are covered appropriately.</p>
                            <p>e) ML/TF risk identification and assessment will be guided by the following questions:</p>
                            <ul>
                                <li>What are the entry and exit points at betmundial for funds that may come from illicit sources?</li>
                                <li>What betmundial departments or employees are best positioned to detect the entry and exit of such funds?</li>
                                <li>What are characteristics of transactions that may involve illicit funds, or of customers who are more likely to engage in suspicious activity?</li>
                                <li>What mitigation measures or elimination measures can betmundial employ?</li>
                            </ul>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                KYC
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>a) betmundial will endeavor to request and verify original identification documents from all its individual customers/suppliers before facilitating any registration, deposit or withdrawal transactions.</p>
                            <p>b) betmundial will endeavor to request and verify original registration documents from all its corporate customers before facilitating any registration, deposit or withdrawal transactions including but not limited to:</p>
                            <p>
                                • Certificate of registration or incorporation <br />
                                • Memorandum and Articles of Association<br />
                                • PIN certificate<br />
                                • VAT certificate <br />
                                • Business permit <br />
                                • Bank details and bank statements <br />
                                • Copies of identification documents of directors <br />
                                • Ownership structures (CR12) <br />
                            </p>
                            <p>c) Where identification or registration documents are unavailable or found to be falsified, betmundial will deny or sever the business arrangement as per contract terms.</p>
                            <p>d) betmundial will carry out regular due diligence local and world checks to identify persons of disreputable character, politically exposed persons as well as persons or corporations on sanctions or other ML/TF watch lists. If such persons or corporations are identified, betmundial will review the engagement and take appropriate action to limit the company’s exposure to potential ML/TF activities.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Transaction Monitoring
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>a) betmundial will actively monitor and carry out regular analysis of money transfers transactions to identify suspicious or unusual activities that could point to ML/TF activities.</p>
                            <p>b) betmundial will endeavor to inform clients/suppliers where transactions have been flagged as suspicious or unusual and ask for appropriate information that would clear the transactions.</p>
                            <p>c) betmundial will report identified suspicious or unusual activities to the relevant government authorities once they are verified as potential ML/TF activities, and take action to curtail them.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Record Keeping
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>a) betmundial will keep records of all documents obtained for the purpose of identification and all transaction data as well as other information related to money laundering matters in accordance with the applicable AML and data retention laws and regulations of Kenya.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Training and Awareness
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>a) betmundial will regularly carry out training and awareness sessions to its employees and suppliers with regard to AML.</p>
                            <p>b) betmundial will endeavor to inform potential and current clients, suppliers and stakeholders of its standpoint on AML.</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};

export default AntiMoneyLaundering;

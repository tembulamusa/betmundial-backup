import Header from "../../header/header";
import SideBar from "../../sidebar/awesome/Sidebar";
import Footer from "../../footer/footer";
import React from "react";

import karibuBonus from '../../../assets/img/banner/products/Welcome-Bonus.png'
import MshipiBonusImg from '../../../assets/img/banner/products/Mshipi-Bonus.png'
import hundredPercentDepositBonus from '../../../assets/img/banner/products/Deposit-Bonus.png'

import earlyBirdDailyDepositBonus from '../../../assets/img/banner/products/Deposit-Bonus.png'

const Promotions = () => {
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col-md-12">
                                    <div
                                        className="primary-bg shadow-sm  p-2 shadow-sm casino-category-container ">
                                    PROMOTIONS
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={'row  p-3 d-flex justify-content-center'}>
                                        <div className="col-6 p-3 shadow-lg promo-pannel">
                                            <div className="d-flex flex-column">
                                                <h5>HIPO 3000 KARIBU BONUS</h5>
                                                <img src={karibuBonus} className={'rounded'}/>
                                                <span><u>How to get it</u></span>
                                                <ul>
                                                    <li>
                                                        Register on sms by sending the word JOIN 29400 or visiting www.surebet.co.ke and creating account via signup link.
                                                    </li>
                                                </ul>
                                                <div className="col-md-12">
                                                    <span><u>Terms and conditions</u></span>
                                                    <ul>

                                                        <li>1. This bonus is eligible for new accounts only </li>
                                                        <li>2. Bonus may not be directly withdrawn</li>
                                                        <li>3. Redemption of this bonus is similar to all other bonus and bonus rules apply</li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 p-3 shadow-lg promo-pannel">
                                            <div className="d-flex flex-column">
                                                <h5>100% FIRST DEPOSIT HIPO BONUS </h5>
                                                <img src={hundredPercentDepositBonus} className={'rounded'}/>
                                                <span><u>How to get it</u></span>
                                                <ul>
                                                    <li>
                                                        Deposit KES.50 and above to surebet Paybill 4093333 using your phone number as the account number
                                                    </li>
                                                </ul>
                                                <div className="col-md-12">
                                                    <span><u>Terms and conditions</u></span>
                                                    <ul>
                                                       <li>1. All deposits above Kes 10 are eligible for 100% bonus</li>
                                                       <li>2. This bonus applies to your first ever deposit only</li>
                                                       <li>3. The maximum first deposit bonus awardable is KES 500</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                       </div>
                                       <div className="row p-3  d-flex justify-content-center"> 
                                            <div className="col-6 p-3 shadow-lg promo-pannel">
                                                <div className="d-flex flex-column">
                                                    <h5>HIPO MSHIPI BONUS</h5>
                                                    <img src={MshipiBonusImg} className={'rounded'}/>
                                                    <span><u>How to get it</u></span>
                                                    <ul>
                                                         <li>You qualify for MSHIPI bonus if you place a bet with 5 or more slips and lose exactly 1 slip</li>
                                                    </ul>
                                                    <div className="col-md-12">
                                                        <span><u>Terms and conditions</u></span>
                                                        <ul>

                                                           <li> Mshipi bonus ONLY applies pre-match bets </li>
                                                           <li> The refund matrix will vary based on your total slips</li>
                                                           <li> The refund amount shall be refunded as bonus and bonus terms and condition apply to redeem the award</li>
                                                        </ul>
                                                    </div>
                                               </div>
                                           </div> 

                                            <div className="col-6 p-3 shadow-lg promo-pannel">
                                                <div className="d-flex flex-column">
                                                    <h5>HIPO DAILY DEPOSIT BONUS</h5>
                                                    <img src={earlyBirdDailyDepositBonus} className={'rounded'}/>
                                                    <span><u>How to get it</u></span>
                                                    <ul>
                                                         <li>Make your first deposit of the day to surebet paybill 4093333 account number your mobile number</li>
                                                    </ul>
                                                    <div className="col-md-12">
                                                        <span><u>Terms and conditions</u></span>
                                                        <ul>

                                                           <li> 1. Applies only to your first deposit of the day</li>
                                                           <li> 2. 20% of deposit amount is worn as bonus</li>
                                                           <li> 3. The bonus terms and condition apply to redeem the award</li>
                                                        </ul>
                                                    </div>
                                               </div>
                                           </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default Promotions

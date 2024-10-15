import React from 'react';
import RightBanner from '../../assets/img/Virtual-side-Banner.png'
import PayBill from '../../assets/img/PayBill.png'

const CompanyInfo = (props) => {

    return (
        <div className="qv rc alu show-on-affix">
            <div className="qv rc alu paybill block-shadow bottom-std-margin-spacing" style={{margin:"5px"}}>
                <div className="">
                    <div className="">
                        <div className="col-sm-12 h-30">
                         <img src={PayBill} alt=" " style={{width:"100%"}}/>
                        </div>
                        <div className="col-sm-12 h-30 " style={{
                            lineHeight:"20px",
                            background: "#613354",
                            margin: 0, 
                            padding: "10px 5px", 
                            color: "#fff", 
                            fontWeight: "bold",
                            fontSize:"24px"
                        }}>
                          <p>Customer Care</p>
                          <p>0742800700 </p>
                        </div>
                        <div className="col-sm-12">
                            <img src={RightBanner} alt="" className='w-100'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default React.memo(CompanyInfo);

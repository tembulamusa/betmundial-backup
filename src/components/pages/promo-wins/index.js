import React, { useEffect, useState } from "react";
import Promotions from "../promotions/Promotions";
import PageHeader from "../../utils/page-header";
import PromoCode from "./promo-code";
import makeRequest from "../../utils/fetch-request";

const PromoWins = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const getUserCommision = values => {
        let endpoint = '/v2/user/commissions';
        setIsLoading(true);
        

        makeRequest({url: endpoint, method: 'GET', api_version:2}).then(([status, response]) => {            
            
        })
    }

    useEffect(()=> {
        getUserCommision();
    },[])

    return (
        <>
            <div className="homepage">
                <PageHeader title={"Affiliate Wins"}/>

                <div className="col-md-12 mt-2  p-2">
                    <div className="pb-0" data-backdrop="static">
                        <PromoCode />
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(PromoWins)
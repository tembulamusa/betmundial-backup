import React, { useState } from "react";
import { getFromLocalStorage } from "../../utils/local-storage";


const PromoCode = () => {
    const user = getFromLocalStorage("user");
    const [subscribers, setSubscribers] = useState(0);


    const GeneratePromoCode = () => {
        const [generating, setGenerating] = useState(false);

        return (

            <div className="flex alert alert-warning">
                <div className="">
                    You Do not have a promo Code. Create, Share and Enjoy a lot from betmundial.
                </div>

                <button
                    onClick={() => GeneratePromoCode()}
                    disabled={generating}
                    className="ml-4 btn pink-bg text-white rounded-md py-2 px-4 font-[500]">
                    {generating ? "wait.." : "Create Promo"}
                </button>
            </div>

        )
    }

    const SharePromocode = ({ code }) => {

        return (
            <button className="">Share Code</button>
        )
    }
    const DisplayPromoCode = ({ promocode, subscriberCount }) => {

        return (
            <div className="flex">
                <div className="flex-col"><span className="text-2xl text-gray-600 font-bold mr-4">My Code: {promocode}</span></div>
                <div className="flex-col">
                    <span className="">
                        Subscribers
                        <span className="subscriber-count">{subscriberCount}</span>
                    </span>
                    <SharePromocode code={promocode} />
                </div>
            </div>
        )
    }
    return (
        <div className="promocode-section">
            {

                user?.promo_code ?

                    <div className="promo-present">
                        <DisplayPromoCode promocode={user?.promo_code} subscriberCount={subscribers} />
                    </div>

                    : <div><GeneratePromoCode /></div>

            }
        </div>
    )
}

export default React.memo(PromoCode);
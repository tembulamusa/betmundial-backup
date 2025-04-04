import React from "react";

import Breakfast from "../../../assets/img/banner/promos/breakfast.jpg";
import FreeBet from "../../../assets/img/banner/promos/free-bet.jpg";
import Multibet from "../../../assets/img/banner/promos/multibet.jpg";
import Promo from "../../../assets/img/banner/promos/promo.jpg";
import Referral from "../../../assets/img/banner/promos/referral.jpg";

const PromotionsNew = () => {
    const promoImages = [
        { id: 1, image: Breakfast, title: "Breakfast Bonus" },
        { id: 2, image: FreeBet, title: "Free Bet Offer" },
        { id: 3, image: Multibet, title: "Multibet Boost" },
        { id: 4, image: Promo, title: "Special Promotion" },
        { id: 5, image: Referral, title: "Referral Bonus" },
    ];

    return (
        <>
            <div className="primary-bg shadow-sm p-4 text-center mb-4">
                <h4>Promotions New</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
                {promoImages.map((promo) => (
                    <div
                        key={promo.id}
                        className="col-span-1 px-2"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={promo.image}
                                alt={promo.title}
                                className="w-full h-45 object-cover"
                            />
                            <div className="bg-white p-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800 truncate">
                                            {promo.title}
                                        </p>
                                    </div>
                                    {/* <div className="ml-2">
                                        <button
                                            className="bg-[#24367e] hover:bg-[#1d2b66] text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            View Offer
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PromotionsNew;
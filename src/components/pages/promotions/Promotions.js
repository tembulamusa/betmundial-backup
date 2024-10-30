import React, { useState } from "react";
import PromoCard from "./PromoCard";
import PromoModal from "./PromoModal";
import karibuBonus from "../../../assets/img/banner/products/Welcome-Bonus.png";
import MshipiBonusImg from "../../../assets/img/banner/products/Mshipi-Bonus.png";
import hundredPercentDepositBonus from "../../../assets/img/banner/products/Deposit-Bonus.png";
import earlyBirdDailyDepositBonus from "../../../assets/img/banner/products/Deposit-Bonus.png";

const Promotions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);

  const promoData = [
    {
      title: "SUREBET 3000 KARIBU BONUS",
      image: karibuBonus,
      description:
        "Register on SMS by sending the word JOIN 29400 or visiting www.SUREBET.co.ke and creating an account via the signup link. Terms and conditions apply...",
    },
    {
      title: "100% FIRST DEPOSIT SUREBET BONUS",
      image: hundredPercentDepositBonus,
      description:
        "Deposit KES.50 and above to SUREBET Paybill 599488 using your phone number as the account number. Terms and conditions apply...",
    },
    {
      title: "FREE BET",
      image: MshipiBonusImg,
      description:
        "We offer a Freebet worth KSHS 20 to all new customers. Select Home team win (1), draw (X), or away team win (2), from day’s freebet game. Enter your phone number...",
    },
    {
      title: "VUNA CHAPAA NA EPL",
      image: earlyBirdDailyDepositBonus,
      description:
        "Open to all new and existing customers. Customers will be required to place a cash bet on at least one or more EPL 2024/25 games using a stake of KShs. 49 or more...",
    },
    // Add more promos here as needed
  ];

  const openModal = (promo) => {
    setSelectedPromo(promo);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPromo(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-primary shadow-sm p-4 text-center text-white text-2xl mb-4">
        Promotions
      </div>
      <div className="flex flex-wrap justify-center">
        {promoData.map((promo, index) => (
          <PromoCard key={index} promo={promo} openModal={openModal} />
        ))}
      </div>
      <PromoModal show={showModal} handleClose={closeModal} promo={selectedPromo} />
    </>
  );
};

export default Promotions;

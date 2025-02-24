import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "./utils/local-storage";
import CasinoGame from "./pages/casino/casino-game";

import One from "../assets/img/popups/1.1.jpg";
import Two from "../assets/img/popups/2.1.jpg";
import Three from "../assets/img/popups/3.1.jpg";
import Four from "../assets/img/popups/4.jpg";
import Five from "../assets/img/popups/5.1.jpg";
import Six from "../assets/img/popups/6.1.jpg";

const images = [
    // { src: One, link: "/casino-game/aviator/aviator", game: { game_id: "1", provider_name: "Aviator", aggregator: "intouchvas" } },
    // { src: Two, link: "/casino-game/aviatrix/aviatrix", game: { game_id: "aviatrix", provider_name: "aviatrix", aggregator: null } },
    // { src: Three, link: "/casino-game/smartsoft/jetx", game: { game_id: "13", provider_name: "SmartSoft", aggregator: null } },
    { src: Four, link: "/casino-game/eurovirtuals/virtual-league", game: { game_id: "virtual-league", provider_name: "eurovirtuals", aggregator: "eurovirtuals" } },
    // { src: Five, link: "/casino-game/pragmatic/spaceman", game: { game_id: "1301", provider_name: "Pragmatic", aggregator: "pragmatic" } },
    { src: Six, link: "/surecoin", game: { game_id: "surecoin", provider_name: "surecoin", aggregator: "suregames" } },
];

const PopupBanner = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [randomImage, setRandomImage] = useState(null);

    const user = getFromLocalStorage("user");

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

        if (!hasSeenPopup) {
            const selectedImage = images[Math.floor(Math.random() * images.length)];
            setRandomImage(selectedImage);
            setShow(true);
            sessionStorage.setItem("hasSeenPopup", "true");
        }
    }, []);

    const handlePlayNow = () => {
        setShow(false); // Close the modal first
    
        if (!user) {
            navigate(`/login?next=${encodeURIComponent(randomImage.link)}`);
        } else {
            // Launch the game using the existing method
            const casinoGame = new CasinoGame({ game: randomImage.game });
            casinoGame.launchGame(randomImage.game, 1);
        }
    };
    

    return (
        <>
            {randomImage && (
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="popup-banner-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdropClassName="transparent-backdrop"
                >
                    <Modal.Body className="p-0 d-flex flex-column align-items-center">
                        {/* Image */}
                        <LazyLoadImage
                            className="popup-responsive-image"
                            src={randomImage.src}
                            alt="Popup Promotion"
                        />

                        <div className="buttons-container">
                            <Button
                                onClick={() => setShow(false)}
                                className="no-thanks-button"
                            >
                                No Thanks
                            </Button>
                            <Button
                                onClick={handlePlayNow}
                                className="play-now-button"
                            >
                                Play Now
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default PopupBanner;

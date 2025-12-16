import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "./utils/local-storage";

const images = [
    { src: "../assets/img/popups/1.1.jpg", link: "/casino-game/aviator/aviator" },
    { src: "../assets/img/popups/2.1.jpg", link: "/casino-game/aviatrix/aviatrix/sure-popular" },
    { src: "../assets/img/popups/3.1.jpg", link: "/casino-game/smartsoft/jetx/sure-popular" },
    { src: "../assets/img/popups/4.1.jpg", link: "/casino-game/eurovirtuals/virtual-league" },
    { src: "../assets/img/popups/5.1.jpg", link: "/casino-game/pragmatic/spaceman/sure-popular" },
    // { src: "../assets/img/popups/6.1.jpg", link: "/surecoin" },
];

const loadBannerImg = (img) => {

    let sport_image;
    try {
        sport_image = require(img);
    } catch (error) {
        sport_image = require(`../assets/img/popups/6.1.jpg`);
    }
    return sport_image
}

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
        setShow(false);

        if (!user) {
            navigate(`/login?next=${encodeURIComponent(randomImage.link)}`);
        } else {
            navigate(randomImage.link, { state: { game: randomImage } });
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
                    {/* Floating X Button */}
                    <button
                        className="floating-x-button"
                        onClick={() => setShow(false)}
                    >
                        &#10005; {/* Unicode for X symbol */}
                    </button>

                    <Modal.Body className="p-0 d-flex flex-column align-items-center">
                        {/* Image */}
                        <LazyLoadImage
                            className="popup-responsive-image"
                            src={loadBannerImg(randomImage.src)}
                            alt="Popup Promotion"
                        />

                        <div className="buttons-container">
                            <Button
                                onClick={() => setShow(false)}
                                className="no-thanks-button text-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handlePlayNow}
                                className="play-now-button text-xl"
                            >
                                Play
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default PopupBanner;

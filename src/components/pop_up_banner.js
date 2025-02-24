import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

import One from "../assets/img/popups/1.jpg";
import Two from "../assets/img/popups/2.jpg";
import Three from "../assets/img/popups/3.jpg";
import Four from "../assets/img/popups/4.jpg";
import Five from "../assets/img/popups/5.jpg";
import Six from "../assets/img/popups/6.jpg";

const images = [
    { src: One, link: "/casino-game/aviator/aviator" },
    { src: Two, link: "/casino-game/aviatrix/aviatrix" },
    { src: Three, link: "/casino-game/smartsoft/jetx" },
    { src: Four, link: "/casino-game/eurovirtuals/virtual-league" },
    { src: Five, link: "/casino-game/pragmatic/spaceman" },
    { src: Six, link: "/surecoin" },
];

const PopupBanner = () => {
    const [show, setShow] = useState(false);
    const [randomImage, setRandomImage] = useState(null);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

        if (!hasSeenPopup) {
            const selectedImage = images[Math.floor(Math.random() * images.length)];
            setRandomImage(selectedImage);
            setShow(true);
            sessionStorage.setItem("hasSeenPopup", "true"); // Set in sessionStorage
        }
    }, []);

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
                                onClick={() => (window.location.href = randomImage.link)}
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

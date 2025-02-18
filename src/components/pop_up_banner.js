import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

import One from "../assets/img/casino/carousel/1.jpg";
import Two from "../assets/img/casino/carousel/2.png";
import Three from "../assets/img/casino/carousel/3.png";

const images = [
    { src: One, link: "/surecoin" },
    { src: Two, link: "/surebox" },
    { src: Three, link: "/casino" }
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
                    dialogClassName="modal-90w world-cup-ad"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body className="position-relative p-0">
                        <LazyLoadImage
                            className="d-block w-100"
                            src={randomImage.src}
                            alt="Popup Promotion"
                            style={{ maxwidth: "500px", height: "100px", objectFit: "cover" }}
                        />
                        {/* Floating Buttons */}
                        <div
                            className="position-absolute w-100 d-flex justify-content-between px-3 pb-"
                            style={{
                                bottom: "10px",
                                left: "0",
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <Button
                                onClick={() => setShow(false)}
                                style={{
                                    backgroundColor: "rgba(255, 0, 0, 0.3)", // Transparent Red
                                    border: "none",
                                    padding: "10px 20px",
                                    color: "#fff",
                                }}
                            >
                                No Thanks
                            </Button>
                            <Button
                                onClick={() => (window.location.href = randomImage.link)}
                                style={{
                                    backgroundColor: "rgba(0, 255, 0, 0.3)", // Transparent Green
                                    border: "none",
                                    padding: "10px 20px",
                                    color: "#fff",
                                }}
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

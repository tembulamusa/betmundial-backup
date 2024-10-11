import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Breakfast from '../../assets/img/banner/carousel/breakfast.png';
import App from '../../assets/img/banner/carousel/app.png';
import Sharebet from '../../assets/img/banner/carousel/Sharebet.png';
import Tick from '../../assets/img/banner/carousel/Tick.png';
import Epl from '../../assets/img/banner/carousel/epl.png';
import Live from '../../assets/img/banner/carousel/Live-Betting.png';
import { Link } from 'react-router-dom';

const CarouselLoader = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => setImageLoaded(true);

    // Style to control only the height of each carousel item container.
    const itemStyle = {
        maxHeight: '250px', // Adjust the height as needed
        overflow: 'hidden', // Hide overflow to maintain the fixed height
    };

    // Style for images to maintain their width and responsiveness.
    const imageStyle = {
        width: '100%', // Keep the image width as full
        height: '100%', // Set height to fill the container's height
        objectFit: 'cover', // Ensure the image scales properly within the height constraint
    };

    return (
        <Carousel>
            <Carousel.Item style={itemStyle}>
                <img
                    className="d-block w-100"
                    style={{ ...imageStyle, display: imageLoaded ? 'block' : 'none' }}
                    src={Breakfast}
                    onLoad={onImageLoaded}
                    alt="Breakfast"
                    effects="blur"
                />
            </Carousel.Item>

            <Carousel.Item style={itemStyle}>
                <img
                    className="d-block w-100"
                    style={{ ...imageStyle, display: imageLoaded ? 'block' : 'none' }}
                    src={App}
                    onLoad={onImageLoaded}
                    alt="App"
                    effects="blur"
                />
            </Carousel.Item>

            <Carousel.Item style={itemStyle}>
                <img
                    className="d-block w-100"
                    style={{ ...imageStyle, display: imageLoaded ? 'block' : 'none' }}
                    src={Sharebet}
                    onLoad={onImageLoaded}
                    alt="Sharebet"
                    effects="blur"
                />
            </Carousel.Item>

            <Carousel.Item style={itemStyle}>
                <img
                    className="d-block w-100"
                    style={{ ...imageStyle, display: imageLoaded ? 'block' : 'none' }}
                    src={Tick}
                    onLoad={onImageLoaded}
                    alt="Tick"
                    effects="blur"
                />
            </Carousel.Item>

            <Carousel.Item style={itemStyle}>
                <img
                    className="d-block w-100"
                    style={{ ...imageStyle, display: imageLoaded ? 'block' : 'none' }}
                    src={Epl}
                    onLoad={onImageLoaded}
                    alt="Epl"
                    effects="blur"
                />
            </Carousel.Item>

            <Carousel.Item style={itemStyle}>
                <Link to={"/live"}>
                    <img
                        className="d-block w-100"
                        style={{ ...imageStyle, display: imageLoaded ? 'block' : 'none' }}
                        src={Live}
                        onLoad={onImageLoaded}
                        alt="Live"
                        effects="blur"
                    />
                </Link>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselLoader;

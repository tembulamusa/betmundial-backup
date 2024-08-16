import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import banner5 from '../../assets/img/banner/products/Daily-JackPot.png'
import banner4 from '../../assets/img/banner/products/Mshipi-Bonus.png'
import banner2 from '../../assets/img/banner/products/Live-Betting.png'
import banner3 from '../../assets/img/banner/products/freebet.jpeg'
import banner1 from '../../assets/img/banner/products/Welcome-Bonus.png'

const banners = [
    banner3, banner1, banner2, banner4
]

const CarouselLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel>
            {banners.map((banner, idx) => (
                <Carousel.Item key={idx}>
                    <LazyLoadImage
                        className="d-block w-100"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={banner}
                        onLoad={onImageLoaded}
                        alt="surebet"
                        effects="blur"
                    />
                </Carousel.Item>
            ))
            }

        </Carousel>
    )
}
export default CarouselLoader;

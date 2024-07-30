import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import banner5 from '../../assets/img/banner/products/Daily-JackPot.png'
import banner4 from '../../assets/img/banner/products/Mshipi-Bonus.png'
import banner2 from '../../assets/img/banner/products/Live-Betting.png'
// import banner3 from '../../assets/img/banner/products/Virtuals.png'
import banner1 from '../../assets/img/banner/products/Welcome-Bonus.png'
import banner0 from '../../assets/img/banner/products/world_cup_banner.png'

const banners = [
    banner0, banner1, banner2, banner4
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

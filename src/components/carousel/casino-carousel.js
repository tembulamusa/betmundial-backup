import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';

import Breakfast from '../../assets/img/banner/App.png';
import Sharebet from '../../assets/img/banner/Sharebet.png';
import Tick from '../../assets/img/banner/carousel/Tick.png';
import Epl from '../../assets/img/banner/EPL.png';

import AviatorBanner from  '../../assets/img/banner/aviator-banner.jpg';
import CasinoBanner1 from '../../assets/img/banner/casino-banner1.jpg';
import CasinoBanner2 from '../../assets/img/banner/casino-banner2.jpg';
import CasinoBanner3 from '../../assets/img/banner/casino-banner3.jpg';
import StockMarket from '../../assets/img/banner/stock-market.jpg';


const CasinoCarousel = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel
            // controls={false}
            indicators={false}
            className='banner-imgs'>
            
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={AviatorBanner}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Breakfast}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={CasinoBanner1}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={CasinoBanner2}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={CasinoBanner3}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={StockMarket}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
        </Carousel>



    )
}

export default React.memo(CasinoCarousel)
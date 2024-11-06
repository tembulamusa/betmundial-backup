import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import Breakfast from '../../assets/img/banner/App.png';
import Sharebet from '../../assets/img/banner/Sharebet.png';
import Tick from '../../assets/img/banner/carousel/Tick.png';
import Epl from '../../assets/img/banner/EPL.png';


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
                    src={Sharebet}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Tick}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Epl}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
        </Carousel>



    )
}

export default React.memo(CasinoCarousel)
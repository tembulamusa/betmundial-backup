import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';

import Breakfast from '../../assets/img/banner/App.png';
import Sharebet from '../../assets/img/banner/Sharebet.png';
// import Tick from '../../assets/img/banner/carousel/Tick.png';
import Epl from '../../assets/img/banner/EPL.png';

import One from  '../../assets/img/casino/carousel/1.jpg';
import Two from  '../../assets/img/casino/carousel/2.png';
import Three from  '../../assets/img/casino/carousel/3.png';
import Four from  '../../assets/img/casino/carousel/4.png';
// import Five from  '../../assets/img/casino/carousel/5.jpg';
import Six from  '../../assets/img/casino/carousel/6.png';
import Seven from  '../../assets/img/casino/carousel/7.jpg';
import Eight from  '../../assets/img/casino/carousel/8.jpg';
import Nine from  '../../assets/img/casino/carousel/9.png';
import Ten from  '../../assets/img/casino/carousel/10.jpg';
import Eleven from  '../../assets/img/casino/carousel/11.jpg';
import Twelve from  '../../assets/img/casino/carousel/12.jpg';
import Thirteen from  '../../assets/img/casino/carousel/13.jpg';
import Fourteen from  '../../assets/img/casino/carousel/14.jpg';
import Fifteen from  '../../assets/img/casino/carousel/15.jpg';
import Sixteen from  '../../assets/img/casino/carousel/16.jpg';
import { Link } from "react-router-dom";
// import Intro from  '../../assets/img/casino/carousel/intro.png';
// import Tick from  '../../assets/img/casino/carousel/Tick.png';


const CasinoCarousel = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel
            // controls={false}
            indicators={false}
            className='casino banner-imgs'>
            
            {/* <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={AviatorBanner}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            */}
            
            {/* <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={One}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Two}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item> */}
            {/* <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Three}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item> */}
            <Carousel.Item >
                <Link to={"/casino-game/stp/comet"}>
                    <img
                        className="d-block w-100"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={Four}
                        onLoad={onImageLoaded}
                        alt="surebet"
                        effects="blur"
                    />
                </Link>
            </Carousel.Item>
            
            {/* <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Five}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item> */}
            
            {/* <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Six}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item>
            
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Seven}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item> */}
            
            {/* <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Eight}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item> */}
            
            <Carousel.Item >
                <Link to={"/casino-game/smartsoft/jetx"}>
                    <img
                        className="d-block w-100"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={Nine}
                        onLoad={onImageLoaded}
                        alt="surebet"
                        effects="blur"
                    />
                </Link>
            </Carousel.Item>
            
            <Carousel.Item >
                <Link to={"/casino-game/aviatrix/aviatrix"}>
                    <img
                        className="d-block w-100"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={Ten}
                        onLoad={onImageLoaded}
                        alt="surebet"
                        effects="blur"
                    />
                </Link>
            </Carousel.Item>
            
            <Carousel.Item >
                <Link to={"/surecoin"}>
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Eleven}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
                </Link>
            </Carousel.Item>
            
            {/* <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Twelve}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item> */}

            <Carousel.Item >
                <Link to={"/casino"}>
                    <img
                        className="d-block w-100"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={Thirteen}
                        onLoad={onImageLoaded}
                        alt="surebet"
                        effects="blur"
                    />
                </Link>
            </Carousel.Item>
            
            <Carousel.Item >
                <Link to={"/casino-game/eurovirtuals/virtual-league"}>
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Fourteen}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
                </Link>
            </Carousel.Item>

            <Carousel.Item >
                <Link to={"/casino-game/casino-game/aviator/aviator"}>
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Fifteen}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
                </Link>
            </Carousel.Item>

             
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    style={{display: imageLoaded ? 'block' : 'none'}}
                    src={Sixteen}
                    onLoad={onImageLoaded}
                    alt="surebet"
                    effects="blur"
                />
            </Carousel.Item> 
        </Carousel>



    )
}

export default React.memo(CasinoCarousel)
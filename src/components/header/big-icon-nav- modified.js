import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'; 
import ListGroup from 'react-bootstrap/ListGroup';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const BigIconMenu = () => {
    const { pathname } = useLocation(); 
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const linkItems = [
        { name: "home", icon: "home.svg", link: "/" },
        { name: "live", icon: "live.svg", link: "/live" },
        { name: "jackpot", icon: "jackpot.svg", link: "/jackpot" },
        { name: "aviator", icon: "aviator.svg", link: "/aviator" },
        { name: "surecoin", icon: "surecoin.svg", link: "/surecoin" },
        { name: "casino", icon: "casino.svg", link: "/casino" },
        { name: "sport", icon: "sports.svg", link: null },
        { name: "virtuals", icon: "virtuals.svg", link: "/virtuals" },
        { name: "league", icon: "league.svg", link: "/sure-league" },
        { name: "promotions", icon: "promotions.svg", link: "/promotions" },
        { name: "livescore", icon: "livescore.svg", link: "/#livescore" },
        { name: "basketball", icon: "basketball.svg", link: "/#basketball" },
        { name: "cricket", icon: "cricket.svg", link: "/#cricket" },
        { name: "tennis", icon: "tennis.svg", link: "/#tennis" },
        { name: "rugby", icon: "rugby.svg", link: "/#rugby" },
        { name: "icehockey", icon: "icehockey.svg", link: "/#icehockey" },
        { name: "aussieR.", icon: "aussie.svg", link: "/#aussie" },
        { name: "a.football", icon: "americanfootball.svg", link: "/#afootball" },
        { name: "darts", icon: "darts.svg", link: "/#darts" },
        { name: "boxing", icon: "boxing.svg", link: "/#boxing" },
        { name: "handball", icon: "handball.svg", link: "/#handball" },
        { name: "baseball", icon: "baseball.svg", link: "/#baseball" },
        { name: "volleyball", icon: "volleyball.svg", link: "/#volleyball" },
        { name: "mma", icon: "mma.svg", link: "/#mma" },
        { name: "floorball", icon: "floorball.svg", link: "/#floorball" },
        { name: "print", icon: "print.svg", link: "/print-matches" },
    ];

    const getSportImageIcon = (sport_name) => {
        let sport_image;
        try {
            //sport_image = require(`../../assets/img/svgicons/${sport_name}`);
            sport_image = require(`../../assets/img/colorsvgicons/${sport_name}`);
        } catch (error) {
            sport_image = require(`../../assets/img/svgicons/default.png`);
        }
        return sport_image;
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -150, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 150, behavior: 'smooth' });
    };

    useEffect(() => {
        handleScroll(); // Initial check
        const refCurrent = scrollContainerRef.current;
        refCurrent?.addEventListener('scroll', handleScroll);
        return () => refCurrent?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative flex items-center big-icon-container">
            {showLeftArrow && (
                <div className="big-icon-arrows left cursor-pointer" onClick={scrollLeft}>
                    <MdOutlineKeyboardArrowLeft className="text-white" />
                </div>
            )}

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto space-x-4 big-icon-scrollbar-hide"
                style={{ maxWidth: '100%', backgroundColor: 'transparent' }}
            >
                <ListGroup as="ul" horizontal className="flex space-x-4 big-icon-list">
                    {linkItems.map((item, idx) => (
                        <li key={idx} className={`${pathname === item.link ? "active" : ''} big-icon-item text-center capitalize`}>
                            <Link to={item.link} title={item.name}>
                                <div className="big-icon-icon"><img src={getSportImageIcon(item.icon)} alt={item.name} /></div>
                                <div className="big-icon-name">{item.name}</div>
                            </Link>
                        </li>
                    ))}
                </ListGroup>
            </div>

            {showRightArrow && (
                <div className="big-icon-arrows right cursor-pointer" onClick={scrollRight}>
                    <MdOutlineKeyboardArrowRight className="text-white" />
                </div>
            )}
        </div>
    );
};

export default React.memo(BigIconMenu);

import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useLocation } from 'react-router-dom'; 
import ListGroup from 'react-bootstrap/ListGroup';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Context } from "../../context/store";

const BigIconMenu = () => {
    const { pathname } = useLocation(); 
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [state, ] = useContext(Context);
    const [categories, setCategories] = useState([]);

    const linkItems = [
        // {name: "home", icon:"home.svg", link:"/", parentTo:null},
        //{name: "live", icon:"livescore.svg", link:"/live", parentTo:null},
        //{name: "jackpot", icon:"jackpot.svg", link:"/jackpot", parentTo:null},
        // {name: "aviator", icon:"aviator.svg", link:"/aviator", parentTo:null},
        // {name: "surecoin", icon:"surecoin.svg", link:"/surecoin", parentTo:null},
        // {name: "casino", icon:"casino.svg", link:"/casino", parentTo:null},
        //These next 3 Links did not exist before we removed SPORTS
        // {name: "aviatrix", icon:"aviatrix.svg", link:"/aviatrix", parentTo:null},
        // {name: "numbers", icon:"numbers.svg", link:"/numbers", parentTo:null},
       // {name: "sport", icon:"sports.svg", link:null, parentTo:"sportscategories"},
        // {name: "virtuals", icon:"virtuals.svg", link:"/virtuals", parentTo:null},
       // {name: "league", icon:"league.svg", link:"/sure-league", parentTo:null},
        // {name: "promotions", icon:"promos.svg", link:"/promotions", parentTo:null},
        //{name: "livescore", icon:"livescore.svg", link:"/#livescore", parentTo:null},        
        // {name: "basketball", icon:"basketball.svg", link:"/#basketball", parentTo:null},
        // {name: "cricket", icon:"cricket.svg", link:"/#cricket", parentTo:null},
        // {name: "tennis", icon:"tennis.svg", link:"/#tennis", parentTo:null},       
        // {name: "rugby", icon:"rugby.svg", link:"/#rugby", parentTo:null},
        // {name: "ice hockey", icon:"icehockey.svg", link:"/#icehockey", parentTo:null},
        // {name: "aussie rules", icon:"aussie.svg", link:"/#aussie", parentTo:null},
        // {name: "a.football", icon:"americanfootball.svg", link:"/#afootball", parentTo:null},
        // {name: "darts", icon:"darts.svg", link:"/#darts", parentTo:null},
        // {name: "boxing", icon:"boxing.svg", link:"/#boxing", parentTo:null},
        // {name: "handball", icon:"handball.svg", link:"/#handball", parentTo:null},        
        // {name: "baseball", icon:"baseball.svg", link:"/#baseball", parentTo:null},
        // {name: "volleyball", icon:"volleyball.svg", link:"/#volleyball", parentTo:null},
        // {name: "mma", icon:"mma.svg", link:"/#mma", parentTo:null},
        // {name: "floorball", icon:"floorball.svg", link:"/#floorball", parentTo:null},
        // {name: "print", icon:"print.svg", link:"/print-matches", parentTo:null},
    ]

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

    useEffect(() => {
        if(state?.categories && state?.categories instanceof Array) {
             {/* NO SPORTS CURRENTLY. UNCOMMENT WHEN AVAILABLE */}
            // setCategories(state?.categories);
        }
    }, [state?.categories])

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
                    {(linkItems || []).map((item, idx) => {
                        return (
                            <li key={idx} className={`${pathname == item.link ? "active" : ''} big-icon-item text-center capitalize`}>
                                <Link to={item.link} title={item.name}>
                                    <div className="big-icon-icon"><img className="mx-auto" src={getSportImageIcon(item.icon)} alt={item.name} /></div>
                                    <div className="big-icon-name">{item.name}</div>
                                </Link>
                            </li>
                        )
                        }
                    )}

                    {(categories || []).map((category, idx) => {
                        
                        return (
                            <li key={idx} className={`${pathname == `/sports/matches/${category?.sport_id}` ? "active" : ''} big-icon-item text-center capitalize`}>
                            <Link to={`/sports/matches/${category?.sport_id}`} title={category?.sport_name}>
                                <div className="big-icon-icon"><img className="mx-auto" src={getSportImageIcon(`${category?.sport_name?.toLowerCase()}.svg`)} alt={category.sport_name} /></div>
                                <div className="big-icon-name">{category.sport_name}</div>
                            </Link>
                        </li>
                        )
                    }
                    )}
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

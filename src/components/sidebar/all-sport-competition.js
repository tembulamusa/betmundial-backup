import React, { useEffect, useState, useCallback} from 'react';
import {
    Link,
  useParams,
} from "react-router-dom";

import downArrow from '../../assets/img/down-arrow.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export const SportItem = (props) => {
    const {
        sport, 
        sport_id, 
    } = props;

    let {sportid, categoryid, competitionid} = useParams();
    const [activeClass, setActiveClass] = useState('');


    const handleMenuToggle = useCallback(() => {
        if(activeClass === ''){
            setActiveClass("active");
        } else {
            setActiveClass('');
        }
    }, [activeClass]);

    const initActiveClass = () => {
        sportid = sportid ?? 79;
        if (sport_id == sportid) {
            setActiveClass('active');
        }
    };

    useEffect(() => {
        initActiveClass();
    }, [initActiveClass]);

    const default_img = 'sure';
    let sport_image;

    try { 
        sport_image = require(`../../assets/svg/${sport?.sport_name}.svg`);
    } catch(error){
        sport_image = require(`../../assets/svg/${default_img}.png`);
    }
    
    return (
        <li className={`treeview ${activeClass}`} >
            <Link to="#" onClick={handleMenuToggle}>
                <span style={{"padding":0}}>
                  <img  
                       className="side-icon" 
                       src={sport_image} 
                       alt=""
                        /> 
                </span>
                <span className="topl"> { sport.sport_name } </span>
                <img className="down-arrow pull-right" alt="" src={downArrow} />
            </Link>
            <ul className="treeview-menu">
              {
                  sport?.categories && sport.categories.map(
                      category => (
                          <CategoryItem 
                              category={category} 
                              key={category.category_id} 
                              active_class={activeClass}
                              category_id={category.category_id} 
                              sport_id = {sport_id}
                              
                               />
                      )
                  )
              }
            </ul>
        </li>
    )
}

export const CategoryItem = (props) => {
    const {category, sport_id, category_id } = props;
    const {sportid, categoryid, competitionid} = useParams();
    const [activeClass, setActiveClass] = useState('');
    const [active, setActive] = useState('');

    const handleMenuToggle = useCallback(() => {
        if(activeClass === ''){
            setActiveClass('menu-open');
            setActive('active');

        } else {
            setActiveClass('');
            setActive('');
        }
    }, []);
    
    const initActiveMenuClass = useCallback(() => {
        if(categoryid == category_id){
            setActive('active');
            setActiveClass('menu-open');
        }
    }, []);

    useEffect(() => {
        initActiveMenuClass();
    }, [initActiveMenuClass])

    return (
        <li className={`treeview ${active}`} >
           <Link to="#" onClick={handleMenuToggle}>
                { category?.cat_flag && 
                    <LazyLoadImage 
                         className="side-icon" 
                        src={require(`../../assets/img/flags-1-1/${category.cat_flag}.svg`)} 
                        effect="blur"
                    />
                }
                {!category?.cat_flag && <span className="side-icon" style={{float:"left"}}>&nbsp;</span>}
                <span className="topl"> {category.category_name} </span>
            </Link>
            <ul className={`treeview-menu second-child ${activeClass}`}>
                { 
                    category.competitions && 
                       category.competitions.map(
                        competition => (
                            <CompetitionItem 
                                competition={competition} 
                                competition_id={competition.competition_id} 
                                category_id={category_id}
                                sport_id={sport_id}
                                key={competition.competition_id} />
                        )
                    )
                }
            </ul>
        </li>
    )
}

export const CompetitionItem = (props) => {
    const { competition, sport_id, category_id, competition_id } = props;
    const [active, setActive] = useState('');
    
    const {sportid, categoryid, competitionid} = useParams();

    const updateActiveStatus = useCallback(() => {
        setActive(competitionid == competition_id ? 'selected': '');
    }, []);

    useEffect(() => {
        updateActiveStatus();
    }, [updateActiveStatus])

    return (
        <li className={active}>
            <Link to={`/competition/${sport_id}/${category_id}/${competition.competition_id}`}>
              <span className="topl"> {competition.competition_name } </span>
              <span style={{float:"right", color:"#fff"}}>{competition.games_count }</span>
            </Link>
        </li>
    )
}

const AllSportCompetitions = (props) => {

    const { competitions } =  props;

    return (
        <ul className="sidebar-menu aoi nav base-bg">
            {
               competitions.map(
                          sport => ( 
                               <SportItem 
                                  sport={sport} 
                                  sport_id={sport.sport_id} 
                                  key={sport.sport_id} />
                          )
                          
                      )
            }

        </ul>
    )
}
export default React.memo(AllSportCompetitions);

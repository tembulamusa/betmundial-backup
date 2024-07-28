import React, {useState, useEffect, useContext, useCallback} from 'react';
import {useParams} from 'react-router-dom'
import {Row, Col, Dropdown, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import MarketFilter from "../filters/MarketFilter";
import {forEach} from "react-bootstrap/ElementChildren";

import filterIconSvg from "../../assets/svg/filter-icon.svg" 
import searchIconSvg from "../../assets/svg/search-icon.svg" 
import highlightsIconSvg from "../../assets/svg/toggle-off-icon.svg" 
import { faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Context} from '../../context/store';


import {
    faSearch,
    faToggleOn,
    faTasks,
} from '@fortawesome/free-solid-svg-icons'

const MainTabs = (props) => {
    const {tab, fetching} = props;
    const [sports, setSports] = useState();
    const [sportCategories, setSportCategories] = useState();
    const [competitions, setCompetitions] = useState();
    const [state, dispatch] = useContext(Context);
    const {sportid, categoryid, competitionid} = useParams();
    const [activeTab, setActiveTab] = useState(tab);

    const getSportOptionLabel = (sport_name, showCaret=false) => {
        const sport_image = require(`../../assets/svg/${sport_name}.svg`); 
        return (<Row className="d-flex justify-content-start f-menu-item">
            {/* <Col className="col-auto"><img src={sport_image} alt="" style={{width:"30px"}}/> </Col> */}
                    <Col className="col-auto">{sport_name}</Col>
                
                    { showCaret && <Col className="col-auto"><FontAwesomeIcon icon={faCaretDown} /> </Col> }
               </Row> 
              )
    }

    const getCompetitionOptionLabel = (competition_name, showCaret=false) => {
        return (<Row className="d-flex justify-content-start f-menu-item">
                    <Col className="col-auto">{competition_name || "All Leagues"}</Col>
                    { showCaret && <Col className="col-auto"><FontAwesomeIcon icon={faCaretDown} /> </Col> }
               </Row> 
              )
    }
    const getCategoryOptionLabel = (category_name, cat_flag, showCaret=false) => {
        let cat_image = null;
        try {
            cat_image = require(`../../assets/img/flags-1-1/${cat_flag || "default_flag" }.svg`) 
        } catch(error){
       }

        return (<Row className="d-flex justify-content-start f-menu-item">
            {/*<Col className="col-auto">{ cat_image && <img src={cat_image} alt="" style={{width:"15px"}}/>  }</Col> */}
                    <Col className="col-auto">{category_name || "All Categories" }</Col>
                
                    { showCaret && <Col className="col-auto"><FontAwesomeIcon icon={faCaretDown} /> </Col> }
               </Row> 
              )
    }
    const [selectedSport, setSelectedSport] = useState({sport_id:79, label:getSportOptionLabel("Soccer", true)});
    const [selectedCategory, setSelectedCategory] = useState({category_id:null, label:getCategoryOptionLabel(null, 'default', true)});
    const [selectedCompetition, setSelectedCompetition] = useState({competition_id:null, label:getCompetitionOptionLabel(null, true)});

    const setSportOptions = () => {
       if(state?.categories) {
           const sportOptions = state.categories.all_sports.map((sport) => {
               return {
                  sport_id: sport.sport_id,
                  label: getSportOptionLabel(sport.sport_name),
                  sport_name:sport.sport_name,
                  default_display_markets:sport.default_display_markets
               } 
           });
           setSports(sportOptions);
       }
    };

    const setCategroyOptions = () => {
       if(selectedSport) {
           let selectedRawSportData = state?.categories?.all_sports.find((sport) => sport.sport_id === selectedSport.sport_id)
           const categoryOptions = selectedRawSportData?.categories?.map((category) => {
               return {
                  category_id: category.category_id,
                  label: getCategoryOptionLabel(category.category_name, category.cat_flag),
                  category_name:category.category_name,
                  cat_flag:category.cat_flag
               } 
           });
           setSportCategories(categoryOptions);
       }
    };


    const setCompetitionOptions = () => {
       if(selectedSport.sport_id && selectedCategory) {
           let thisSport = state?.categories?.all_sports.find((sport) => sport.sport_id === selectedSport.sport_id)
           let selectedRawCompetitionData = thisSport?.categories.find((category) => category.category_id === selectedCategory.category_id)
           const competitionOptions = selectedRawCompetitionData?.competitions?.map((competition) => {
               return {
                  competition_id: competition.competition_id,
                  label: getCompetitionOptionLabel(competition.competition_name),
                  competition_name:competition.competition_name,
               } 
           });
           setCompetitions(competitionOptions);
       }
    };

    useEffect(() => {
        setCompetitionOptions();
    }, [selectedCategory]);

    useEffect(() => {
        setCategroyOptions();
    }, [selectedSport]);

    useEffect(() => {
        setSportOptions() 
        if(sportid){
            let _sport = state?.categories?.all_sports.find((sport) => sport.sport_id === Number(sportid))
            _sport && handleSportsSelect(_sport);
            if(categoryid){
                let _category = _sport?.categories?.find((category) => category.category_id === Number(categoryid))
                _category && handleCategorySelect(_category);
                if(competitionid) {
                    let _competition = _category?.competitions?.find((_c) => _c.competition_id === Number(competitionid));
                    _competition && handleCompetitionSelect(_competition);
                }
            }
        }
    }, [state?.categories]);

    const handleSportsSelect = (sport) => {
        const sp = {
            sport_id: sport.sport_id,
            label: getSportOptionLabel(sport.sport_name, true),
            sport_name:sport.sport_name
        }
        setSelectedSport(sp); 
        setSelectedCategory(
            {
                category_id:null, 
                label:getCategoryOptionLabel(null, 'default', true)
            }
        )
        setSelectedCompetition(
            {
                competition_id:null, 
                label:getCompetitionOptionLabel(null, true)
            }
        )
        let subtypes = sport?.default_display_markets;
        dispatch({type:"SET", key:"selectedmarkets", payload:subtypes});
        dispatch({type:"SET", key:"filtersport", payload:sp});
        dispatch({type:"DEL", key:"filtercompetition"});
        dispatch({type:"DEL", key:"filtercategory"});
        dispatch({type:"SET", key:"filtermenuclicked", payload:true});

    } 

    const setActiveTabSpace = (tab) => {
        dispatch({type:"SET", key:"active_tab", payload:tab});
        setActiveTab(tab);
    }

    const handleCategorySelect = (category) => {
        const spc = {
            category_id: category.category_id,
            label: getCategoryOptionLabel(category.category_name, category.cat_flag, true),
            category_name:category.category_name,
            cat_flag:category.cat_flag
        }
        setSelectedCategory(spc); 

        setSelectedCompetition(
            {
                competition_id:null, 
                label:getCompetitionOptionLabel(null, true)
            }
        )

        dispatch({type:"SET", key:"filtercategory", payload:spc});
        dispatch({type:"DEL", key:"filtercompetition"});
        dispatch({type:"SET", key:"filtermenuclicked", payload:true});
    } 
    const handleCompetitionSelect = (competition) => {
        const cspc = {
              competition_id: competition.competition_id,
              label: getCompetitionOptionLabel(competition.competition_name),
              competition_name:competition.competition_name,
        }
        setSelectedCompetition(cspc); 
        dispatch({type:"SET", key:"filtercompetition", payload:cspc});
        dispatch({type:"SET", key:"filtermenuclicked", payload:true});
    } 

    return (
        <div>
            <Row className="full-mobile filter-groups">

                <div className="filter-group-icon">
                    <button className={`btn-secondary ${activeTab === 'highlights' && 'home-tab-active'}`} 
                       onClick = {() => setActiveTabSpace('highlights')} >Highlights</button>
                </div>
                <div className="filter-group-icon">
                        <button className={`btn-secondary ${activeTab === 'today' && 'home-tab-active'}`} 
                            onClick ={() => setActiveTabSpace('today')}>Today's</button>
                </div>
                <div className="filter-group-icon">
                        <button className={`btn-secondary ${activeTab === 'tomorrow' && 'home-tab-active'}`}
                            onClick={() => setActiveTabSpace('tomorrow')}>Tomorrow</button>
                </div>
                {/* <div className="filter-group-icon" key="1">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-components" variant="secondary" >
                            { selectedSport?.label }
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                          {
                              sports && sports.map((sport) => { 
                                 return <Dropdown.Item 
                                     key={sport.sport_id}
                                     eventKey={sport.sport_id} 
                                     onClick={() => handleSportsSelect(sport)}>{ sport.label}</Dropdown.Item> 
                              })
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                </div> */}
                {/* <div className="filter-group-icon" key="2">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-components" variant="secondary" >
                            { selectedCategory?.label }
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="default">
                          {
                              sportCategories && sportCategories.map((category) => { 
                                 return <Dropdown.Item 
                                  key={category.category_id}
                                  eventKey={category.category_id} 
                                  onClick={() => handleCategorySelect(category)}>{ category.label}</Dropdown.Item> 
                              })
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                </div> */}

                {/* { competitions && <div className="filter-group-icon" key="3">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-components" variant="secondary" >
                            { selectedCompetition?.label }
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="default">
                          {
                              competitions.map((competition) => { 
                                 return <Dropdown.Item 
                                  key={competition.competition_id}
                                  eventKey={competition.competition_id} 
                                  onClick={() => handleCompetitionSelect(competition)}>{ competition.label}</Dropdown.Item> 
                              })
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                </div> 
               } */}
            </Row>
        </div>
    )

}

export default MainTabs;

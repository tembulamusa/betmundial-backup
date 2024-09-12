import React, {useState, useEffect, useContext, useCallback} from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom'
import {Row, Col, Dropdown} from 'react-bootstrap';
import { faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Context} from '../../context/store';


const MainTabs = (props) => {
    const {tab} = props;
    const [sports, setSports] = useState();
    const [competitions, setCompetitions] = useState();
    const [state, dispatch] = useContext(Context);
    const {sportid, categoryid, competitionid} = useParams();
    const [activeTab, setActiveTab] = useState(tab);
    const [searchParams, ] = useSearchParams();
    const queryParamValue = searchParams.get('id');

    const getSportOptionLabel = (sport_name, showCaret=false) => {
        return (<Row className="d-flex justify-content-start f-menu-item">
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

        // Load the respective game to the url path...


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

    const getSportImageIcon = (sport_name, folder = 'svg', topLeagues = false) => {

        let default_img = 'hipo'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../assets${sport_name}`) : require(`../../assets/${folder}/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../assets/${folder}/${default_img}.png`);
        }
        return sport_image
    }

    return (
        <div className='bg-white shadow-sm border-b border-gray-200 mb-3 block relative'>
            <Row className="border-b border-gray-200 !uppercase font-bold main-tabs reduced-mobile-text px-2">
                <div className='col-4 hidden md:flex !mr-0 pr-0'>
                    <div className="filter-group-icon mb-0" key="1">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-custom-components" variant="transparent-selector" >
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
                    </div>
                </div>
                <div className='md:col-8 md:w-8/12 text-gray-500 cursor-pointer mobile-custom-scrollbar px-2 overflow-auto md:!overflow-hidden'>
                    <div className='row'>
                        <div className="col-4">
                            <div className={`home-tabs hover:text-hover ${activeTab === 'highlights' && 'home-tab-active'}`} 
                            onClick = {() => setActiveTabSpace('highlights')} >Highlights</div>
                        </div>
                        <div className="col-4">
                                <div className={`home-tabs hover:text-hover ${activeTab === 'today' && 'home-tab-active'}`} 
                                    onClick ={() => setActiveTabSpace('today')}>Today's</div>
                        </div>
                        <div className="col-4">
                                <div className={`home-tabs hover:text-hover ${activeTab === 'tomorrow' && 'home-tab-active'}`}
                                    onClick={() => setActiveTabSpace('tomorrow')}>Tomorrow</div>
                        </div>
                    </div>
                </div>
            </Row>
            <div className='mx-2 flex mobile-custom-scrollbar !px-2 overflow-auto md:overflow-hidden w-full'>
                <Link
                onClick={() => dispatch({type: "SET", key: "filtercompetition", payload: {competition_id: 0}})}
                to={`/competition/${selectedSport.sport_id}`} className={`mx-3 main-tabs-submenu item ${(!queryParamValue) && 'active'}`}>
                    All
                </Link>
                {state?.categories?.top_soccer?.map((competition, idx) => (
                <>
                    <Link
                    onClick={() =>  dispatch({type: "SET", key: "filtercompetition", payload: {competition_id: competition?.competition_id}})}
                    to={`/sports/competition/matches?id=${competition.competition_id}`}
                    className={`mx-3 main-tabs-submenu item ${(queryParamValue == competition.competition_id) && 'active'}`} style={{fontSize: "13px"}}
                    >
                        <img style={{borderRadius: '1px', height: '13px', width:"13px" }}
                        src={getSportImageIcon(competition?.flag, 'img/flags-1-1', true)}
                        alt='' className='inline-block mr-2'/>
                        <span className='inline-block leading-0'>{competition?.competition_name}</span>
                    </Link>
                </>
                ))}
            </div>
        </div>
    )

}

export default MainTabs;

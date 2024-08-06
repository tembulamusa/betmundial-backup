import {Menu, MenuItem, Sidebar,  SubMenu} from "react-pro-sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import React, {useState} from "react";

const SidebarMobile = (props) => {
    const [competitions, setCompetitions] = useState(getFromLocalStorage('categories'));
    return (
        <Sidebar
            className={'background-primary'}
            style={{width: "100%"}}
            image={false}>
                <Menu iconShape="circle">
                    {competitions?.all_sports?.map((competition, index) => (
                        <SubMenu title={competition.sport_name}
                                 icon={<img style={{borderRadius: '50%', height: '25px'}}
                                            src={require(`./../../../assets${competition.flag}`)}/>}
                                 key={index}>
                            <SubMenu title={'Countries'}
                                     style={{maxHeight: '300px', overflow: 'scroll'}}>
                                {competition?.categories.map((country, countryKey) => (
                                    <div key={`${countryKey}_category`}>
                                        <SubMenu title={country.category_name}
                                                 icon={<img
                                                     style={{borderRadius: '50%', height: '20px'}}
                                                     src={country.cat_flag !== null ?
                                                         require(`./../../../assets/img/flags-1-1/${country.cat_flag}.svg`) :
                                                         require(`./../../../assets/img/flags-1-1/default_flag.svg`)}
                                                 />}
                                        >
                                            {country?.competitions.map((league, leagueKey) => (
                                                <MenuItem key={`${leagueKey}_league`}>
                                                    <a href={`/competition/${competition.sport_id}/${country.category_id}/${league.competition_id}`}
                                                       onClick={() => setLocalStorage('active_item', competition.sport_id)}>
                                                        {league.competition_name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </SubMenu>
                                    </div>
                                ))}
                            </SubMenu>
                            <MenuItem>
                                <a href={`/upcoming?sport_id=${competition.sport_id}/`}>Today
                                    Games</a>
                            </MenuItem>
                            <MenuItem>
                                <a href={`/highlights?sport_id=${competition.sport_id}/`}>Highlights</a>
                            </MenuItem>
                            <MenuItem>
                                <a href={`/tomorrow?sport_id=${competition.sport_id}/`}>
                                    Tomorrow
                                </a>
                            </MenuItem>
                        </SubMenu>
                    ))}
                </Menu>
        </Sidebar>
    )
}

export default SidebarMobile

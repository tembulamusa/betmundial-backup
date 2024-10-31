import React from "react";
const getSportImageIcon = (sport_name, folder = 'svg', topLeagues = false) => {

    let default_img = 'sure'
    let sport_image;
    try {
        sport_image = topLeagues ? require(`../../assets${sport_name}`) : require(`../../assets/${folder}/${sport_name}.svg`);
    } catch (error) {
        sport_image = require(`../../assets/${folder}/${default_img}.png`);
    }
    return sport_image
}


export default getSportImageIcon;
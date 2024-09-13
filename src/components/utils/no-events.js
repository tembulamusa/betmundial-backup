import React from "react";


const NoEvents = ({message}) => {

    return (
        <div className="text-center p-5 no-events-div my-5 rounded-2xl">
            {message ? message : "Sorry, no events found for your current selection."} 
        </div>
    )
}

export default React.memo(NoEvents);

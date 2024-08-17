import React from "react";


const NoEvents = (props) => {


    return (
        <div className="text-center p-5 no-events-div my-5 rounded-2xl">
            No Event. Please Select another event
        </div>
    )
}

export default React.memo(NoEvents);
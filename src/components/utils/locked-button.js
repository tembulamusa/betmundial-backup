import React from "react";
import { IoIosLock } from "react-icons/io";

const LockedButton = (props) => {
    const {btnStatus} = props;
    return (
        <>
            <button className="locked-button" disabled={true}>{!["Deactivated"].includes(btnStatus) && <IoIosLock className="mx-auto"/>}</button>
        </>
    )
}

export default React.memo(LockedButton);

export const EmptyButton =  (props) => {
    const {mktStatus} = props;

    return (
        <>
            <button className="no-bet-btn w-full locked-button" disabled={true}></button>
        </>
    )
}
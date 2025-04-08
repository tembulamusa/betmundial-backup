import React from "react";

const PageHeader = ({title}) => {

    return (
        <div className='page-title p-4 text-center border-b border-gray-200'>
            <h4 className="!uppercase">
                {title ?? "SureBet"}
            </h4>
        </div>
    )
}

export default React.memo(PageHeader);
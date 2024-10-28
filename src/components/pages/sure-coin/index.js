import React from "react";

const SureCoinIndex = (props) => {






    const Header = (props) => {

        return (
            <h4 className="text-centr col-md-12 bg-primary p-4 text-enter justify-content-between">
                Surecoin
            </h4>
        )
    }
    return (
        <>
            <Header />
        </>
    )
}


export default React.memo(SureCoinIndex)
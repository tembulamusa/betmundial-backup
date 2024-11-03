import React from "react";
import CasinoGame from "./casino-game";


const GameCategoryListing = (props) => {
    const {gamestype, games} = props;

    return (

        <div className="category-products">
            <section className="casino-category-header px-2 py-3">
                {gamestype}
            </section>

            <section className="row !mx-0 pr-2">
                    {games?.map((game, idx) => (
                        <div key={"casino-"+ idx} className="casino-game col-md-2">
                            <CasinoGame game={game} />
                        </div>
                    ))}
            </section>
        </div>
    )
}

export default React.memo(GameCategoryListing);
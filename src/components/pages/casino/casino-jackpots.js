import React, { useState } from "react";

const CasinoJackpots = (props) => {
    const [jackpots, setJackpots] = useState(["jackpot"])

    const Jackpot = (props) => {

        return (
            <>Jackpot1</>
        )
    }
    return (
        jackpots?.length > 0 &&
        <section className="bg-white casino">
            <div className="jackpots-title">Casino Jackpots</div>

            <div className="">
                {jackpots?.map((jackpot, index) => {
                    return <Jackpot jackpot={jackpot} />

                })}
            </div>
        </section>
    )
}


export default React.memo(CasinoJackpots);
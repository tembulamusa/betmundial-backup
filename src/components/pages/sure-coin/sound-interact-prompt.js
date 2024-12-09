import React from "react";

const SoundInteractPrompt = (props) => {
    const {setUserMuted, setUserSoundSet} = props;


    return (
        <>
            <div className="sound-interact-prompt-cover">
                <div className="sound-selector mx-auto text-center">
                    <div className="py-3 text-3xl">Enable Sound?</div>
                    <div className="uppercase">
                        <button className="btn btn-success rounded-md mr-3 px-3xl" onClick={() => {setUserMuted(false); setUserSoundSet(true);}}>Yes</button>
                        <button className="btn btn-danger rounded-md" onClick={() => {setUserMuted(true); setUserSoundSet(true);}}>No</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(SoundInteractPrompt);
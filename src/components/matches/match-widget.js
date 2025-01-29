import React, { useEffect } from "react";
import '../../assets/css/theme.css';



const MatchWidget = (props) => {
    const { parentMatchId } = props;
     
    console.log("Loading widget for parent match ID", parentMatchId);

    const loadWidget = (parentMatchId) => {
        if (!window.SIR) {
            const script = document.createElement("script");
            script.src = "https://widgets.sir.sportradar.com/507f748510ff83b1f73738bd3df69714/widgetloader";
            script.async = true;
            script.setAttribute("n", "SIR");
            script.onload = () => {
                window.SIR("addWidget", ".sr-widget-1", "match.lmtPlus", {
                    streamToggle: "onPitchButton",
                    layout: "double",
                    detailedScoreboard: "disable",
                    tabsPosition: "top",
                    matchId: parentMatchId,
                });
            };
            document.body.appendChild(script);
        } else {
            window.SIR("addWidget", ".sr-widget-1", "match.lmtPlus", {
                streamToggle: "onPitchButton",
                layout: "double",
                detailedScoreboard: "disable",
                tabsPosition: "top",
                matchId: parentMatchId,
            });
        }
    };

    useEffect(() => {
        if(parentMatchId) {
            loadWidget(parentMatchId);
        }
    }, [parentMatchId]);

  return (
      <div class="widgets">
        <div>
          <div class="sr-widget sr-widget-1"></div>
        </div>
    </div>
  );
};

export default MatchWidget;

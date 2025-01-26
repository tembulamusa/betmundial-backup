import React, { useEffect } from "react";
import '../../assets/css/theme.css';

const MatchWidget = (props) => {
    const {parentMatchId} = props;
    useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widgets.sir.sportradar.com/507f748510ff83b1f73738bd3df69714/widgetloader";
    script.setAttribute("n", "SIR");

    script.onload = () => {
        // Initialize the widget after the script has loaded
        if (window.SIR) {
        window.SIR("addWidget", ".sr-widget-1", "match.lmtPlus", {
            streamToggle: "onPitchButton",
            layout: "double",
            detailedScoreboard: "disable",
            tabsPosition: "top",
            matchId: parentMatchId,
        });
        }
    };

    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Container for the widget */}
      <div className="sr-widget-1"></div>
    </div>
  );
};

export default MatchWidget;
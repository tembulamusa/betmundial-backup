import React, { useEffect } from "react";
import '../../assets/css/theme.css';

const MatchWidget = (props) => {
    const {parentMatchId} = props;
    useEffect(() => {
        
        (function(a,b,c,d,e,f,g,h,i){a[e]||(i=a[e]=function(){(a[e].q=a[e].q||[]).push(arguments)},i.l=1*new Date,i.o=f,
            g=b.createElement(c),h=b.getElementsByTagName(c)[0],g.async=1,g.src=d,g.setAttribute("n",e),h.parentNode.insertBefore(g,h)
            )})(window,document,"script", "https://widgets.sir.sportradar.com/507f748510ff83b1f73738bd3df69714/widgetloader", "SIR", {
                theme: false, // using custom theme
                language: "en"
            });
        if (window.SIR) {
            window.SIR("addWidget", ".sr-widget-1", "match.lmtPlus", {
                streamToggle: "onPitchButton",
                layout: "double",
                detailedScoreboard: "disable",
                tabsPosition: "top",
                matchId: 50850415,
            });
        }
    }, []);



  return (
    <div className="widgets">
      {/* Container for the widget */}
      <div>
        <div className="sr-widget sr-widget-1"></div>
      </div>
    </div>
  );
};

export default MatchWidget;
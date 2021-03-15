import React from 'react';

import './RainbowFrame.css'; 

function withRainbowFrame(colors) {
    return function(Component) {
      return props => {
        let framesArr=colors.reduce((r,v)=>
        {return r=<div style={{border:"solid 10px "+v, padding: "10px"}}>{r}</div>},
        <div className='RainbowFrame' style={{padding: "15px"}}><Component {...props} /></div>);
     
        return <div>{framesArr}</div>;
      }
    };
}


export { withRainbowFrame };
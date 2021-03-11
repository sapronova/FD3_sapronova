import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css'; 

const RainbowFrame = props => {
    let framesArr=props.colors.reduce((r,v)=>
    {return r=<div className='RainbowFrame' style={{border:"solid 10px "+v, padding: "10px"}}>{r}</div>},
    <div className='RainbowFrame' style={{padding: "30px"}}>{props.children}</div>);
 
    return <div>{framesArr}</div>;
  }
  
  RainbowFrame.propTypes = {
    colors: PropTypes.array.isRequired,
  };
  
  export default RainbowFrame;

  /*const RainbowFrame = props => {
    let i=props.colors.length-1;
    if (i!=0) { 
        return <div className='RainbowFrame' style={{border:"solid 10px "+props.colors[i], padding: "10px"}}><RainbowFrame colors={props.colors.slice(0,props.colors.length-1)}> {props.children}</RainbowFrame></div>;
    }
    return <div className='RainbowFrame' style={{border:"solid 10px "+props.colors[0], padding: "30px"}}>{props.children}</div>;
  }
  */
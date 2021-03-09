import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css'; 

const RainbowFrame = props => {
    let i=props.colors.length-1;
    while (i!=0) { 
        return <div className='RainbowFrame' style={{border:"solid 10px "+props.colors[i], padding: "10px"}}><RainbowFrame colors={props.colors.slice(0,props.colors.length-1)}> {props.children}</RainbowFrame></div>;
    }
    return <div className='RainbowFrame' style={{border:"solid 10px "+props.colors[0], padding: "30px"}}>{props.children}</div>;
  }
  
  RainbowFrame.propTypes = {
    colors: PropTypes.array.isRequired,
  };
  
  export default RainbowFrame;
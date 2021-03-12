import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css'; 

const BR2JSX = props => {
    let modifiedText=props.text.split(/<br *\/?>/);
    let modifiedTexttoJSX=[];
    for (const [i, v] of modifiedText.entries()) {  
      modifiedTexttoJSX.push(v);
      modifiedTexttoJSX.push(<br key={i}/>)};
    modifiedTexttoJSX.pop();
    
    return <div>{modifiedTexttoJSX}</div>;
  }
  
  
  BR2JSX.propTypes = {
    text: PropTypes.string.isRequired,
  };
  
  export default BR2JSX; 

  /*let modifiedTexttoJSX=[];
      modifiedText.forEach ((v,i)=>{   
          modifiedTexttoJSX.push(v);
          modifiedTexttoJSX.push(<br key={i}/>);
        });
        */
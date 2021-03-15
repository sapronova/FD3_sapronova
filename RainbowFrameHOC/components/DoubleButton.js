import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css'; 

class DoubleButton extends React.Component {

  static propTypes = {
    caption2: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
  };

  clicked = (EO) => {
    this.props.cbPressed(EO.target.value===this.props.caption1?1:2);
  }

 render() {
    return (<div><input type='button' value={this.props.caption1} onClick={this.clicked} className='RightButton'/>
            {this.props.children}
            <input type='button' value={this.props.caption2} onClick={this.clicked} className='LeftButton'/></div>);
    ;
  }
}
  
  export default DoubleButton;
import React from 'react';
import PropTypes from 'prop-types'; 

// ProdCard формирует карту просмотра товара

class ProdCard extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    };
    
      render() {
      return (<div className="Card">
          <h2 className="Namedesc">{this.props.name}</h2>
          <div className="Description">{this.props.description}</div>
          <div>Price: {this.props.price}</div>
      </div>);
    }
  
  }
  
  export default ProdCard;
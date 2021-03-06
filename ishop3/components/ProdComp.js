import React from 'react';
import PropTypes from 'prop-types';

import './ProdComp.css';

class ProdComp extends React.Component {

    static propTypes = {
        item: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        cbSelected: PropTypes.func.isRequired,
        cbDelete: PropTypes.func.isRequired,
        cbEdit: PropTypes.func.isRequired,
        buttonability: PropTypes.bool.isRequired,
    };
    
    highlighted = (EO) => { 
        this.props.cbSelected (this.props);
    }

    delItem = (EO) => {
        EO.stopPropagation();
        this.props.cbDelete (this.props.item);
    }

    butEdit = (EO) => {
        EO.stopPropagation();
        this.props.cbEdit (1,this.props);
    }

    render() {
      return (
        <tr className={this.props.classname}  onClick={this.highlighted}>
        <td><img className="Image" src={this.props.url} alt="image"></img></td>
        <td className="Text">{this.props.name}</td>
        <td className="Price">{this.props.price}</td>
        <td className="Count">{this.props.count} pcs. </td>
        <td><input type="button" value="Edit" onClick={this.butEdit} disabled={this.props.buttonability}/> </td>
        <td><input type="button" value="Delete" onClick={this.delItem} disabled={this.props.buttonability}/> </td>
        </tr>);
    }
  
  }
  
  export default ProdComp
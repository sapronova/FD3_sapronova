import React from 'react';
import PropTypes from 'prop-types'; 

import './ProdEditor.css';

class ProdEditor extends React.Component {

    static propTypes = {
        mode: PropTypes.number.isRequired,
        item: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        cbEditon: PropTypes.func.isRequired,
        cbChangemode: PropTypes.func.isRequired,
        cbSave: PropTypes.func.isRequired,
    };
    
    state = { 
        currCard:false, //если в режиме редактирования либо добавления нового товара вносятся изменения, currcard приобретает значение true
        currItem: this.props.item,
        inputName: this.props.name,
        inputNameValidity: true,
        inputPrice: this.props.price,
        inputPriceValidity: true,
        inputUrl: this.props.url,
        inputUrlValidity: true,
        inputDescription: this.props.description,
        inputDescriptionValidity: true,
        inputQuantity: this.props.quantity,
        inputQuantityValidity: true,
        isChecked:false, //при нажатии кнопки Add в режиме добавления товара приобретает значение true после проверки всех полей
    }

    static getDerivedStateFromProps(props, state) {
        if (props.item!== state.currItem) {
          return {
            currItem: props.item,
            inputName: props.name,
            inputPrice: props.price,
            inputUrl: props.url,
            inputDescription: props.description,
            inputQuantity: props.quantity,
          };
        }
        return null;
      }

    valueChange = (textVal, inpName) => {
        this.setState({currCard: true}); 
        this.props.cbEditon (true);
        switch (inpName) {
            case 'Name':
                if (textVal.trim()==="") {
                this.setState({inputNameValidity: false});}
                else this.setState({inputNameValidity: true});
                break;
            case 'Price':
                if (textVal.trim()==="") {
                this.setState({inputPriceValidity: false});}
                else this.setState({inputPriceValidity: true});
                break;
            case 'Description':
                if (textVal.trim().length<5) {
                this.setState({inputDescriptionValidity: false});}
                else this.setState({inputDescriptionValidity: true});
                break;
            case 'Quantity':
                if (textVal===""||!Number.isInteger(Number(textVal))) { 
                this.setState({inputQuantityValidity: false});}
                else this.setState({inputQuantityValidity: true});
                break;
            case 'Url':
                if (textVal.trim()==="") { 
                this.setState({inputUrlValidity: false});}
                else this.setState({inputUrlValidity: true});
                break;
        }
    }

    valueNameChange = (EO) => {
        this.setState({inputName: EO.target.value});
        this.valueChange(EO.target.value, 'Name');
    }

    valuePriceChange = (EO) => {
        this.setState({inputPrice: EO.target.value});
        this.valueChange(EO.target.value, 'Price');
    }

    valueDescriptionChange = (EO) => {
        this.setState({inputDescription: EO.target.value});
        this.valueChange(EO.target.value, 'Description');
    }

    valueQuantityChange = (EO) => {
        this.setState({inputQuantity: EO.target.value});
        this.valueChange(EO.target.value, 'Quantity');
    }

    valueUrlChange = (EO) => {
        this.setState({inputUrl: EO.target.value});
        this.valueChange(EO.target.value, 'Url');
    }

    cancel = (EO) => {
        this.props.cbEditon (false);
        this.props.cbChangemode (null);
    }

    save = (EO) => {
        if (this.state.currCard===false) {
            this.cancel();
        }
        else  {
            if (this.state.inputNameValidity===true&&this.state.inputPriceValidity===true&&this.state.inputDescriptionValidity===true&&this.state.inputQuantityValidity===true&&this.state.inputUrlValidity===true) {
                this.props.cbSave (this.state.inputName, this.state.inputPrice, this.state.inputDescription, Number(this.state.inputQuantity), this.state.inputUrl);
                this.cancel();
            }
        }

    }

    addcheck = () => {  //проверка всех полей в режиме добавления нового товара
        if (this.state.currCard===false) {
            this.cancel();
        }
        else  {
            this.valueChange(this.state.inputName, 'Name');
            this.valueChange(this.state.inputPrice, 'Price');
            this.valueChange(this.state.inputDescription, 'Description');
            this.valueChange(this.state.inputQuantity, 'Quantity');
            this.valueChange(this.state.inputUrl, 'Url');
            this.setState({isChecked: true}, () => {
                this.addfinal(); 
            });
        }
    }

    addfinal = () => {  //значения полей будут переданы, если все поля прошли валидацию
        if (this.state.inputNameValidity===true&&this.state.inputPriceValidity===true&&this.state.inputDescriptionValidity===true&&this.state.inputQuantityValidity===true) {
            this.props.cbSave (this.props.item, this.state.inputName, this.state.inputPrice, this.state.inputDescription, Number(this.state.inputQuantity), this.state.inputUrl);
                this.cancel();
        }
    }

    render() {
      return (
          <div className="EditorField">
              <h2>{(this.props.mode===1)&&"Edit existing product"}
              {(this.props.mode===2)&&"Add new product"}</h2>
              <div>Item {this.props.item}</div> <br/>
              <label><div>Name</div><input type="text" value={this.state.inputName} onChange={this.valueNameChange} ></input></label>
              {(this.state.inputNameValidity===false)&&<span className="Valfailed">this field must not be empty</span>}
              <br/>
              <label><div>Image (url)</div><input type="text" value={this.state.inputUrl} onChange={this.valueUrlChange} ></input></label>
              {(this.state.inputUrlValidity===false)&&<span className="Valfailed">this field must not be empty</span>}
              <br/>
              <label><div>Price</div><input type="text" value={this.state.inputPrice} onChange={this.valuePriceChange} ></input></label>
              {(this.state.inputPriceValidity===false)&&<span className="Valfailed">this field must not be empty</span>}
              <br/>
              <label><div>Description</div><input type="text" value={this.state.inputDescription} onChange={this.valueDescriptionChange} ></input></label>
              {(this.state.inputDescriptionValidity===false)&&<span className="Valfailed">this field must be at least 5 characters long</span>}
              <br/>
              <label><div>Quantity</div><input type="text" value={this.state.inputQuantity} onChange={this.valueQuantityChange} ></input></label>
              {(this.state.inputQuantityValidity===false)&&<span className="Valfailed">value must be integer</span>}
              <br/>
              {(this.props.mode===1)&&<input type="button" className="EditorButton" value="Save" onClick={this.save} disabled={this.state.currCard===false?true:false}/>}
              {(this.props.mode===2)&&<input type="button" className="EditorButton" value="Add" onClick={this.addcheck} disabled={this.state.currCard===false?true:false}/>}
              <input type="button" className="EditorButton" value="Cancel" onClick={this.cancel}/>
          </div>
          );
    }
  
  }
  
  export default ProdEditor;
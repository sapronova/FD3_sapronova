import React from 'react';
import PropTypes from 'prop-types';

import './ShopComp.css';

import ProdComp from './ProdComp.js';
import ProdCard from './ProdCard.js';
import ProdEditor from './ProdEditor.js';

class ShopComp extends React.Component {

    static propTypes = {
        positions: PropTypes.array.isRequired,
        shop: PropTypes.string.isRequired,
    };

    state = {
        isHighlightened: null,
        selectedItem: null,
        cardName:null,
        cardDescription:null, 
        cardPrice:null,
        cardQuantity:null,
        cardImage:null,
        myProds: this.props.positions.map(v=>v),
        editMode:null, // null установлен для режима просмотра списка товаров, 1 - для режима редактирования, 2 - для реэима добавления нового товара
        editOn:false,  // false если изменения не вносятся, true - если осуществляется редактирование существующего либо добавление нового товара
    }

    itemSelected = (prod) => {
        if (this.state.editOn===false) {
        this.setState({selectedItem: prod.item, cardName: prod.name, cardDescription: prod.description, 
            cardPrice: prod.price, cardImage: prod.url, editMode: null, isHighlightened: 'Highlightened'});
        (this.state.isHighlightened==='Highlightened'&&prod.item===this.state.selectedItem)?this.setState({isHighlightened: null}):this.setState({isHighlightened: 'Highlightened'});
        } 
    }

    itemDelete  = (item) => { 
            var confirmation = confirm('You have clicked the delete-button, are you sure of your decision?');
        if (confirmation) { 
            this.setState({myProds: this.state.myProds.filter(v=>v.item!=item)}); 
        };
        
    }

    editorMode  = (mode, prod) => { 
        this.setState({editMode: mode, cardName: prod.name, selectedItem: prod.item, isHighlightened: null,
        cardPrice: prod.price, cardDescription: prod.description, cardQuantity: prod.count, cardImage: prod.url}); 
        
    }

    newItem  = () => {
        if (this.state.editOn===false) {
         this.setState({editMode: 2, isHighlightened: null});   
        } 
        
    }

    cancellation  = () => { 
        this.setState({editMode: null});
    }

    editionOn  = (mode) => {
        this.setState({editOn: mode});
    }

    changedProd  = (name, price, description, quantity, url) => {
        let newmyProds=this.state.myProds.map(v=>{
            if (v.item===this.state.selectedItem) {
                v.name=name; 
                v.price=price; 
                v.description=description;
                v.count=quantity;
                v.url=url;
            }
            return v;
        });
        this.setState({myProds: newmyProds});
    } 
    
    addnewProd  = (valItem, valName, valPrice, valDescription, valQuantity, valUrl) => { 
        var newProd={item:valItem, name:valName, url:valUrl, price:valPrice, count:valQuantity, description:valDescription};
        this.setState({myProds: this.state.myProds.concat(newProd)});
    } 

    render () {
        var prodList=this.state.myProds.map (v =>
            <ProdComp key={v.item} item={v.item} name={v.name}
            price={v.price} url={v.url} count={v.count} cbSelected={this.itemSelected}
            classname={(v.item===this.state.selectedItem)?this.state.isHighlightened:null}
            description={v.description} cbDelete={this.itemDelete} cbEdit={this.editorMode} buttonability={this.state.editOn}/>
        );
       
        return (
        <div className="ItemsList">
            <div className="Name">{this.props.shop}</div>
            <table className="ItemsList"> 
            <thead><tr className="ListHeader"> 
            <th>Image</th>
            <th className="Text">Name</th>
            <th className="Price">Price</th>
            <th className="Count">Count</th>
            <th className="Edit">Edit</th>
            <th className="Delete">Delete</th>
            </tr></thead>
            <tbody className="List">{prodList}</tbody>
            </table>
            <input className="NPbutton" type="button" value="New Product" onClick={this.newItem} disabled={this.state.editOn}/>
            {(this.state.isHighlightened!=null&&this.state.editMode===null)&&<ProdCard name={this.state.cardName} price={this.state.cardPrice} description={this.state.cardDescription}/>}
            
            {(this.state.editMode!==null)&&<ProdEditor mode={this.state.editMode} 
            item={this.state.editMode===1?this.state.selectedItem:(this.state.myProds[this.state.myProds.length-1].item+1)}
            name={this.state.editMode===1?this.state.cardName:""}
            url={this.state.editMode===1?this.state.cardImage:""}
            price={this.state.editMode===1?this.state.cardPrice:""}
            description={this.state.editMode===1?this.state.cardDescription:""}
            quantity={this.state.editMode===1?this.state.cardQuantity:0}
            cbChangemode={this.cancellation} cbEditon={this.editionOn} cbSave={this.state.editMode===1?this.changedProd:this.addnewProd}/>}
        </div>);

    };
}

export default ShopComp;
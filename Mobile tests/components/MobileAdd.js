﻿import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {voteEvents} from './events';

import './MobileAdd.css';

class MobileAdd extends React.PureComponent {

  static propTypes = {
      infoClients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    inputImValidity: false,
    inputFamValidity: false,
    inputOtchValidity: false,
    inputBalanceValidity: false,
    checked: false,
    uniqueID: null,
  };

  
  componentWillReceiveProps = () => { 
    //
  };

  componentWillMount = () => {
    let newkeysArr=[];
    this.props.infoClients.forEach(v => {
      newkeysArr.push(v.id);
    });
    function getRandomInt(arr, min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      let id=Math.floor(Math.random() * (max - min)) + min;
      if (arr.some(v=>v===id)) {
        return getRandomInt (arr, min, max);
      }
      else return id;
    }
    let randomID=getRandomInt(newkeysArr, 100, 1000)
    this.setState({uniqueID:randomID});
  };

  newFamRef = null;
  newImRef = null;
  newOtchRef = null;
  newBalanceRef = null;

  setNewFamRef  = (ref) => {
    this.newFamRef=ref;
  };

  setNewImRef  = (ref) => {
    this.newImRef=ref;
  };

  setNewOtchRef = (ref) => {
    this.newOtchRef=ref;
  };

  setNewBalanceRef = (ref) => {
    this.newBalanceRef=ref;
  };

  typingOn  = (EO) => {
    //voteEvents.emit('TypingOn', true);
  }

  cancel = (EO) => {
    voteEvents.emit('EditCancel', 1);
  }

  save = (EO) => { 
    
    let message=[];
   
    this.newFamRef.value.trim()===""?(
          this.setState({inputFamValidity: false}),
          message.push(' фамилия'))
          :this.setState({inputFamValidity: true});
    this.newImRef.value.trim()===""?(this.setState({inputImValidity: false}),
          message.push(' имя'))
          :this.setState({inputImValidity: true});
    this.newOtchRef.value.trim()===""?(this.setState({inputOtchValidity: false}),
          message.push(' отчество'))
          :this.setState({inputOtchValidity: true});
    (this.newBalanceRef.value===""||!isFinite(this.newBalanceRef.value))?(this.setState({inputOtchValidity: false}),
          message.push(' баланс (поле должно иметь числовое значение)'))
          :this.setState({inputBalanceValidity: true});
    
    this.setState({checked: true}, () => {
      if (this.state.inputIdValidity===false||this.state.inputFamValidity===false||this.state.inputImValidity===false||this.state.inputOtchValidity===false||this.state.inputBalanceValidity===false) {
      alert('Проверьте правильность заполнения следующих полей: '+ message + ".");
    }
      else {
        let editedClient={
          id:this.state.uniqueID,
          im:this.newImRef.value,
          fam:this.newFamRef.value,
          otch:this.newOtchRef.value,
          balance:this.newBalanceRef.value,
        };
        voteEvents.emit('AddClient', editedClient);
      }
      });
  }

  let 

  render() {
    console.log("MobileAdd render ");

    return (
      <div className="EditorField">
      <h4>Добавление нового абонента</h4>
      <div className='InpPrefield'>ID: {this.state.uniqueID}</div>
      <br/> <br/>
      <label><div className='InpPrefield'>Фамилия</div><input type="text" defaultValue="" ref={this.setNewFamRef} onChange={this.typingOn}></input></label>
      <br/>
      <label><div className='InpPrefield'>Имя</div><input type="text" defaultValue="" ref={this.setNewImRef} onChange={this.typingOn}></input></label>
      <br/>
      <label><div className='InpPrefield'>Отчество</div><input type="text" defaultValue="" ref={this.setNewOtchRef} onChange={this.typingOn}></input></label>
      <br/> 
      <label><div className='InpPrefield'>Баланс</div><input type="text" defaultValue="" ref={this.setNewBalanceRef} onChange={this.typingOn}></input></label>
      <br/> 
      <input type="button" className="SaveButton" value="Сохранить" onClick={this.save}/>
      <input type="button" className="CancelButton" value="Отмена" onClick={this.cancel}/>
      
  </div>
    );

  }

}


export default MobileAdd;

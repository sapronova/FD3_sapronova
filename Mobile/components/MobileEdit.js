import React, { Fragment } from 'react';
import deepEqual from 'deep-equal';
import PropTypes from 'prop-types';

import {voteEvents} from './events';

import './MobileEdit.css';

class MobileEdit extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
          fam: PropTypes.string.isRequired,
          im: PropTypes.string.isRequired,
          otch: PropTypes.string.isRequired,
    }),
  };

  state = {
    info: this.props.info,
    mode: 1,
    inputImValidity: true,
    inputFamValidity: true,
    inputOtchValidity: true,
    inputBalanceValidity: true,
    checked: false,
  };

  componentDidMount = () => {
    voteEvents.addListener('EditClicked',this.getInfo);
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('EditClicked',this.getInfo);
  };

  componentWillReceiveProps = () => {
    console.log("MobileEdit id="+this.props.info.id+" componentWillReceiveProps"); 
  };

  getInfo = (currinfo) => {
    this.setState({info:currinfo});
  }

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
    voteEvents.emit('TypingOn', true);
  }

  cancel = (EO) => {
    voteEvents.emit('EditCancel', 1);
  }

  save = (EO) => {
    console.log(this.newFamRef.value);
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
      if (this.state.inputFamValidity===false||this.state.inputImValidity===false||this.state.inputOtchValidity===false||this.state.inputBalanceValidity===false) {
      alert('Проверьте правильность заполнения следующих полей: '+ message);
    }
      else {
        let editedClient={
          id:this.state.info.id,
          im:this.newImRef.value,
          fam:this.newFamRef.value,
          otch:this.newOtchRef.value,
          balance:this.newBalanceRef.value,
        };
        let isEqual=deepEqual(editedClient,this.state.info);
        isEqual?voteEvents.emit('EditCancel', 1):voteEvents.emit('SaveClient', editedClient);
      }
      });
    console.log(this.state.inputImValidity);
    
    //voteEvents.emit('EditCancel', 1);
  }


  render() {
    console.log("MobileAdd render "+this.state.info.id);

    return (
      <div className="EditorField">
      <h4>Редактирование информации абонента</h4>
      <label><div className='InpPrefield'>Фамилия</div><input type="text" defaultValue={this.state.info.fam} ref={this.setNewFamRef} onChange={this.typingOn}></input></label>
      <br/>
      <label><div className='InpPrefield'>Имя</div><input type="text" defaultValue={this.state.info.im} ref={this.setNewImRef} onChange={this.typingOn}></input></label>
      <br/>
      <label><div className='InpPrefield'>Отчество</div><input type="text" defaultValue={this.state.info.otch} ref={this.setNewOtchRef} onChange={this.typingOn}></input></label>
      <br/> 
      <label><div className='InpPrefield'>Баланс</div><input type="text" defaultValue={this.state.info.balance} ref={this.setNewBalanceRef} onChange={this.typingOn}></input></label>
      <br/> 
      <input type="button" className="SaveButton" value="Сохранить" onClick={this.save}/>
      <input type="button" className="CancelButton" value="Отмена" onClick={this.cancel}/>
      
  </div>
    );

  }

}


export default MobileEdit;

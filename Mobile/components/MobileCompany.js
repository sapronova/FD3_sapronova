import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import MobileEdit from './MobileEdit';
import MobileAdd from './MobileAdd';
import {voteEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name,
    clients: this.props.clients,
    currentMode: 1,
    typeMode: false,
    editedClientInfo: null,
    listMode: 'all',
  };

  componentDidMount = () => {
    voteEvents.addListener('DeleteClicked',this.deleteInfo);
    voteEvents.addListener('EditClicked',this.editInfo);
    voteEvents.addListener('EditCancel',this.editCancel);
    voteEvents.addListener('TypingOn',this.typingOn);
    voteEvents.addListener('SaveClient',this.saveClient);
    voteEvents.addListener('AddClient',this.addClient);
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('DeleteClicked',this.deleteInfo);
    voteEvents.removeListener('EditClicked',this.editInfo);
    voteEvents.removeListener('EditCancel',this.editCancel);
    voteEvents.removeListener('TypingOn',this.typingOn);
    voteEvents.removeListener('SaveClient',this.saveClient);
    voteEvents.removeListener('AddClient',this.addClient);
  };

  setName1 = () => {
    this.setState({name:'MTS'});
  };

  typingOn = (state) => {
    this.setState({typeMode:state});
  };

  deleteInfo = (id) => {
    if (this.state.typeMode===true) {
      alert('Прежде, чем удалить информацию об абоненте, завершите редактирование.');
    }
    else {
      let confirmation = confirm('Вы точно хотите удалить информацию о данном абоненте?');
    if (confirmation) {
      let newClients=this.state.clients.filter (v =>{
          return v.id!=id;
      });
      this.setState({clients:newClients});
    } 
    }
  };

  editInfo = (info) => {
      this.setState({editedClientInfo:info});
      this.setState({currentMode:2, typeMode:true}); 
  };

  saveClient = (newClient) => {
    let newClients=[...this.state.clients]; 
    newClients.forEach( (c,i) => {
      if ( c.id==newClient.id) {
        newClients[i]=newClient;
      }
    } );
      this.setState({typeMode:false, currentMode:1, clients:newClients});
  };

  addClient = (newClient) => { 
    console.log(newClient);
    let newClients=[...this.state.clients, newClient]; 
      this.setState({typeMode:false, currentMode:1, clients:newClients});
    };


  editCancel = (mode) => {
    this.setState({currentMode: mode, typeMode: false});
  }; 

  setName2 = () => {
    this.setState({name:'Velcom'});
  };
  
  /*setBalance = (clientId,newBalance) => {
    let changed=false;
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      if ( c.id==clientId && c.balance!=newBalance ) {
        let newClient={...c}; // копия хэша изменившегося клиента
        newClient.balance=newBalance;
        newClients[i]=newClient;
        changed=true;
      }
    } );
    if ( changed )
      this.setState({clients:newClients});
  };*/

  changeListMode = (EO) => {
    switch (EO.target.value) {
      case 'Все':
          this.setState({listMode: 'all'});
          break;
      case 'Активные':
          this.setState({listMode: 'active'});
          break;
      case 'Заблокированные':
          this.setState({listMode: 'blocked'});
          break;
  }
  };
  
  addnewClient = () => { 
    this.setState({currentMode: 3, typeMode:true});
  };
  
  render() {

    console.log("MobileCompany render");

    var clientsCode="";

    if (this.state.listMode==='all') {
      clientsCode=this.state.clients.map( client => <MobileClient key={client.id} info={client}/>);
    }
    if (this.state.listMode==='active') {
      clientsCode=this.state.clients.map(client => {if (client.balance>=0) {return <MobileClient key={client.id} info={client}/>}});
    }
    if (this.state.listMode==='blocked') {
      clientsCode=this.state.clients.map(client => {if (client.balance<0) {return <MobileClient key={client.id} info={client}/>}});
    }
    

    return (

      <div className='MobileCompany'>
        <input type="button" value="MTS" onClick={this.setName1} />
        <input type="button" value="Velcom" onClick={this.setName2} />
        
        <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
        <input type="button" value="Все" onClick={this.changeListMode}/>
        <input type="button" value="Активные" onClick={this.changeListMode}/>
        <input type="button" value="Заблокированные" onClick={this.changeListMode}/>
        <table className="ItemsList"> 
            <thead><tr className="ListHeader"> 
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
            </tr></thead>
            <tbody className="MobileCompanyClients">{clientsCode}</tbody>
        </table>
        <input type="button" value="Добавить клиента" onClick={this.addnewClient}  disabled={this.state.typeMode}/>
        {(this.state.currentMode===2)&&<MobileEdit key={this.state.editedClientInfo.id} info={this.state.editedClientInfo}></MobileEdit>}
        {(this.state.currentMode===3)&&<MobileAdd infoClients={this.state.clients}></MobileAdd>}
      </div>
    )
    ;

  }

}

export default MobileCompany;

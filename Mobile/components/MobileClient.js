import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';
import {voteEvents} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      clients:PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          fam: PropTypes.string.isRequired,
          im: PropTypes.string.isRequired,
          otch: PropTypes.string.isRequired,
          balance: PropTypes.number.isRequired,
        })
      ),
    }),
  };

  state = {
    info: this.props.info,
    mode: 1,
    typeMode: false,
  };

  componentDidMount = () => {
    //voteEvents.addListener('TypingOn',this.typingOn);
    //voteEvents.addListener('EditCancel',this.editCancel);
  };

  componentWillUnmount = () => {
    //voteEvents.removeListener('TypingOn',this.typingOn);
    //voteEvents.removeListener('EditCancel',this.editCancel);
  };

  typingOn = (state) => {
    this.setState({typeMode:state});
  };

  editCancel = () => {
    this.setState({typeMode:false});
  };

  componentWillReceiveProps = (newProps) => {
    //console.log("MobileClient id="+this.props.info.id+" componentWillReceiveProps");
    this.setState({info: newProps.info});
  };

  delete = (EO) => {
    //this.state.typeMode?alert('Прежде, чем удалить информацию об абоненте, завершите редактирование'):voteEvents.emit('DeleteClicked',this.props.info.id);
    voteEvents.emit('DeleteClicked',this.props.info.id);
  }

  edit = (EO) => {
    //this.props.cbSelected(this.props.code);
    voteEvents.emit('EditClicked',this.props.info);
  }

  render() {

    console.log("MobileClient id="+this.props.info.id+" render");
    
    return (
     /* <div className='MobileClient'>
        <span className='MobileClientBalance'>{this.state.balance}</span>
        <span className='MobileClientFIO'>{this.state.FIO.fam+" "+this.state.FIO.im+" "+this.state.FIO.otch}</span>
      </div>*/
      <tr className='MobileClient'>
          <td>{this.state.info.fam}</td>
          <td>{this.state.info.im}</td>
          <td>{this.state.info.otch}</td>
          <td>{this.state.info.balance}</td>
          {(this.state.info.balance<0)?<td className='Blocked'>Blocked</td>:<td className='Active'>Active</td>}
          <td><input type="button" value="Редактировать" onClick={this.edit} /> </td>
          <td><input type="button" value="Удалить" onClick={this.delete} /> </td>
      </tr>
    );

  }

}

export default MobileClient;

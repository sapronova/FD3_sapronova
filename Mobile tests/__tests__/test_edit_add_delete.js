"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import { shallow, configure, render, mount } from 'enzyme';

import MobileCompany from '../components/MobileCompany';

let companyName='Velcom';
let clientsArr=[ 
  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:-250}, 
  {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
  {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:220},
];



test('тестирование удаления клиента', () => {

  const component = renderer.create(
    <MobileCompany  name={companyName}
    clients={clientsArr} /> 
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  component.getInstance().deleteInfo(105);
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

});

test('тестирование добавления клиента', () => {

  const component = renderer.create(
    <MobileCompany  name={companyName}
    clients={clientsArr} /> 
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  let newClient={
    id:9999999,
    im:'Ир',
    fam:'Ким',
    otch:'Чен',
    balance:220,
  }
  
  component.getInstance().addClient(newClient);
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

});


test('тестирование сохранения измененных параметров клиента', () => {

  const component = renderer.create(
    <MobileCompany  name={companyName}
    clients={clientsArr} /> 
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  let newClient={
    id:9999999,
    im:'Ир',
    fam:'Ким',
    otch:'Чен',
    balance:220,
  }
  
  component.getInstance().saveClient(newClient);
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

});

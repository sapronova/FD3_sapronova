"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import { shallow, configure, render, mount } from 'enzyme';

import MobileCompany from '../components/MobileCompany';
import MobileClient from '../components/MobileClient';

let companyName='Velcom';
let clientsArr=[ 
  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:-250}, 
  {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
  {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:220},
];

/*test('работа кнопки Добавить клиента', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <MobileCompany  name={companyName}
    clients={clientsArr} /> 
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonElem = component.root.find( el => el.props.className=='AddNewClient' ); 
  buttonElem.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonElem.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  
});
*/
test('работа кнопки mts', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <MobileCompany  name={companyName}
    clients={clientsArr} /> 
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку
  const buttonElem = component.root.find( el => el.props.className=='mts' /*&& el.props.aaa == 'bbb'*/ ); 
  // и "нажмём" на неё
  buttonElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // "нажмём" кнопку ещё раз
  buttonElem.props.onClick();
  
  // и получаем окончательный снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  
  /*
  // можно эмулировать события, передавая в качестве объекта события то что нам нужно:
  wrapper.find('select').simulate('change', {
    target: { value: "hello" },
  });
  */

});


//тест кнопки "все"
test('Проверка кнопки сортировки списка абонентов: все', () => { 
  const wrapper = shallow(
    <MobileCompany  name={companyName}
    clients={clientsArr} />
      );

      wrapper.debug();

     expect(wrapper).toMatchSnapshot();
    wrapper.find('.All').simulate('click', {
      target: { value: "Все" },
    });

    wrapper.debug();

      expect(wrapper).toMatchSnapshot();
});


//тест кнопки "заблокированные"
test('Проверка кнопки сортировки списка абонентов: заблокированные', () => { 
  const wrapper = shallow(
    <MobileCompany  name={companyName}
    clients={clientsArr} />
      );

      wrapper.debug();

     expect(wrapper).toMatchSnapshot();
    wrapper.find('.ButtonBlocked').simulate('click', {
      target: { value: "Заблокированные" },
    });

    wrapper.debug();

      expect(wrapper).toMatchSnapshot();
});


//тест кнопки "активные"
test('Проверка кнопки сортировки списка абонентов: активные', () => { 
  const wrapper = shallow(
    <MobileCompany  name={companyName}
    clients={clientsArr} />
      );

      wrapper.debug();

     expect(wrapper).toMatchSnapshot();
    wrapper.find('.ButtonActive').simulate('click', {
      target: { value: "Активные" },
    });

    wrapper.debug();

      expect(wrapper).toMatchSnapshot();
});

//тест кнопки удаления абонента
test('Проверка кнопки сортировки списка абонентов: активные', () => { 
  const wrapper = shallow(
    <MobileCompany  name={companyName}
    clients={clientsArr} />
      );

      wrapper.debug();

     expect(wrapper).toMatchSnapshot();
    wrapper.find('.ButtonActive').simulate('click', {
      target: { value: "Активные" },
    });

    wrapper.debug();

      expect(wrapper).toMatchSnapshot();
});

test('работа кнопки Удалить', () => {

  const component = renderer.create(
    <MobileCompany  name={companyName}
    clients={clientsArr} /> 
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonElems = component.root.findAllByProps({className:"Delete"}); 
  buttonElems[0].props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonElems[0].props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  
});


test('работа кнопки Редактировать', () => {

  const component = renderer.create(
    <MobileCompany  name={companyName}
    clients={clientsArr} /> 
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonElems = component.root.findAllByProps({className:"Edit"}); 
  buttonElems[0].props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonElems[0].props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  
});


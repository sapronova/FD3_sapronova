"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ShopComp from './components/ShopComp';

let nameofShop='BabiesBikes';
let positionsArr=require('./ProdList.json');

ReactDOM.render(
  <ShopComp 
    shop={nameofShop}
    positions={positionsArr} 
  />
  , document.getElementById('cont') 
);

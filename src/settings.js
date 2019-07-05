/* eslint-disable no-unused-vars */

import red from '@material-ui/core/colors/red';
import maroon from '@material-ui/core/colors/maroon';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import brown from '@material-ui/core/colors/brown';
import gray from '@material-ui/core/colors/grey';
import blueGray from '@material-ui/core/colors/blueGrey';

/* eslint-enable no-unused-vars */

const settings = {
  title: 'ASU Football Equipment Portal',

  theme: {
    primaryColor: {
      name: 'maroon',
      import: maroon
    },
    secondaryColor: {
      name: 'yellow',
      import: yellow
    },
    type: 'light'
  },

  credentials: {
    firebase: {
      apiKey: "AIzaSyBbQA2PHXBHWeHzr0XB3fwCBhJLW6PZLMM",
      authDomain: "asufootballequipment.firebaseapp.com",
      databaseURL: "https://asufootballequipment.firebaseio.com",
      projectId: "asufootballequipment",
      storageBucket: "asufootballequipment.appspot.com",
      messagingSenderId: "954980589261",
      appId: "1:954980589261:web:be2a77b3542df568"
    }
  }
};

export default settings;
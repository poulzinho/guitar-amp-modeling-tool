/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Sndfx from '../api/sndfx/sndfx.model'

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      role: 'creator',
      name: 'Test Creator',
      nickname: 'theCreator2016',
      email: 'creator@ultimate.com',
      password: 'creator'
    }, {
      provider: 'local',
      role: 'player',
      name: 'Test player',
      nickname: 'theGuitarPlayer',
      email: 'player@ultimate.com',
      password: 'player'
    }, {
      provider: 'local',
      role: 'admin',
      nickname: 'theAdmin',
      name: 'Admin',
      email: 'admin@ultimate.com',
      password: 'thestrongestpasswordever'
    })
      .then(() => {
        console.log('finished populating users');

        User.findOne({role: 'creator'}, function (err, creator) {
          Sndfx.find({}).remove(function () {
            Sndfx.create({
                creator: creator,
                owner: creator,
                license: 'full',
                name: 'Amazing Delay I',
                class: 'amplifier',
                imgURL: 'imgURL',
                rating: 4,
                description: 'This is a description of the Amazing Delay I...',
                filters: [
                  {
                    filter: 'delay',
                    value: 20,
                    name: 'DELAY',
                    widget: 'knob',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 2,
                    timestamp: '1'
                  },
                  {
                    filter: 'gain',
                    value: 50,
                    name: 'VOLUME',
                    widget: 'knob',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 3,
                    timestamp: '2'
                  }
                ],
                publications: [
                  {
                    license: 'basic',
                    price: 10.00,
                  },
                  {
                    license: 'full',
                    price: 50.00,
                  }
                ]
              },
              {
                creator: creator,
                owner: creator,
                license: 'full',
                name: 'Wonderful Distortion I',
                class: 'amplifier',
                imgURL: 'imgURL',
                rating: 3,
                description: 'This is a description of the Wonderful Distortion I...',
                filters: [
                  {
                    filter: 'distortion',
                    value: 15,
                    name: 'DISTORTION',
                    widget: 'knob',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 1,
                    timestamp: '3'
                  },
                  {
                    filter: 'distortion',
                    value: 20,
                    name: 'WAVE',
                    widget: 'knob',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 3,
                    timestamp: '3'
                  },
                  {
                    filter: 'gain',
                    value: 20,
                    name: 'GAIN',
                    widget: 'knob',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 4,
                    timestamp: '4'
                  }
                ],
                publications: [
                  {
                    license: 'basic',
                    price: 12.00,
                  }
                ]
              },
              {
                creator: creator,
                owner: creator,
                license: 'full',
                name: 'Fantastic Chorus',
                class: 'amplifier',
                imgURL: 'imgURL',
                rating: 5,
                description: 'This is a description of the Fantastic Chorus...',
                filters: [
                  {
                    filter: 'reverb',
                    value: 50,
                    name: 'HALL',
                    widget: 'knob',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 1,
                    timestamp: '3'
                  },
                  {
                    filter: 'distortion',
                    value: 51,
                    name: 'DISTORTION',
                    widget: 'knob',
                    sizeX: 1,
                    sizeY: 1,
                    row: 0,
                    col: 3,
                    timestamp: '3'
                  }
                ],
                publications: [
                  {
                    license: 'basic',
                    price: 50.00,
                  }
                ]
              }
            );
          });
        });


        console.log('finished populating Sndfx');
      });
  });

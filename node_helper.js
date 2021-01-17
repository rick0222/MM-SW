/* Magic Mirror

 * Module: MM-SW

 *

 * By Rick93

 *

 */

const NodeHelper = require('node_helper');

const request = require('request');







module.exports = NodeHelper.create({



    start: function() {

        console.log("Starting node_helper for: " + this.name);

    },



    getSW: function(url) {

        request({

            url: url,

            method: 'GET'

        }, (error, response, body) => {

            if (!error && response.statusCode == 200) {

                var result = JSON.parse(body).items; // items is from JSON data

				console.log(response.statusCode + result); // uncomment to see in terminal

                    this.sendSocketNotification('SW_RESULT', result);

		

            }

        });

    },

    

    



    socketNotificationReceived: function(notification, payload) {

        if (notification === 'GET_SW') {

            this.getSW(payload);

        }

    }

});


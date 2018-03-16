'use strict';

module.exports = function(Vendor) {
    const chalk = require('chalk');
    Vendor.add = (staffNumber, name, cb) => {
        console.log(chalk.blue(staffNumber));
        console.log(chalk.red(name));
        const newVendor = {
            "staff_number": staffNumber,
            "name": name
        }
        Vendor.create(newVendor, (err, instance) => {
           cb(err, instance); 
        });
        
        cb(null, {})
    }
    
    Vendor.remoteMethod('add', {
        http: {
            path: '/add',
            verb: 'post'
        },
        accepts: [ 
            {
                arg: 'staffNumber',
                type: 'number',
                required: true
            },
            {
                arg: 'name',
                type: 'string',
                required: true
            }
        ],
        returns: {
            arg: 'vendor',
            type: 'object'
        }
    })

    Vendor.removeVendor = (id, cb) => {
        //Modelo
        /*
        Vendor.destroyById = (id, err) => {
            if(err) {
                cb(err, false);
            } else {
                cb(null, true);
            }
        }*/
        //Instance
        Vendor.findById(id, (err, instance) => {
            instance.destroy( () => {
                cb(err, true);
            })
        })
    }
    
     Vendor.remoteMethod('removeVendor', {
        http: {
            path: '/removeVendor',
            verb: 'post'
        },
        accepts: [ 
            {
                arg: 'id',
                type: 'number',
                required: true
            }
        ],
        returns: {
            arg: 'vendor',
            type: 'object'
        }
    })

};

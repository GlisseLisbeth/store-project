'use strict';

module.exports = function(Customer) {
    const chalk = require('chalk');
    Customer.add = (phone, name, address, cb) => {
        console.log(chalk.blue(address));
        console.log(chalk.red(name));
        console.log(chalk.yellow(address))
        const newCustomer = {
            "phone": phone,
            "name": name,
            "address": address
        }
        Customer.create(newCustomer, (err, instance) => {
           cb(err, instance); 
        });
        
        cb(null, {})
    }
    
    Customer.remoteMethod('add', {
        http: {
            path: '/add',
            verb: 'post'
        },
        accepts: [ 
            {
                arg: 'phone',
                type: 'string',
                required: true
            },
            {
                arg: 'name',
                type: 'string',
                required: true
            },
            {
                arg: 'address',
                type: 'string',
                required: true
            }
        ],
        returns: {
            arg: 'customer',
            type: 'object'
        }
    })
};

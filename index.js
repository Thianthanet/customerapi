const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/mongodb.config');
const cors = require('cors');
const app = express();
const Customer = require('./models/customer');


app.use(express.json());
app.use(express.urlencoded({ extended : true }));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(() => {
        Customer.deleteMany({});
        initCustomer();
    }).catch(err => {
        console.log('Unable to connect to database.', err);
        process.exit();
    });

app.use(cors());
require('./routes/customer.route')(app);

const server = app.listen(4000, () => {
    let port = server.address().port
    console.log('Run at http://localhost%s', port)
})

function initCustomer() {
    let data = [{
        customerID: 1001,
        name: 'Thianthanet',
        address: 'Nongbualamphu'
    },
    {
        customerID: 1002,
        name: 'Puttida',
        address: 'Nongbualamphu'
    },
    {
        customerID: 1003,
        name: 'EXRAZER',
        address: 'Nongbualamphu'
    }
]

    for (let i=0; i<data.length; i++){
        const c = new Customer(data[i]);
        c.save();
    }
    console.log('Create database customer');
}
const customer = require('../models/customer');

exports.index = (req, res) => {
    res.send('<h1>Customer App</h1><hr><a href="/api/customer">รายชื่อลูกค้า</a>')
}

exports.findAll = (req, res) => {
    customer.find()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            })
        })
}

exports.create = (req, res) => {
    const c = new customer(req.body);

    c.save()
        .then(data => {
            res.json(data)
        }).catch(err => {
            return res.status(500).json({
                msg: 'Unable to add customer information because: '+ err.message
            });
        });
};

exports.findById = (req, res) => {
    customer.findById(req.params.customerID)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    msg: 'Customer code information not found: '+ req.params.customerID
                });
            }
            res.json(data);
        }).catch(err => {
            return res.status(500).json({
                msg: 'An error occurred because: '+ err.message
            });
        });
};

exports.update = (req, res) => {
    customer.findByIdAndUpdate(req.params.customerID, { $set: req.body }, { new: true })
        .then(data => {
           if (!data) {
            return res.status(404).json({
                msg: 'Customer code information not found: '+ req.params.customerID
            });
           };
        }).catch(err => {
            return res.status(500).json({
                msg: 'Unable to update customer information due to '+ err.message
            });
        });
};

exports.delete = (req, res) => {
    customer.findByIdAndRemove(req.params.customerID)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    msg: 'Customer code information not found: '+ req.params.customerID
                });
            };
        }).catch(err => {
            return res.status(500).json({
                msg: 'Unable to delete customer data because: '+ err.message
            })
        })
}
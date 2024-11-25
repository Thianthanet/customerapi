module.exports = (app) => {
    const customer = require('../controllers/customer.controller');

    app.get('/', customer.index);
    app.get('/api/customer', customer.findAll);
    app.get('api/customer', customer.create);
    app.get('api/customer', customer.delete);
    app.get('api/customer', customer.findById);
    app.get('api/customer', customer.update);
}
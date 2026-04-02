// Create 'server/models/CustomerDAO.js' file
require('../utils/MongooseUtil');
const Models = require('./Models');

const CustomerDAO = {

  async selectByUsernameOrEmail(username, email) {
    const query = { $or: [{ username: username }, { email: email }] };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  async insert(customer) {
    const mongoose = require('mongoose');
    customer._id = new mongoose.Types.ObjectId();
    const result = await Models.Customer.create(customer);
    return result;
  },

  // ACTIVE ACCOUNT
  async active(_id, token, active) {
    const mongoose = require('mongoose');

    const query = {
      _id: new mongoose.Types.ObjectId(_id),
      token: token
    };

    const newvalues = { active: active };

    const result = await Models.Customer.findOneAndUpdate(
      query,
      newvalues,
      { new: true }
    );

    return result;
  },

  // LOGIN
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  // UPDATE CUSTOMER
  async update(customer) {
    const newvalues = {
      username: customer.username,
      password: customer.password,
      name: customer.name,
      phone: customer.phone,
      email: customer.email
    };

    const result = await Models.Customer.findByIdAndUpdate(
      customer._id,
      newvalues,
      { new: true }
    );

    return result;
  },

  // ===== THÊM ĐOẠN NÀY =====
  async selectAll() {
    const query = {};
    const customers = await Models.Customer.find(query).exec();
    return customers;
  },

  // ===== THÊM ĐOẠN NÀY (OPTIONAL - ACTIVE LẠI) =====
  async reactive(_id, token) {
    const mongoose = require('mongoose');

    const query = {
      _id: new mongoose.Types.ObjectId(_id),
      token: token
    };

    const newvalues = { active: 1 };

    const result = await Models.Customer.findOneAndUpdate(
      query,
      newvalues,
      { new: true }
    );

    return result;
  }

};

module.exports = CustomerDAO;
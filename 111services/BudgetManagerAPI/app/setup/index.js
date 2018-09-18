const mongoose = require('mongoose'),
      UserModel = require('../models/user'),
      //BudgetModel = require('../models/budget'),
      TaskModel = require('../models/task');

const models = {
  User: mongoose.model('User'),
  //Budget: mongoose.model('Budget'),
  Task: mongoose.model('Task')
}

module.exports = models;

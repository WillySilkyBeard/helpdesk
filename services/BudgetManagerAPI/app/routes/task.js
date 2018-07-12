const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = app.BudgetManagerAPI.app.api.task;

  app.route('/api/v1/task')
     .post(passport.authenticate('jwt', config.session), api.store(models.User, models.Task, app.get('budgetsecret')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User, models.Task, app.get('budgetsecret')))
     .delete(passport.authenticate('jwt', config.session), api.remove(models.User, models.Task, app.get('budgetsecret')))

  app.route('/api/v1/task/single')
    .get(passport.authenticate('jwt', config.session), api.index(models.User, models.Task, app.get('budgetsecret')))
    .put(passport.authenticate('jwt', config.session), api.edit(models.User, models.Task, app.get('budgetsecret')))
}

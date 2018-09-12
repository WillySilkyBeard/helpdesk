const mongoose = require('mongoose');

const api = {};
// сохранение данных в базу
api.store = (User, Task, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        const task = new Task({
          user_id: req.query.user_id,
          title: req.body.title,
          description: req.body.description
        });

        task.save(error => {
          if (error) return res.status(400).json(error);
          res.status(200).json({ success: true, message: "Добавлено успешно!" });
        })
      } else {
        res.status(400).json({ success: false, message: "Добавление не удалось!" })
      }
    })

  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}
//запрос в базу за задачами
api.getAll = (User, Task, Token) => (req, res) => {
  if (Token) {
    // console.log(req.user.id)
    // было req.query.user_id
    // console.log(req.query.user_id)
    console.log(req.query)
    
    if(req.user.id) { // если пользователь найден ищем его задачи
      Task.find({ user_id: req.user.id }, (error, task) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(task);
        return true;
      })
    } else {
      Task.find({}, (error, task) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(task);
        return true;
      })
    }
    
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.index = (User, Task, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Task.findOne({ _id: req.query._id }, (error, task) => {
          if (error) res.status(400).json(error);
          res.status(200).json(task);
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid client" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized' });
}

api.edit = (User, Task, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Task.findOneAndUpdate({ _id: req.body.id }, req.body, (error, task) => {
          if (error) res.status(400).json(error);
          res.status(200).json({task,  message: "Изменения сохранены!"});
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid client" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized' });
}

api.remove = (User, Task, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.query.user_id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        Task.remove({ _id: req.query._id }, (error, removed) => {
          if (error) res.status(400).json(error);
          res.status(200).json({ success: true, message: 'Успешно удалено' });
        })
      } else {
        res.status(400).json({ success: false, message: "Invalid client" })
      }
    })

  } else return res.status(401).send({ success: false, message: 'Unauthorized' });
}

module.exports = api;

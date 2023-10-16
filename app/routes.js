const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('./handler/Item');
const { register, login } = require('./handler/auth');

function setupRoutes(app) {
  app.post('/register', register);
  app.post('/login', login);

  app.get('/items', getAllItems);
  app.post('/items', createItem);
  app.get('/items/:id', getItemById);
  app.put('/items/:id', updateItem);
  app.delete('/items/:id', deleteItem);
}

module.exports = {
  setupRoutes
};

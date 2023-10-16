const express = require('express');
const bodyParser = require('body-parser');
const { setupRoutes } = require('./routes');
const { authenticateToken } = require('./middleware');

const app = express();
app.use(bodyParser.json());


// Apply middleware for /items route
app.use('/items', authenticateToken);

// Setup routes
setupRoutes(app);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

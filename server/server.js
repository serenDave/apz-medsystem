require('dotenv').config({ path: './.env' });

const express = require('./config/express.js');

// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init();
app.listen(port, () => console.log(`Server is now running on port ${port}!`));

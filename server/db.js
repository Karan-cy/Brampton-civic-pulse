const { Pool } = require('pg');
require('dotenv').config();

// Initialize the connection using the secure URL from your .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Verify the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Successfully connected to PostgreSQL database');
    release();
  }
});

// Export the query function for other files to use
module.exports = {
  query: (text, params) => pool.query(text, params),
};
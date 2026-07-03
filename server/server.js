const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Joi = require('joi');
require('dotenv').config();
const db = require('./db'); // The database connection pool

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Define the security bouncer rules
const assetSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  type: Joi.string().valid(
    "Water Main", 
    "Traffic Controller", 
    "Power Grid Node", 
    "Stormwater Drain", 
    "Fiber Optic Hub", 
    "EV Charging Station"
  ).required(),
  status: Joi.string().valid(
    "Operational", 
    "Maintenance", 
    "Critical"
  ).required()
});

// AppSec Middleware Pipeline
app.use(helmet()); 
app.use(cors()); 
app.use(express.json({ limit: '10kb' })); 

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'secure', message: 'Brampton IMS API is running' });
});

// GET /api/assets: Retrieve all infrastructure assets securely
app.get('/api/assets', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM infrastructure_assets ORDER BY ai_risk_score DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// The Secure POST Route
app.post('/api/assets', async (req, res) => {
  try {
    // 1. The Bouncer: Validate the incoming data against our schema
    const { error } = assetSchema.validate(req.body);
    
    // 2. If it fails, reject it immediately with your 400 status code
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // 3. If it passes, extract the safe data
    const { latitude, longitude, type, status } = req.body;

    // 4. Save it to the database! 
    // (Notice we don't insert asset_id or ai_risk_score here because the database generates them)
    const newAsset = await db.query(
      `INSERT INTO infrastructure_assets (latitude, longitude, type, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [latitude, longitude, type, status]
    );

    // 5. Send a 201 (Created) success code back to the React app
    res.status(201).json(newAsset.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Server Initialization
app.listen(PORT, () => {
  console.log(`Server locked and listening on port ${PORT}`);
});
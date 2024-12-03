const express = require('express');
const cron = require('node-cron');
const mainRoutes = require('./routes.js');
const { updateOrderStatuses } = require('./utils/timeUtils');

const app = express();
app.use(express.json());

// Use the single route that handles both menu and orders
app.use('/', mainRoutes);

// Cron Job to Update Order Status
cron.schedule('* * * * *', updateOrderStatuses);

// Start Server
app.listen(8000, () => {
    console.log("App is listening on port https://localhost:8000");
});

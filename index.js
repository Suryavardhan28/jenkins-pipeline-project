const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our application!',
        environment: environment,
        version: '1.1.0'
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        environment: environment,
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${environment} mode`);
}); 
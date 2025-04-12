const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || "development";

// Move original JSON response to /api endpoint
app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to our Jenkins CI/CD Pipeline Demo!",
        environment: environment,
        version: "1.2.0",
        timestamp: new Date().toISOString(),
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        environment: environment,
        timestamp: new Date().toISOString(),
    });
});

app.get("/pipeline-test", (req, res) => {
    res.json({
        message: "This endpoint was added to test the Jenkins pipeline",
        success: true,
        environment: environment,
        timestamp: new Date().toISOString(),
    });
});

// Make HTML response the landing page (root route)
app.get("/", (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jenkins Pipeline Demo</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background-color: white;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #2c3e50;
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
            }
            .info {
                background-color: #ebf5fb;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                border-left: 5px solid #3498db;
            }
            .success {
                color: #27ae60;
                font-weight: bold;
            }
            .environment {
                display: inline-block;
                padding: 5px 10px;
                background-color: #3498db;
                color: white;
                border-radius: 4px;
                font-size: 0.9em;
            }
            .timestamp {
                color: #7f8c8d;
                font-size: 0.9em;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Jenkins Pipeline Demo</h1>
            
            <div class="info">
                <p>This application is running in <span class="environment">${environment}</span> environment.</p>
                <p>Version: <strong>1.2.0</strong></p>
                <p>Status: <span class="success">Running Successfully</span></p>
            </div>
            
            <h2>CI/CD Pipeline Information</h2>
            <p>This application is deployed through a Jenkins pipeline with the following stages:</p>
            <ul>
                <li>Configure Git</li>
                <li>Debug Branch Info</li>
                <li>Checkout</li>
                <li>Setup Node.js</li>
                <li>Build</li>
                <li>Test</li>
                <li>Security Scan</li>
                <li>Deployment (Staging/Production)</li>
            </ul>
            
            <p class="timestamp">Last updated: ${new Date().toLocaleString()}</p>
        </div>
    </body>
    </html>
    `;

    res.send(html);
});

// Only start the server if this file is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port} in ${environment} mode`);
    });
}

// Export the app for testing
module.exports = app;

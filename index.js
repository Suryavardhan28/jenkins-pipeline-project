const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || "development";

app.get("/", (req, res) => {
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

// Only start the server if this file is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port} in ${environment} mode`);
    });
}

// Export the app for testing
module.exports = app;

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3002;
const APP_VERSION = process.env.APP_VERSION || "1.0.0";
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

app.get("/", (req, res) => {
    res.json({
        application: "Kubernetes CI/CD Application",
        version: APP_VERSION,
        environment: ENVIRONMENT,
        message: "Application is running successfully"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        application: "kubernetes-cicd-app"
    });
});

app.get("/version", (req, res) => {
    res.json({
        version: APP_VERSION
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`);
    });
}

module.exports = app;

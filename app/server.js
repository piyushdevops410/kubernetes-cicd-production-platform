const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const ENVIRONMENT = process.env.ENVIRONMENT || 'production';

app.use(express.static('public'));

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        application: 'kubernetes-cicd-app'
    });
});

app.get('/version', (req, res) => {
    res.json({
        version: APP_VERSION
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kubernetes CI/CD Application running on port ${PORT}`);
});

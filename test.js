const assert = require('assert');
const app = require('./index.js');

describe('Application Tests', () => {
    it('should return welcome message', () => {
        const response = app.get('/');
        assert.strictEqual(response.message, 'Welcome to our application!');
    });

    it('should return healthy status', () => {
        const response = app.get('/health');
        assert.strictEqual(response.status, 'healthy');
    });
}); 
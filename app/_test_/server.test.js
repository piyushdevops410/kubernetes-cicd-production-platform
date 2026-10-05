const request = require("supertest");

const app = require("../server");

describe("Kubernetes CI/CD Application", () => {
    test("GET /health should return UP", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
        expect(response.body.application).toBe("kubernetes-cicd-app");
    });

    test("GET /version should return application version", async () => {
        const response = await request(app).get("/version");

        expect(response.statusCode).toBe(200);
        expect(response.body.version).toBe("1.0.0");
    });
});

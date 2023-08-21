const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Update the path to your app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe("App", () => {
    it("should return 'Hello World, this is second run!!' on / GET request", (done) => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Hello, World!");
                done();
            }); 
    });

    it("should return 'Health is fine to !' on /health GET request", (done) => {
        chai.request(app)
            .get("/health")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("App is running!");
                done();
            });
    });

    it("should return the name from query parameter on /printname GET request", (done) => {
        const testName = "John";
        chai.request(app)
            .get("/userName")
            .query({ name: testName })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal(testName);
                done();
            });
    });
});

const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");
import Meter from '../models/meter';
const { expect } = chai;

const db = require("../app/models");
const Meter = db.tutorials;
const app = require("../app");
const { mongoose } = require("../app/models");

chai.use(http);

describe("Meters endpoint", () => {
    let updatedMeters = {
        _id: "4665ytuugi86886000",
        token:'27837253'
    };

    let data = [
        {
            _id: "4882200e85yytii999",
            token:'37837223'
        },
        {
            _id: "4882200e85ytteeetii999",
            token:'17837253'
        },
    ];

    let emptyArr = [];

    test("GET api/meters --> should return 200 on sucess", async () => {
        jest.spyOn(Meter, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/meter");
        expect(res.status).to.equal(200);
        await mongoose.disconnect();
    });

   

    test("GET /api/meters --> should return 404 if there is no empty data", async () => {
        jest.spyOn(Meter, "find").mockReturnValue(Promise.resolve(emptyArr));
        const res = await chai.request(app).get("/api/tutorials");
        expect(res.status).to.equal(404);
    });

    it("GET /api/meters/:id --> should return tutorial by id successfully", async () => {
        let meter = {
            _id: "4665ytuugi86886000",
            token:'27837253'
        };
        jest.spyOn(Meter, "findById").mockReturnValue(
            Promise.resolve(meter)
        );
        const response = await request(app).get("/api/tutorials/dSDSAFDSDSDAS");
        expect(response.statusCode).to.equal(200);
        expect(response.body.title).to.equal("Test native");
    });

    test("PUT /api/tutorials/:id -->should return 201 if the turtorial is updated", async () => {
        jest.spyOn(Tutorial, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(updatedTurtorial)
        );
        const res = await chai
            .request(app)
            .put("/api/tutorials/:4665ytuugi86886000");
        expect(res.body.message).to.equal("Tutorial was updated successfully.");
    });

    test("PUT /api/merters/:id --> should return 404 if no data was given", async () => {
        jest.spyOn(Meter, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(null)
        );
        const res = await chai
            .request(app)
            .put("/api/meters/:4665ytuugi86886000");
        expect(res.body.message).to.equal("Not Found");
    });

    it("POST /api/tutorials --> should create tutorial successfully", async () => {
        jest.spyOn(Meter, "create").mockReturnValue(Promise.resolve(true));

        const res = await request(app).post("/api/meters/").send({
            title: "Test tutorial",
            
        });

        expect(res.statusCode).to.equal(201);
    });

    it("POST /api/tutorials --> should not create tutorial if title is missing", async () => {
        const res = await request(app).post("/api/tutorials/").send({
            title: "",
            description: "Test tutorial description",
            published: true,
        });
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal("Title can not be empty!");
    });

    it("DELETE /api/tutorials/:id -->should delete one tutorial successfully", async () => {
        jest.spyOn(Meter, "findByIdAndRemove").mockReturnValue(
            Promise.resolve(true)
        );

        const res = await request(app).post("/api/tutorials/").send({
            title: "Test tutorial",
            description: "Test tutorial description",
            published: true,
        });

        const id = res.body.id;
        const response = await request(app).delete("/api/tutorials/" + id);
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "Tutorial was deleted successfully!"
        );
    });

  
});
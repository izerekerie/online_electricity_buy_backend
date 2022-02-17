const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");
import Meter from '../models/meter';
const { expect } = chai;

const db = require("../app/models");
const Meter = db.Meter;
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
        const res = await chai.request(app).get("/api/meters");
        expect(res.status).to.equal(404);
    });

    it("GET /api/meters/:id --> should return meter by id successfully", async () => {
        let meter = {
            _id: "4665ytuugi86886000",
            token:'27837253'
        };
        jest.spyOn(Meter, "findById").mockReturnValue(
            Promise.resolve(meter)
        );
        const response = await request(app).get("/api/meters/dSDSAFDSDSDAS");
        expect(response.statusCode).to.equal(200);
        expect(response.body.title).to.equal("Test native");
    });

    test("PUT /api/meters/:id -->should return 201 if the meter is updated", async () => {
        jest.spyOn(Meter, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(updatedMeters)
        );
        const res = await chai
            .request(app)
            .put("/api/meter/:4665ytuugi86886000");
        expect(res.body.message).to.equal("meter was updated successfully.");
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

    it("POST /api/meters --> should create meter successfully", async () => {
        jest.spyOn(Meter, "create").mockReturnValue(Promise.resolve(true));

        const res = await request(app).post("/api/meters/").send({

            token:'27837253',
        });

        expect(res.statusCode).to.equal(201);
    });



    it("DELETE /api/meters/:id -->should delete one meter successfully", async () => {
        jest.spyOn(Meter, "findByIdAndRemove").mockReturnValue(
            Promise.resolve(true)
        );

        const res = await request(app).post("/api/meters/").send({
            token:'27837253'
        });

        const id = res.body.id;
        const response = await request(app).delete("/api/meters/" + id);
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "Meter was deleted successfully!"
        );
    });

  
});
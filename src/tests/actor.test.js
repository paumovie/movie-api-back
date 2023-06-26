const request = require("supertest");
const app = require("../app");
require("../models");

const URL_BASE = "/api/v1/actors";
let actorId;
test("POST -> 'URL', should return status code 201  ", async () => {
    const actor = {
        firstName: "Octavia",
        lastName: "Spencer",
        nationality: "Estadounidense",
        image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ryBygOcMF8uZUZKyhojv1wKSy2mCEYrZ83-4Ct7joXlGMKYYHacdrhB4r9VnEvsH_ig&usqp=CAU",
        birthday: "1970/05/25"
    };
    const res = await request(app).post(URL_BASE).send(actor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(actor.firstName);
    });

test("GET -> 'URL' should return status code 200 and res.body.length === 1 ", async () => {
    const res = await request(app).get(URL_BASE);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    });

test("PUT -> ''url/:id', should retrun 200 and res.body.name === actor.name", async () => {
    const actor = {
        firstName: "Octavia"
    };
    const res = await request(app).put(`${URL_BASE}/${actorId}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
    });

test("DELETE -> 'url/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${URL_BASE}/${actorId}`);
    expect(res.status).toBe(204);
    });

const request = require("supertest");
const app = require("../app");
require("../models");

const URL_BASE = "/api/v1/directors"
let directorId;
test("POST -> 'URL, should return status code 201",async ()=>{
    const director = {
        firstName: "Stuart",
        lastName: "Hazeldine",
        nationality: "Británico",
        image: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5AX_JCdOvn9BBygfX0nsq_msFibNsmhN9yCfuji6Iuw-d3VSWM6F7cXVFhK-huQey",
        birthday: "1971/06/10"
    };
    const res = await request(app).post(URL_BASE).send(director);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(director.firstName);
});

test("GET -> 'URL' should return status code 200 and res.body.length === 1 ", async () => {
    const res = await request(app).get(URL_BASE);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT -> ''url/:id', should retrun 200 and res.body.name === director.name", async () => {
    const director = {
        firstName: "Stuart"
    };
    const res = await request(app).put(`${URL_BASE}/${directorId}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test("DELETE -> 'url/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${URL_BASE}/${directorId}`);
    expect(res.status).toBe(204);
});
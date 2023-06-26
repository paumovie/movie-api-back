const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require("../models");

const URL_BASE = "/api/v1/movies";
let movieId;
test("POST -> 'URL', should return status code 201  ", async () => {
    const movie = {
        name: "La cabaña",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRClBQRYnqtrRsXGAA6rhblnWqWtC5A0TELxQdAJJ7JE-SxF3b-",
        synopsis: "Después de sufrir una tragedia familiar, Mack Phillips cae en una profunda depresión que le lleva a cuestionar todas sus creencias. Sumido en una crisis de fe, recibe una enigmática carta donde un misterioso personaje le cita en una cabaña abandonada en lo más profundo de los bosques de Oregón. A pesar de sus dudas, Mack viaja a la cabaña, donde se encontrará con alguien inesperado.",
        releaseYear: 2017
    }
    const res = await request(app).post(URL_BASE).send(movie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
});

test("GET -> 'URL' should return status code 200 and res.body.length === 1 ", async () => {
    const res = await request(app).get(URL_BASE);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT -> ''url/:id', should retrun 200 and res.body.name === genre.name", async () => {
    const movie = {
        name: "La cabaña"
    }
    const res = await request(app).put(`${URL_BASE}/${movieId}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});
//POST /movies/:id/actors
test("POST 'URL/:id/actors', should return status code 200 and res.body.length === 1", async()=>{ 
    const actorBody = {
        firstName: "Octavia",
        lastName: "Spencer",
        nationality: "Estadounidense",
        image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ryBygOcMF8uZUZKyhojv1wKSy2mCEYrZ83-4Ct7joXlGMKYYHacdrhB4r9VnEvsH_ig&usqp=CAU",
        birthday: "1970/05/25"
    };
    const actor = await Actor.create(actorBody)
    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([actor.id])
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    
    await actor.destroy()
})
//POST /movies/:id/directors
test("POST 'URL/:id/directors', should return status code 200 and res.body.length === 1", async()=>{ 
    const directorBody = {
        firstName: "Stuart",
        lastName: "Hazeldine",
        nationality: "Británico",
        image: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5AX_JCdOvn9BBygfX0nsq_msFibNsmhN9yCfuji6Iuw-d3VSWM6F7cXVFhK-huQey",
        birthday: "1971/06/10"
    };
    const director = await Director.create(directorBody)
    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([director.id])
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    
    await director.destroy()
})
//POST /movies/:id/genres
test("POST 'URL/:id/genres', should return status code 200 and res.body.length === 1", async()=>{ 
    const genreBody = {
        name:"drama"
    }
    const genre = await Genre.create(genreBody)
    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([genre.id])
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await genre.destroy()
})

test("DELETE -> 'url/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${URL_BASE}/${movieId}`);
    expect(res.status).toBe(204);
});
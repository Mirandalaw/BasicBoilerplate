import express from "express";

const PORT = 3030;

const app = express();

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Express Server is Listening at ${PORT}`)
})
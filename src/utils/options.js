import dotenv from 'dotenv'
dotenv.config()

export const options = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASS: process.env.PASS,
    BOTNAME: process.env.BOTNAME,
    SSL: process.env.SSL,
    ROOMS: process.env.ROOMS.split(','),
};
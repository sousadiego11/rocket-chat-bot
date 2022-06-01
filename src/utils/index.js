import dotenv from 'dotenv'
dotenv.config()

const options = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASS: process.env.PASS,
    BOTNAME: process.env.BOTNAME,
    SSL: process.env.SSL,
    ROOMS: process.env.ROOMS.split(','),
};

const messages = [{
    interval: '*/10 * * * * *',
    message: '@all Boa tarde!!!!! Não esqueçam de iniciar o cronômetro de horas das tarefas para nos ajudar com a estimativa!! :asyncparrot:',
    room: 'TesteAnuncios'
}]

export {
    messages,
    options
}
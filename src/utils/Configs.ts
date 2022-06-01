import dotenv from 'dotenv';
import { Message, Options } from './interfaces';
dotenv.config();

const options: Options = {
	HOST: process.env.HOST ?? '',
	USER: process.env.USER ?? '',
	PASS: process.env.PASS ?? '',
	BOTNAME: process.env.BOTNAME ?? '',
	SSL: Boolean(process.env.SSL) ?? false,
	ROOMS: process.env.ROOMS?.split(',') ?? []
};

const messages: Message[] = [{
	interval: '*/10 * * * * *',
	message: '@all Boa tarde!!!!! Não esqueçam de iniciar o cronômetro de horas das tarefas para nos ajudar com a estimativa!! :asyncparrot:',
	room: 'TesteAnuncios'
}];

export {
	messages,
	options
};

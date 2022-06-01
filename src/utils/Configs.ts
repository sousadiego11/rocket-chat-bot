import dotenv from 'dotenv';
import { Message, Options } from './interfaces';
import { readFileSync } from 'fs';
import path from 'path';

dotenv.config();

const options: Options = {
	HOST: process.env.HOST ?? '',
	USER: process.env.USER ?? '',
	PASS: process.env.PASS ?? '',
	BOTNAME: process.env.BOTNAME ?? '',
	SSL: Boolean(process.env.SSL) ?? false,
	ROOMS: process.env.ROOMS?.split(',') ?? []
};

const rootSrc = path.join(__dirname, '../../');
console.log('🚀 ~ file: Configs.ts ~ line 18 ~ rootSrc', rootSrc);
const jsonMessages = readFileSync(`${rootSrc}/shared/messages.json`).toString();
console.log('🚀 ~ file: Configs.ts ~ line 20 ~ jsonMessages', jsonMessages);
const messages: Message[] = JSON.parse(jsonMessages);

export {
	messages,
	options
};

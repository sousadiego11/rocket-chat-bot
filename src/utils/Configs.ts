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
const jsonMessages = readFileSync(`${rootSrc}/messages.json`).toString();
const messages: Message[] = JSON.parse(jsonMessages);

export {
	messages,
	options
};

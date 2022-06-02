import dotenv from 'dotenv';
import { Message, Options, Response } from './interfaces';
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
const jsonMessages = readFileSync(`${rootSrc}/shared/messages.json`).toString();
const jsonResponses = readFileSync(`${rootSrc}/shared/responses.json`).toString();
const messages: Message[] = JSON.parse(jsonMessages);
const responses: Response[] = JSON.parse(jsonResponses);

console.log('🚀 ~ file: Configs.ts ~ line 21 ~ messages', messages);
console.log('🚀 ~ file: Configs.ts ~ line 23 ~ responses', responses);

export {
	messages,
	options,
	responses
};

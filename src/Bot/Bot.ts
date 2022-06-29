/* eslint-disable @typescript-eslint/no-explicit-any */
import { driver } from '@rocket.chat/sdk';
import { Options } from '../utils/interfaces';
import { Scheduler } from '../Scheduler';
import { replaceSpecialCharsLowercase, matchReplaceUser, responses, getUserCommand } from '../utils';
export class Bot {
	schedules = [];

	conn!: any;
	botId!: any;
	roomsJoined!: any;
	subscribed!: any;

	HOST!: string;
	SSL!: boolean;
	USER!: string;
	PASS!: string;
	ROOMS!: string[];

	constructor(
		connectionOptions: Options,
    private readonly scheduler: Scheduler
	) {
		Object.assign(this, connectionOptions);
	}

	async handleCommands(message: any) {
		const schedules = this.scheduler.getSchedules;
		const { command, isCommand, scheduleKey } = getUserCommand(message.msg);
		const schedule = schedules.find((s) => s.key === scheduleKey.trim());

		if (!isCommand) return false;

		if (!command && isCommand || !schedule) {
			await driver.sendToRoom('Desculpe, não entendi! :parrotnotfound:', message.rid);
			return true;
		}
		if (schedule && command === '!pausar') {
			schedule.schedule.stop();
			await driver.sendToRoom(`A mensagem "${scheduleKey}" está sendo pausada! :among_us_hammer:`, message.rid);

			return true;
		}
		if (schedule && command === '!retomar') {
			schedule.schedule.start();
			await driver.sendToRoom(`A mensagem "${scheduleKey}" está sendo retomada! :baby-yoda:`, message.rid);
			return true;
		}
	}

	get processSentMessages() {
		return async(err: any, message: any) => {
			const response = responses.find((r) => replaceSpecialCharsLowercase(r.incoming) === replaceSpecialCharsLowercase(message.msg));
			const processedCommand = await this.handleCommands(message);

			if (err) return console.error(err);
			if (processedCommand) return;
			if (!response || this.botId === message.u._id) return;

			const messageWithUser = matchReplaceUser(response.response, message.u.name);
			await driver.sendToRoom(messageWithUser, message.rid);
		};
	}

	async connect() {
		this.conn = await driver.connect({ host: this.HOST, useSsl: this.SSL });
	}

	async login() {
		this.botId = await driver.login({ username: this.USER, password: this.PASS });
	}

	async joinRooms(){
		this.roomsJoined = await driver.joinRooms( this.ROOMS );
	}

	async subscribeToMessages() {
		this.subscribed = await driver.subscribeToMessages();
	}

	async registerMessageResponse() {
		driver.reactToMessages(this.processSentMessages);
	}

	async run() {
		await this.connect();
		await this.login();
		await this.joinRooms();
		await this.subscribeToMessages();
		await this.registerMessageResponse();
		await this.scheduler.startSchedules();
	}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { driver } from '@rocket.chat/sdk';
import { Options } from '../utils/interfaces';
import { Scheduler } from '../Scheduler';
import { isValidMatch, matchReplaceUser, responses } from '../utils';

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
	BOTALIAS!: string;

	constructor(
		connectionOptions: Options,
    private readonly scheduler: Scheduler
	) {
		Object.assign(this, connectionOptions);
	}

	get processSentMessages() {
		return async(err: any, message: any) => {
			const response = responses.find((r) => isValidMatch(r.incoming, message.msg));

			if (err) return console.error(err);
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

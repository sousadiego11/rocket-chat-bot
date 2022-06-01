/* eslint-disable @typescript-eslint/no-explicit-any */
import { driver } from '@rocket.chat/sdk';
import { Options } from '../utils/interfaces';
import { Scheduler } from '../Scheduler';

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

	async run() {
		await this.connect();
		await this.login();
		await this.joinRooms();
		await this.subscribeToMessages();
		await this.scheduler.startSchedules();
	}
}

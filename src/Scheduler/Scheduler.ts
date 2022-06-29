import { driver } from '@rocket.chat/sdk';
import nodeCron from 'node-cron';
import { messages } from '../utils/';
import { Message, Schedules } from '../utils/interfaces/';

export class Scheduler {
	schedules: Schedules[] = [];
	rooms: string[] = [];

	constructor(rooms: string[] = []) {
		this.rooms = rooms;
	}

	async startSchedules() {
		await this.buildSchedules();

		this.schedules.forEach((s) => s.schedule.start());
	}

	async buildSchedules() {
		messages.forEach((message: Message) => {
			const roomIndex = this.rooms.indexOf(message.room);
			const schedule = nodeCron.schedule(message.interval, async () => {
				await driver.sendToRoom(message.message, this.rooms[roomIndex]);
			});
			this.schedules.push({key: message.key, schedule});
		});
	}

	get getSchedules() {
		return this.schedules;
	}
}

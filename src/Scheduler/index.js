import { driver } from '@rocket.chat/sdk';
import nodeCron from 'node-cron';
import { messages } from '../utils/index.js';

export class Scheduler {
    schedules = []
    rooms = []

    constructor(rooms = []) {
        this.rooms = rooms;
    }

    async startSchedules() {
        await this.buildSchedules();

        this.schedules.forEach((s) => s.start())
    }

    async buildSchedules() {
        messages.forEach((message) => {
            const roomIndex = this.rooms.indexOf(message.room)
            const schedule = nodeCron.schedule(message.interval, async () => {
                await driver.sendToRoom(message.message, this.rooms[roomIndex])
            })
            this.schedules.push(schedule)
        }) 
    }
}
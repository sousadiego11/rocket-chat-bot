import { driver } from '@rocket.chat/sdk'
import nodeCron from 'node-cron';
import { messages } from '../utils/index.js';

export class Anuncios {
    schedules = []

    constructor(connectionOptions) {
        Object.assign(this, connectionOptions)
    }

    async startSchedules() {
        await this.buildSchedules();

        this.schedules.forEach((s) => s.start())
    }

    async buildSchedules() {
        messages.forEach((message) => {
            const roomIndex = this.ROOMS.indexOf(message.room)
            const schedule = nodeCron.schedule(message.interval, async () => {
                await driver.sendToRoom(message.message, this.ROOMS[roomIndex])
            })
            this.schedules.push(schedule)
        }) 
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

    async runBot() {
        await this.connect();
        await this.login();
        await this.joinRooms();
        await this.subscribeToMessages();
        await this.startSchedules()
    }
}
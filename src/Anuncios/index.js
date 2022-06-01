import { driver } from '@rocket.chat/sdk';

export class Anuncios {
    schedules = []

    constructor(connectionOptions) {
        Object.assign(this, connectionOptions)
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
        await this.scheduler.startSchedules()
    }
}
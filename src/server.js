import { driver } from '@rocket.chat/sdk'
import { options } from './utils/options.js';
import dotenv from 'dotenv'
dotenv.config()

class Anuncios {
    constructor(connectionOptions) {
        Object.assign(this, connectionOptions)
    }

    // Return the function that process user's sent messages
    get processMessages() {
        return async(err, message, messageOptions) => {
            if(this.botId === message.u._id) return
            await driver.sendToRoom('BLANK TEST MESSAGE RESPONSE', message.rid);
        }
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

    async reactToMessages() {
        this.msgloop = await driver.reactToMessages( this.processMessages );
    }

    async sendToRoom() {
        this.sent = await driver.sendToRoom( this.BOTNAME + ' is listening ...', this.ROOMS[0]);
    }

    async runBot() {
        await this.connect();
        await this.login();
        await this.joinRooms();
        await this.subscribeToMessages();
        await this.reactToMessages();
        await this.sendToRoom();
    }
}

new Anuncios(options).runBot()
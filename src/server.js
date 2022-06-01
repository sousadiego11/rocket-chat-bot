import { driver } from '@rocket.chat/sdk'
import { options } from './utils/options.js';
import dotenv from 'dotenv'
import nodeCron from 'node-cron';
dotenv.config()

class Anuncios {
    constructor(connectionOptions) {
        Object.assign(this, connectionOptions)
    }

    // Return the function that process user's sent messages
    // "await driver.sendToRoom('Message', message.rid)"" responds to the room;
    get processSentMessages() {
        return async(err, message, messageOptions) => {
            if(this.botId === message.u._id) return
            return
        }
    }

    get anuncioSchedule() {
        return nodeCron.schedule('*/3 * * * *', async () => {
            await this.sendToRoom('@all Boa tarde!!!!! Não esqueçam de iniciar o cronômetro de horas das tarefas para nos ajudar com a estimativa!! :asyncparrot:')
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

    async reactToMessages() {
        this.msgloop = await driver.reactToMessages( this.processSentMessages );
    }

    async sendToRoom(message = '') {
        this.sent = await driver.sendToRoom( message, this.ROOMS[0]);
    }

    async runBot() {
        await this.connect();
        await this.login();
        await this.joinRooms();
        await this.subscribeToMessages();
        // React if needed
        // await this.reactToMessages();
        this.anuncioSchedule.start()
    }
}

new Anuncios(options).runBot()
const { driver } = require('@rocket.chat/sdk');

const options = {
    HOST: 'rocketchat.geomais.com.br',
    USER: 'anuncio.bot',
    PASS: 'anunciobot123',
    BOTNAME: 'Anúncios',
    SSL: true,
    ROOMS: ['TesteAnuncios']  
}

class Anuncios {
    botId = -1

    constructor(connectionOptions) {
        Object.assign(this, connectionOptions)
    }

    get processMessages() {
        return async(err, message, messageOptions) => {
            if(this.botId === message.u._id) return
            await driver.sendToRoom('BLANK TEST MESSAGE RESPONSE', message.rid);
        }
    }

    async connect() {
        return driver.connect({ host: this.HOST, useSsl: this.SSL });
    }

    async login() {
        this.botId = await driver.login({ username: this.USER, password: this.PASS });
    }

    async joinRooms(){
        return driver.joinRooms( this.ROOMS );
    }

    async subscribeToMessages() {
        return driver.subscribeToMessages();
    }

    async reactToMessages() {
        const reactFunc = this.processMessages
        return driver.reactToMessages( reactFunc );
    }

    async sendToRoom() {
        return driver.sendToRoom( this.BOTNAME + ' is listening ...', this.ROOMS[0]);
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
# 🚀 Rocket-chat Bot

Foobar is a Python library for dealing with word pluralization.

## Installation

To local development without docker you need to install the project dependencies.

```bash
yarn install
```
## Running the project

```bash
docker-compose up
or
yarn dev
```

## Configuration

Create a "shared" folder in the root project directory.

To make schedule messages, create a "messages.json" file inside the shared folder.

It has to be an array of messages containing a interval for node-cron to understand, the actual message and finally the room that the message should go to (The room needs to be one of the rooms specified in the ".env" configuration).

Example of messsages:
```json
[
  {
	"interval": "0 15,10 * * *",
	"message": "@all Hello everyone!",
	"room": "general"
  }
]

```
To make messages for the bot to respond other users, create a "responses.json" file inside the shared folder.

It has to be an array of responses containing "incoming" that stands for the user input, and "response" that stands for the bot response (if "{user}" exists in the message it will be replaced with the user's name).

Example of responses:
```json
[
  {
	"incoming": "Hello bot",
	"response": "Hello, {user}!"
  }
]


```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

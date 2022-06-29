export const replaceSpecialCharsLowercase = (text: string) => text.replace(/[\W\d_ ]/gm, '').toLowerCase();
export const matchReplaceUser = (text: string, userName: string) => text.replace(/\{user}/gm, userName);
export const getUserCommand = (text: string) => {
	const scheduleKey = /!\D+ (.*)/i.exec(text);
	const isCommand = /^!/.test(text.trim());
	const command = /(!pausar|!retomar)/.exec(text);

	return { scheduleKey: scheduleKey ? scheduleKey[1] : '', command: command ? command[0] : null, isCommand };
};

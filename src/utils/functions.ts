import {options} from './';

const matchReplaceUser = (text: string, userName: string) => text.replace(/\{user}/gm, userName);

const isValidMatch = (incoming: string, input: string): boolean => {
	const incomingArray = incoming.split(',');
	const matchKeysRegex = new RegExp(incomingArray.join('|'), 'gim');
	const matchBotAliasRegex = new RegExp(options.BOTALIAS, 'gim');
	const matchesArray = input.match(matchKeysRegex) ?? [];
	const hasBotNameInMessage = matchBotAliasRegex.test(input);

	const validMatch = hasBotNameInMessage && matchesArray.length >= incomingArray?.length;

	return  validMatch;
};

export {
	matchReplaceUser,
	isValidMatch
};

export const replaceSpecialCharsLowercase = (text: string) => text.replace(/[\W\d_ ]/gm, '').toLowerCase();
export const matchReplaceUser = (text: string, userName: string) => text.replace(/\{user}/gm, userName);

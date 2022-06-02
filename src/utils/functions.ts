export const regexReplaceSpacesLowercase = (text: string) => text.replace(/ *[.?!,~]/gm, '').toLowerCase();
export const regexMatchReplaceUser = (text: string, userName: string) => text.replace(/\{\user}/gm, userName);

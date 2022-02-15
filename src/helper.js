export const toSlug = (str) => str.toLowerCase().replace(' ', '-');

export const sanitize = (object) => JSON.parse(JSON.stringify(object));

export const isEqualsTo = (object1, object2) => JSON.stringify(object1) === JSON.stringify(object2);

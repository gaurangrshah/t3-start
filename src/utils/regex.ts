// @NOTE: these were all generated with CHAT-GPT3

const emailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
);
export const isValidEmail = (maybeEmail: string) => emailRegex.test(maybeEmail);

const anyPhoneRegex = new RegExp(
  // this will match manu different variations of US phone numbers including brackets, hyphens and spaces -- with our without an country extension
  /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
);
export const isValidAnyPhoneNum = (maybePhoneNum: string) =>
  anyPhoneRegex.test(maybePhoneNum);

// matches valid phone numbers that match this example: 555-555-5555
const phoneRegex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
export const isValidPhoneNum = (maybePhoneNum: string) => {
  return phoneRegex.test(maybePhoneNum);
};

const intlPhoneRegex = new RegExp(
  /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/
);
export const isValidIntlPhoneNum = (maybeIntlPhoneNum: string) => {
  return intlPhoneRegex.test(maybeIntlPhoneNum);
};

const streetAddressRegex = new RegExp(/\d+[a-zA-Z]+/);
export const isValidStreeAddress = (maybeStreetAddress: string) => {
  return streetAddressRegex.test(maybeStreetAddress);
};

const cityStateRegex = new RegExp(/[a-zA-Z]+,[A-Z]{2}/);
export const isValidCityState = (maybeCityState: string) => {
  return cityStateRegex.test(maybeCityState);
};

const zipRegex = new RegExp(/\d{5}/);
export const isValidZip = (maybeZip: string) => zipRegex.test(maybeZip);

const filePathRegex = new RegExp(
  // includes filename + extension
  /((\/|\\|\/\/|https?:\\\\|https?:\/\/)[a-z0-9 _@\-^!#$%&+={}.\/\\\[\]]+)+\.[a-z]+$/
);
export const isValidFilePath = (maybeFilePath: string) => {
  return filePathRegex.test(maybeFilePath);
};

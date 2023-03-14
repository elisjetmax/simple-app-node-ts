export const generateOTP = (length: number): string => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
};

export const formatedApyKey = () => {
  const apiKey = generateRandomString(16);
  const size = 4;
  const result = apiKey.replace(new RegExp(`.{${size}}`, "g"), "$&-");
  return result.substring(
    0,
    result.length % size === 0 ? result.length - 1 : result.length
  );
};

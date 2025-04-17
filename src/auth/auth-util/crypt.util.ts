import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export const enCryptPassword = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  const hashedPassword = salt + '.' + hash.toString('hex');
  return hashedPassword;
};
export const deCryptPassword = async (password: string, userPass: string) => {
  const [salt, hashed] = userPass.split('.');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  if (hashed !== hash.toString('hex')) {
    return false;
  }
  return true;
};

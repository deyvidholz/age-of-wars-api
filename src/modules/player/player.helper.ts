import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

function encryptPassword(password: string): string {
  const encryptedPassword = bcrypt.hashSync(password, salt);
  return encryptedPassword;
}

function checkPassword(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

export { encryptPassword, checkPassword };

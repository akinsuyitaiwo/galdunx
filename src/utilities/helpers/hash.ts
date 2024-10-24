import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (enteredPassword: string, storedPassword: string) => {
  return bcrypt.compare(enteredPassword, storedPassword);
};

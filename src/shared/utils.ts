import { compare } from 'bcrypt';

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    resolve(data);
  });
};

export const comparePassword = async (
  userPassword: string,
  currentPassword: string,
) => {
  return await compare(currentPassword, userPassword);
};

import type { AuthRepository } from "../repositories/AuthRepository";

export const signInUser =
  (authRepo: AuthRepository) => async (email: string, password: string) => {
    return await authRepo.signInUser(email, password);
  };

export const signUpUser =
  (authRepo: AuthRepository) =>
  async (email: string, password: string, userName: string) => {
    return await authRepo.signUpUser(email, password, userName);
  };

export const logoutUser = async (authRepo: AuthRepository) => {
  return await authRepo.logoutUser();
};

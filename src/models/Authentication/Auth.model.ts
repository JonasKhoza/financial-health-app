export interface UserAuthInterface {
  username?: string;
  email?: string;
  password: string;
}

export interface UserAuthI extends UserAuthInterface {
  isSignin: boolean;
}

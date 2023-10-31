type UserData = {
  username: string;
};

export type UserDataRequest = {
  password: string;
} & UserData;

export type UserDataResponse = {
  id: string;
  admin: boolean;
} & UserData;

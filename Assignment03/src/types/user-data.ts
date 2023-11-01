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

export type UserDataPatch = {
  id: string;
} & UserDataRequest;

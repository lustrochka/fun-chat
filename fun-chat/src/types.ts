export type Items = {
  [key: string]: string;
};

export type PatternsType = {
  [key: string]: string[];
};

export type ResponseType = {
  id: string;
  type: string;
  payload: {
    error: string;
  };
};

export type UsersData = {
  login: string;
  isLogined: boolean;
};

export type UsersList = {
  active: UsersData[];
  inactive: UsersData[];
};

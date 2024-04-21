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

export type MessageType = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};

export type UnreadMsgsType = {
  active: {
    [key: string]: number;
  };
  inactive: {
    [key: string]: number;
  };
};

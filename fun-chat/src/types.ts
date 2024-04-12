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

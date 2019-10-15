export interface User {
  login: string;
  password: string;
}

export interface Article {
  id: string;
  author: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

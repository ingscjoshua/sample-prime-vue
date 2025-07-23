export type User = {
  id: number;
  email: string;
  username: string;
  password?: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  token?: string;
  fullName?: string;
}

export type LoginCredentials = {
  username: string;
  password: string;
}

export type RegisterData = {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}

export type AuthResponse = {
  token: string;
  user?: User;
}
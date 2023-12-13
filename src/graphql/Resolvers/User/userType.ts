export interface RegisterUserInput {
  email: string;
  password: string;
  street: string;
  zipcode: string;
  houseNumber: string;
  location: string;
}

export interface Address {
  id: string;
  street: string;
  zipcode: string;
  houseNumber: string;
  location: string;
}

export interface RegisterUserResponse {
  id: string;
  email: string;
  password: string;
  address?: Address;
}

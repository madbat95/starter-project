export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  token?: string;
  phone_number: string;
  address: string;
  state: string;
  country: string;
  date_of_birth: string;
  avatar: string;
}

export interface User {
  user_id: string;
  user_name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  password: string;
  age: number;
  status: string;
  role_type: 'user';
  is_active: boolean;
}

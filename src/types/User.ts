export interface Role {
  roleId: number;
}

export interface User {
  userId?: number;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  phoneNumber: number;
  username: string;
  password?: string;
  avatar?: string;
  email?: string;
  buyingAddress?: string;
  role: Role;
}

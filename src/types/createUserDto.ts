export type CreateUserDto = {
  name: string;
  email: string;
  phone: string;
  position_id: string | number;
  file: File | null;
};

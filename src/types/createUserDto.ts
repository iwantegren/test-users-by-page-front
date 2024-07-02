export type CreateUserDto = {
  name: string;
  email: string;
  phone: string;
  position_id: string;
  file: File | null;
};

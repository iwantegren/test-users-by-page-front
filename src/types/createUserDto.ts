export type CreateUserDto = {
  name: string;
  email: string;
  phone: string;
  position: string;
  file: File | null;
};

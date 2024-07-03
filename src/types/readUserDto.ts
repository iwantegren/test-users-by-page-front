import { CreateUserDto } from "./createUserDto";

export type ReadUserDto = {
  id: number;
  position: string;
  photo: string;
} & Omit<CreateUserDto, "file">;

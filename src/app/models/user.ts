import { Role } from "./Roles";

export interface User{
  username_email : string;
  mobile : string;
  role : Role;
  token ?: string;
}

export interface UserForLogin{
  email_mobile : string;
  otp : string;
  type : string;
}

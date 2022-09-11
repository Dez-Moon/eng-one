export interface IUser {
  email: string;
  isActivated: boolean;
  role: "USER" | "ADMIN" | "TEST";
  id: string;
  img?: string;
  status: "online" | "offline";
  wasOnline: string;
}

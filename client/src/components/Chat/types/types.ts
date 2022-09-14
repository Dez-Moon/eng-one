export type ChatMessageType = {
  message: string;
  user: { id: string; login: string; img: string; status: string };
  id: string;
  createdAt: string;
  updatedAt: string;
};

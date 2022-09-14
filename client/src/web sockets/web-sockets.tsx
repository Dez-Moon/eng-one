type SocketMethodsType = "connect" | "disconect" | "message";
type SocketActionsType = "send" | "edit" | "clear" | "delete";

export const createSocketObject = (
  method: SocketMethodsType,
  action?: SocketActionsType,
  userId?: string,
  messageId?: string,
  message?: string
) => {
  return { method, action, userId, messageId, message };
};

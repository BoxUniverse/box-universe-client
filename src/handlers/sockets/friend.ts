export const handleAddFriend: Handler = {
  event: 'subscribe.addFriend',
  handler: (payload: any) => {
    const { userRequest, userReceive } = payload;
    const { id, name } = userRequest;

    alert(`${name} da gui loi moi ket ban`);
  },
};

export const friendHandlers = [handleAddFriend];

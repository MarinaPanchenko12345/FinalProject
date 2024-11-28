export const createOrderItem = (item) => {
  return {
    cardId: item.cardId,
    title: item.title,
    image: item.image,
    color: item.color,
    quantity: item.quantity,
    price: item.price,
    isPending: true, 
    isSent: false, 
    isDelivered: false,
  };
};

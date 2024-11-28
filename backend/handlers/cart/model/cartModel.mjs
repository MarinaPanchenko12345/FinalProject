export const createCartItem = (card, quantity) => {
  return {
    cardId: card._id,
    title: card.title,
    image: card.image,
    color: card.color,
    quantity: quantity,
    price: card.price,
    maxQuantity: card.quantity,
  };
};

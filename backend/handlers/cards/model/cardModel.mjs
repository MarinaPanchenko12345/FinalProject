import { getUser } from "../../../middlewares/guard.mjs";

//Creates a card object based on the request body.
export const createCardObject = (req) => {
  return {
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    image: {
      url: req.body.image?.url || undefined,
      alt: req.body.image.alt || undefined,
    },
    color: req.body.color,
    quantity: req.body.quantity,
    price: req.body.price,
    model: req.body.model,
    category: req.body.category,
    company: req.body.company,
    user_id: getUser(req)?._id, // The ID of the user associated with the card
  };
};

export const updatedCardObject = (req) => {
  return {
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    image: {
      url: req.body.image?.url || undefined,
      alt: req.body.image?.alt || undefined,
    },
    color: req.body.color,
    quantity: req.body.quantity,
    price: req.body.price,
    model: req.body.model,
    category: req.body.category,
    company: req.body.company,
  };
};

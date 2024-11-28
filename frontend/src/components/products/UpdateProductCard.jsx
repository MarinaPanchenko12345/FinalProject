import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useValidation from "../../hooks/useValidation";
import { CardValidation } from "../../validation/cardJoi";
import { showAlert } from "../../helpers/Alert";
import DrawIcon from "@mui/icons-material/Draw";
import ProductCardForm from "../../models/ProductCardForm";
import { useCardsUser } from '../../contexts/CardsUserContext';

const UpdateProductCard = ({ card, onCardUpdated, close }) => {
    const { updateCard } = useCardsUser();
  const theme = useTheme();
  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };
  const { errorMessages, validate, resetErrorMessages } =
    useValidation(CardValidation);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: {
      url: "",
      alt: "",
    },
    color: "",
    quantity: "",
    price: "",
    model: "",
    category: "",
    company: "",
  });

  useEffect(() => {
    if (card) {
      setFormData({
        title: card.title || "",
        subtitle: card.subtitle || "",
        description: card.description || "",
        image: {
          alt: card.image?.alt || "",
        },
        color: card.color || "",
        quantity: card.quantity || "",
        price: card.price || "",
        model: card.model || "",
        category: card.category || "",
        company: card.company || "",
      });
    }
  }, [card]);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormData((prev) => {
      const keys = name.split(".");
      const lastKey = keys.pop();
      let lastObj = keys.reduce((obj, key) => {
        return (obj[key] = obj[key] || {});
      }, prev);
      lastObj[lastKey] = value;
      resetErrorMessages();
      return { ...prev };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      try {
        await updateCard(card._id, formData); 
        showAlert("success", "Card updated successfully!");
        onCardUpdated(formData); 
        close();
      } catch (err) {
        showAlert("error", "Failed to update the card.");
      }
    }
  };

  const handleCancel = () => {
    close();
  };

  return (
    <ProductCardForm
      formData={formData}
      errorMessages={errorMessages}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      actionLabel='Update'
      title='Update Card'
      avatarIcon={<DrawIcon />}
      style={style}
    />
  );
};

export default UpdateProductCard;

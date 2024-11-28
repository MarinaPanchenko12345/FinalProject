import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useValidation from "../../hooks/useValidation";
import { CardValidation } from "../../validation/cardJoi";
import { showAlert } from "../../helpers/Alert";
import AddCardIcon from "@mui/icons-material/AddCard";
import ProductCardForm from "../../models/ProductCardForm";
import { useCardsUser } from "../../contexts/CardsUserContext";
const CreateProductCard = ({ close }) => {
  const { createCard } = useCardsUser();
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
        await createCard(formData);
        showAlert("success", "Card created successfully!");
        close();
      } catch (error) {
        showAlert("error", "Failed to create card.");
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
      actionLabel='Create'
      title='Create New Card'
      avatarIcon={<AddCardIcon />}
      style={style}
    />
  );
};

export default CreateProductCard;

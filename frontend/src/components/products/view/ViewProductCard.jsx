import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCardAPI, { METHOD } from "../../../hooks/useCardAPI";
import "./ViewProductCard.css";
import Button from "@mui/material/Button";
import ViewProductImage from "./ViewProductImage";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import TextRating from "../../../helpers/TextRating";
import getColor from "../../../models/Colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../../contexts/CartContext";
import Loading from "../../../helpers/loading/Loading";
import { useTheme } from "@mui/material/styles";
import DescriptionBox from './DescriptionBox';

const ViewProductCard = () => {
  const { id } = useParams();
  const { data, error, isLoading, apiCard } = useCardAPI();
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (id) {
      apiCard(METHOD.GET_CARD_BY_ID, { id });
    }
  }, [apiCard, id]);

  const handleImageClick = () => {
    setSelectedImage(data?.image?.url);
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  const likeCount = data?.likes ? data.likes.length : 0;
  const ratingValue = Math.min(likeCount / 2, 5);

  if (isLoading) return <Loading />;
  if (error)
    return <div className='message message_error '>Error: {error}</div>;
  if (!data)
    return <div className='message message_empty '>No result found</div>;

  return (
    <div
      className='view_div'
      style={{
        color: theme.palette.text.primary,
      }}
    >
      <CloseIcon
        className='card_icon close_icon'
        onClick={handleCloseClick}
        style={{ fontSize: "36px" }}
      />
      <div className='view_container'>
        <div className='view_card_image'>
          <img
            src={data.image.url}
            alt={data.title}
            onClick={handleImageClick}
          />
          <OpenInNewIcon
            className='card_icon open_icon'
            onClick={handleImageClick}
            style={{ fontSize: "36px" }}
          />
        </div>

        <div className='view_info'>
          <div className='view_card_text'>
            <h2>{data.title}</h2>
            <h3>{data.subtitle}</h3>
          </div>

          <div className='view_card_rating'>
            <TextRating
              className='view_card_rating'
              value={ratingValue}
              likeCount={likeCount}
            />
          </div>

          <div className='view_card_price'>
            <p>Price : {data.price}$</p>
          </div>

          <div className='view_card_color'>
            <p>
              <strong>Color </strong>:{data.color}
            </p>
            <div className={getColor(data.color)}></div>
          </div>
          <div className='view_card_slogan'>
            <p>
              A high-quality electronic device with a modern design and advanced
              features, providing reliable performance and ease of use in any
              situation.
            </p>
          </div>

          <Button
            variant='contained'
            size='large'
            className='add_to_cart'
            style={{
              marginBottom: "20px",
              fontWeight: "bold",
            }}
            onClick={() => handleAddToCart(data)}
          >
            <ShoppingCartIcon />
            Add To Cart
          </Button>
          <hr />
          <div className='view_card_info'>
            <p>
              <strong>Company :</strong> {data.company}
            </p>
            <p>
              <strong>Model :</strong> {data.model}
            </p>
            <p>
              <strong>Category :</strong> {data.category}
            </p>
          </div>
        </div>
      </div>

      <DescriptionBox description={data.description} />
      {selectedImage && (
        <ViewProductImage
          image={selectedImage}
          close={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ViewProductCard;

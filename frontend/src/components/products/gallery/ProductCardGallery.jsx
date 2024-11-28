import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Slider from "react-slick";
import axios from "axios";
import "./ProductCardGallery.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { showAlert } from "../../../helpers/Alert";

const ProductCardGallery = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
   const style = {
     backgroundColor: theme.palette.primary.main,
     color: theme.palette.text.primary,
   };

  let sliderRef = React.createRef();

  useEffect(() => {
    axios
      .get("http://localhost:9898/cards")
      .then((response) => {
        const filteredCards = response.data
          .filter((card) => card.likes.length > 5)
          .slice(0, 10);
        setCards(filteredCards);
      })
      .catch((error) => {
        showAlert(
          "error",
          `${
            error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred."
          } - Maybe you are not connected to the server.`
        );
      });
  }, []);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
    arrows: false,
    beforeChange: (current, next) => setCardIndex(next),
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className='cards_gallery'>
      <div className='gallery_buttons'>
        <button
          className='gallery_arrow'
          onClick={handlePrevClick}
          style={style}
        >
          <KeyboardDoubleArrowLeftIcon />
        </button>
        <h3
          className='header_gallery'
          style={{
            color: theme.palette.text.primary,
          }}
        >
          Fan Favorites
        </h3>
        <button
          className='gallery_arrow'
          onClick={handleNextClick}
          style={style}
        >
          <KeyboardDoubleArrowRightIcon />
        </button>
      </div>
      <div className='cards_slider'>
        <Slider {...settings} ref={sliderRef}>
          {cards.map((card, index) => (
            <div
              className={
                index === cardIndex
                  ? "card_slide card_slide_active"
                  : "card_slide"
              }
              key={index}
            >
              <img
                src={card.image.url}
                alt={card.image.alt}
                loading='lazy'
                onClick={() => navigate(`/cards/${card._id}`)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductCardGallery;

import React from "react";
import "./ViewProductImage.css"; 

const ViewProductImage = ({ image, close }) => {
  return (
    <div className='view_product_image_modal' onClick={close}>
      <div className='view_product_image_content' onClick={close}>
        <img
          src={image}
          alt='Product'
          
        />
      </div>
    </div>
  );
};

export default ViewProductImage;

import React from "react";
import ProductCards from "./../products/ProductCards";
import ProductCardGallery from "../products/gallery/ProductCardGallery";
import SortCategory from "../products/sorting/SortCategory";
import SortColor from "../products/sorting/SortColor";
import Header from "../header/Header";

const Home = () => {
  return (
    <div className='home_div'>
      <Header />
      <ProductCardGallery />
      <SortCategory />
      <SortColor />
      <ProductCards />
    </div>
  );
};

export default Home;

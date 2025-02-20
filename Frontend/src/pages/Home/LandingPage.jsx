import React from "react";
import ProductCategory from "./ProductCategory";
import Promo from "./Promo";
import Product from "./Product";
import RecomendedProducts from "./RecomendedProducts";
import { SearchBar } from "../../components/Navbar";



const LandingPage = () => {
  return (
    <>
    <div className=" pb-8  w-full min-h-screen mt-9 md:mt-[74px] flex flex-col items-center">      

        <div className="flex justify-center items-center">
          <SearchBar/>
        </div>

        {/* promo Slider */} 
        <div className="md:w-11/12 w-full pt-5 flex justify-center">
        <Promo/>
        </div>    
        

       {/* Category slider */}
        <div className="md:w-11/12 w-full md:mt-8 mt-4 flex justify-center  ">       
        <ProductCategory/>
        </div>
        
       {/* All products */}
        <div className="md:w-11/12 w-full px-2 md:px-0">
          <Product/>
        </div>

        {/* Recomended product */}
        <div className="w-11/12">
          <RecomendedProducts/>
        </div>

      
    </div>
    </>
  );
};

export default LandingPage;

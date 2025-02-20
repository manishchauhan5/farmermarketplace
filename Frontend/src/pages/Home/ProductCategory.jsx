import React from 'react'
import vegetables from "../../assets/images/product Category/vegetables.jpg";
import fruits from "../../assets/images/product Category/fruits.jpg";
import dryfruits from "../../assets/images/product Category/dryfruits.jpg";
import spices from "../../assets/images/product Category/spices.jpg";
import dairy from "../../assets/images/product Category/dairy.jpg";
import grains from "../../assets/images/product Category/grains.jpg";
import flowers from "../../assets/images/product Category/flowers.jpg";
import { NavLink } from 'react-router-dom';

const ProductCategory = () => {
  return (
    <>
      <div className=" bg-white w-fit md:rounded-xl shadow-base bg-opacity-50 flex flex-col md:px-5 px-2 justify-center items-center">
          <div className="md:text-2xl text-md text-gray-700 font-serif w-full text-left md:pl-5 pt-1 md:pt-3">
            What Do you looking for?
          </div>
          <div className="carousel w-full md:rounded-box md:py-5 py-2 md:gap-6 gap-2">
            <div className="carousel-item relative">
              <NavLink to="/productcategory">
              <img
                src={vegetables}
                className="md:h-36 md:w-[240px] h-20 w-36 md:rounded-lg shadow-md shadow-gray-400"
              />
              </NavLink>
              <div className="absolute bottom-2 left-2 text-sm md:text-base text-white font-semibold bg-black bg-opacity-50 md:px-4 px-2 md:py-2 rounded-md ">
                Vegetables
              </div>
            </div>
            <div className="carousel-item relative">
            <NavLink to="/productcategory">
              <img
                src={fruits}
                className="md:h-36 md:w-[230px] h-20 w-36 md:rounded-lg shadow-md shadow-gray-400"
              />
              </NavLink>
              <div className="absolute bottom-2 left-2 text-sm md:text-base text-white font-semibold bg-black bg-opacity-50 md:px-4 px-2 md:py-2 rounded-md">
                Fruits
              </div>
            </div>
            <div className="carousel-item relative shadow-md">
            <NavLink to="/productcategory">
              <img
                src={dryfruits}
                className="md:h-36 md:w-[230px] h-20 w-36 md:rounded-lg shadow-md shadow-gray-400"
              />
              </NavLink>
              <div className="absolute bottom-2 left-2 text-sm md:text-base text-white font-semibold bg-black bg-opacity-50 md:px-4 px-2 md:py-2 rounded-md">
                Dry fruits
              </div>
            </div>
            <div className="carousel-item relative">
            <NavLink to="/productcategory">
              <img
                src={spices}
                className="md:h-36 md:w-[230px] h-20 w-36 md:rounded-lg shadow-md shadow-gray-400"
              />
              </NavLink>
              <div className="absolute bottom-2 left-2 text-sm md:text-base text-white font-semibold bg-black bg-opacity-50 md:px-4 px-2 md:py-2 rounded-md">
                Spices
              </div>
            </div>
            <div className="carousel-item relative">
            <NavLink to="/productcategory">
              <img
                src={dairy}
                className="md:h-36 md:w-[230px] h-20 w-36 md:rounded-lg shadow-md shadow-gray-400"
              />
              </NavLink>
              <div className="absolute bottom-2 left-2 text-sm md:text-base text-white font-semibold bg-black bg-opacity-50 md:px-4 px-2 md:py-2 rounded-md">
                Dairy products
              </div>
            </div>
            <div className="carousel-item relative">
            <NavLink to="/productcategory">
              <img
                src={grains}
                className="md:h-36 md:w-[230px] h-20 w-36 md:rounded-lg shadow-md shadow-gray-400"
              />
              </NavLink>
              <div className="absolute bottom-2 left-2 text-sm md:text-base text-white font-semibold bg-black bg-opacity-50 md:px-4 px-2 md:py-2 rounded-md">
                Grains
              </div>
            </div>
            <div className="carousel-item relative">
            <NavLink to="/productcategory">
              <img
                src={flowers}
                className="md:h-36 md:w-[230px] h-20 w-36 md:rounded-lg shadow-md shadow-gray-400"
              />
              </NavLink>
              <div className="absolute bottom-2 left-2 text-sm md:text-base text-white font-semibold bg-black bg-opacity-50 md:px-4 px-2 md:py-2 rounded-md">
                Flowers
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ProductCategory
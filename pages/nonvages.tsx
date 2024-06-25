/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
// import Product from "../models/Products";
import NonVagesProducts from "../models/allproducts/nonvagesAll";
const mongoose = require("mongoose");

export default function Nonvages({ products }) {
  return (
    <section className="text-gray-600 body-font">
      <h2 className="font-bold text-center ">Pure 100% Organic Vages</h2>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((item, index) => {
           return <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg" key={index}>
              <a className="block relative h-48 rounded overflow-hidden">
                <Link href={`/product/${item.slug}`}>
                  <img
                    alt="ecommerce"
                    className="object-contain object-center w-full h-full block"
                    src={item.img}
                  />
                </Link>
              </a>

              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {item.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {item.title.slice(0,50)}
                </h2>
                <p className="mt-1">₹{item.price}</p>
              </div>
              <button className="inline-flex items-center bg-gray-400 border-0 py-1 px-3 focus:outline-none hover:bg-gray-600 rounded text-base mt-4 md:mt-0 ">
                <span style={{ color: "white" }}>Add to Cart</span>
              </button>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(`${process.env.MONGO_URI}/nonvages`);
  }
  let products = await NonVagesProducts.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import Product from "../models/Products";
// import VagesProducts from "../models/allproducts/vagesAll";
const mongoose = require("mongoose");
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
export default function Vages({ addToCart, removeFromCart, cart, products }) {
  const [qtyVal, setQtyVal] = useState(1);
  // const ax = Object.keys(cart).map((item, ind) => {
  //   let abn;
  //   if ( cart[item].name === slug) {
  //     abn = cart[item].qty;
  //   }

  //   return abn;
  // });
  // const productQty = ax.filter((n) => n);
  // let prdQty = Number(productQty);
  // console.log(products)

  return (
    <section className="text-gray-600 body-font">
      <h2 className="font-bold text-center ">Pure 100% Organic Vages</h2>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((item, index) => {
            return (
              <div
                className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg"
                key={index}
              >
                <span className="block relative h-48 rounded overflow-hidden">
                  <Link href={`/product/${item.slug}`}>
                    <img
                      alt="ecommerce"
                      className="object-contain object-center w-full h-full block"
                      src={item.img}
                      width="auto"
                      height="auto"
                    />
                  </Link>
                </span>

                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {item.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.title.slice(0, 50)}
                  </h2>
                  <p className="mt-1">
                    ₹
                    {Number(
                      Object.keys(cart)
                        .map((ee) => {
                          if (ee.includes(item.slug))
                            return cart[ee].qty * cart[ee].price;
                        })
                        .filter((val) => val !== undefined)
                    ) === 0
                      ? item.price
                      : Number(
                          Object.keys(cart)
                            .map((ee) => {
                              if (ee.includes(item.slug))
                                return cart[ee].qty * cart[ee].price;
                            })
                            .filter((val) => val !== undefined)
                        )}
                  </p>
                </div>
                {Number(
                  Object.keys(cart)
                    .map((ee) => {
                      if (ee.includes(item.slug)) return cart[ee].qty;
                    })
                    .filter((val) => val !== undefined)
                ) <= 0 ? (
                  <button
                    className="flex mt-6 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={() => {
                      addToCart(
                        item.slug,
                        item.availableQty,
                        item.price,
                        item.category,
                        item.title,
                        item.img
                      );
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <span>Quantity</span>

                    <button
                      disabled={
                        Number(
                          Object.keys(cart)
                            .map((ee) => {
                              if (ee.includes(item.slug)) return cart[ee].qty;
                            })
                            .filter((val) => val !== undefined)
                        ) <= 0
                          ? true
                          : false
                      }
                    >
                      <AiOutlineMinusSquare
                        className="text-xl cursor-pointer"
                        onClick={() => {
                          removeFromCart(
                            item.slug,
                            item.availableQty,
                            item.price,
                            item.category,
                            item.title,
                            item.img
                          );
                        }}
                      />
                    </button>

                    <span className="mx-5 text-xl font-bold">
                      {Number(
                        Object.keys(cart)
                          .map((ee) => {
                            if (ee.includes(item.slug)) return cart[ee].qty;
                          })
                          .filter((val) => val !== undefined)
                      )}
                    </span>
                    <AiOutlinePlusSquare
                      className="text-xl cursor-pointer"
                      onClick={() => {
                        console.log(item);
                        addToCart(
                          item.slug,
                          item.availableQty,
                          item.price,
                          item.category,
                          item.title,
                          item.img
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(`${process.env.MONGO_URI}`);
  }
  let products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

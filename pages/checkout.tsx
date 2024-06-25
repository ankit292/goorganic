/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-script-component-in-head */
import React from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import Head from "next/head";
import Script from "next/script";

export default function Checkout({
  cart,
  subTotal,
  addToCart,
  removeFromCart,
}) {

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    
    // Get a transaction Token
    
    const data = { cart, subTotal, oid, email: "email" };
    
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/payment/pretransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
   
    let txnRes = await a.json();
    console.log('txnRes ' + txnRes.oid)
    let txnToken = await txnRes.txnToken
    console.log(txnToken);

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };
     console.log('window.Paytm ' + window.Paytm)
     console.log('window.Paytm ' + window.Paytm.CheckoutJS)
    if(window.Paytm && window.Paytm.CheckoutJS){
      // initialze configuration using init method 
      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        
        // after successfully updating configuration, invoke JS Checkout
        console.log("success")
        window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error){
        console.log("error => ",error);
    });
  } 
    
  };
  return (
    <section className="checkOutSec">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}  crossOrigin="anonymous" ></script>

        {/* <Script
          type="application/javascript"
          src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
          crossorigin="anonymous"
        /> */}
      </Head>
      <div className="container px-5 py-15 mx-auto">
        <form className="checkoutForm">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Shipping information
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="paySec py-10">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Order Summary
          </h2>

          <div className="pointer-events-auto">
            <div className="flex h-full flex-col bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Shopping cart
                  </h3>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {Object.keys(cart).length == 0 && (
                        <div className="emptyText my-2">
                          <p className="text-center font-semibold">
                            Your cart is Empty!
                          </p>
                        </div>
                      )}
                      {Object.keys(cart).map((item, ind) => {
                        return (
                          <li key={ind} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={cart[item].img}
                                alt={cart[item].imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div
                              className="flex flex-wrap"
                              style={{ width: "80%" }}
                            >
                              <div
                                className="ml-4 flex  flex-col"
                                style={{ flex: "0 0 100%" }}
                              >
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={cart[item].href}>
                                      {cart[item].name}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    {cart[item].price * cart[item].qty}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {cart[item].color}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div
                                  className="flex text-center justify-center ms-5"
                                  style={{ alignItems: "center" }}
                                >
                                  <span className="mr-2">Qty</span>
                                  <AiOutlineMinusSquare
                                    className="text-xl cursor-pointer"
                                    onClick={() => {
                                      removeFromCart(
                                        item,
                                        1,
                                        cart[item].price,
                                        cart[item].name,
                                        cart[item].varient
                                      );
                                    }}
                                  />
                                  <span className="mx-5 text-xl font-bold">
                                    {" "}
                                    {cart[item].qty}
                                  </span>
                                  <AiOutlinePlusSquare
                                    className="text-xl cursor-pointer"
                                    onClick={() => {
                                      addToCart(
                                        item,
                                        1,
                                        cart[item].price,
                                        cart[item].name,
                                        cart[item].varient
                                      );
                                    }}
                                  />
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹ {subTotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={initiatePayment}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay ₹ {subTotal}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

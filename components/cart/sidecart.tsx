import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import Link from "next/link";
export default function Sidecart({
  clearCart,
  removeFromCart,
  addToCart,
  cart,
  subTotal,
  cartToggle,
}) {
  const [open, setOpen] = useState(cartToggle);
  useEffect(() => {
    setOpen(cartToggle);
  }, [cartToggle]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
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
                                  <div className="flex flex-wrap">
                                    <div className="ml-4 flex flex-1 flex-col">
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
                                        <AiOutlineMinusSquare className="text-xl cursor-pointer" onClick={()=>{removeFromCart(item,1,cart[item].price,cart[item].name,cart[item].varient)}}/>
                                        <span className="mx-5 text-xl font-bold">
                                          {" "}
                                          {cart[item].qty}
                                        </span>
                                        <AiOutlinePlusSquare className="text-xl cursor-pointer" onClick={()=>{addToCart(item,1,cart[item].price,cart[item].name,cart[item].varient)}}/>
                                        
                                        
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
                        <Link
                          href="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                        <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={()=>{clearCart()}}>
                          Clear Cart
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import style from "../styles/navbar.module.css";
import Sidecart from "./cart/sidecart";
import { MdAccountCircle } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function Navbar({
  logout,
  key,
  user,
  clearCart,
  removeFromCart,
  addToCart,
  cart,
  subTotal,
}) {
  const [cartToggle, setCartToggle] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  

  const cartHandle = () => {
    if (cartToggle === false) {
      setCartToggle(true);
    } else if (cartToggle === true) {
      setCartToggle(false);
    }
  };

  return (
    <header className="text-gray-600 body-font sticky bg-white top-0 z-10">
      <div className="container mx-auto flex flex-wrap pt-0 flex-col md:flex-row items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href="/"
        >
          <Image
            src="/images/organic2.jpg"
            alt="logo"
            width={200}
            height={50}
          />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <ul className={style.navBar}>
            <li>
              <Link
                href="/vages"
                className="mr-5 hover:text-gray-900 font-semibold"
              >
                Vagies
              </Link>
            </li>
            <li>
              <Link
                href="/nonvages"
                className="mr-5 hover:text-gray-900 font-semibold"
              >
                Non-Vagies
              </Link>
            </li>
            <li>
              <Link
                href="/fruits"
                className="mr-5 hover:text-gray-900 font-semibold"
              >
                Fruit
              </Link>
            </li>
            <li>
              <Link
                href="/plants"
                className="mr-5 hover:text-gray-900 font-semibold"
              >
                Plants
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          {user.value == null ? (
            <Link href="/login" className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              Login
            </Link>
          ) : (
            <div className={style.profile}>
              <Link href="/login" className="mr-2" onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)}>
              <MdAccountCircle className="text-2xl" />
            </Link>
              <ul className={style.ulProfile} onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)} style={{display: dropdown ? 'block' : 'none' }}>
                <li>
                  <Link href='/myprofile'><CgProfile className="mr-2"/> My Profile</Link>
                  </li>
                  <li><Link href='/orders'><BsBoxSeam className="mr-2"/> Orders</Link></li>
                  <li><Link href='/wishlist'><AiOutlineHeart className="mr-2"/> Wishlist</Link></li>
                  <hr />
                  <li onClick={logout} className="mt-2"><Link href='/' className="text-red-600 font-bold"><RiLogoutCircleLine className="mr-2 text-red-600"/> Log out</Link></li>   
              </ul>
            </div>
            
          )}
          

          <button
            className="inline-flex items-center bg-gray-100 border-0 py-2 ms-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={cartHandle}
          >
            <AiOutlineShoppingCart className="text-2xl" />

            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <Sidecart
          key={key}
          user={user}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          cart={cart}
          subTotal={subTotal}
          cartToggle={cartToggle}
        />
      </div>
    </header>
  );
}

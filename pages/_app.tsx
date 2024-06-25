import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css';
import '../styles/globals.css'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }: AppProps) {
  const [cart,setCart] = useState({});
  const [subTotal,setSubToatal] = useState(0);
  const [user, setUser ] = useState({value:null})
  const [key, setKey ] = useState(0)
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
  try {
    if(localStorage.getItem('cart')){
      setCart(JSON.parse(localStorage.getItem('cart')));
      saveCart(JSON.parse(localStorage.getItem('cart')));
      
    }
  } catch (error) {
    console.log(error);
    localStorage.clear()
  }
  let token =  localStorage.getItem('token');
  if(token){
    setUser({value:token})
    
  }
  setKey(Math.random())
  },[router.query])

  const logout = ()=>{
    localStorage.removeItem('token');
    setUser({value:null})
    setKey(Math.random())
    router.push('/login')
  }


  const saveCart = (myCart)=>{
    localStorage.setItem('cart',JSON.stringify(myCart) )
    let subt = 0;
    let keys = Object.keys(myCart)
    for(let i=0;i<keys.length;i++){
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubToatal(subt)
  }
  const addToCart = (itemCode,qty,price,name,varient,img)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty;

    }else{
      newCart[itemCode] = {qty:1,price,name,varient,img}
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }
  const removeFromCart = (itemCode,qty,price,name,varient,img)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty;

    }
    if(newCart[itemCode].qty <= 0){
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const buyNow = (itemCode,qty,price,name,varient,img)=>{
    let newCart = {slug : {qty:1,price,name,varient,img}};
    
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }
  return( <>
  <LoadingBar
        color='#75ca58'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
   {key &&  <Navbar key={key} logout={logout}  user={user} clearCart={clearCart} removeFromCart={removeFromCart} addToCart={addToCart} cart={cart} subTotal={subTotal} /> 
   }
  <Component buyNow={buyNow}  clearCart={clearCart} removeFromCart={removeFromCart} addToCart={addToCart} cart={cart} subTotal={subTotal}  {...pageProps} />
  
  <Footer/>
  </>)
}
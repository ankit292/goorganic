
import Maincontent from '@/components/maincontent'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

export default function index() {
  return (
    <>
    <Head>
      <title>Go Green - Organic</title>
    </Head>
    
    <div className="my-4">
      <Image src='/images/organic-food.jpg' alt='Org' width={1600} height={500}/>
    </div>
    <Maincontent />
    </>
  )
}

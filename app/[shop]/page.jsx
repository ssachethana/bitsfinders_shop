import React, { Suspense } from 'react'
import Header from '@/app/components/marketplace/mCommon/header/header'
import Shopheder from '@/app/components/marketplace/shop/Shopheder'

async function ShopContent({ params }) {
  const { shop } = await params

  return <div>{shop}shop page</div>
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
      <Header/>
      <ShopContent params={params} />
      <Shopheder/>

    </Suspense>
  )
}
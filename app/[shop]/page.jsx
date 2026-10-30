import React, { Suspense } from 'react'
import Header from '@/app/components/marketplace/mCommon/header/header'
import Shopheder from '@/app/components/shop/shop_header/shop_h'
import Navbar from '@/app/components/shop/navbar/navbar'
import Shopsidebar from '@/app/components/shop/shopsidebar/shopsidebar'
import Products from '@/app/components/shop/products/products'
import StickyHeader from '@/app/components/shop/StickyHeader'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative isolate min-h-screen bg-slate-50">
        
            <>
              <Header/>
              <Shopheder />
            </>
        
          <Navbar />
       

        <div className="mx-auto flex w-full max-w-7xl items-start px-3 py-4 sm:px-5 lg:gap-6 lg:px-8">
          <Shopsidebar />
          <Products />
        </div>
      </div>
    </Suspense>
  )
}
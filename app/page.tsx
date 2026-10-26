import React from 'react'
import AnnouncementBar from '@/app/components/marketplace/mCommon/announcementBar'
import Header from '@/app/components/marketplace/mCommon/header/header'
import Mainnavigation from '@/app/components/marketplace/mCommon/mainNavigation/index'
import HeroBanner from '@/app/components/marketplace/homePage/heroBanner/heroBanner'
import CategoryShowcase from '@/app/components/marketplace/homePage/categoryShowcase/Shopbycategory'
import FlashDealsSection from '@/app/components/marketplace/homePage/fashDealsSection/flash_deals'
import PromoBannerGrid from '@/app/components/marketplace/homePage/promoBannerGrid/promo_carousel'
import TopRatedShopsSection from '@/app/components/marketplace/homePage/topRatedShopsSection/topratedshops'
import WhyChooseUsSection from '@/app/components/marketplace/homePage/whyChooseUsSection/whychooseus'
import BusinessCtaBanner from '@/app/components/marketplace/homePage/businessCtaBanner/ctabanner'
import Footer from '@/app/components/marketplace/mCommon/footer/footer'

function page() {
  return (
    <div>
      <AnnouncementBar/>
      <Header/>
      <Mainnavigation/>
      <HeroBanner/>
      <CategoryShowcase/>
      <FlashDealsSection/>
      <PromoBannerGrid/>
      <TopRatedShopsSection/>
      <WhyChooseUsSection/>
      <BusinessCtaBanner/>
      <Footer/>

      page

    </div>
  )
}

export default page
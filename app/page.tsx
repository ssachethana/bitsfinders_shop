


import Header from '@/app/components/marketplace/mCommon/header/header'
import Mainnavigation from '@/app/components/marketplace/mCommon/mainNavigation/index'
import Productssection from '@/app/components/marketplace/homePage/productSection/productsSection'
import HotDealsSection from '@/app/components/marketplace/homePage/hotDealSection/hot_deals'
import PromoBannerGrid from '@/app/components/marketplace/homePage/promoBannerGrid/promo_carousel'
import TopRatedShopsSection from '@/app/components/marketplace/homePage/topRatedShopsSection/topratedshops'
import WhyChooseUsSection from '@/app/components/marketplace/homePage/whyChooseUsSection/whychoose'
import BusinessCtaBanner from '@/app/components/marketplace/homePage/businessCtaBanner/ctabanner'
import Footer from '@/app/components/marketplace/mCommon/footer/footer'
import StickyHeader from '@/app/components/marketplace/homePage/stickyHeader'

export default function Page() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-black">

      {/* Sticky header layers */}
      <StickyHeader>
        <div className="relative z-20">
          <Header />
        </div>

        <div className="relative z-10">
          <Mainnavigation />
        </div>
      </StickyHeader>

      {/* Main page content */}
       <main className="w-full sm:pt-80 lg:pt-35 ">

        <section className="w-full">
          <Productssection />
          <HotDealsSection/>
        </section>

        <section className="w-full">
          <PromoBannerGrid />
        </section>

        <section className="w-full">
          <TopRatedShopsSection />
        </section>

        <section className="w-full">
          <WhyChooseUsSection />
        </section>

        <section className="w-full">
          <BusinessCtaBanner />
        </section>

      </main> 

      {/* Footer */}
      {/* <Footer />
 */}
    </div>
  )
}

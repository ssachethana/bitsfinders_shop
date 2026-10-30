import { FLASH_DEALS_CSS, MOCK_DEALS, type Deal } from "@/app/components/marketplace/homePage/fashDealsSection/shared";
import FlashDealsHeader from "@/app/components/marketplace/homePage/fashDealsSection/flash_deals_header";
import DealCard from "@/app/components/marketplace/homePage/fashDealsSection/deal_card";

interface Props {
  deals?: Deal[];
  viewAllHref?: string;
  countdownHours?: number;
  onAddToCart?: (deal: Deal) => void;
  onToggleWishlist?: (deal: Deal, liked: boolean) => void;
}


export default function FlashDeals({
  deals = MOCK_DEALS,
  viewAllHref,
  countdownHours,
  onAddToCart,
  onToggleWishlist,
}: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-8 ">
      <style>{FLASH_DEALS_CSS}</style>

    

      <div className="relative mx-auto max-w-full ml-30 mr-30 bg-white">
        <FlashDealsHeader viewAllHref={viewAllHref} countdownHours={countdownHours} />

        {/* 2 cols on phones → 6 on wide desktops */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {deals.map((deal, i) => (
            <DealCard
              key={deal.id}
              deal={deal}
              index={i}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

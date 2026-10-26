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
    <section className="relative w-full overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-8">
      <style>{FLASH_DEALS_CSS}</style>

      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
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

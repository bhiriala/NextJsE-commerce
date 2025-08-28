import Brands from "@/components/brands/brands";
import CarrouselSwiper from "@/components/carrouselSwiper/carrouselSwiper";
import ProductWidgetArea from "@/components/ProductWidgetArea/ProductWidgetArea";
import Promo from "@/components/promo/promo";
export default function HomePage() {
  return (
    <div>
     <CarrouselSwiper/> 
     <Promo/>
     <Brands/>
     <ProductWidgetArea/>
    </div>
  );
}
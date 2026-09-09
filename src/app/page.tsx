import CategoryBand from "@/components/site/CategoryBand";
import FeaturedProducts from "@/components/site/FeaturedProducts";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Lookbook from "@/components/site/Lookbook";
import Navbar from "@/components/site/Navbar";
import Newsletter from "@/components/site/Newsletter";
import Reviews from "@/components/site/Reviews";
import { getProducts } from "@/lib/productStore";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts products={products} />
        <CategoryBand />
        <Lookbook />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

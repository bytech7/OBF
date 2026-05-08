import Products from "../components/Products";
import BouquetBuilder from "../components/BouquetBuilder";

export default function Boutique() {
  return (
    <div className="pt-20 md:pt-24 lg:pt-28">
      <Products />
      <BouquetBuilder />
    </div>
  );
}

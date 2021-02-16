import Pagination from "../components/Pagination";
import Products from "../components/Products";

export default function ProductPage() {
  return (
    <div>
      <Pagination page={3} />
      <Products />
      <Pagination page={3} />
    </div>
  );
}

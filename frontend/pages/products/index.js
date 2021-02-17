import { useRouter } from "next/dist/client/router";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

export default function ProductPage() {
  const { query } = useRouter();
  const actualPage = parseInt(query.page) || 1;
  return (
    <div>
      <Pagination page={actualPage} />
      <Products page={actualPage} />
      <Pagination page={actualPage} />
    </div>
  );
}

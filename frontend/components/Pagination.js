import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/Head";
import Link from "next/Link";
import DisplayError from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

export const TOTAL_ITEMS_QUERY = gql`
  query TOTAL_ITEMS_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(TOTAL_ITEMS_QUERY);
  const count = data?._allProductsMeta?.count;
  const pageCount = Math.ceil(count / perPage);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  return (
    <PaginationStyles>
      <Head>
        <title>Sick fits - Page {page}</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>↩ Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} items total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next ↪</a>
      </Link>
    </PaginationStyles>
  );
}

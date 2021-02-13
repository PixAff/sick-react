import { useQuery } from "@apollo/client";
import styled from "styled-components";
import gql from "graphql-tag";
import Product from "./Product";

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <ProductList>
        {data.allProducts.map((product) => (
          <Product product={product} key={product.id}/>
        ))}
      </ProductList>
    </div>
  );
}

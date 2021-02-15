import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    UpdateProduct(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      name
      price
      description
      id
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  console.log(data);
  return <div>UPDATE {id}</div>;
}

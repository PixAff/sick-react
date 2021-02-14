import Link from "next/Link";
import NavStyles from "./styles/NavStyles";

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/products">products</Link>
      <Link href="/sell">sell</Link>
      <Link href="/orders">orders</Link>
      <Link href="/account">account</Link>
    </NavStyles>
  );
}

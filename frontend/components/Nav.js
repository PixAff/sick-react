import Link from "next/Link";

export default function Nav() {
  return (
    <nav>
      <Link href="/products">products</Link>
      <Link href="/sell">sell</Link>
      <Link href="/orders">orders</Link>
      <Link href="/account">account</Link>
    </nav>
  );
}

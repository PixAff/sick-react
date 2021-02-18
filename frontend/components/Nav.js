import Link from "next/Link";
import { useCart } from "../lib/CartState";
import SignOut from "./SignOut";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">products</Link>
      {user && (
        <>
          <Link href="/sell">sell</Link>
          <Link href="/orders">orders</Link>
          <Link href="/account">account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            my cart
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}

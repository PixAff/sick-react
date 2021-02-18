import CartStyles from "./styles/CartStyles";
import { useUser } from "./User";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import CartItem from "./CartItem";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import { useCart } from "../lib/CartState";

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!me) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}

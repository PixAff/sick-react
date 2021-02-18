export default function calcTotalPrice(cart) {
  //   if (!cart) return 0;
  //   let total = 0;
  //   cart.map((item) => (total += item.quantity * item.product.price));

  //   return total;
  // }

  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // products can nbe deletet but could still be in the cart

    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}

import { products } from "./../seed-data/data";
import { CartItem } from "./../schemas/CartItem";
import {
  CartItemUpdateInput,
  CartItemCreateInput,
} from "./../.keystone/schema-types";
import { KeystoneContext, SessionStore } from "@keystone-next/types";

import { OrderCreateInput } from "../.keystone/schema-types";
import stripeConfig from "../lib/stripe";

const graphql = String.raw;
interface Arguments {
  token: string;
}

async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("You must be logged in to create an order");
  }

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });

  const cartItems = user.cart.filter((CartItem) => CartItem.product);

  const amount = cartItems.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);

  console.log(amount);

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "EUR",
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  console.log(charge);
  // create orderItems from CartItems:
  const orderItems = cartItems.map((item) => {
    const orderItem = {
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      quantity: item.quantity,
      photo: { connect: { id: item.product.photo.id } },
    };
    return orderItem;
  });

  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });
  // clean up any old cart items:
  const cartItemsId = user.cart.map((item) => item.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemsId,
  });
  return order;
}

export default checkout;

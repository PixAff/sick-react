import { list } from "@keystone-next/keystone/schema";
import { text, integer, relationship, virtual } from "@keystone-next/fields";
import formatMoney from "../lib/formatMoney";

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: "String",
      resolver: function (item) {
        return `${item.id} ${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});

import { TOTAL_ITEMS_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo that we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // read the number of items from the cache:
      const data = cache.readQuery({ query: TOTAL_ITEMS_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If
      // There are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN JUST SEND IT

      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // if there are no items: go to the network (returning false goes to merge())
        return false;
      }

      if (items.length) {
        return items;
      }

      return false; // fallback to network if something goes wrong
      //
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // return the merged items from the cache (Apollo tries read again afterwards)
      return merged;
    },
  };
}

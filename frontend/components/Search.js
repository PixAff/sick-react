import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import Router from "next/router";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_QUERY = gql`
  query SEARCH_QUERY($searchTerm: String!) {
    allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const [findItems, { loading, data, error }] = useLazyQuery(SEARCH_QUERY, {
    fetchPolicy: "no-cache",
  });
  const items = data?.allProducts || [];
  const findItemsbutChill = debounce(findItems, 350);

  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsbutChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      Router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an item",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              {
                <img
                  width="50"
                  src={item.photo?.image?.publicUrlTransformed}
                  alt={item.name}
                />
              }
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, not items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}

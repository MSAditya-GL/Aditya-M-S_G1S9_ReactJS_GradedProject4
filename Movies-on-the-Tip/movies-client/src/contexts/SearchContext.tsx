import { ChangeEvent, createContext } from "react";

const SearchContext = createContext({
  searchKey: "",
  search: (event: ChangeEvent<HTMLInputElement>) => {},
});

export default SearchContext;

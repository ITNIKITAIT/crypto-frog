import { ProductProps } from "lib/product/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

interface FilterContextProps {
  selectedCategories: number[];
  setSelectedCategories: (categories: number[]) => void;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  productsFiltered: ProductProps[];
  setProducts: (productsFiltered: ProductProps[]) => void;
  productsForCategory: ProductProps[];
  setProductsForCategory: (productsFiltered: ProductProps[]) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  initialSelectedCategories: number[];
  initialSelectedCountries: string[];
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  initialSelectedCategories,
  initialSelectedCountries,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories,
  );
  const [selectedCountries, setSelectedCountries] = useState(
    initialSelectedCountries,
  );
  const [productsFiltered, setProducts] = useState<ProductProps[]>([]);
  const [productsForCategory, setProductsForCategory] = useState<
    ProductProps[]
  >([]);

  useEffect(() => {
    setSelectedCategories(initialSelectedCategories);
    setSelectedCountries(initialSelectedCountries);
  }, [
    initialSelectedCategories,
    selectedCategories,
    selectedCountries,
    initialSelectedCountries,
  ]);

  const value = useMemo(
    () => ({
      selectedCategories,
      setSelectedCategories,
      selectedCountries,
      setSelectedCountries,
      productsFiltered,
      setProducts,
      productsForCategory,
      setProductsForCategory,
    }),
    [
      selectedCategories,
      selectedCountries,
      productsFiltered,
      productsForCategory,
    ],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error("useFilter must be used within a FilterProvider");
  return context;
};

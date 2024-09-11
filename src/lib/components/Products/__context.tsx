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
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  initialSelectedCategories: number[];
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  initialSelectedCategories,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories,
  );

  useEffect(() => {
    setSelectedCategories(initialSelectedCategories);
  }, [initialSelectedCategories, selectedCategories]);

  const value = useMemo(
    () => ({
      selectedCategories,
      setSelectedCategories,
    }),
    [selectedCategories],
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

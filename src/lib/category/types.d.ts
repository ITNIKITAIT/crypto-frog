export type CategoryProps = {
  id: number;
  name: string;
  pinned: boolean;
};

export type CountryProps = {
  id: number;
  name: string;
};

export type AddCategoryProps = Omit<CategoryProps, "id">;

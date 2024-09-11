export type CategoryProps = {
  id: number;
  name: string;
  pinned: boolean;
};

export type AddCategoryProps = Omit<CategoryProps, "id">;

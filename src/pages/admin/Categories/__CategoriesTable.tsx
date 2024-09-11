import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { CategoryProps } from "lib/category/types";
import Icon from "lib/ui/Icon";
import DeleteCategory from "./__DeleteCategory";
import EditCategory from "./__EditCategory";
import style from "./__style.module.scss";

const CategoriesTable = ({
  categories,
  reload,
}: {
  categories: ReadonlyArray<CategoryProps>;
  reload: () => void;
}): JSX.Element => (
  <TableContainer
    component={Paper}
    sx={{
      mt: 2,
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell size="small" />
          <TableCell size="small">
            <b>Номер</b>
          </TableCell>
          <TableCell size="small">
            <b>Название</b>
          </TableCell>
          <TableCell size="small" />
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map(category => (
          <TableRow key={category.id}>
            <TableCell size="small">
              <EditCategory
                category={category}
                reload={reload}
              />
            </TableCell>
            <TableCell size="small">{category.id}</TableCell>
            <TableCell size="small">
              {category.name}
              {category.pinned && (
                <Icon
                  icon="star"
                  className={style["icon--star"]}
                />
              )}
            </TableCell>
            <TableCell
              size="small"
              align="right"
            >
              <DeleteCategory
                categoryId={category.id}
                categoryName={category.name}
                reload={reload}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

CategoriesTable.displayName = "CategoriesTable";

export default CategoriesTable;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilterProvider } from "lib/components/Products/__context";
import { MAIN_PAGE_CONTENT } from "../cms/MainPageContent";
import Layout from "../lib/components/Layout";
import MainPageBanner from "../lib/components/MainPageBanner";
import Products from "../lib/components/Products";

const MainPage = (): JSX.Element => {
  const { categoryIds } = useParams<{ categoryIds?: string }>();
  const [initialSelectedCategories, setInitialSelectedCategories] = useState<
    number[]
  >([]);

  useEffect(() => {
    if (categoryIds) {
      const ids = categoryIds.split(",").map(Number);
      setInitialSelectedCategories(ids);
    } else {
      setInitialSelectedCategories([]);
    }
  }, [categoryIds]);

  const { banner } = MAIN_PAGE_CONTENT;
  return (
    <Layout>
      <FilterProvider initialSelectedCategories={initialSelectedCategories}>
        <MainPageBanner
          // title={banner.title}
          extra={banner.extra}
          subtitle={banner.subtitle}
          // description={banner.description}
          actions={banner.actions}
        />
        <Products />
      </FilterProvider>
    </Layout>
  );
};

MainPage.displayName = "MainPage";

export default MainPage;

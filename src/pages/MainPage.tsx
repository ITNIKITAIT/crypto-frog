import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FilterProvider } from "lib/components/Products/__context";
import { MAIN_PAGE_CONTENT } from "../cms/MainPageContent";
import Layout from "../lib/components/Layout";
import MainPageBanner from "../lib/components/MainPageBanner";
import Products from "../lib/components/Products";

const MainPage = (): JSX.Element => {
  const { categoryIds } = useParams<{ categoryIds?: string }>();
  const [searchParams] = useSearchParams();
  const countries = searchParams.get("countries");
  const [initialSelectedCategories, setInitialSelectedCategories] = useState<
    number[]
  >([]);
  const [initialSelectedCountries, setinitialSelectedCountries] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (categoryIds) {
      const ids = categoryIds.split(",").map(Number);
      setInitialSelectedCategories(ids);
    } else {
      setInitialSelectedCategories([]);
    }

    if (countries) {
      const names = countries.split(",");
      setinitialSelectedCountries(names);
    } else {
      setinitialSelectedCountries([]);
    }
  }, [categoryIds, countries]);

  const { banner } = MAIN_PAGE_CONTENT;
  return (
    <Layout>
      <FilterProvider
        initialSelectedCategories={initialSelectedCategories}
        initialSelectedCountries={initialSelectedCountries}
      >
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

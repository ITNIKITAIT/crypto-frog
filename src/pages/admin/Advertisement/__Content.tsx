import { Fragment, useEffect, useState } from "react";
import Icon from "lib/ui/Icon";
import { postApiAdminAdvertisement } from "lib/endpoints/api/admin/advertisement/post";
import Button from "lib/ui/Button";
import { useNotification } from "lib/notification";
import { useAuth } from "lib/auth/admin/AuthContext";
import { getExistingBanner } from "lib/endpoints/api/admin/advertisement/get";
import AdTable from "./AdTable";
import styles from "./__style.module.scss";
import DeleteBanner from "./__DeleteBanner";

const Content = (): JSX.Element => {
  const [bigFile, setBigFile] = useState<File | null>(null);
  const [smallFile, setSmallFile] = useState<File | null>(null);
  const [hyperlink, setHyperlink] = useState<string>("");
  const [isExists, setIsExists] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const { token } = useAuth();

  const reset = () => {
    setBigFile(null);
    setSmallFile(null);
    setHyperlink("");
    setIsExists(false);
  };

  const handleSubmit = async () => {
    if (!bigFile || !smallFile || !hyperlink) {
      return;
    }

    const formData = new FormData();
    formData.append("desktopImage", bigFile);
    formData.append("mobileImage", smallFile);
    formData.append("linkUrl", hyperlink);

    try {
      const response = await postApiAdminAdvertisement({
        advertisement: formData,
        token,
      });

      if (response.status === 201) {
        setNotification({
          message: "Баннер успешно загружен",
          type: "success",
        });
        reset();
        setIsExists(true);
      }
    } catch (err) {
      setNotification({
        message: `Ошибка при загрузке баннера ${err}`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const desktopResponse = await getExistingBanner({ token });
        setIsExists(desktopResponse.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchBanners();
  }, [token]);

  return (
    <Fragment>
      <div className={styles.loader__container}>
        <AdTable
          height={164}
          width={1032}
          file={bigFile}
          setFile={setBigFile}
          title="Баннер для ПК-версии"
        />
        <AdTable
          height={260}
          width={312}
          file={smallFile}
          setFile={setSmallFile}
          title="Баннер для мобильной версии"
        />
        <div className={styles.hyperlink}>
          <input
            placeholder="Гиперссылка для банера"
            type="text"
            value={hyperlink}
            onChange={e => setHyperlink(e.target.value)}
          />
          <Icon
            icon="hyperlink"
            className={styles.hyperlink_icon}
          />
        </div>
        <div className={styles.buttons__wrapper}>
          <DeleteBanner
            reset={reset}
            isExists={isExists}
          />
          <Button
            onClick={handleSubmit}
            variant="secondary"
            className={styles["save-btn"]}
            disabled={!(smallFile && bigFile && hyperlink)}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;

import { Fragment, useState } from "react";
import Icon from "lib/ui/Icon";
import { postApiAdminAdvertisement } from "lib/endpoints/api/admin/advertisement/post";
import Button from "lib/ui/Button";
import { useNotification } from "lib/notification";
import { useAuth } from "lib/auth/admin/AuthContext";
import AdTable from "./AdTable";
import styles from "./__style.module.scss";

const Content = (): JSX.Element => {
  const [bigFile, setBigFile] = useState<File | null>(null);
  const [smallFile, setSmallFile] = useState<File | null>(null);
  const [hyperlink, setHyperlink] = useState<string>("");
  const { setNotification } = useNotification();
  const { token } = useAuth();

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
      }
    } catch (err) {
      setNotification({
        message: `Ошибка при загрузке баннера ${err}`,
        type: "error",
      });
    }
  };

  return (
    <Fragment>
      <div className={styles.loader__container}>
        <AdTable
          height={164}
          width={1032}
          file={bigFile}
          setFile={setBigFile}
        />
        <AdTable
          height={260}
          width={312}
          file={smallFile}
          setFile={setSmallFile}
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

        <Button
          onClick={handleSubmit}
          variant="secondary"
          className={styles["save-btn"]}
          disabled={!(smallFile && bigFile && hyperlink)}
        >
          Сохранить
        </Button>
      </div>
    </Fragment>
  );
};

Content.displayName = "Content";

export default Content;

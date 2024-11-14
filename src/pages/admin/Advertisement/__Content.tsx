import { Fragment, useState } from "react";
import Icon from "lib/ui/Icon";
import Button from "lib/ui/Button";
import AdTable from "./AdTable";
import styles from "./__style.module.scss";

const Content = (): JSX.Element => {
  const [bigFile, setBigFile] = useState<File | null>(null);
  const [smallFile, setSmallFile] = useState<File | null>(null);
  const [hyperlink, setHyperlink] = useState<string>("");

  const isDisabled = !smallFile && !bigFile;
  console.log(isDisabled);

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

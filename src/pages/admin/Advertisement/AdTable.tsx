import Loader from "./Loader";
import styles from "./__style.module.scss";

const AdTable = ({
  setFile,
  file,
  width,
  height,
}: {
  setFile: (file: File) => void;
  width: number;
  height: number;
  file: File | null;
}) => (
  <div className={styles.loader}>
    <div>
      <h2 className={styles.loader__title}>Баннер для ПК-версии</h2>
      <p className={styles.loader__subtitle}>
        Загрузите изображение форматом: Ш=<span>{width}</span>px, В=
        <span>{height}</span>
        px
      </p>
    </div>
    <Loader
      width={width}
      height={height}
      file={file}
      setFile={setFile}
    />
  </div>
);

export default AdTable;

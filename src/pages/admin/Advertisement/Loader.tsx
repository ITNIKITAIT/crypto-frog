import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNotification } from "lib/notification";
import styles from "./__style.module.scss";

const Loader = ({
  setFile,
  file,
  width,
  height,
}: {
  setFile: (file: File) => void;
  width: number;
  height: number;
  file: File | null;
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const { setNotification } = useNotification();

  const validateImageDimensions = async (imageFile: File) =>
    new Promise<boolean>(resolve => {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
      img.onload = () => {
        if (img.width === width && img.height === height) {
          resolve(true);
        } else {
          resolve(false);
        }
        URL.revokeObjectURL(img.src);
      };
    });

  const onDropRejected = async (rejectedFiles: FileRejection[]) => {
    const [newFile] = rejectedFiles;
    setIsDragOver(false);
    setNotification({
      message: `Ошибка: "${newFile.errors[0].message}"`,
      type: "error",
    });
  };
  const onDropAccepted = async (acceptedFiles: File[]) => {
    const [newFile] = acceptedFiles;
    const isValidDimensions = await validateImageDimensions(newFile);
    if (!isValidDimensions) {
      setNotification({
        message: `Ошибка: изображение должно быть ${width}x${height}px`,
        type: "error",
      });
      setIsDragOver(false);
      return;
    }
    setFile(newFile);

    setIsDragOver(false);
  };

  return (
    <div
      className={`${styles.zone} ${isDragOver ? styles.dragging : ""} ${
        file ? styles.bordered : ""
      }`}
    >
      <Dropzone
        onDropRejected={onDropRejected}
        onDropAccepted={onDropAccepted}
        maxSize={5242880}
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpeg"],
          "image/jpg": [".jpg"],
        }}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <section
            className={styles.zone__inside}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className={styles.zone__container}>
              {file ? (
                <CheckCircleOutlineIcon
                  style={{ color: "#A0F900" }}
                  className={styles.zone__icon}
                />
              ) : (
                <FileUploadIcon className={styles.zone__icon} />
              )}

              <p>Нажмите, что бы загрузить, или перетащите изображение</p>
              <div>
                <div className={styles.zone__rules}>
                  Принимаются: .jpg .png .webp .jpeg в размере{" "}
                  <span>
                    {width}х{height}
                  </span>{" "}
                  px
                </div>
                <div className={styles.zone__rules}>
                  Размер изображения не должен превышать <span>5 мб</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default Loader;

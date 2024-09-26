import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";

import { Fragment, useCallback, useState } from "react";
import CreateNewPromocodeModal from "./__CreateNewPromocodeModal";
import { PromocodeType } from "../types";
import styles from "../__style.module.scss";
import { CustomSwitch } from "./CustimSwitch";

const CreateNewPromocode = ({
  reload,
  type,
  handleType,
}: {
  reload: () => void;
  type: PromocodeType;
  handleType: (newType: PromocodeType) => void;
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  const handleChange = () => {
    handleType(type === "GENERAL" ? "PERSONAL" : "GENERAL");
  };

  return (
    <Fragment>
      <ButtonContainer>
        <div className={styles.switcher}>
          <CustomSwitch
            checked={type === "PERSONAL"}
            onClick={handleChange}
          />
          <p>Только персональные промокоды</p>
        </div>
        <Button
          className={styles.addButton}
          onClick={handleModalOpen}
        >
          Добавить промокод
        </Button>
      </ButtonContainer>
      <CreateNewPromocodeModal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

CreateNewPromocode.displayName = "CreateNewPromocode";

export default CreateNewPromocode;

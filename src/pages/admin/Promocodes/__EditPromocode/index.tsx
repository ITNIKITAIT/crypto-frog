import { useState, useCallback, Fragment } from "react";

import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import EditPromocodeModal from "./__EditPromocodeModal";
import { IProcomodeItem } from "../types";

const EditPromocode = ({
  promocode,
  reload,
}: {
  promocode: IProcomodeItem;
  reload: () => void;
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <Fragment>
      <IconButton onClick={handleModalOpen}>
        <Edit />
      </IconButton>
      <EditPromocodeModal
        promocode={promocode}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

EditPromocode.displayName = "EditPromocode";

export default EditPromocode;

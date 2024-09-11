import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";

import { Fragment, useCallback, useState } from "react";
import CreateNewCategoryModal from "./__CreateNewCategoryModal";

const CreateNewCategory = ({ reload }: { reload: () => void }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);
  return (
    <Fragment>
      <ButtonContainer>
        <Button onClick={handleModalOpen}>Добавить категорию</Button>
      </ButtonContainer>
      <CreateNewCategoryModal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

CreateNewCategory.displayName = "CreateNewCategory";

export default CreateNewCategory;

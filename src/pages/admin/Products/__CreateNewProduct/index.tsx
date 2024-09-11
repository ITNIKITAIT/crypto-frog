import Button from "lib/ui/Button";
import ButtonContainer from "lib/ui/ButtonContainer";
import { useAuth } from "lib/auth/admin/AuthContext";
import { useNavigate } from "react-router-dom";

import { Fragment, useCallback, useState, useEffect } from "react";
import CreateNewProductModal from "./__CreateNewProductModal";

const CreateNewProduct = ({ reload }: { reload: () => void }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);
  const { token } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/xxxopernDyn5fYk/admin/login");
    }
  }, [token, navigate]);
  return (
    <Fragment>
      <ButtonContainer>
        <Button onClick={handleModalOpen}>Добавить товар</Button>
      </ButtonContainer>
      <CreateNewProductModal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={reload}
      />
    </Fragment>
  );
};

CreateNewProduct.displayName = "CreateNewProduct";

export default CreateNewProduct;

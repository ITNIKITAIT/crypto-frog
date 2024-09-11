import type { ProfileCardProps, ProfileProps } from "lib/profile/types";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "lib/auth/admin/AuthContext";
import { AxiosError } from "axios";

import Modal from "lib/ui/Modal";
import { getApiAdminProfileByEmail } from "lib/endpoints/api/admin/profile/get";
import { Alert, CircularProgress } from "@mui/material";
import Content from "./__Content";

const UserProfileModal = ({
  user,
  isModalOpen,
  onSuccess,
  onClose,
}: {
  user: ProfileProps;
  isModalOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}): JSX.Element => {
  const { token } = useAuth();

  const [userCard, setUserCard] = useState<null | ProfileCardProps>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isUserCardLoading, setIsUserCardLoading] = useState<boolean>(false);

  const fetchUserCard = useCallback(async () => {
    try {
      const response = await getApiAdminProfileByEmail({
        email: user.email,
        token,
      });
      setUserCard(response.data);
    } catch (_error: unknown) {
      if (_error instanceof AxiosError) {
        setErrorMessage("Ошибка при получении профиля пользователя");
      }
    } finally {
      setIsUserCardLoading(false);
    }
  }, [token, user.email]);

  useEffect(() => {
    if (isModalOpen) {
      setIsUserCardLoading(true);
      fetchUserCard();
    }
  }, [fetchUserCard, isModalOpen]);

  return (
    <Modal
      open={isModalOpen}
      title={`Профиль пользователя ${user.email}`}
      onClose={onClose}
    >
      {isUserCardLoading ? (
        <CircularProgress />
      ) : errorMessage || !userCard ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : (
        <Content
          user={userCard}
          token={token}
          onSuccess={onSuccess}
          reload={fetchUserCard}
        />
      )}
    </Modal>
  );
};

UserProfileModal.displayName = "UserProfileModal";

export default UserProfileModal;

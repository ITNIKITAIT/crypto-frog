import type { ProfileCardProps } from "lib/profile/types";

import { ChangeEvent, Fragment, useCallback, useState } from "react";
import { postApiAdminDiscount } from "lib/endpoints/api/admin/discount/post";
import { putApiAdminProfileBan } from "lib/endpoints/api/admin/profile/ban/put";
import { AxiosError } from "axios";

import { Grid, Typography, TextField, Alert } from "@mui/material";
import Button from "lib/ui/Button";
import { putApiAdminProfileUnban } from "lib/endpoints/api/admin/profile/unban/put";
import { deleteApiAdminDiscount } from "lib/endpoints/api/admin/discount/delete";
import { round } from "lib/utils/round";
import numberToUsd from "lib/price/numberToUsd";

const Content = ({
  user,
  token,
  onSuccess,
  reload,
}: {
  user: ProfileCardProps;
  token: null | string;
  onSuccess: () => void;
  reload: () => void;
}): JSX.Element => {
  const [banStatus, setBanStatus] = useState<boolean>(user.banned);
  const [openDiscount, setOpenDiscount] = useState<boolean>(false);
  const [discountAmount, setDiscountAmount] = useState<null | string>(
    user.discount ? user.discount.toString() : null,
  );
  const [isBanLoading, setIsBanLoading] = useState<boolean>(false);
  const [isDiscountLoading, setIsDiscountLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleBanUser = useCallback(async () => {
    try {
      setIsBanLoading(true);
      if (banStatus === false) {
        await putApiAdminProfileBan({
          profile: {
            id: user.id,
            email: user.email,
            banned: !banStatus,
          },
          token,
        });
      } else {
        await putApiAdminProfileUnban({
          profile: {
            id: user.id,
            email: user.email,
            banned: !banStatus,
          },
          token,
        });
      }
      setBanStatus(!banStatus);
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage("Ошибка при бане/анбане пользователя");
      }
    } finally {
      setIsBanLoading(false);
    }
  }, [banStatus, onSuccess, token, user.email, user.id]);

  const handleOpenDiscount = useCallback(() => {
    setOpenDiscount(true);
  }, []);

  // useEffect(() => {
  //   setBanStatus(user.banned);
  // }, [user.banned]);

  const handleChangeDiscount = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (/^[0-9][0-9]?$/.test(value) || value === "") {
        setDiscountAmount(value);
      }
    },
    [],
  );

  const handleAddDiscount = useCallback(async () => {
    try {
      setIsDiscountLoading(true);
      if (discountAmount !== null) {
        await postApiAdminDiscount({
          discount: {
            // userId: user.id,
            code: "test",
            amount: +discountAmount,
          },
          token,
        });
        onSuccess();
        setOpenDiscount(false);
        reload();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage("Ошибка при добавлении скидки");
      }
    } finally {
      setIsDiscountLoading(false);
    }
  }, [discountAmount, onSuccess, reload, token]);

  const handleDeleteDiscount = useCallback(async () => {
    try {
      await deleteApiAdminDiscount({
        id: user.id,
        token,
      });
      onSuccess();
      reload();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage("Ошибка при удалении скидки");
      }
    }
  }, [onSuccess, reload, token, user.id]);

  return (
    <Grid
      container
      spacing={2}
      p={2}
    >
      <Grid
        item
        xs={12}
      >
        <Typography>
          Количество покупок в магазине: {user.numberOfOrders}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Typography>
          Скидка в магазине: {user.discount ? user.discount : 0}%
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        mb={3}
      >
        <Typography>
          Сумма покупок: {numberToUsd(round(user.totalCostOfOrders, 2))}
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {banStatus ? (
          <Button
            isLoading={isBanLoading}
            onClick={handleBanUser}
            fullWidth
          >
            Разбанить
          </Button>
        ) : (
          <Button
            isLoading={isBanLoading}
            onClick={handleBanUser}
            fullWidth
          >
            Забанить пользователя
          </Button>
        )}
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {user.discount !== null ? (
          <Button
            fullWidth
            onClick={handleDeleteDiscount}
          >
            Удалить скидку
          </Button>
        ) : (
          <Button
            onClick={handleOpenDiscount}
            fullWidth
            disabled={openDiscount === true}
          >
            Добавить скидку
          </Button>
        )}
      </Grid>
      {openDiscount && (
        <Fragment>
          <Grid
            item
            xs={8}
            mt={2}
          >
            <TextField
              id="discount"
              label="Скидка (%)"
              type="text"
              fullWidth
              onChange={handleChangeDiscount}
              value={discountAmount}
              inputProps={{
                pattern: "^[0-9][0-9]?$",
              }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            mt={2}
          >
            <Button
              isLoading={isDiscountLoading}
              onClick={handleAddDiscount}
              fullWidth
            >
              Подтвердить
            </Button>
          </Grid>
        </Fragment>
      )}
      {errorMessage && (
        <Grid
          item
          xs={12}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
      )}
    </Grid>
  );
};

Content.displayName = "Content";

export default Content;

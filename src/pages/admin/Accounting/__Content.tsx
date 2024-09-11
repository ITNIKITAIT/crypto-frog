import {
  getCurrentDateTimeString,
  getStartOfMonthDateTimeString,
} from "lib/time";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import type { AccountantItemProps } from "lib/accountant/types";
import { useNavigate } from "react-router-dom";
import { getApiAdminOrderAccountant } from "lib/endpoints/api/admin/order/accountant/get";
import AccountantTable from "./__AccountantTable";
import TimerangePicker from "./__TimerangePicker";
import PeriodInfo from "./__PeriodInfo";

const Content = ({ token }: { token: string }): JSX.Element => {
  const currentURL = window.location.href;
  const urlSearchParams = new URLSearchParams(currentURL);
  const fromParam = urlSearchParams.get("from");
  const toParam = urlSearchParams.get("to");

  const isoStringStartOfMonth = getStartOfMonthDateTimeString();
  const currentDate = getCurrentDateTimeString();

  const navitage = useNavigate();
  const [fromDate, setFromDate] = useState(fromParam || isoStringStartOfMonth);
  const [toDate, setToDate] = useState(toParam || currentDate);

  const [items, setItems] = useState<null | ReadonlyArray<AccountantItemProps>>(
    null,
  );
  const [error, setError] = useState<null | AxiosError>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const totalSell = items?.reduce((acc, item) => acc + item.sell, 0);
  const totalIncome = items?.reduce((acc, item) => acc + item.income, 0);

  const handleFromDateChange = useCallback(
    (date: string) => {
      setFromDate(date);
    },
    [setFromDate],
  );

  const handleToDateChange = useCallback(
    (date: string) => {
      setToDate(date);
    },
    [setToDate],
  );

  useEffect(() => {
    const fetchAccountant = async ({
      from,
      to,
    }: {
      from: string;
      to: string;
    }) => {
      try {
        setIsLoading(true);
        const response = await getApiAdminOrderAccountant({ from, to, token });
        if (response.status === 200) {
          setItems([...response.data]);
        }
        if (response.status === 204) {
          setItems([]);
        }
      } catch (_error: unknown) {
        if (_error instanceof AxiosError) {
          setError(_error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Обновляем URL с новыми значениями параметров запроса
    navitage(`/xxxopernDyn5fYk/admin/accounting?from=${fromDate}&to=${toDate}`);
    fetchAccountant({ from: fromDate, to: toDate });
  }, [fromDate, navitage, toDate, token]);

  return (
    <>
      <TimerangePicker
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={handleFromDateChange}
        onToDateChange={handleToDateChange}
      />
      {totalIncome !== undefined && totalSell !== undefined && (
        <PeriodInfo
          totalSell={totalSell}
          totalIncome={totalIncome}
        />
      )}

      <AccountantTable
        items={items}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

Content.displayName = "Content";

export default Content;

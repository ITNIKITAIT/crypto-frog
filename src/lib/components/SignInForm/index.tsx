import {
  Container,
  CssBaseline,
  Box,
  TextField,
  ThemeProvider,
  Alert,
} from "@mui/material";
import { useCallback, useState } from "react";
import Typography from "lib/ui/Typography";
import Button from "lib/ui/Button";
import Logo from "lib/ui/Logo";
import { postAdminLogin } from "lib/endpoints/admin/login/post";
import { AxiosError } from "axios";

import { theme } from "lib/ui/theme";
import { useNavigate } from "react-router-dom";
import { useAuth } from "lib/auth/admin/AuthContext";
import style from "./__style.module.scss";
import Copyright from "./__Copyright";

const SignInForm = (): JSX.Element => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(event.target.value);
    },
    [],
  );

  const handleInputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        const response = await postAdminLogin({ login, password });

        if (response.status === 200) {
          setToken(response.data.token);
          navigate("/xxxopernDyn5fYk/admin/accounting");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 401:
              setErrorMessage("Неверный логин или пароль");
              break;
            case 500:
              setErrorMessage("Ошибка сервера");
              break;
            default:
              setErrorMessage("Неизвестная ошибка");
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [login, navigate, password, setToken],
  );

  const isButtonDisabled = !login || !password;

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 6,
            py: 2,
          }}
        >
          <Logo />
          <Typography
            component="h1"
            variant="title2"
          >
            Вход в систему
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              value={login}
              onChange={handleInputLogin}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              value={password}
              onChange={handleInputPassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className={style["submit-button"]}
              disabled={isButtonDisabled}
            >
              Войти
            </Button>
            {errorMessage && (
              <Alert
                variant="outlined"
                severity="error"
                sx={{
                  mt: 2,
                }}
              >
                {errorMessage}
              </Alert>
            )}
          </Box>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

SignInForm.displayName = "SignInForm";

export default SignInForm;

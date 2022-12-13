import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { FormEvent } from "react";
import { SessionStructure } from "../components/SessionStructure";
import { theme } from "../utils/theme";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const Home = () => {
  const { palette, spacing } = theme;
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const [cookie, setCookie] = useCookies(["session"]);

  const { mutate, isLoading, data, reset } = useMutation(
    (data: RequestInit | undefined) =>
      fetch("/api/sessions/login", data).then(async (response) => ({
        status: response.status,
        body: await response.json(),
      }))
  );
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: RequestInit = {
      body: JSON.stringify(login),
      method: "POST",
    };
    mutate(params);
  };

  const setParamsToCookie = () => {
    setCookie("session", JSON.stringify(data?.body), {
      expires: new Date(data?.body?.expires),
    });
    push("/app");
  };

  useEffect(() => {
    data?.status === 200
      ? setParamsToCookie()
      : data?.body?.message &&
        enqueueSnackbar(data?.body?.message, {
          variant: "error",
          onClose: () => reset(),
        });
    return () => reset();
  }, [data]);
  return (
    <SessionStructure>
      <Box component="form" onSubmit={submit}>
        <TextField
          fullWidth
          value={login.email}
          type="email"
          onChange={(e) =>
            setLogin({
              ...login,
              email: e.target.value,
            })
          }
          label="E-mail"
          variant="outlined"
          color="primary"
          sx={{
            marginBottom: spacing(2),
          }}
        />
        <TextField
          fullWidth
          type="password"
          value={login.password}
          onChange={(e) =>
            setLogin({
              ...login,
              password: e.target.value,
            })
          }
          label="Senha"
          variant="outlined"
          color="primary"
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mt: spacing(2),
            mb: spacing(6),
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Button variant="contained" type="submit">
            {isLoading ? (
              <CircularProgress color="inherit" size={16} />
            ) : (
              "Entrar"
            )}
          </Button>
          <Link href="/forgot-password">
            <Typography
              variant="body1"
              sx={{
                transition: "all ease 0.125s",
                ml: spacing(2),
                "&:hover": {
                  color: palette.secondary.main,
                },
              }}
            >
              Recuperar senha
            </Typography>
          </Link>
        </Box>
        <Link href="/create-user">
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              transition: "all ease 0.125s",
              "&:hover": {
                color: palette.secondary.main,
              },
            }}
          >
            Novo por aqui? Crie seu usuário.
          </Typography>
        </Link>
      </Box>
    </SessionStructure>
  );
};

export default Home;

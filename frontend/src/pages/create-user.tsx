import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { SessionStructure } from "../components/SessionStructure";
import { theme } from "../utils/theme";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";

const Home = () => {
  const { palette, spacing } = theme;
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const { mutate, isLoading, data, reset } = useMutation(
    (data: RequestInit | undefined) =>
      fetch("/api/users/create", data).then(async (response) => ({
        status: response.status,
        body: await response.json(),
      }))
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    document: "",
    documentType: "CPF",
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: RequestInit = {
      body: JSON.stringify({
        ...user,
        phone: +user.phone,
        document: +user.document,
      }),
      method: "POST",
    };
    mutate(params);
  };

  useEffect(() => {
    data?.status === 201
      ? enqueueSnackbar("Usuário criado com sucesso!", {
          variant: "success",
          onClose: () => push("/"),
        })
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
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          fullWidth
          label="Nome"
          variant="outlined"
          color="primary"
          type="text"
          required
          sx={{
            marginBottom: spacing(2),
          }}
        />
        <TextField
          fullWidth
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          label="E-mail"
          variant="outlined"
          color="primary"
          type="email"
          required
          sx={{
            marginBottom: spacing(2),
          }}
        />
        <TextField
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          fullWidth
          label="Senha"
          variant="outlined"
          color="primary"
          type="password"
          required
          sx={{
            marginBottom: spacing(2),
          }}
        />
        <TextField
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          fullWidth
          label="Telefone"
          variant="outlined"
          color="primary"
          type="tel"
          required
          sx={{
            marginBottom: spacing(2),
          }}
        />
        <TextField
          value={user.document}
          error={
            (user.documentType === "CNPJ" &&
              user.document.length < 14 &&
              user.document.length > 0) ||
            (user.documentType === "CPF" &&
              user.document.length < 11 &&
              user.document.length > 0)
          }
          onChange={(e) => {
            const value = e.target.value.replace(/\D/, "");
            if (
              (user.documentType === "CNPJ" && value.length <= 14) ||
              (user.documentType === "CPF" && value.length <= 11)
            )
              setUser({
                ...user,
                document: value,
              });
          }}
          fullWidth
          label="Documento"
          variant="outlined"
          color="primary"
          type="tel"
          required
          sx={{
            marginBottom: spacing(2),
          }}
        />
        <FormControl
          required
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: spacing(2),
          }}
        >
          <FormLabel
            id="document-type"
            sx={{
              mr: spacing(2),
            }}
          >
            Tipo de documento
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="document-type"
            value={user.documentType}
            onChange={(e) =>
              setUser({
                ...user,
                documentType: e.target.value,
              })
            }
          >
            <FormControlLabel value="CPF" control={<Radio />} label="CPF" />
            <FormControlLabel value="CNPJ" control={<Radio />} label="CNPJ" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mb: spacing(6),
          }}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={16} />
          ) : (
            "Criar usuário"
          )}
        </Button>
        <Link href="/">
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
            Já possui uma conta? Entre agora.
          </Typography>
        </Link>
      </Box>
    </SessionStructure>
  );
};

export default Home;

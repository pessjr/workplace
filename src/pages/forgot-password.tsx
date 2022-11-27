import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Link from "next/link";
import { FormEvent } from "react";
import { SessionStructure } from "../components/SessionStructure";
import { theme } from "../utils/theme";

const Home = () => {
  const { palette, spacing } = theme;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <SessionStructure>
      <Box component="form" onSubmit={submit}>
        <TextField
          fullWidth
          label="E-mail"
          variant="outlined"
          color="primary"
          sx={{
            marginBottom: spacing(2),
          }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mb: spacing(6),
          }}
        >
          Recuperar senha
        </Button>
        <Link href="/">
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              transition: "all ease 0.125s",
              mb: spacing(1),
              "&:hover": {
                color: palette.secondary.main,
              },
            }}
          >
            Voltar para tela de login
          </Typography>
        </Link>{" "}
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

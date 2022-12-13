import React, { useState } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { User as UserInterface } from "..";
import { ServerPropsPrivateMiddleware } from "../../../../middlewares/serverSidePropsPrivateRouteMiddleware";
import { getUser } from "../../../../services/apis/users";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AppStructure } from "../../../../components/AppStructure";

const AppPage = (props: { user: UserInterface | null }) => {
  const [user, setUser] = useState<UserInterface>(
    props.user ?? {
      name: "",
      email: "",
      password: "",
      phone: "",
      document: "",
      documentType: "CPF",
    }
  );
  const createUser = () => {};
  return (
    <AppStructure>
      <Grid
        container
        sx={{ my: 4 }}
        spacing={2}
        component="form"
        onSubmit={createUser}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            type="text"
            variant="standard"
            label="Nome"
            fullWidth
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            type="text"
            variant="standard"
            label="E-mail"
            fullWidth
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            type="text"
            variant="standard"
            label="Telefone"
            fullWidth
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            required
            value={user?.document}
            error={
              (user?.documentType === "CNPJ" &&
                `${user?.document}`.length < 14 &&
                `${user?.document}`.length > 0) ||
              (user?.documentType === "CPF" &&
                `${user?.document}`.length < 11 &&
                `${user?.document}`.length > 0)
            }
            onChange={(e) => {
              const value = e.target.value.replace(/\D/, "");
              if (
                (user?.documentType === "CNPJ" && value.length <= 14) ||
                (user?.documentType === "CPF" && value.length <= 11)
              )
                setUser({
                  ...user,
                  document: +value,
                });
            }}
            type="text"
            variant="standard"
            label="Documento"
            fullWidth
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl
            required
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 2,
            }}
          >
            <FormLabel
              id="document-type"
              sx={{
                mr: 2,
              }}
            >
              Tipo de documento
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="document-type"
              value={user?.documentType}
              onChange={(e) =>
                setUser({
                  ...user,
                  documentType: e.target.value ?? "CPF",
                })
              }
            >
              <FormControlLabel value="CPF" control={<Radio />} label="CPF" />
              <FormControlLabel value="CNPJ" control={<Radio />} label="CNPJ" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </AppStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  props: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) =>
  ServerPropsPrivateMiddleware(props, async () => {
    let data: UserInterface | null = null;
    if (typeof props.query?.id === "string" && props.query?.id !== "create")
      data = await getUser(props.query?.id);

    return {
      props: {
        user: data ?? null,
      },
    };
  });

export default AppPage;

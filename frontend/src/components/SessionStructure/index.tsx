import React, { ReactElement } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ImageCovered } from "../ImageCovered";
import { theme } from "../../utils/theme";

export const SessionStructure = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const { spacing } = theme;
  return (
    <Grid container height="100vh" maxWidth="100vw" overflow="hidden">
      <Grid item xs={12} md={5} lg={4} xl={3}>
        <Box
          sx={{
            padding: `0 ${spacing(4)}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: {
              xs: "100%",
              sm: "60%",
              md: "100%",
            },
            mx: {
              sm: "auto",
              md: "0",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              mb: spacing(6),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/assets/images/1653325381451.png"
              style={{
                width: "25%",
                maxWidth: 70,
              }}
            />
            <Typography
              color="primary"
              variant="h4"
              sx={{
                height: "fit-content",
              }}
            >
              Workplace
            </Typography>
          </Box>
          {Array.isArray(children) ? children.map((child) => child) : children}
        </Box>
      </Grid>
      <Grid
        item
        xs={0}
        md={7}
        lg={8}
        xl={9}
        sx={{
          height: {
            xs: 0,
            md: "100%",
          },
          overflow: "hidden",
        }}
      >
        <ImageCovered
          src="/assets/images/fachada-de-empresa-1140x515.jpg"
          alt="Workplace"
        />
      </Grid>
    </Grid>
  );
};

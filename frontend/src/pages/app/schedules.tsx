import React from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
  Redirect,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { parseCookies } from "../../utils/cookies";
import { LoginResponse } from "../api/sessions/login";
import { AppStructure } from "../../components/AppStructure";

const AppPage = () => {
  return (
    <AppStructure>
      <></>
    </AppStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
}: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const redirect: Redirect = {
    permanent: true,
    destination: "/",
  };
  const { session: sessionCookie } = parseCookies(req);

  if (!sessionCookie) return { redirect };

  const session: LoginResponse = JSON.parse(sessionCookie);

  if (!session.hasOwnProperty("token") || !session.hasOwnProperty("expires"))
    return { redirect };

  if (new Date(session.expires) < new Date()) return { redirect };
  return {
    props: {},
  };
};

export default AppPage;

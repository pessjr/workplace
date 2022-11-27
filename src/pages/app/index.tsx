import { Button } from "@mui/material";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
  Redirect,
} from "next";
import { useRouter } from "next/navigation";
import { ParsedUrlQuery } from "querystring";
import { Cookies } from "react-cookie";
import { parseCookies } from "../../utils/cookies";
import { LoginResponse } from "../api/sessions/login";
import { AppStructure } from "../../components/AppStructure";

const AppPage = () => {
  const { push } = useRouter();
  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("session");
    push("/");
  };
  return (
    <AppStructure>
      <Button onClick={logout}>Logout</Button>
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

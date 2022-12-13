import { PreviewData, Redirect } from "next";
import { parseCookies } from "../utils/cookies";
import { LoginResponse } from "../pages/api/sessions/login";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export const ServerPropsPrivateMiddleware = (
  props: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  handle: () => Promise<
    | {
        props: Object | Promise<Object>;
      }
    | {
        redirect: Redirect;
      }
    | {
        notFound: true;
      }
  >
) => {
  const redirect: Redirect = {
    permanent: false,
    destination: "/",
  };
  const { session: sessionCookie } = parseCookies(props.req);
  if (!sessionCookie) return { redirect };
  const session: LoginResponse = JSON.parse(sessionCookie);
  if (!session.hasOwnProperty("token") || !session.hasOwnProperty("expires"))
    return { redirect };
  if (new Date(session.expires) < new Date()) return { redirect };

  return handle();
};

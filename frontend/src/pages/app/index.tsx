import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { AppStructure } from "../../components/AppStructure";
import { ServerPropsPrivateMiddleware } from "../../middlewares/serverSidePropsPrivateRouteMiddleware";
const AppPage = () => {
  return (
    <AppStructure>
      <></>
    </AppStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  props: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) =>
  ServerPropsPrivateMiddleware(props, async () => {
    return {
      props: {},
    };
  });

export default AppPage;

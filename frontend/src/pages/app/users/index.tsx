import React from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { AppStructure } from "../../../components/AppStructure";
import { ServerPropsPrivateMiddleware } from "../../../middlewares/serverSidePropsPrivateRouteMiddleware";
import { GridRowParams } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { getUsers } from "../../../services/apis/users";
import { useRouter } from "next/navigation";
import { AddButton, Listing } from "../../../components/Listing";
import moment from "moment";

export interface User {
  id?: string;
  email: string;
  name: string;
  phone: number;
  document: number;
  documentType: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppPage = (props: { users: User[] }) => {
  const { push } = useRouter();
  const { data: users = [], isLoading } = useQuery("users", getUsers, {
    initialData: props.users,
  });
  const handleRowClick = (params: GridRowParams) => {
    push(`/app/users/user/${params.id}`);
  };
  const handlePush = () => {
    push(`/app/users/user/create`);
  };
  const addButton: AddButton = {
    title: "Adicionar usuário",
    onClick: handlePush,
  };
  return (
    <AppStructure>
      <Listing
        addButton={addButton}
        onRowClick={handleRowClick}
        rows={users}
        isLoading={isLoading}
        columns={[
          { field: "id", headerName: "ID", flex: 2 },
          { field: "email", headerName: "E-mail", flex: 2 },
          { field: "name", headerName: "Nome", flex: 2 },
          { field: "phone", headerName: "Telefone", flex: 1 },
          { field: "document", headerName: "Documento", flex: 1 },
          { field: "documentType", headerName: "Tipo do documento", flex: 1 },
          {
            field: "createdAt",
            headerName: "Data de criação",
            flex: 2,
            renderCell: ({ value }) => moment(value).format("DD/MM/YYYY HH:MM"),
          },
        ]}
      />
    </AppStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  props: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) =>
  ServerPropsPrivateMiddleware(props, async () => {
    const data: User[] = await getUsers();
    return {
      props: {
        users: data,
      },
    };
  });

export default AppPage;

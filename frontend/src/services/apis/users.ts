import { User } from "../../pages/app/users";

export const getUsers: () => Promise<User[]> = async () => {
  const data: User[] = await fetch("http://localhost:3000/api/users").then(
    async (response) => await response.json()
  );
  return data;
};

export const getUser: (id: string) => Promise<User> = async (id) => {
  const data: User = await fetch(`http://localhost:3000/api/users/${id}`).then(
    async (response) => await response.json()
  );
  return data;
};

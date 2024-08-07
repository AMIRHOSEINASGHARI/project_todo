export type Session = {
  username: string;
  userId: string;
  name: string;
  iat: number;
  exp: number;
};

export type ServerActionOutput = {
  message: string;
  status: string;
  code: number;
} | void;

export type SidebarLinkProps = {
  link: string;
  image: JSX.Element;
  title: string;
  un_completed_todos?: number;
  important_todos?: number;
  group_todos?: number;
};

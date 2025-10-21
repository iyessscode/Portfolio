import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const isAdmin = false;
  if (!isAdmin) redirect("/auth/sign-in");

  return <div>{children}</div>;
}

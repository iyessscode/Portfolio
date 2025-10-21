import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

type Props = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const data = await auth.api.getSession({
    headers: await getHeaders(),
  });

  const isAdmin = data?.user?.role === "admin";

  if (!isAdmin) redirect("/");

  return <div>{children}</div>;
}

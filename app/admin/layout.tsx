import React, { ReactNode } from "react";
import "@/admin-styles/styles.css";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { auth } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import { isUserAdmin } from "@/db/utils";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) {
    console.log("please provide userId to check admin status");
    return redirect("/login");
  }

  const isAdmin = await isUserAdmin(session?.user?.id);
  if (!isAdmin) {
    return redirect("/");
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <AdminSidebar session={session!} />

      <div className="admin-container">
        <AdminHeader session={session!} />
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;

import React, { ReactNode } from "react";
import "@/admin-styles/styles.css";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { auth } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
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

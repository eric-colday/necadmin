import { auth } from "@/app/auth";
import Link from "next/link";
import React from "react";

const InfoProfile = async () => {
  const { user } = await auth();
  return (
    <Link href="/dashboard/utilisateurs" className="cursor-pointer">
      <div className="flex items-center gap-5">
        <img src="" className="w-16 h-16 object-cover rounded-full" />
        <div className="flex flex-col gap-1">
          <span className="text-sm">Eric Colday</span>
          <span className="text-white text-sm">Admin</span>
        </div>
      </div>
    </Link>
  );
};

export default InfoProfile;

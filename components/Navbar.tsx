"use client";
import React, { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import AuthProvider from "./AuthProvider";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between">
      <div className="flex gap-10 items-center">
        <h1 className="text-[17px]">Dribbble</h1>
        <ul className="flex gap-3 text-[12px]">
          <li>Find talent</li>
          <li>Inspiration</li>
          <li>Jobs</li>
          <li>Go pro</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          className="py-3 px-6 rounded-[40px] bg-[#ececec]"
          placeholder="Search here"
        />
        <div>
          <AuthProvider />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

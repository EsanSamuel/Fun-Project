"use client";
import useUsers from "@/hooks/useUsers";
import { createContext, useState } from "react";
import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productType, productValidation } from "@/lib/validation";
import api from "@/lib/api";
import useProduct from "@/hooks/useProduct";
import { useSession } from "next-auth/react";
import useWorker from "@/hooks/useWorker";
import useUser from "@/hooks/useUser";

export type TProps = {
  users: {
    _id: string;
    username: string;
    image: string;
    email: string;
  }[];
  products: {
    author: {
      _id: string;
      username: string;
      image: string;
      email: string;
    };
    _id: string;
    title: string;
    details: string;
    price: string;
    image: string;
  }[];
  workers: {
    _id: string;
    name: string;
    email: string;
    worktype: "fulltime" | "parttime";
    author: {
      _id: string;
      username: string;
      email: string;
      image: string;
    };
  }[];
  user: {
    _id: string;
    username: string;
    image: string;
    email: string;
  };
};

export const ApiContext = createContext<TProps | null>(null);

const ApiProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const { data: users = [], isLoading } = useUsers();
  console.log(users);

  if (isLoading) {
    console.log("loading users...");
  }

  const { data: workers = [], isLoading: loadingWorkers } = useWorker();
  console.log(workers);

  if (loadingWorkers) {
    console.log("loading workers...");
  }

  const { data: products = [], isLoading: loadingProducts } = useProduct();
  console.log(products);

  if (loadingProducts) {
    console.log("loading products...");
  }

  const { data: user, isLoading: loadingLoginuser } = useUser(
    `api/user/${session?.user?.id}`
  );
  console.log(user);

  if (loadingLoginuser) {
    console.log("loading user...");
  }

  return (
    <ApiContext.Provider
      value={{
        users,
        products,
        workers,
        user,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;

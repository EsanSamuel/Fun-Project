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

export type TProps = {
  users: any;
  createProduct: any;
  setTitle: any;
  setDetails: any;
  setPrice: any;
  setImage: any;
  image: string;
  workers: any;
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

  const { data: workers = [] } = useWorker();
  console.log(workers);

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/product", {
        userId: session?.user?.id,
        details,
        title,
        price,
        image,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: products = [] } = useProduct();
  console.log(products);

  return (
    <ApiContext.Provider
      value={{
        users,
        createProduct,
        setDetails,
        setPrice,
        setImage,
        setTitle,
        image,
        workers,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;

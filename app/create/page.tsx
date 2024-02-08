"use client";
import React, { useContext, useState } from "react";
import { ApiContext, TProps } from "@/context/ApiProvider";
import { useSession } from "next-auth/react";
import api from "@/lib/api";
import Image from "next/image";

const page = () => {
  const { users, workers } = useContext(ApiContext) as TProps;
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterWorktype, setFilterWorktype] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");
  const [number, setNumbers] = useState<number>();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [worktype, setWorktype] = useState("");

  const data = [
    {
      id: 1,
      name: "Backend Api",
      language: "TypeScript",
    },
    {
      id: 2,
      name: "Frontend",
      language: "JavaScript",
    },
    {
      id: 3,
      name: "Python Script",
      language: "Python",
    },
    {
      id: 4,
      name: "Go APi",
      language: "Go",
    },
    {
      id: 5,
      name: "Clone",
      language: "TypeScript",
    },
    {
      id: 6,
      name: "Go Network",
      language: "Go",
    },
  ];

  const filterData = (language: string) =>
    filterLanguage ? data.filter((item) => item.language === language) : data;

  const clearFilter = () => {
    setFilterLanguage("");
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/product/newProduct", {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      console.log("Please upload an image!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      setImage(result);
    };
  };

  const getNumber = () => {
    for (let i = 1; i <= 10; i++) {
      setNumbers(i);
      console.log(i);
    }
  };

  const handleCode = () => {
    let numbers = "1234567890";
    let codes = "";

    for (let i = 0; i < 6; i++) {
      codes += numbers[Math.floor(Math.random() * 10)];
    }
    setCode(codes);
  };

  const createWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/worker/new", {
        userId: session?.user?.id,
        name,
        email,
        worktype,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const filterWork = (worktype: string) =>
    filterWorktype
      ? workers.filter((item: any) => item.worktype === worktype)
      : workers;

  return (
    <div className="p-5">
      <form>
        <input onChange={(e) => setDetails(e.target.value)} type="text" />
        <input onChange={handleImageChange} type="file" />
        <input onChange={(e) => setPrice(e.target.value)} type="text" />
        <input onChange={(e) => setTitle(e.target.value)} type="text" />
        <button type="submit" onClick={createProduct}>
          Create
        </button>
        <Image src={image} alt="" width={100} height={100} />
      </form>

      <div>
        {users?.map((user: Record<string, any>) => (
          <div key={user._id}>
            <h1>{user.username}</h1>
          </div>
        ))}

        <div className="flex gap-5 pb-5">
          <button onClick={() => setFilterLanguage("TypeScript")}>
            TypeScript
          </button>
          <button onClick={() => setFilterLanguage("JavaScript")}>
            JavaScript
          </button>
          <button onClick={() => setFilterLanguage("Python")}>Python</button>
          <button onClick={() => setFilterLanguage("Go")}>Go</button>
          <button onClick={clearFilter}>Clear all filter</button>
        </div>
        <input
          className="border-neutral-800 border"
          placeholder="Search language"
          onChange={(e) => setSearchLanguage(e.target.value)}
        />

        <div>
          {filterData.length > 0 ? (
            <div className="flex gap-5 flex-col">
              {filterData(filterLanguage)
                .filter((item) => {
                  if (searchLanguage === "") {
                    return item;
                  } else if (
                    item.language
                      .toLowerCase()
                      .includes(searchLanguage.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item: Record<string, any>) => (
                  <div key={item.id} className="">
                    <h1>{item.name}</h1>
                    <h1>{item.language}</h1>
                  </div>
                ))}
            </div>
          ) : (
            "No repo found"
          )}
        </div>
        <div className="mt-10">
          <button onClick={getNumber}>Get number</button>
          <h1>{number}</h1>
          <button onClick={handleCode}>Get code</button>
          <h1>{code}</h1>
        </div>

        <div className="mt-10">
          <h1>Create Worker</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
          />
          <select onChange={(e) => setWorktype(e.target.value)}>
            <option disabled>select worktype</option>
            <option>fulltime</option>
            <option>parttime</option>
          </select>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email"
          />
          <button onClick={createWorker}>create</button>
          <div className="mt-5">
            <button onClick={() => setFilterWorktype("fulltime")}>
              FullTime
            </button>
            <button onClick={() => setFilterWorktype("parttime")}>
              PartTime
            </button>
            {filterWork(filterWorktype).map((item: Record<string, any>) => (
              <div key={item._id}>
                <h1>{item.name}</h1>
                <h1>{item.worktype}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

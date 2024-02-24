"use client";

import authState from "@/store/user";
import createClient from "@/utils/supabase/client";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSnapshot } from "valtio";

type userDataInterface = {
  name: string;
  age: number | null;
  gender: string | null;
};

export default function Page({
  searchParams,
}: {
  searchParams: { v: number };
}) {
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchParams.v == 0) {
        toast.error("Profile Incomplete.");
      }
    }, 100);

    return () => clearTimeout(searchTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const supabase = createClient();
  const snap = useSnapshot(authState);
  const router = useRouter();
  const [userData, setUserData] = useState<userDataInterface>({
    name:
      snap.user?.user_metadata.displayName ??
      snap.user?.user_metadata.display_name ??
      null,
    age: null,
    gender: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user?.id)
          .single();

        if (error?.code == "PGRST116") {
          console.error("entry not found in user table");
        }

        if (data) {
          setUserData((prev) => ({
            ...prev,
            name: data?.name ?? null,
            age: data?.age ?? null,
            gender: data?.gender ?? null,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [supabase]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(e.target.value);
    setUserData((prevData) => ({
      ...prevData,
      age: isNaN(age) ? null : age,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { error } = await supabase.from("users").upsert({
      id: snap.user?.id,
      avatar_url: snap.user?.user_metadata?.avatar_url,
      name: formData.get("name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
    });
    await supabase.auth.updateUser({
      data: { displayName: formData.get("name") },
    });

    await supabase.auth
      .getUser()
      .then((res) => (authState.user = res.data.user));

    if (error) {
      console.error(error);
    } else {
      toast.success("Profile updated successfully");
      router.replace("/general-qa");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      {!snap.user?.id ? (
        <Spinner label="Loading..." />
      ) : (
        <Card className="h-3/5 md:h-2/4 w-3/4 md:w-[600px]" isBlurred>
          <CardHeader className="my-4">
            <p className="w-full font-bold text-center text-xl md:text-2xl">
              Welcome {snap.user?.user_metadata?.full_name ?? ":)"}
            </p>
          </CardHeader>
          <CardBody className="flex flex-col justify-around py-5">
            <form
              className="w-full flex flex-col gap-y-4"
              onSubmit={handleSubmit}
            >
              <p className="w-full text-center ">
                Please update your information to proceed{" "}
              </p>
              <Input
                type="text"
                label="Name"
                color="default"
                variant="bordered"
                name="name"
                value={userData.name ?? ""}
                onChange={handleNameChange}
                required
              />
              <Input
                type="number"
                label="Age"
                color="default"
                variant="bordered"
                name="age"
                value={userData.age?.toString() ?? ""}
                onChange={handleAgeChange}
                required
              />
              <Select
                label="Gender"
                color="default"
                variant="bordered"
                name="gender"
                selectedKeys={userData.gender ? [userData.gender] : []}
                onChange={handleGenderChange}
                required
              >
                <SelectItem key="male" value="male">
                  Male
                </SelectItem>
                <SelectItem key="female" value="female">
                  Female
                </SelectItem>
                <SelectItem key="none" value="none">
                  Prefer not to say
                </SelectItem>
              </Select>
              <Button type="submit">Update Info</Button>
            </form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

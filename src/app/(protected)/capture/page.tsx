"use client";

import { useRef, useState } from "react";
import { Button, Spinner, Image, Input } from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";
import { useSnapshot } from "valtio";
import authState from "@/store/user";
import toast from "react-hot-toast";

export default function Capture() {
  const formRef = useRef<HTMLFormElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const snap = useSnapshot(authState);

  const handleImageChange = () => {
    if (formRef.current && formRef.current.image.files.length > 0) {
      const filesArray = Array.from(formRef.current.image.files) as File[];
      setImageFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleImageDelete = (image: File) => {
    setImageFiles((prevFiles) => prevFiles.filter((file) => file !== image));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData(formRef.current as HTMLFormElement);
      setIsSubmitting(true);
      await fetch(process.env.NEXT_PUBLIC_ORIGIN + "/api/s3", {
        method: "POST",
        body: data,
      });
      toast.success(
        `${
          imageFiles.length == 1 ? "1 Image" : `${imageFiles.length} Images`
        } Uploaded to S3`
      );
      setImageFiles([]);
    } catch (error) {
      toast.error(error as string);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center py-4">
      <p className="text-2xl font-bold my-2 px-3">Upload Images to S3</p>
      <form
        ref={formRef}
        className="border border-black p-5 flex flex-col justify-center items-center w-[90vw] md:w-full"
        onSubmit={handleSubmit}
      >
        <label
          className={`flex flex-col items-center justify-center w-[70vw] h-[30vh] border-dashed border-gray-500 border-2 rounded-xl bg-neutral-200/75 hover:bg-neutral-200 p-2 m-2 transition-all duration-1000 ease-in-out`}
          htmlFor="dropzone-file"
        >
          <div className="flex flex-col justify-center items-center">
            <>
              <svg
                className="w-8 h-8 mb-4 text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              {!isSubmitting ? <p>Upload file(s) </p> : <p>Uploading...</p>}
            </>
          </div>
          <input
            type="file"
            name="image"
            id="dropzone-file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            required
            capture
          />
        </label>
        {imageFiles.length > 0 && (
          <div className="mt-4 flex justify-start md:justify-center items-center h-[10rem w-full sm:w-[1/2] overflow-x-scroll">
            {imageFiles.map((file, index) => (
              <div key={index} className="relative m-2">
                <Image
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="h-[7rem] md:h-[8rem] max-w-[10rem] md:max-w-[15rem]"
                />
                <Button
                  isIconOnly
                  onClick={() => handleImageDelete(file)}
                  className="absolute z-10 h-8 text-center -top-3 -right-3 p-0 bg-red-500/75"
                  size="sm"
                >
                  <MdDeleteForever className="h-[1.15rem] w-[1.15rem]" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <Input
          value={snap.user?.user_metadata?.full_name}
          name="user"
          className="hidden"
        />
        <Button
          type="submit"
          className={`${
            isSubmitting || !imageFiles.length ? "disabled" : ""
          } w-full h-12 mt-4 dermit-btn`}
        >
          {isSubmitting ? <Spinner color="secondary" size="sm" /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}

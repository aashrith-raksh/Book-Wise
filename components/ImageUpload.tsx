"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { UploadError } from "imagekitio-next/dist/types/components/IKUpload/props";

const { publicKey, urlEndpoint } = config.env.imagekit;

interface Props {
  onFileChange: (filePath: string) => void;
}

type UploadResponse = {
  filePath: string;
};

const ImageUpload = ({ onFileChange }: Props) => {
  const authenticator = async () => {
    try {
      const response = await fetch(
        `${config.env.apiEndpoint}/api/auth/imagekit`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(
        `ImageKit Authentication request failed: ${(error as Error).message}`
      );
    }
  };

  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (err:UploadError) => {
    console.log(err.message)
    toast({
      title: "Image uploading failed",
      variant: "destructive",
    });
  };
  const onSuccess = (res: UploadResponse) => {
    const { filePath } = res;
    setFile({ filePath });
    onFileChange(filePath as string);

    toast({
      title: "Image uploaded Successfully",
    });
  };
  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        className="hidden"
      />
      <button
        className={"upload-btn"}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={"text-base"}>{"Upload a file"}</p>

        {file && <p className={"upload-filename"}>{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;

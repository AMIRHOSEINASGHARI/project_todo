"use client";

// react
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
// next
import Image from "next/image";
// utils
import { useUploadThing } from "@/utils/uploadthing";
// constants
import { icons } from "@/constants";
// uploadthing
import { useDropzone } from "@uploadthing/react";
import {
  generatePermittedFileTypes,
  generateClientDropzoneAccept,
} from "uploadthing/client";
// cmp
import { Input } from "@/components/ui/input";
import Loader from "@/components/shared/Loader";
import toast from "react-hot-toast";

type FileUploaderProps = {
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>;
  onFieldChange: (value: string) => void;
};

const FileUploader = ({
  avatar,
  setAvatar,
  onFieldChange,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);

  const { startUpload, isUploading, routeConfig } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (data) => {
        toast.success("Uploaded successfully!");

        const imageUrl = data.map((file) => file.url);
        setAvatar(imageUrl[0]);
        onFieldChange(imageUrl[0]);
      },
      onUploadError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    }
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  useEffect(() => {
    if (file?.length !== 0) startUpload(file);
  }, [file]);

  return (
    <div>
      <div {...getRootProps()}>
        <Input {...getInputProps()} multiple={false} disabled={isUploading} />
        <div className="flex justify-center cursor-pointer">
          <div className="relative w-[150px] h-[150px] rounded-full border flex items-center justify-center border-border-light dark:border-border-dark text-icon-light dark:text-icon-dark">
            {file?.length !== 0 || avatar?.length !== 0 ? (
              file.map((file) => (
                <div
                  key={file.name}
                  className="w-full h-full rounded-full overflow-hidden"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    width={100}
                    height={100}
                    alt={file.name}
                    priority
                    onLoad={() =>
                      URL.revokeObjectURL(URL.createObjectURL(file))
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="text-4xl">{icons.image}</div>
            )}
            <div className="absolute bottom-2 right-2 text-xl w-[30px] h-[30px] rounded-full bg-white dark:bg-dark3 border border-border-light dark:border-border-dark flex items-center justify-center z-[50]">
              {icons.pen}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-black/80 w-full h-full flex justify-center items-center rounded-full">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;

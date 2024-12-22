import { useRef, useState } from "react";
import Layout from "@app/components/shared/Layout";
import Image from "next/image";
import { Upload } from "@app/components/icons";
import { ButtonHeader, ButtonHeaderProps } from "@app/components/shared";
import { LoadingState } from "@app/components/shared/LoadingState";

interface UploadImageHomeProps {
  setUserDefinedInput: (ref: any) => void;
  headerCTA?: ButtonHeaderProps;
  loading?: boolean
}

export default function UploadImageHome({
  setUserDefinedInput,
  headerCTA,
  loading = false
}: UploadImageHomeProps) {
  const inputRef: any = useRef(null);
  const [image, setImage] = useState<string | null>(null);

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]) ?? "");
    }
  };

  return (
    <Layout
      title="Upload an image"
      headerComponent={
        headerCTA ? !loading && <ButtonHeader action={headerCTA?.action} label={headerCTA.label}  /> : null
      }
    >
      <div className="mb-10 flex justify-center">
        <div className="flex h-auto border rounded-xl relative pt-[28%] lg:w-[60%] w-[90%] overflow-hidden">
          <label className="up-image [&>input]:hidden top-0 absolute left-0 h-full w-full">
            <input
              ref={inputRef}
              className="file-input file-input-ghost w-full max-w-xs"
              type="file"
              accept="image/*"
              onChange={onImageChange}
            />
            <div className="flex flex-col justify-center items-center h-full w-full absolute top-0 text-[90px]">
              <Upload />
              <h3 className="text-[32px]">Upload Image</h3>
            </div>
            {image && (
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  height="100"
                  width="100"
                  className="absolute w-full h-full object-cover z-40"
                  alt="selected image"
                />
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex absolute z-50 w-full h-full justify-center items-center flex-col bg-mask-700 text-[90px]">
                  <Upload />
                  <h3 className="text-[32px]">Upload Image</h3>
                </div>
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="flex justify-center mb-14">
        <button
          onClick={() => setUserDefinedInput(inputRef)}
          className="btn btn-primary mt-2 w-[220px]"
          disabled={!image || loading}
        >
          {loading ? <LoadingState /> : 'UPLOAD' }
        </button>
      </div>
    </Layout>
  );
}

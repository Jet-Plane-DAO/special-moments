import { useEffect, useRef, useState } from "react";
import Layout from "@app/components/shared/Layout";
import Image from "next/image";
import Upload from "@app/components/icons/Upload";

interface UploadImageHomeProps {
  setUserDefinedInput: (ref: any) => void;
}

export default function UploadImageHome({
  setUserDefinedInput,
}: UploadImageHomeProps) {
  const inputRef: any = useRef(null);
  const [image, setImage] = useState<string | null>(null)

const onImageChange = (event:any) => {
 if (event.target.files && event.target.files[0]) {
   setImage(URL.createObjectURL(event.target.files[0]) ?? '');
 }
}


useEffect(() => {
    console.dir('inputRef',image)
    if(image) {
        console.log(image)
    }
},[image])
  

  return (
    <Layout title="Upload an image">
      {/* <div className="grid grid-cols-12 gap-5 h-auto">
        <div className="col-span-8">
          <input
            ref={inputRef}
            className="file-input file-input-ghost w-full max-w-xs"
            type="file"
            accept="image/*"
          />
          <button 
            onClick={() => setUserDefinedInput(inputRef)}
            className="btn btn-primary mt-2"
          >
            Upload
          </button>
        </div>
        <div className="col-span-4"></div>
      </div> */}
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
                <Image
                    src={image}
                    height="100"
                    width="100"
                    className="absolute w-full h-full object-cover z-40"
                    alt="selected image"
                />
                )}
          </label>
        </div>
        
      </div>
      <div className="flex justify-center mb-14">
        <button
          onClick={() => setUserDefinedInput(inputRef)}
          className="btn btn-primary mt-2"
        >
          Upload
        </button>
      </div>
    </Layout>
  );
}

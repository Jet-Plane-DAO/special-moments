import { useCallback, useRef, useState } from "react";
import Layout from "@app/components/shared/Layout";
import Image from "next/image";
import { Upload } from "@app/components/icons";
import { ButtonHeader, ButtonHeaderProps } from "@app/components/shared";
import { LoadingState } from "@app/components/shared/LoadingState";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@app/utils/assets";

function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
interface UploadImageHomeProps {
  setUserDefinedInput: (ref: any) => void;
  headerCTA?: ButtonHeaderProps;
  loading?: boolean;
}

export default function UploadImageHome({
  setUserDefinedInput,
  headerCTA,
  loading = false,
}: UploadImageHomeProps) {
  const inputRef: any = useRef(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState(null);

  const onImageChange = useCallback((event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]) ?? "");
    }
  }, []);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // try {
      //   // apply rotation if needed
      //   const orientation = await getOrientation(file)
      //   const rotation = ORIENTATION_TO_ANGLE[orientation]
      //   if (rotation) {
      //     imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      //   }
      // } catch (e) {
      //   console.warn('failed to detect the orientation')
      // }

      setImageSrc(imageDataUrl as any);
    }
  };
  const showCroppedImage = async () => {
    try {
      const _croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      setCroppedImage(_croppedImage as any);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Layout
      title="Upload an image"
      headerComponent={
        headerCTA
          ? !loading && (
              <ButtonHeader
                action={() => headerCTA?.action()}
                label={headerCTA.label}
              />
            )
          : null
      }
    >
      <div className="mb-10 flex justify-center">
        {!imageSrc && (
          <div className="flex h-auto border rounded-sm relative before:pt-[115.38%] before:content-[''] before:w-full before:block lg:w-[518px] w-[90%] overflow-hidden image-uploader">
            <label className="up-image [&>input]:hidden top-0 absolute left-0 h-full w-full">
              <input
                ref={inputRef}
                className="file-input file-input-ghost w-full max-w-xs"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              <div className="flex flex-col justify-center items-center h-full w-full absolute top-0 text-[90px]">
                <Upload />
                <h3 className="text-[32px]">Upload Image</h3>
              </div>
              {/* {image && (
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
                  <h3 className="text-[32px]">Change Image</h3>
                </div>
              </div>
            )} */}
            </label>
          </div>
        )}
        {imageSrc && (
          // <div className="lex h-auto border rounded-sm relative before:pt-[115.38%] before:content-[''] before:w-full before:block lg:w-[518px] w-[90%] overflow-hidden image-uploader">
          <div className="flex h-[578px] relative before:block w-full overflow-hidden image-uploader">
            <div className="clip-rect-area">
              <Cropper
                showGrid={false}
                objectFit={"contain"}
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={518 / 578}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mb-14">
        <button
          onClick={() => setUserDefinedInput(inputRef)}
          className="btn btn-primary mt-2 w-[220px]"
          disabled={!imageSrc || loading}
        >
          {loading ? <LoadingState /> : "NEXT"}
        </button>
        {imageSrc && (
          <button
            onClick={() => setImageSrc(null)}
            className="btn btn-primary mt-2 w-[220px] ml-2"
            disabled={!imageSrc || loading}
          >
            {loading ? <LoadingState /> : "REMOVE IMAGE"}
          </button>
        )} 
      </div>
    </Layout>
  );
}

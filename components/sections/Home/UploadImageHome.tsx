import { useEffect, useRef, useState } from "react";
import Layout from "@app/components/shared/Layout";
import { Upload } from "@app/components/icons";
import { ButtonHeader, ButtonHeaderProps } from "@app/components/shared";
import { LoadingState } from "@app/components/shared/LoadingState";
import Cropper from "react-easy-crop";
import { blobToFile, getCroppedImg } from "@app/utils/assets";

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
    const [image, setImage] = useState<any | null>(null);
    const [imageSrc, setImageSrc] = useState(null); 
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [processing, setProcessing] = useState(false)
    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    useEffect(() => {
        if (!croppedAreaPixels || !imageSrc) {
            return;
        }
        const generateCroppedImage = async () => {
            try {
                const _croppedImage = await getCroppedImg(
                    imageSrc,
                    croppedAreaPixels,
                    0
                );
                setCroppedImage(_croppedImage as any);
            } catch (e) {
                console.error(e);
            }
        };
        generateCroppedImage();
    }, [croppedAreaPixels, imageSrc]);

    const onFileChange = async (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(file);
            let imageDataUrl = await readFile(file);

            setImageSrc(imageDataUrl as any);
        }
    };


    const onNext = async () => {
        try {
            setProcessing(true)
            const blobUrl: any = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
            const _file = await fetch(blobUrl).then(r => r.blob()).then(blobFile => new File([blobFile], image?.name, { type: blobFile.type }));
            blobToFile(blobUrl, image?.name ?? 'noname.jpg')
            setUserDefinedInput(_file as any);
        } catch (e) {
            console.error(e);
        } finally {
            setProcessing(false)
        }
    }

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
                    <div className="flex h-auto border rounded-sm relative before:pt-[75%] before:content-[''] before:w-full before:block lg:w-[518px] w-[90%] overflow-hidden image-uploader">
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
                        </label>
                    </div>
                )}
                {imageSrc && (
                    <div className="flex h-[578px] relative before:block w-full overflow-hidden image-uploader">
                        <div className="clip-rect-area">
                            <Cropper
                                showGrid={false}
                                objectFit={"contain"}
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center mb-14">
                <button onClick={() => onNext()}
                    className="btn btn-primary mt-2 w-[220px]"
                    disabled={!imageSrc || loading || processing}
                >
                    {(loading || processing) ? <LoadingState /> : "NEXT"}
                </button>
                {imageSrc && (
                    <button
                        onClick={() => setImageSrc(null)}
                        className="btn btn-primary mt-2 w-[220px] ml-2"
                        disabled={!imageSrc || loading || processing}
                    >
                        {(loading || processing) ? <LoadingState /> : "REMOVE IMAGE"}
                    </button>
                )}
            </div>
        </Layout>
    );
}

import { CheckedIcon } from "@app/components/icons";

export default function SelectedMask() {
  return (
    <div className="absolute w-full h-full flex justify-center items-center text-3xl text-green-500 top-0 left-0 bg-mask-300">
      <div className="bg-white p-6 rounded-md">
        <CheckedIcon />
      </div>
    </div>
  );
}
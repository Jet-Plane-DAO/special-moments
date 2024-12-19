import { ReactNode } from "react";

const Hero = ({ title, component = null}: { title: string, component?: ReactNode }) => {
  return (
    <div className="flex justify-between lg:pt-[80px] pt-10 pb-8 lg:pb-[96px]">
      <h1 className="text-6xl">{title}</h1>
      {component}
    </div>
  );
};
export { Hero };

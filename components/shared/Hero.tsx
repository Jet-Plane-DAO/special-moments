const Hero = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col justify-end lg:pt-[120px] pt-10 pb-8 lg:pb-[96px]">
      <h1 className="text-6xl">{title}</h1>
    </div>
  );
};
export { Hero };

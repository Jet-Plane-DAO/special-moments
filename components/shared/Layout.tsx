import { Hero } from "./Hero";
import { Nav } from "./Nav";

export default function Layout({
  title,
  children,
  headerComponent
}: {
  title: string;
  children: React.ReactNode;
  headerComponent?: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-mainbg relative bg-fixed bg-no-repeat bg-cover">
      <div className="absolute"></div>
      <div className="container mx-auto px-5 sm:px-0 ">
        <header>
          <Nav />
          <Hero title={title} component={headerComponent} />
        </header>
      </div>
      <div className="w-screen">
        <main className="container mx-auto px-5 sm:px-0 flex flex-col gap-3 ">
          {children}
        </main>
      </div>
    </div>
  );
}

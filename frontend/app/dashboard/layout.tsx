import SideNav from "@/app/ui/dashboard/sidenav";
import Header from "@/app/ui/dashboard/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-gray-50">
        <Header/>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}

import SideBar from "./_component/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideBar>{children}</SideBar>
    </div>
  );
}

import SideBar from "@/src/widgets/sideBar/ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideBar>{children}</SideBar>
    </div>
  );
}

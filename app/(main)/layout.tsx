import DashboardProvider from "./provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardProvider>{children}</DashboardProvider>
    </div>
  );
}

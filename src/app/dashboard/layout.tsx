import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="grid grid-cols-6">
        <div className="sticky top-0 col-span-1 h-screen bg-blue-600 ">
          <Sidebar />
        </div>
        <div className="col-span-5">
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}

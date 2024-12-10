import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="fixed top-[64px] bottom-0 left-0 w-72 overflow-y-auto border-r border-border bg-background">
        <DocsSidebar />
      </div>
      <main className="flex-1 pl-72">
        <div className="container max-w-4xl py-12 px-8">{children}</div>
      </main>
    </div>
  );
}

import PageTransitions from "@/components/ul/PageTransitions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <PageTransitions>
    <main>{children}</main>
    // </PageTransitions>
  );
}

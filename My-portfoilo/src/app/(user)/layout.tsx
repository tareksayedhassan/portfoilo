import PageTransitions from "@/components/CustomUi/PageTransitions";
import StairTransition from "@/components/CustomUi/StairTransition";
import Header from "@/components/CustomUi/header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransitions>
      <Header />
      <StairTransition />
      <main className="pt-[130px] px-4 max-w-7xl mx-auto">{children}</main>
    </PageTransitions>
  );
}

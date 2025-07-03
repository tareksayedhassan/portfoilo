import PageTransitions from "@/components/ul/PageTransitions";
import StairTransition from "@/components/ul/StairTransition";
import Header from "@/components/ul/header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransitions>
      <Header />
      <StairTransition />
      {children}
    </PageTransitions>
  );
}

"use client";
import PageTransitions from "@/components/ul/PageTransitions";
import StairTransition from "@/components/ul/StairTransition";
import Header from "@/components/ul/header";

const HomePage = () => {
  return (
    <PageTransitions>
      <StairTransition />
      <Header />
      <main>{/* محتوى الصفحة */}</main>
    </PageTransitions>
  );
};

export default HomePage;

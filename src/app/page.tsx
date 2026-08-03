import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";

export default function HomePage() {
  return (
    <Container className="py-16 sm:py-24">
      <PageHeader
        eyebrow="Design foundation"
        title="KD Arcade is ready to play."
        description="The studio design system is in place. Homepage content and games arrive in later phases."
      />
    </Container>
  );
}

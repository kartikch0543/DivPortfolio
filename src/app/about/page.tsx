import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { developer } from "@/data/site-content";
export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        eyebrow={developer.role}
        title={developer.name}
        description={developer.story}
      />
      <p className="text-muted-foreground mt-10 max-w-2xl leading-8">
        {developer.philosophy} {developer.careerGoal}
      </p>
    </Container>
  );
}

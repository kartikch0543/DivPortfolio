import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { timeline } from "@/data/site-content";
export default function DevlogPage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Work in progress"
        title="Devlog"
        description="Milestones from the KD Arcade journey."
      />
      <ol className="mt-10 space-y-4">
        {timeline.map((item) => (
          <li className="border-border rounded-lg border p-5" key={item.year}>
            <p className="font-pixel text-secondary text-xs">{item.year}</p>
            <h2 className="mt-2 font-semibold">{item.title}</h2>
            <p className="text-muted-foreground mt-2">{item.description}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}

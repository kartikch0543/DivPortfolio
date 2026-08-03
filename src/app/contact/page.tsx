import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { socialLinks } from "@/data/site-content";
export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        eyebrow="Say hello"
        title="Contact"
        description="Follow the work, share a thought, or catch the next release."
      />
      <ul className="mt-10 space-y-3">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a className="text-primary underline underline-offset-4" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}

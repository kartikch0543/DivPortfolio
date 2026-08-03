# Coding Standards

- Use TypeScript strict mode; avoid `any` and unchecked type assertions.
- Use the `@/` alias for source imports outside the current module area.
- Prefer server components. Mark a component client-side only when browser APIs, state, or effects are needed.
- Keep route files focused on composition; move reusable behavior into features, services, or `lib`.
- Use `cn` from `@/lib/utils` for conditional Tailwind class composition.
- Keep components small, semantic, and accessible.
- Format with Prettier and resolve all ESLint warnings before committing.

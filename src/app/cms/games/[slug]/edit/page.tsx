import React from "react";
import { CmsService } from "@/services/cms-service";
import { GameForm } from "@/features/cms/components/GameForm";
import { notFound } from "next/navigation";

export default async function EditGameCmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await CmsService.getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return <GameForm initialGame={game} />;
}

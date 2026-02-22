"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Smartphone,
  Monitor,
  Share2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function PreviewPage() {
  const [copied, setCopied] = useState(false);
  const invitationUrl = "https://momenku.id/rizki-haliza";

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">
          Preview Undangan
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Lihat tampilan undangan digital Anda sebelum dibagikan
        </p>
      </div>

      {/* URL and share */}
      <Card className="border-border bg-card">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                Link Undangan Anda
              </p>
              <p className="mt-1 text-sm font-medium text-primary">
                {invitationUrl}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-secondary"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="mr-2 size-3" />
                ) : (
                  <Copy className="mr-2 size-3" />
                )}
                {copied ? "Tersalin" : "Salin Link"}
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Share2 className="mr-2 size-3" />
                Bagikan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device toggle */}
      <Tabs defaultValue="mobile">
        <div className="flex items-center justify-between">
          <TabsList className="bg-secondary">
            <TabsTrigger
              value="mobile"
              className="data-[state=active]:bg-card data-[state=active]:text-foreground"
            >
              <Smartphone className="mr-1.5 size-3.5" />
              Mobile
            </TabsTrigger>
            <TabsTrigger
              value="desktop"
              className="data-[state=active]:bg-card data-[state=active]:text-foreground"
            >
              <Monitor className="mr-1.5 size-3.5" />
              Desktop
            </TabsTrigger>
          </TabsList>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary hover:bg-primary/10"
            asChild
          >
            <Link href="/template/elegant-gold" target="_blank">
              <ExternalLink className="mr-1.5 size-3.5" />
              Buka Full
            </Link>
          </Button>
        </div>

        <TabsContent value="mobile">
          <div className="flex justify-center py-6">
            <div className="relative w-[375px]">
              <div className="overflow-hidden rounded-[2rem] border-4 border-border bg-card shadow-2xl">
                <div className="h-6 bg-secondary" />
                <iframe
                  src="/template/elegant-gold"
                  className="h-[700px] w-full"
                  title="Mobile Preview"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="desktop">
          <div className="py-6">
            <div className="overflow-hidden rounded-xl border-2 border-border bg-card shadow-2xl">
              <div className="flex h-8 items-center gap-1.5 border-b border-border bg-secondary px-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                <div className="ml-4 flex-1 rounded-md bg-dark-elevated px-3 py-1">
                  <span className="text-xs text-muted-foreground">
                    {invitationUrl}
                  </span>
                </div>
              </div>
              <iframe
                src="/template/elegant-gold"
                className="h-[600px] w-full"
                title="Desktop Preview"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

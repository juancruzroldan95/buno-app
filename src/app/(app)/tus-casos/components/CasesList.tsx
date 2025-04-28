"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GetCase } from "@/types";
import { getRelativeTime } from "@/utils/utils";
import { ArrowUpRight, Calendar, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CasesListProps {
  cases: GetCase[];
}

export function CasesList({ cases }: CasesListProps) {
  const [filter, setFilter] = useState<"open" | "closed">("open");

  const filteredCases = cases.filter((c) => c.status === filter);

  return (
    <>
      <Tabs
        defaultValue="open"
        className="mb-2"
        onValueChange={(value) => setFilter(value as "open" | "closed")}
      >
        <TabsList>
          <TabsTrigger value="open">Abiertos</TabsTrigger>
          <TabsTrigger value="closed">Cerrados</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Casos {filter === "open" ? "Abiertos" : "Cerrados"}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              Total: {filteredCases.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredCases.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {filter === "open"
                ? "No tenés casos abiertos en este momento."
                : "No tenés casos cerrados todavía."}
            </div>
          ) : (
            filteredCases.map((c) => (
              <Link
                href={`/tus-casos/${c.caseId}`}
                key={c.caseId}
                className="flex flex-row justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="w-full">
                  <div className="flex flex-row justify-between font-medium text-base md:text-lg">
                    {c.title}
                    <ArrowUpRight className="hidden md:block w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground flex flex-col md:flex-row flex-wrap gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <Scale className="size-3 md:size-4" />
                      {c.lawAreaLabel}
                    </span>
                    <span className="hidden md:block text-muted-foreground">
                      •
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 md:size-4" />
                      {getRelativeTime(new Date(c.createdAt))}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between"></div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
}

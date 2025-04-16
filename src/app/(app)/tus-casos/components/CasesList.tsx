"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GetCase } from "@/types";
import { ArrowUpRight, FolderCheck, FolderOpen, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
                href={`/caso/${c.caseId}`}
                key={c.caseId}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <Scale className="w-4 h-4 text-muted-foreground" />
                      {c.lawAreaLabel}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span>
                      Publicado el{" "}
                      {new Date(c.createdAt).toLocaleDateString("es-AR")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={filter === "open" ? "default" : "secondary"}>
                    {filter === "open" ? (
                      <FolderOpen className="w-4 h-4 mr-1" />
                    ) : (
                      <FolderCheck className="w-4 h-4 mr-1" />
                    )}
                    {filter === "open" ? "Abierto" : "Cerrado"}
                  </Badge>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
}

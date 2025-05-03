"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GetCase } from "@/types";
import { cn, getRelativeTime } from "@/utils/utils";
import { ArrowUpRight, Calendar, MapPin, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface YourCasesListProps {
  cases: GetCase[];
}

export function YourCasesList({ cases }: YourCasesListProps) {
  const [filter, setFilter] = useState<"open" | "closed">("open");

  const filteredCases = cases.filter((_case) => _case.status === filter);

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
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground flex flex-wrap gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 md:size-4" />
                      {c.provinceLabel}
                    </span>
                    <span className="hidden md:block text-muted-foreground">
                      •
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 md:size-4" />
                      {getRelativeTime(new Date(c.createdAt))}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-sm",
                        {
                          "bg-yellow-100 text-yellow-800": c.lawAreaId === 1,
                          "bg-green-100 text-green-800": c.lawAreaId === 2,
                          "bg-pink-100 text-pink-800": c.lawAreaId === 3,
                          "bg-indigo-100 text-indigo-800": c.lawAreaId === 4,
                          "bg-red-100 text-red-800": c.lawAreaId === 5,
                          "bg-gray-200 text-gray-900": c.lawAreaId === 6,
                          "bg-purple-100 text-purple-800": c.lawAreaId === 7,
                          "bg-blue-100 text-blue-800": c.lawAreaId === 8,
                          "bg-orange-100 text-orange-800": c.lawAreaId === 9,
                          "bg-rose-100 text-rose-800": c.lawAreaId === 10,
                        }
                      )}
                    >
                      <Scale className="size-3 md:size-4" />
                      {c.lawAreaLabel}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
}

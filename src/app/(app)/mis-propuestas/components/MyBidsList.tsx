"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GetBid } from "@/types";
import { format } from "date-fns";
import { Calendar, Eye, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MyBidsListProps {
  bids: GetBid[];
}

export function MyBidsList({ bids }: MyBidsListProps) {
  const [filter, setFilter] = useState<"sent" | "viewed">("sent");

  // Filtrado de las propuestas
  const filteredBids = bids.filter(
    (b) => (filter === "sent" ? true : b.bid.status === "seen") // Muestra todas las propuestas en "sent" y solo las "seen" en "viewed"
  );

  return (
    <>
      <Tabs
        defaultValue="sent"
        className="mb-2"
        onValueChange={(value) => setFilter(value as "sent" | "viewed")}
      >
        <TabsList>
          <TabsTrigger value="sent">
            <Send className="size-4 mr-1" /> Enviadas
          </TabsTrigger>
          <TabsTrigger value="viewed">
            <Eye className="size-4 mr-1" /> Vistas
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Propuestas {filter === "sent" ? "enviadas" : "vistas"}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              Total: {filteredBids.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredBids.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {filter === "sent"
                ? "No enviaste propuestas todavía."
                : "Ninguna propuesta fue vista aún."}
            </div>
          ) : (
            filteredBids.map((bid) => (
              <Card
                key={bid.bid.bidId}
                className="hover:ring-1 ring-primary transition"
              >
                <CardHeader className="p-4 pb-0 flex flex-row">
                  <Link
                    href={`/buscar-casos/${bid.case.caseId}`}
                    className="text-base font-semibold text-primary hover:underline"
                  >
                    {bid.case.title}
                  </Link>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex flex-col gap-4">
                  <p className="text-muted-foreground">{bid.bid.proposal}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="size-4" />
                      Enviado el:{" "}
                      {format(new Date(bid.bid.createdAt), "dd MMM yyyy")}
                    </p>
                    {bid.bid.status === "seen" && (
                      <>
                        <span className="hidden md:block text-muted-foreground">
                          •
                        </span>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Eye className="size-4" />
                          Visto
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
}

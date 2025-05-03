"use client";

import { useState } from "react";
import Link from "next/link";
import { GetCase, LawAreaSelector, ProvinceSelector } from "@/types";
import { cn } from "@/utils/utils";
import { getRelativeTime } from "@/utils/utils";
import { ArrowUpRight, Calendar, MapPin, Scale, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchCasesListProps {
  cases: GetCase[];
  provinces: ProvinceSelector[];
  lawAreas: LawAreaSelector[];
}

export default function SearchCasesList({
  cases,
  provinces,
  lawAreas,
}: SearchCasesListProps) {
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedLawArea, setSelectedLawArea] = useState("");

  const filteredCases = cases.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesProvince = selectedProvince
      ? c.provinceId == (selectedProvince as unknown as number)
      : true;
    const matchesLawArea = selectedLawArea
      ? c.lawAreaId == (selectedLawArea as unknown as number)
      : true;
    return matchesSearch && matchesProvince && matchesLawArea;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            type="text"
            placeholder="Buscar por título del caso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          onValueChange={(val) => setSelectedProvince(val)}
          value={selectedProvince}
        >
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Filtrar por ubicación" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem
                key={province.provinceId}
                value={province.provinceId.toString()}
              >
                {province.provinceLabel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(val) => setSelectedLawArea(val)}
          value={selectedLawArea}
        >
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Filtrar por área legal" />
          </SelectTrigger>
          <SelectContent>
            {lawAreas.map((lawArea) => (
              <SelectItem
                key={lawArea.lawAreaId}
                value={lawArea.lawAreaId.toString()}
              >
                {lawArea.lawAreaLabel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredCases.length === 0 ? (
          <p className="text-muted-foreground">
            No se encontraron casos con los filtros aplicados.
          </p>
        ) : (
          filteredCases.map((c) => (
            <Link
              href={`/buscar-casos/${c.caseId}`}
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
      </div>
    </>
  );
}

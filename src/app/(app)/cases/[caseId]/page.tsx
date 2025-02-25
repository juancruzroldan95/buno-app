"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Mock data (in a real application, this would come from an API)
const mockCases = {
  HwbOXgtCpPO0Y2VjtFAt: {
    case_id: "HwbOXgtCpPO0Y2VjtFAt",
    client_id: "Jm1ECAYSRGs62B3TF3Fh",
    description:
      "Una empresa de tecnología emergente debe asegurarse de que todas sus operaciones cumplan con las leyes de protección de datos locales e internacionales, como el Reglamento General de Protección de Datos (GDPR). Requieren asistencia legal para revisar y posiblemente reescribir sus políticas de privacidad, implementar acuerdos de procesamiento de datos seguros y garantizar que todas las prácticas de manejo de datos cumplan con la ley para evitar posibles multas y litigios.",
    location: "CABA",
    category: "Trabajo",
    status: "Abierto",
    created_at: "August 30, 2024 at 4:36:05 PM UTC-3",
    updated_at: "August 30, 2024 at 4:36:48 PM UTC-3",
    is_deleted: false,
    proposals: [
      {
        id: 1,
        attorney: "Juan Pérez",
        content:
          "Tengo amplia experiencia en leyes de protección de datos y GDPR. Puedo ayudar a revisar y actualizar sus políticas.",
        timestamp: "September 1, 2024 at 10:00:00 AM UTC-3",
      },
    ],
  },
  // ... add other cases here
};

const statusColors = {
  Abierto: "bg-green-500",
  Trabajando: "bg-yellow-500",
  Cancelado: "bg-red-500",
  Completado: "bg-gray-500",
};

export default function CaseDetail({ params }: { params: { caseId: string } }) {
  const [proposal, setProposal] = useState("");
  const router = useRouter();
  const case_ = mockCases[params.caseId];

  if (!case_) {
    return <div>Case not found</div>;
  }

  const handleSubmitProposal = () => {
    // In a real application, this would send the proposal to an API
    console.log("Submitting proposal:", proposal);
    // Reset the proposal text area
    setProposal("");
    // Refresh the page to show the new proposal (in a real app, we'd update the state)
    router.refresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button onClick={() => router.push("/cases")} className="mb-6">
        &larr; Back to Cases
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{case_.category}</span>
            <Badge
              variant="outline"
              className={`${statusColors[case_.status]} text-white`}
            >
              {case_.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{case_.description}</p>
          <Separator className="my-4" />
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>{case_.location}</span>
            <span>{new Date(case_.created_at).toLocaleDateString()}</span>
          </div>

          <h3 className="font-semibold text-lg mt-6 mb-4">Submit a Proposal</h3>
          <Textarea
            placeholder="Type your proposal here..."
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleSubmitProposal}>Submit Proposal</Button>

          <h3 className="font-semibold text-lg mt-8 mb-4">
            Existing Proposals
          </h3>
          {case_.proposals.map((proposal: any) => (
            <Card key={proposal.id} className="mb-4">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {proposal.attorney}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{proposal.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(proposal.timestamp).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

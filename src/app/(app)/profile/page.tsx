"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import PersonalForm from "./components/PersonalForm";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data
const mockExperience = [
  {
    id: 1,
    company: "Smith & Associates",
    position: "Senior Attorney",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2023-12-31"),
    description:
      "Led a team of junior attorneys in handling complex corporate litigation cases. Managed client relationships and provided strategic legal advice to Fortune 500 companies.",
  },
  {
    id: 2,
    company: "Legal Corp",
    position: "Associate Attorney",
    startDate: new Date("2015-06-01"),
    endDate: new Date("2019-12-31"),
    description:
      "Specialized in intellectual property law, handling patent applications and trademark disputes. Worked closely with technology startups and established businesses.",
  },
];

const mockEducation = [
  {
    id: 1,
    institution: "Harvard Law School",
    degree: "Juris Doctor",
    field: "Law",
    graduationDate: new Date("2015-05-15"),
  },
  {
    id: 2,
    institution: "University of Pennsylvania",
    degree: "Bachelor of Arts",
    field: "Political Science",
    graduationDate: new Date("2012-05-15"),
  },
];

export default function ProfilePage() {
  const [experiences, setExperiences] = useState(mockExperience);
  const [education, setEducation] = useState(mockEducation);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingEducation, setIsAddingEducation] = useState(false);

  function deleteExperience(id: number) {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  }

  function deleteEducation(id: number) {
    setEducation(education.filter((edu) => edu.id !== id));
  }

  return (
    <div className="w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <p className="text-gray-500">
          Acá podés actualizar tu información personal y profesional
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="experience">
              Experiencia profesional
            </TabsTrigger>
            <TabsTrigger value="education">Educación</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualizá tu información personal y profesional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                </div>

                <PersonalForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Experiencia Profesional</CardTitle>
                    <CardDescription>
                      Agregá o actualizá tu experiencia laboral
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsAddingExperience(true)}
                    disabled={isAddingExperience}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Experiencia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isAddingExperience && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Agregar Nueva Experiencia</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ExperienceForm />
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <Card key={exp.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{exp.position}</CardTitle>
                            <CardDescription>{exp.company}</CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteExperience(exp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          {format(exp.startDate, "MMM yyyy")} -{" "}
                          {exp.endDate
                            ? format(exp.endDate, "MMM yyyy")
                            : "Present"}
                        </p>
                        <p className="text-sm">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Educación</CardTitle>
                    <CardDescription>
                      Agregá o actualizá tu educación
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Educación
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="mb-2">
                        <DialogTitle>Agregar Nueva Educación</DialogTitle>
                      </DialogHeader>
                      <EducationForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {isAddingEducation && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Agregar Nueva Educación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <EducationForm />
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-6">
                  {education.map((edu) => (
                    <Card key={edu.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{edu.degree}</CardTitle>
                            <CardDescription>{edu.institution}</CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteEducation(edu.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {edu.field} • Graduated{" "}
                          {format(edu.graduationDate, "MMMM yyyy")}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import ProfileAvatar from "@/components/ProfileAvatar";
import PersonalForm from "./components/PersonalForm";
import ExperienceModal from "./components/CreateExperienceModal";
import EducationModal from "./components/EducationModal";

import { getLawyerById } from "@/lib/lawyers-actions";
import { getAllExperiences } from "@/lib/experiences-actions";
import { getAllEducations } from "@/lib/educations-actions";
import DeleteExperienceModal from "./components/DeleteExperienceModal";
import UpdateExperienceModal from "./components/UpdateExperienceModal";

export default async function ProfilePage() {
  const lawyerId = "3c3bb38c-89e2-479c-b10d-4e613a650e60";
  const lawyerData = await getLawyerById(lawyerId);

  const experiences = await getAllExperiences(lawyerId);
  const educations = await getAllEducations(lawyerId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <span className="hidden sm:inline">Experiencia profesional</span>
              <span className="sm:hidden">Experiencia</span>
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
                <div className="mb-6 flex items-center">
                  <ProfileAvatar
                    profilePicture={lawyerData.profilePicture ?? ""}
                    firstName={lawyerData.firstName ?? ""}
                    lastName={lawyerData.lastName ?? ""}
                    lawyerId={lawyerId}
                  />

                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Foto de perfil</h3>
                    <p className="text-gray-500">
                      Esta es tu foto de perfil. Hacé clic en la imagen para
                      subir una nueva foto.
                    </p>
                  </div>
                </div>

                <PersonalForm initialData={lawyerData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <div className="md:flex md:items-center md:justify-between">
                  <div>
                    <CardTitle>Experiencia Profesional</CardTitle>
                    <CardDescription>
                      Agregá o actualizá tu experiencia laboral
                    </CardDescription>
                  </div>
                  <div className="text-center md:text-right mt-4 md:mt-0">
                    <ExperienceModal lawyerId={lawyerId} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <Card key={exp.experienceId}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{exp.position}</CardTitle>
                            <CardDescription>{exp.company}</CardDescription>
                          </div>
                          <div>
                            <UpdateExperienceModal experience={exp} />
                            <DeleteExperienceModal
                              experienceId={exp.experienceId}
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          {format(exp.startDate, "MMM yyyy")} -{" "}
                          {exp.endDate
                            ? format(exp.endDate, "MMM yyyy")
                            : "Actualidad"}
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
                <div className="md:flex md:items-center md:justify-between">
                  <div>
                    <CardTitle>Educación</CardTitle>
                    <CardDescription>
                      Compartí tu trayectoria académica y fortalecé tu perfil
                      profesional
                    </CardDescription>
                  </div>
                  <div className="text-center md:text-right mt-4 md:mt-0">
                    <EducationModal lawyerId={lawyerId} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {educations.map((edu) => (
                    <Card key={edu.educationId}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{edu.field}</CardTitle>
                            <CardDescription>{edu.institution}</CardDescription>
                          </div>
                          <div>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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

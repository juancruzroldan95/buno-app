import ProfileAvatar from "@/app/(app)/components/ProfileAvatar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  BadgeCheck,
  Building2,
  Calendar,
  GraduationCap,
  Landmark,
} from "lucide-react";
import { getAllEducations } from "@/lib/educations-actions";
import { getAllExperiences } from "@/lib/experiences-actions";
import { getAllLawAreas } from "@/lib/law-areas-actions";
import { getLawyerByUserId } from "@/lib/lawyers-actions";
import { getAllProvinces } from "@/lib/provinces-actions";
import { SelectUser } from "@/db/schemas/users-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreateEducationModal from "./components/CreateEducationModal";
import CreateExperienceModal from "./components/CreateExperienceModal";
import DeleteEducationModal from "./components/DeleteEducationModal";
import DeleteExperienceModal from "./components/DeleteExperienceModal";
import PersonalLawyerForm from "./components/PersonalLawyerForm";
import UpdateEducationModal from "./components/UpdateEducationModal";
import UpdateExperienceModal from "./components/UpdateExperienceModal";

export default async function LawyerProfilePage({
  user,
}: {
  user: SelectUser;
}) {
  const lawyerData = await getLawyerByUserId(user.uid);

  const provincesData = await getAllProvinces();
  const lawAreasData = await getAllLawAreas();
  const experiences = await getAllExperiences(lawyerData.lawyerId);
  const educations = await getAllEducations(lawyerData.lawyerId);

  return (
    <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <TooltipProvider>
            {lawyerData.verifiedStatus === "pending" ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <BadgeCheck className="text-gray-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Aún no hemos verificado tu perfil</p>
                </TooltipContent>
              </Tooltip>
            ) : lawyerData.verifiedStatus === "verified" ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <BadgeCheck className="text-sky-500" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tu perfil está verificado</p>
                </TooltipContent>
              </Tooltip>
            ) : null}
          </TooltipProvider>
        </div>
        <p className="text-gray-500">
          Acá podés actualizar tu información personal y profesional
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="personal" className="space-y-4 w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="personal">
              <span className="hidden sm:inline">Información Personal</span>
              <span className="sm:hidden">Información</span>
            </TabsTrigger>
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
                    lawyerId={lawyerData.lawyerId}
                    userId={lawyerData.uid}
                  />

                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Foto de perfil</h3>
                    <p className="text-gray-500">
                      Esta es tu foto de perfil. Hacé clic en la imagen para
                      subir una nueva foto.
                    </p>
                  </div>
                </div>

                <PersonalLawyerForm
                  initialData={lawyerData}
                  provinces={provincesData}
                  lawAreas={lawAreasData}
                />
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
                    <CreateExperienceModal lawyerId={lawyerData.lawyerId} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <Card key={exp.experienceId}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="break-words overflow-hidden">
                            {exp.position}
                          </CardTitle>
                          <div className="flex flex-col md:flex-row">
                            <UpdateExperienceModal
                              lawyerId={lawyerData.lawyerId}
                              experience={exp}
                            />
                            <DeleteExperienceModal
                              experienceId={exp.experienceId}
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="break-words overflow-hidden">
                          <div className="flex items-center">
                            <Building2 className="size-4 mr-2" />
                            {exp.company}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="size-4 mr-2" />
                            {format(exp.startDate, "MMM yyyy", {
                              locale: es,
                            })}{" "}
                            -{" "}
                            {exp.endDate
                              ? format(exp.endDate, "MMM yyyy", {
                                  locale: es,
                                })
                              : "Actualidad"}
                          </div>
                          <p className="text-black mt-2">{exp.description}</p>
                        </CardDescription>
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
                    <CreateEducationModal lawyerId={lawyerData.lawyerId} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {educations.map((edu) => (
                    <Card key={edu.educationId}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="break-words overflow-hidden">
                            {edu.field}
                          </CardTitle>
                          <div className="flex flex-col md:flex-row">
                            <UpdateEducationModal education={edu} />
                            <DeleteEducationModal
                              educationId={edu.educationId}
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="break-words overflow-hidden">
                          <div className="flex items-center">
                            <Landmark className="size-4 mr-2" />
                            {edu.institution}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="size-5 mr-2" />
                            {format(edu.graduationDate, "MMMM yyyy", {
                              locale: es,
                            })}
                          </div>
                        </CardDescription>
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

import { getAllActiveCases } from "@/lib/cases-actions";
import { getAllLawAreas } from "@/lib/law-areas-actions";
import { getAllProvinces } from "@/lib/provinces-actions";
import SearchCasesList from "./components/SearchCasesList";

export default async function SearchCasesPage() {
  const allCases = await getAllActiveCases();
  const provincesData = await getAllProvinces();
  const lawAreasData = await getAllLawAreas();

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Buscar casos</h1>
          <p className="text-muted-foreground">
            Explorá casos publicados por clientes y encontrá oportunidades para
            enviar tu propuesta.
          </p>
        </div>
      </div>

      <SearchCasesList
        cases={allCases}
        provinces={provincesData}
        lawAreas={lawAreasData}
      />
    </div>
  );
}

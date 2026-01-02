import { getCityTemperatures, getMonthlyData } from "@/lib/data";
import { CityTemperatureClient } from "@/components/city-temperature-client";
import { Github } from "lucide-react";

export default async function Home() {
  const temperatures = await getCityTemperatures();

  // Prepare data for client component
  const citiesData = temperatures.map((city) => ({
    continent: city.continent,
    country: city.country,
    city: city.city,
    year: city.year,
    data: getMonthlyData(city),
  }));

  return (
    <main className="p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <img src="/logo.svg" alt="Thermometer" className="h-8 w-8" />
          City Temperatures
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
          Compare monthly temperature data for cities around the world
        </p>
        <CityTemperatureClient citiesData={citiesData} />

        <footer className="mt-8 mb-2 flex items-center justify-center gap-2">
        <a
          href="https://github.com/harrywang/citytemp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="View source on GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <span className="text-sm text-muted-foreground">
          Made by{" "}
          <a
            href="https://harrywang.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            Harry Wang
          </a>
        </span>
        </footer>
      </div>
    </main>
  );
}

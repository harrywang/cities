import { promises as fs } from "fs";
import path from "path";

export interface CityTemperature {
  continent: string;
  country: string;
  city: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  year: number;
}

export async function getCityTemperatures(): Promise<CityTemperature[]> {
  const filePath = path.join(process.cwd(), "city_temperatures.csv");
  const fileContent = await fs.readFile(filePath, "utf-8");

  const lines = fileContent.trim().split("\n");
  const data: CityTemperature[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length >= 15) {
      data.push({
        continent: values[0],
        country: values[1],
        city: values[2],
        jan: parseFloat(values[3]),
        feb: parseFloat(values[4]),
        mar: parseFloat(values[5]),
        apr: parseFloat(values[6]),
        may: parseFloat(values[7]),
        jun: parseFloat(values[8]),
        jul: parseFloat(values[9]),
        aug: parseFloat(values[10]),
        sep: parseFloat(values[11]),
        oct: parseFloat(values[12]),
        nov: parseFloat(values[13]),
        dec: parseFloat(values[14]),
        year: parseFloat(values[15]),
      });
    }
  }

  return data;
}

export function getMonthlyData(city: CityTemperature) {
  return [
    { month: "Jan", temp: city.jan },
    { month: "Feb", temp: city.feb },
    { month: "Mar", temp: city.mar },
    { month: "Apr", temp: city.apr },
    { month: "May", temp: city.may },
    { month: "Jun", temp: city.jun },
    { month: "Jul", temp: city.jul },
    { month: "Aug", temp: city.aug },
    { month: "Sep", temp: city.sep },
    { month: "Oct", temp: city.oct },
    { month: "Nov", temp: city.nov },
    { month: "Dec", temp: city.dec },
  ];
}

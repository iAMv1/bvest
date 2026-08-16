export interface SDG {
  number: number;
  name: string;
  hex: string;
  tailwindClass: string; // The base color class name without utility prefixes, e.g. "sdg1"
}

export const sdgData: SDG[] = [
  { number: 1, name: "No Poverty", hex: "#E5243B", tailwindClass: "sdg1" },
  { number: 2, name: "Zero Hunger", hex: "#DDA63A", tailwindClass: "sdg2" },
  { number: 3, name: "Good Health & Well-being", hex: "#4C9F38", tailwindClass: "sdg3" },
  { number: 4, name: "Quality Education", hex: "#C5192D", tailwindClass: "sdg4" },
  { number: 5, name: "Gender Equality", hex: "#FF3A21", tailwindClass: "sdg5" },
  { number: 6, name: "Clean Water & Sanitation", hex: "#26BDE2", tailwindClass: "sdg6" },
  { number: 7, name: "Affordable & Clean Energy", hex: "#FCC30B", tailwindClass: "sdg7" },
  { number: 8, name: "Decent Work & Economic Growth", hex: "#A21942", tailwindClass: "sdg8" },
  { number: 9, name: "Industry, Innovation & Infrastructure", hex: "#FD6925", tailwindClass: "sdg9" },
  { number: 10, name: "Reduced Inequalities", hex: "#DD1367", tailwindClass: "sdg10" },
  { number: 11, name: "Sustainable Cities & Communities", hex: "#FD9D24", tailwindClass: "sdg11" },
  { number: 12, name: "Responsible Consumption & Production", hex: "#BF8B2E", tailwindClass: "sdg12" },
  { number: 13, name: "Climate Action", hex: "#3F7E44", tailwindClass: "sdg13" },
  { number: 14, name: "Life Below Water", hex: "#0A97D9", tailwindClass: "sdg14" },
  { number: 15, name: "Life on Land", hex: "#56C02B", tailwindClass: "sdg15" },
  { number: 16, name: "Peace, Justice & Strong Institutions", hex: "#00689D", tailwindClass: "sdg16" },
  { number: 17, name: "Partnerships for the Goals", hex: "#19486A", tailwindClass: "sdg17" },
];

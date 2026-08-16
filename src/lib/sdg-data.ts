export interface SDG {
  number: number;
  name: string;
  hex: string;
  tailwindClass: string; // The base color class name without utility prefixes, e.g. "sdg1"
  imageUrl: string;      // Path to the official UN SDG icon in /public
}

export const sdgData: SDG[] = [
  { number: 1,  name: "No Poverty",                              hex: "#E5243B", tailwindClass: "sdg1",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-01.png" },
  { number: 2,  name: "Zero Hunger",                             hex: "#DDA63A", tailwindClass: "sdg2",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-02.png" },
  { number: 3,  name: "Good Health & Well-being",                hex: "#4C9F38", tailwindClass: "sdg3",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-03.png" },
  { number: 4,  name: "Quality Education",                       hex: "#C5192D", tailwindClass: "sdg4",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-04.png" },
  { number: 5,  name: "Gender Equality",                         hex: "#FF3A21", tailwindClass: "sdg5",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-05.png" },
  { number: 6,  name: "Clean Water & Sanitation",                hex: "#26BDE2", tailwindClass: "sdg6",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-06.png" },
  { number: 7,  name: "Affordable & Clean Energy",               hex: "#FCC30B", tailwindClass: "sdg7",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-07.png" },
  { number: 8,  name: "Decent Work & Economic Growth",           hex: "#A21942", tailwindClass: "sdg8",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-08.png" },
  { number: 9,  name: "Industry, Innovation & Infrastructure",   hex: "#FD6925", tailwindClass: "sdg9",  imageUrl: "/E SDG Icons WEB/E-WEB-Goal-09.png" },
  { number: 10, name: "Reduced Inequalities",                    hex: "#DD1367", tailwindClass: "sdg10", imageUrl: "/E SDG Icons WEB/E-WEB-Goal-10.png" },
  { number: 11, name: "Sustainable Cities & Communities",        hex: "#FD9D24", tailwindClass: "sdg11", imageUrl: "/E SDG Icons WEB/E-WEB-Goal-11.png" },
  { number: 12, name: "Responsible Consumption & Production",    hex: "#BF8B2E", tailwindClass: "sdg12", imageUrl: "/E SDG Icons WEB/E-WEB-Goal-12.png" },
  { number: 13, name: "Climate Action",                          hex: "#3F7E44", tailwindClass: "sdg13", imageUrl: "/E SDG Icons WEB/E-WEB-Goal-13.png" },
  { number: 14, name: "Life Below Water",                        hex: "#0A97D9", tailwindClass: "sdg14", imageUrl: "/E SDG Icons WEB/E-WEB-Goal-14.png" },
  { number: 15, name: "Life on Land",                            hex: "#56C02B", tailwindClass: "sdg15", imageUrl: "/E SDG Icons WEB/E-WEB-Goal-15.png" },
  { number: 16, name: "Peace, Justice & Strong Institutions",    hex: "#00689D", tailwindClass: "sdg16", imageUrl: "/E SDG Icons WEB/E-WEB-Goal-16.png" },
  { number: 17, name: "Partnerships for the Goals",              hex: "#19486A", tailwindClass: "sdg17", imageUrl: "/E SDG Icons WEB/E-WEB-Goal-17.png" },
];

export const convertToMeter = (decimeter: number) => decimeter / 10;
export const convertToKg = (hectogram: number) => hectogram / 10;

export const convertSlugToName = (slug: string) => {
  const words = slug.split("-");
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};
/** Exact surface colours used by Home's How we work cards. */
export const servicePalette = {
  blue: "#e8f3fc",
  lavender: "#ede8fa",
  mint: "#def2eb",
  sky: "#def0fb",
} as const;
export type ServiceTone = keyof typeof servicePalette;

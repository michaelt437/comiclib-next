export type Publishers =
  | "Marvel"
  | "DC"
  | "Image"
  | "Dark Horse"
  | "IDW"
  | "Boom! Studios"
  | "Magnetic Press"
  | "Aftershock"
  | "Behemoth";

export type Publisher = {
  id: number;
  name: Publishers;
};

export type SupportedMedia =
  | "fb"
  | "instagram"
  | "tikTok"
  | "linkedIn"
  | "bing"
  | "google"
  | "reddit"
  | "proxy";

export const SUPPORTED_MEDIA_LABELS: {
  [type in SupportedMedia]: string;
} = {
  fb: "Facebook",
  instagram: "Instagram",
  tikTok: "TikTok",
  linkedIn: "LinkedIn",
  bing: "Bing",
  google: "Google",
  reddit: "Reddit",
  proxy: "Proxy",
};

export const SUPPORTED_MEDIA_OPTIONS = Object.entries(
  SUPPORTED_MEDIA_LABELS,
).map(([value, label]) => ({
  label,
  value,
}));

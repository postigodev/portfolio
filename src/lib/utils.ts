import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeText(value: string) {
  return value
    .replaceAll("â€”", "—")
    .replaceAll("â€“", "–")
    .replaceAll("â†’", "→")
    .replaceAll("â€¢", "•")
    .replaceAll("Â·", "·")
    .replaceAll("Â©", "©")
    .replaceAll("ðŸ", "")
    .replaceAll("ðŸ§ ", "")
    .replaceAll("âš™ï¸", "⚙")
    .replaceAll("ðŸš€", "🚀");
}

export type PartnerLogoId =
  | "american-home-life"
  | "american-amicable"
  | "mutual-of-omaha"
  | "royal-neighbors-of-america"
  | "foresters"
  | "american-general-life"
  | "transamerica"
  | "fg"
  | "baltimore-life"
  | "liberty-bankers"
  | "combined"
  | "instabrain"
  | "corebridge"
  | "ethos"
  | "national-life-group";

type PartnerLogoProps = {
  id: PartnerLogoId;
  className?: string;
};

const PARTNER_LABELS: Record<PartnerLogoId, string[]> = {
  "american-home-life": ["AMERICAN HOME", "LIFE"],
  "american-amicable": ["AMERICAN", "AMICABLE"],
  "mutual-of-omaha": ["MUTUAL OF", "OMAHA"],
  "royal-neighbors-of-america": ["ROYAL NEIGHBORS", "OF AMERICA"],
  foresters: ["FORESTERS"],
  "american-general-life": ["AMERICAN GENERAL", "LIFE"],
  transamerica: ["TRANSAMERICA"],
  fg: ["F&G"],
  "baltimore-life": ["BALTIMORE", "LIFE"],
  "liberty-bankers": ["LIBERTY", "BANKERS"],
  combined: ["COMBINED"],
  instabrain: ["INSTABRAIN"],
  corebridge: ["COREBRIDGE"],
  ethos: ["ETHOS"],
  "national-life-group": ["NATIONAL LIFE", "GROUP"],
};

export function PartnerLogo({ id, className }: PartnerLogoProps) {
  const lines = PARTNER_LABELS[id];
  const longest = Math.max(...lines.map((line) => line.length));
  const fontSize = longest > 14 ? 22 : longest > 10 ? 28 : longest > 6 ? 34 : 40;
  const lineHeight = fontSize + 6;
  const totalHeight = lines.length * lineHeight;
  const startY = 44 - totalHeight / 2 + lineHeight / 2;

  return (
    <svg
      viewBox="0 0 240 88"
      className={className}
      role="img"
      aria-label={lines.join(" ")}
    >
      {lines.map((line, index) => (
        <text
          key={line}
          x="120"
          y={startY + index * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontSize={fontSize}
          fontWeight="700"
          letterSpacing={fontSize >= 34 ? "3" : "2"}
        >
          {line}
        </text>
      ))}
    </svg>
  );
}

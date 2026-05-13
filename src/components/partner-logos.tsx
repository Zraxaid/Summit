export type PartnerLogoId =
  | "americo"
  | "national-life-group"
  | "fg"
  | "transamerica"
  | "mutual-of-omaha"
  | "ethos";

type PartnerLogoProps = {
  id: PartnerLogoId;
  className?: string;
};

export function PartnerLogo({ id, className }: PartnerLogoProps) {
  const shared = {
    className,
    role: "img",
    "aria-label": id.replace(/-/g, " "),
    viewBox: "0 0 240 88",
    fill: "none",
  } as const;

  switch (id) {
    case "americo":
      return (
        <svg {...shared}>
          <path d="M24 63 52 24l28 39" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M40 63h24" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <text x="90" y="52" fill="currentColor" fontSize="26" fontWeight="700" letterSpacing="4">
            AMERICO
          </text>
        </svg>
      );
    case "national-life-group":
      return (
        <svg {...shared}>
          <path d="M18 58 40 30l13 18 10-12 20 22" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="92" y="36" fill="currentColor" fontSize="18" fontWeight="700" letterSpacing="2">
            NATIONAL LIFE
          </text>
          <text x="92" y="60" fill="currentColor" fontSize="18" fontWeight="500" letterSpacing="6">
            GROUP
          </text>
        </svg>
      );
    case "fg":
      return (
        <svg {...shared}>
          <rect x="18" y="20" width="52" height="48" rx="12" stroke="currentColor" strokeWidth="4" />
          <text x="30" y="54" fill="currentColor" fontSize="32" fontWeight="800">
            F&G
          </text>
          <text x="90" y="54" fill="currentColor" fontSize="20" fontWeight="600" letterSpacing="3">
            ANNUITIES
          </text>
        </svg>
      );
    case "transamerica":
      return (
        <svg {...shared}>
          <path d="M36 66 58 18 80 66" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
          <path d="M46 48h24" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <text x="98" y="52" fill="currentColor" fontSize="24" fontWeight="700" letterSpacing="3">
            TRANSAMERICA
          </text>
        </svg>
      );
    case "mutual-of-omaha":
      return (
        <svg {...shared}>
          <path
            d="M18 44c8-16 26-18 34 0 8-16 26-18 34 0"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M18 60c12-10 22-10 34 0 12-10 22-10 34 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <text x="96" y="40" fill="currentColor" fontSize="18" fontWeight="700" letterSpacing="2">
            MUTUAL OF
          </text>
          <text x="96" y="60" fill="currentColor" fontSize="24" fontWeight="700" letterSpacing="3">
            OMAHA
          </text>
        </svg>
      );
    case "ethos":
      return (
        <svg {...shared}>
          <circle cx="40" cy="44" r="22" stroke="currentColor" strokeWidth="5" />
          <path d="M28 44h24" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <text x="78" y="54" fill="currentColor" fontSize="32" fontWeight="800" letterSpacing="5">
            ETHOS
          </text>
        </svg>
      );
  }
}

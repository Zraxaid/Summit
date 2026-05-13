export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactCurrency(value: number) {
  if (value === 0) {
    return "$0";
  }

  if (value >= 1_000_000) {
    const compactValue = value / 1_000_000;
    const rounded =
      compactValue % 1 === 0 ? compactValue.toFixed(0) : compactValue.toFixed(1);
    return `$${rounded}M`;
  }

  return formatCurrency(value);
}

export function formatWholeNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function linePath(values: number[], width: number, height: number, padding = 28) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  return values
    .map((value, index) => {
      const x = padding + (usableWidth / (values.length - 1)) * index;
      const y =
        padding + usableHeight - ((value - min) / Math.max(max - min, 1)) * usableHeight;

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

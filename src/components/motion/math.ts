export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function wrap(value: number, min: number, max: number) {
  const range = max - min;

  if (range === 0) {
    return min;
  }

  return ((((value - min) % range) + range) % range) + min;
}

export function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

export function easeOutBack(value: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * (value - 1) ** 3 + c1 * (value - 1) ** 2;
}

export const easings = {
  smoothOut: [0.2, 0.8, 0.2, 1] as const,
  expoOut: [0.22, 1, 0.36, 1] as const,
} as const;

export const durations = {
  fast: 0.42,
  base: 0.7,
  slow: 1.1,
  marquee: 26,
} as const;

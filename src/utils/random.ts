const UINT32_MAX = 0x100000000;

export type RandomGenerator = {
  next: () => number;
  nextInt: (min: number, max: number) => number;
  shuffle: <T>(items: T[]) => T[];
};

function xmur3(seed: string) {
  let h = 1779033703 ^ seed.length;

  for (let index = 0; index < seed.length; index += 1) {
    h = Math.imul(h ^ seed.charCodeAt(index), 3432918353);
    h = (h << 13) | (h >>> 19);
  }

  return function hash() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(seed: number) {
  let state = seed >>> 0;

  return function random() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / UINT32_MAX;
  };
}

export function createSeed() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createRandom(seed: string): RandomGenerator {
  const hash = xmur3(seed);
  const random = mulberry32(hash());

  return {
    next: () => random(),
    nextInt: (min: number, max: number) => {
      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new Error("nextInt expects integer bounds");
      }
      if (max < min) {
        throw new Error("nextInt max must be greater than or equal to min");
      }
      return Math.floor(random() * (max - min + 1)) + min;
    },
    shuffle: <T>(items: T[]) => {
      const copy = [...items];

      for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
      }

      return copy;
    }
  };
}

export function range(length: number) {
  return Array.from({ length }, (_, index) => index);
}

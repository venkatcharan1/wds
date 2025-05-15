
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to apply different styles based on screen size
export function responsiveValue<T>(options: {
  base: T,
  sm?: T,
  md?: T,
  lg?: T,
  xl?: T,
  xxl?: T
}): T {
  // This function doesn't actually apply the styles at runtime,
  // it's a utility to make it easier to work with responsive values
  // in components that need different values at different breakpoints
  return options.base;
}

// Create a utility function for consistent glassmorphism effect
export function glassEffect(opacity: number = 0.1) {
  return `bg-white/${opacity} backdrop-blur-lg border border-white/20 dark:bg-black/${opacity} dark:border-white/10`;
}

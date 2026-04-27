export const selectTokens = {
  base: "flex items-center justify-between transition-all duration-200",

  variants: {
    dark: {
      trigger: "bg-surface-base border border-border-base text-text-muted",
      dropdown: "bg-surface-overlay border border-border-base shadow-xl",
      item: "text-text-base",
      itemHover:
        "hover:bg-si-hover-bg focus:bg-si-hover-bg hover:text-si-hover-text focus:text-si-hover-text rounded-md",
    },
    light: {
      trigger: "bg-surface-base border border-border-base text-text-muted",
      dropdown: "bg-surface-overlay border border-border-base shadow-xl",
      item: "text-text-base",
      itemHover:
        "hover:bg-si-hover-bg focus:bg-si-hover-bg hover:text-si-hover-text focus:text-si-hover-text rounded-md",
    },
  },

  sizes: {
    sm: "h-8 px-2 text-xs ",
    md: "h-9 px-3 text-sm ",
    lg: "h-12 px-4 text-base ",
  },

  radius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
  },
};

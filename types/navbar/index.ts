interface NavbarProps {
  viewPort :  "" | "mobile" | "tablet" | "desktop"
}

interface DropdownState {
  notice: "on" | "off",
  news: "on" | "off",
  board: "on" | "off",
  promote: "on" | "off",
  job: "on" | "off"
}

export type { NavbarProps, DropdownState };
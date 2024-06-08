interface MainPageSectionProps {
  viewPort: "" | "mobile" | "tablet" | "desktop";
  category: "Notice" | "News" | "Board" | "Promote" | "Job";
  detail: string;
  data: any;
}

export type { MainPageSectionProps };
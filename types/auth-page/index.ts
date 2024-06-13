type AuthPageProps = "signIn" | "signUp";

// type CurrentSection = null | "signIn" | "signUp";

interface CurrentSection {
  initial: boolean;
  currentSection: null | "signIn" | "signUp";
}

export type { AuthPageProps, CurrentSection };
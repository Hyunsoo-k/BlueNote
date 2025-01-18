import { useContext } from "react";

import { ViewportContext } from "@/contexts/viewport";

const useGetViewport = () => {
  const viewportContext = useContext(ViewportContext);

  const viewport = viewportContext?.viewport || "mobile";

  return viewport;
};

export { useGetViewport };
import React, { createContext, useState, useEffect } from "react";

type Viewport = "mobile" | "tablet" | "desktop";

interface ViewportContextType {
  viewport: Viewport;
};

const ViewportContext = createContext<ViewportContextType | null>(null);

const ViewportProvider = ({ children }: any) => {
  const [viewport, setViewport] = useState<Viewport>("mobile");

  useEffect(() => {
    const resizingHandler = (): void => {
      setViewport(window.innerWidth < 768 ? "mobile" : window.innerWidth < 1025 ? "tablet" : "desktop");
    };

    resizingHandler();

    window.addEventListener("resize", resizingHandler);

    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  return (
    <ViewportContext.Provider value={{ viewport }}>
      {children}
    </ViewportContext.Provider>
  )
}

export default ViewportProvider;
export { ViewportContext };
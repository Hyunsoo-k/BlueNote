import React, { useEffect, createContext, useState, Dispatch, SetStateAction } from "react";

type Viewport = "mobile" | "tablet" | "desktop";

interface ViewportContextType {
  viewport: Viewport;
  setViewport: Dispatch<SetStateAction<Viewport>>;
};

const ViewportContext = createContext<ViewportContextType | null>(null);

const ViewportProvider = ({ children }: any) => {
  const [viewport, setViewport] = useState<Viewport>("mobile");

  useEffect(() => {
    const resizingHandler = () => {
      setViewport(window.innerWidth < 768 ? "mobile" : window.innerWidth < 1025 ? "tablet" : "desktop");
    };

    resizingHandler();

    window.addEventListener("resize", resizingHandler);

    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, [])

  return (
    <ViewportContext.Provider value={{ viewport, setViewport }}>
      {children}
    </ViewportContext.Provider>
  )
}

export default ViewportProvider;
export { ViewportContext };
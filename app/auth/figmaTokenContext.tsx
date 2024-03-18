import React, { createContext, useContext } from "react";

type FigmaContextType = {
  token: string | null;
  nodeId: string | null;
  fileId: string | null;
};

// Create a context
const FigmaContext = createContext<FigmaContextType>({
  token: null,
  nodeId: null,
  fileId: null,
});

// Provider component
export function FigmaProvider({ children, token, nodeId, fileId }) {
  return (
    <FigmaContext.Provider value={{ token, nodeId, fileId }}>
      {children}
    </FigmaContext.Provider>
  );
}

// Hook to use the context
export function useFigmaContext() {
  return useContext(FigmaContext);
}

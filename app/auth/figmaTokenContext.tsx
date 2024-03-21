import React, { createContext, useContext } from "react";

type FigmaContextType = {
  token: string | null;
  nodeId: string | null;
  fileId: string | null;
  startingPointNodeId: string | null;
};

// Create a context
const FigmaContext = createContext<FigmaContextType>({
  token: null,
  nodeId: null,
  fileId: null,
  startingPointNodeId: null,
});

// Provider component
export function FigmaProvider({
  children,
  token,
  nodeId,
  fileId,
  startingPointNodeId,
}) {
  return (
    <FigmaContext.Provider
      value={{ token, nodeId, fileId, startingPointNodeId }}
    >
      {children}
    </FigmaContext.Provider>
  );
}

// Hook to use the context
export function useFigmaContext() {
  return useContext(FigmaContext);
}

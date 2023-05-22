import React, { createContext, useState, ReactNode } from "react";

interface ApiKeyProviderProps {
  children: ReactNode;
}

export const ApiKeyContext = createContext<{
  apiKey: string | null;
  setApiKey: (apiKey: string) => void;
}>({
  apiKey: null,
  setApiKey: () => {},
});

export const ApiKeyProvider: React.FC<ApiKeyProviderProps> = ({
  children,
}: ApiKeyProviderProps) => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleSetApiKey = (key: string) => {
    setApiKey(key);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey: handleSetApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

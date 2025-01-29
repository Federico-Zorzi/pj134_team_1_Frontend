import { createContext, useContext, useEffect, useState } from "react";

const LayoutContext = createContext();

//* export context for consumers
export const useLayoutContext = () => useContext(LayoutContext);

//* export context for provider
export const LayoutContextProvider = ({ children }) => {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const layoutContext = { toggleDarkMode, setToggleDarkMode };

  return (
    <LayoutContext.Provider value={layoutContext}>
      {children}
    </LayoutContext.Provider>
  );
};

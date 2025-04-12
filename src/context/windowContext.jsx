import { createContext, useContext, useEffect, useRef, useState } from "react";

const WindowContext = createContext({
  divRef: null,
  progressWidth: 0,
});
export const useWindowContext = () => {
  return useContext(WindowContext);
};

export default function WindowContextProvider({ children }) {
  const [progressWidth, setProgressWidth] = useState(0);
  const divRef = useRef(null);

  const handleScroll = () => {
    const scrollDiv = divRef.current;

    if (scrollDiv) {
      const scrollPosition = scrollDiv.scrollTop;
      const scrollHeight = scrollDiv.scrollHeight - scrollDiv.clientHeight;
      const scrollWidth = (scrollPosition / scrollHeight) * 100;
      setProgressWidth(scrollWidth);
    }
  };

  useEffect(() => {
    if (divRef.current) {
      const divScroll = divRef.current;
      divScroll.addEventListener("scroll", handleScroll);
      return () => divScroll.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <WindowContext.Provider value={{ progressWidth, divRef }}>
      {children}
    </WindowContext.Provider>
  );
}

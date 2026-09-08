import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import colors from "../constents/colors";


// Light aur Dark dono colors ko ek jagah rakh rahe hain
const lightTheme = colors;

const darkTheme = {
  ...colors,

  background: "#121212",
  card: "#1E1E1E",
  inputBackground: "#2A2A2A",

  text: "#FFFFFF",
  secondaryText: "#A1A1AA",
  placeholder: "#888888",

  border: "#3A3A3A",
  borderFocus: "#164E63",

  disabled: "#555555",

  overlay: "rgba(0, 0, 0, 0.6)",
};


// Context ke andar ye values available hongi
const ThemeContext = createContext<any>(null);


export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {

  // Current theme
  const [theme, setTheme] = useState("light");


  // App start hone par saved theme check hogi
  useEffect(() => {
    const loadTheme = async () => {

      const savedTheme = await AsyncStorage.getItem("theme");

      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    loadTheme();
  }, []);


  // Light/Dark theme change karne ka function
  const changeTheme = async (newTheme: string) => {

    // Theme change
    setTheme(newTheme);

    // Theme phone mein save
    await AsyncStorage.setItem("theme", newTheme);
  };


  // Agar theme dark hai to dark colors
  // warna light colors
  const themeColors =
    theme === "dark"
      ? darkTheme
      : lightTheme;


  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        colors: themeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}


// Is hook ke through kisi bhi screen mein
// current theme aur colors mil sakte hain
export function useTheme() {
  return useContext(ThemeContext);
}
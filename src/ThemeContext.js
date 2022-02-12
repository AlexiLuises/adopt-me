import { createContext } from "react";

// giving it hooks for typescript, create with 'green' and an empty function, 2nd thing in a hook is always a function
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;

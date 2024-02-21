"use client";

import Image from "next/image";
import styles from "./themeToggle.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.container} 
      onClick={toggle}
      style={
        theme === "dark" ? { backgroundColor: "white" } : { backgroundColor: "white" }
      }
    >
      <Image src="/sidebar/moon.png" alt="" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "#0f172a" }
        }
      ></div>
      <Image src="/sidebar/sun.png" alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;

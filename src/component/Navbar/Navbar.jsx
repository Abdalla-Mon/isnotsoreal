import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import SearchBar from "./SearchBar";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import styles from "./navbar.module.css";
export default function SearchAppBar() {
  const { scrollY } = useScroll();
  const [animation, setAnimation] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 600) {
      setAnimation(true);
    } else {
      setAnimation(false);
    }
  });
  return (
    <motion.nav
      className="fixed w-full z-[1000]"
      initial={{ opacity: 0 }}
      animate={
        animation
          ? { opacity: 1, top: [-100, 0] }
          : { opacity: 0, top: ["0%", "-100%"] }
      }
    >
      <AppBar position="static">
        <Toolbar className={styles.Navbar + " flex justify-between"}>
          <div>
            <img
              src="/assets/logo-white-no-background_modified.png"
              alt="logo"
              width={60}
            />
          </div>

          <SearchBar />
        </Toolbar>
      </AppBar>
    </motion.nav>
  );
}

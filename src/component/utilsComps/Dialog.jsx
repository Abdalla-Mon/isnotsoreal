import React from "react";
import { motion } from "framer-motion";

export default function Dialog() {
  return (
    <motion.div
      className={
        styles.dialog +
        " flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-50  "
      }
    >
      <div className={styles.content + " px-12 py-4 relative"}>
        <button
          onClick={() => {
            "handeDisplayDialog()";
          }}
        >
          <img
            src="./assets/cancel.png"
            alt=""
            className=" aspect-square w-8 absolute top-2 right-0"
          />
        </button>
        <div className={styles.posts + " grid grid-cols-2 gap-8"}>
          <div className={styles.post + " flex flex-col overflow-hidden "}>
            <div>
              <img src="./assets/testOne.png" alt="" className=" w-full" />
            </div>
            <div className="p-3">
              <h1 className="text-lg font-semibold">TITLE</h1>
              <p>Lorem ipsum dolor sit amet.</p>
              <span className="text-xs">456515</span>
            </div>
          </div>
          <div className={styles.post + " flex flex-col"}>
            <div>
              <img src="./assets/testOne.png" alt="" className=" w-full" />
            </div>
            <div className="p-3">adsf</div>
          </div>
        </div>
        <div className={styles.contentBody}></div>
      </div>
    </motion.div>
  );
}

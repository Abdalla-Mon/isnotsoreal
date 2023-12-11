import React from "react";
import styles from "./style.module.css";

export default function Post({ postData, fakeOrTrue, showDialog }) {
  function cutLongString(myString) {
    if (!myString) {
      return null;
    }
    let s = myString.split(" ");
    if (s.length > 10) {
      s = s.splice(0, 10).join(" ");
      return s + "...";
    }
    return s.join(" ");
  }

  return (
    <div className={styles.card + " flex flex-col " + styles[fakeOrTrue]}>
      <div>
        <img src={postData.image} alt="" />
      </div>
      <article className="p-3 flex-1 ">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="font-semibold text-lg">{postData.title}</h2>
            <p className="text-md">{cutLongString(postData.description)}</p>
          </div>
          <div>
            <span className="text-xs">{postData.timestamp.split("T")[0]}</span>
            {fakeOrTrue === "true" ? (
              <div>
                <button
                  onClick={() => {
                    showDialog(true);
                  }}
                >
                  Read More
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}

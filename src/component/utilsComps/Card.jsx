import { motion } from "framer-motion";
import styles from "../Feed/feed.module.css";
import { useEffect, useRef, useState } from "react";
import Module from "./Module";

export default function Card({ post }) {
  const [showDialog, setShowDialog] = useState(false);
  function handeDisplayDialog(bool) {
    setShowDialog(bool);
  }

  const backCardPost = post.true_article;
  const frontCardPost = post.fake_article;
  const [height, setHeight] = useState(400);
  const [animateHeight, setAnimatedHeight] = useState(false);

  const ref = useRef(null);

  const cardRef = useRef(null);

  return (
    <>
      {showDialog && (
        <Module handeDisplayDialog={handeDisplayDialog} post={post} />
      )}
      <motion.div
        id={post.id}
        initial={{ opacity: 0, y: 100, height: "auto", marginBottom: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        ref={cardRef}
        onClick={() => {
          window.setTimeout(() => {
            window.scrollTo({
              top:
                ref.current.getBoundingClientRect().top + window.scrollY - 60,
              behavior: "smooth",
            });
          }, [50]);
        }}
        onMouseEnter={() => {
          setAnimatedHeight(true);
        }}
        onMouseLeave={() => {
          setAnimatedHeight(false);
        }}
        animate={
          animateHeight
            ? { height: ref?.current.offsetHeight, marginBottom: 20 }
            : { height: "auto", marginBottom: 0 }
        }
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={"card_parent " + styles.cardParent}
        style={{ zIndex: `${100 - post.id}`, position: "relative" }}
      >
        <div className="inner_card mb-4  ">
          <div className={styles.frontFlip + " p-0 flip-card-front "}>
            <InnerCard
              fakeOrTrue={false}
              postData={frontCardPost}
              // getAspectRatio={getAspectRatio}
              setShowDialog={setShowDialog}
            />
          </div>
          <div
            className={styles.backFlip + " flip-card-back p-0 h-fit"}
            ref={ref}
          >
            <InnerCard
              fakeOrTrue={true}
              postData={backCardPost}
              height={true}
              setShowDialog={setShowDialog}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
function InnerCard({ postData, height, setShowDialog, fakeOrTrue }) {
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
  const [state, setState] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    setState(true);
  }, [ref]);
  return (
    <div className=" test_dev flex flex-col h-full rounded-md overflow-hidden">
      <div
        className={
          styles.image_content + " image-container overflow-hidden w-full "
        }
      >
        <img
          src={postData.image}
          ref={ref}
          style={height ? { margin: "0 auto" } : { width: "100%" }}
        />
      </div>
      <div
        style={{ width: ref?.current?.offsetWidth || "100%", margin: "auto" }}
        className={
          ref?.current?.offsetHeight > 260 && state
            ? styles.contentPost +
              "  flex flex-col p-4 justify-between flex-1  text-[white] " +
              styles.handle
            : styles.contentPost +
              "  flex flex-col p-4 justify-between flex-1  text-[white] "
        }
      >
        <div>
          <h2 className="font-semibold " style={{ fontSize: "14px" }}>
            {postData.title}
          </h2>
          <p className="text-md" style={{ fontSize: "12px" }}>
            {cutLongString(postData.description)}
          </p>
        </div>
        <div>
          <span className="">{postData.timestamp.split("T")[0]}</span>
          <div className={fakeOrTrue ? "" : styles.btnHidden}>
            <button
              className={styles.readMore + " w-full p-2"}
              onClick={() => {
                setShowDialog(true);
              }}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

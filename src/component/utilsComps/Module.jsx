import { motion } from "framer-motion";
import styles from "../Feed/feed.module.css";
import { useEffect, useRef, useState } from "react";

export default function Module({ handeDisplayDialog, post }) {
  const truePost = post.true_article;
  const falsePost = post.fake_article;
  const [animation, setAnimation] = useState(false);
  const [contentAnimation, setConetentAnimation] = useState(false);
  useEffect(() => {
    document.body.style = "overflow:hidden";
  }, []);
  function hnadleClick() {
    document.body.style = "overflow:auto";
    setConetentAnimation(true);
    window.setTimeout(() => {
      setAnimation(true);
    }, 500);
    window.setTimeout(() => {
      handeDisplayDialog(false);
    }, 800);
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={!animation ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 0.3 }}
      className={
        styles.dialog +
        " flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-[1001] "
      }
    >
      <div
        className="wrapper z-0 h-full w-full absolute bg-[#0000008a]"
        onClick={hnadleClick}
      ></div>
      <CLoseBtn hnadleClick={hnadleClick} />
      <div
        className={
          " px-4 sm:px-12 py-4 relative z-10 max-h-[800px] max-w-[800px] overflow-auto module_container hidden md:block bg-[#212129]"
        }
      >
        <ModuleBody
          contentAnimation={contentAnimation}
          truePost={truePost}
          falsePost={falsePost}
          left={true}
        />
      </div>
      <div
        className={
          " px-4 sm:px-12 py-4 relative z-10 max-h-[800px] max-w-[90vw] overflow-auto module_container block md:hidden bg-[#212129] "
        }
      >
        <ModuleBody
          contentAnimation={contentAnimation}
          truePost={truePost}
          falsePost={falsePost}
          top={true}
          mobile={true}
        />
      </div>
    </motion.div>
  );
}
function ModuleBody({
  contentAnimation,
  falsePost,
  truePost,
  top,
  left,
  mobile,
}) {
  const [swap, setSwap] = useState(false);

  return (
    <div className={" grid sm:grid-cols-2 gap-4 sm:gap-8 module_body"}>
      {mobile ? (
        <>
          <button
            className="p-3 w-fit text-white  rounded-[12px] mx-auto"
            onClick={() => setSwap((old) => !old)}
            style={
              swap
                ? { backgroundColor: "#600b1633" }
                : { backgroundColor: "#45632233" }
            }
          >
            Swap the post
          </button>
          {swap ? (
            <ModuleContent
              contentAnimation={contentAnimation}
              left={left}
              className={" bg-[#600b1633] text-[white]"}
              top={top}
            >
              <ModulePost post={truePost} bgColor=" bg-[#610b17]" />
            </ModuleContent>
          ) : (
            <ModuleContent
              contentAnimation={contentAnimation}
              top={top}
              className={" bg-[#45632233] text-[white]"}
            >
              <ModulePost
                fake={true}
                post={falsePost}
                bgColor=" bg-[#456322]"
              />
            </ModuleContent>
          )}
        </>
      ) : (
        <>
          <ModuleContent
            contentAnimation={contentAnimation}
            left={left}
            className={" bg-[#600b1633] text-[white]"}
            top={top}
          >
            <ModulePost fake={true} post={falsePost} bgColor=" bg-[#610b17]" />
          </ModuleContent>
          <ModuleContent
            contentAnimation={contentAnimation}
            top={top}
            className={" bg-[#45632233] text-[white]"}
          >
            <ModulePost post={truePost} bgColor=" bg-[#456322]" />
          </ModuleContent>
        </>
      )}
    </div>
  );
}
function CLoseBtn({ hnadleClick }) {
  return (
    <button
      className="close absolute md:hidden right-6 top-6 z-[10000] bg-white rounded-full p-2 h-10 w-10 flex justify-center items-center"
      onClick={hnadleClick}
    >
      X
    </button>
  );
}
function ModuleContent({ contentAnimation, children, left, className, top }) {
  function animate() {
    if (!contentAnimation) {
      return { x: 0, y: 0 };
    } else {
      if (top) {
        return { y: "-50%" };
      }
      if (left) {
        return { x: "50%" };
      } else {
        return {
          x: "-55%",
        };
      }
    }
  }
  return (
    <motion.div
      initial={left ? { x: "50%" } : top ? { y: "-50%" } : { x: "-55%" }}
      animate={animate}
      transition={
        !contentAnimation
          ? { duration: 0.5, delay: 0.3 }
          : { duration: 0.5, delay: 0 }
      }
      className={" flex flex-col overflow-hidden items-center p-5 " + className}
    >
      {children}
    </motion.div>
  );
}
function ModulePost({ post, bgColor, fake }) {
  return (
    <>
      <h1
        className="text-3xl text-center mb-3 text-stone-400 module_title"
        style={{ fontWeight: "bold" }}
      >
        {fake ? "Fake Post" : "True Post"}
      </h1>
      <div className="img_container mb-1">
        <img src={post.image} alt="image" />
      </div>
      <Body content={post.content} bgColor={bgColor} />
    </>
  );
}

function Body({ content, bgColor }) {
  return (
    <>
      {/* <h3
        className="text-xl text-center mt-2 text-stone-400"
        style={{ fontWeight: "bold" }}
      >
        Content
      </h3> */}
      <ul className="w-full">
        {content.map((ele) => (
          <div key={ele.data.src || ele.data}>
            {ele.type === "text" && <CardText text={ele.data} />}
            {ele.type === "link" && (
              <CardLink href={ele.data} bgColor={bgColor} />
            )}
            {ele.type === "image" && (
              <CardPhoto src={ele.data.src} alt={ele.data.alt} />
            )}
            {ele.type === "video" && (
              <>
                <div>
                  <iframe width="420" height="315" src={ele.data}></iframe>
                </div>
              </>
            )}
          </div>
        ))}
      </ul>
    </>
  );
}

function CardText({ text }) {
  return <li className="card_text p-3 my-2  ">{text}</li>;
}
function CardLink({ href, bgColor }) {
  return (
    <a
      href={href}
      className={
        "card_link w-full p-3 bg-[#141416] text-[white] block rounded-xl my-3 text-center hover:bg-[#1e0506ab] "
      }
    >
      Link
    </a>
  );
}
function CardPhoto({ src, alt }) {
  return (
    <li className="img-container">
      <img src={src} alt={alt} />
    </li>
  );
}

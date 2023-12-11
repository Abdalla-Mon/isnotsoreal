import { useContext } from "react";
import Card from "../utilsComps/Card";
import { DataContext } from "../../App";
import * as React from "react";
import { motion } from "framer-motion";

export default function Feed({ data: postsData }) {
  const posts = postsData;
  const { animation } = useContext(DataContext);
  let col = Math.ceil(posts.length / 3);
  let [firstGrid, setFirstGrid] = React.useState(posts.slice(0, col));
  let [secondGrid, setSecondGrid] = React.useState(posts.slice(col, col + col));
  let [thirdGrid, setThirdGrid] = React.useState(
    posts.slice(col + col, posts.length)
  );
  function changeWidthEvent() {
    if (document.body.clientWidth <= 1023 && document.body.clientWidth > 767) {
      col = Math.floor(Math.ceil(posts.length / 2));
      setFirstGrid(posts.slice(0, posts.length / 2));
      setSecondGrid(posts.slice(posts.length / 2, posts.length));
      setThirdGrid([]);
    } else {
      col = Math.ceil(posts.length / 3);
      setFirstGrid(posts.slice(0, col));
      setSecondGrid(posts.slice(col, col + col));
      setThirdGrid(posts.slice(col + col, posts.length));
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      changeWidthEvent();
    });
    changeWidthEvent();
  }, [posts]);
  return (
    <div className={" px-4 md:px-20 py-12 container mx-auto feed"}>
      <motion.div
        className=" flex justify-center  gap-4 max-ws-[1200px] mx-auto flex-wrap"
        initial={!animation ? { rotateY: 90 } : { rotateY: 0 }}
        animate={animation ? { rotateY: 90 } : { rotateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="post_contaienr w-[100%] md:w-[46%] lg:w-[31%]">
          {firstGrid.map((post, i) => (
            <Card post={post} key={post.id} />
          ))}
        </div>
        <div className="post_contaienr w-[100%] md:w-[46%] lg:w-[31%]">
          {secondGrid.map((post, i) => (
            <Card post={post} key={post.id} />
          ))}{" "}
        </div>

        <div className="post_contaienr w-[100%] md:w-[46%] lg:w-[31%]">
          {thirdGrid.map((post, i) => (
            <Card post={post} key={post.id} />
          ))}{" "}
        </div>
      </motion.div>
    </div>
  );
}

import { createContext, memo, useContext, useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import Feed from "./component/Feed/Feed";
import SearchAppBar from "./component/Navbar/Navbar";
import { Divider, Pagination, Paper, Stack } from "@mui/material";
export const DataContext = createContext(null);

function getData(setData, setPostData) {
  axios.get("/data.json").then((e) => {
    setData(e.data.data);
    setPostData(e.data.data.posts);
  });
}
function handleFilter(catName, postData, data, setPostData) {
  if (catName) {
    setPostData(postData?.filter((post) => post.category_id === catName.id));
  } else {
    setPostData(data?.posts);
  }
}
function App() {
  const [data, setData] = useState(null);
  const [slicedData, setSliced] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [grid, setGrid] = useState(12);
  const [postData, setPostData] = useState(null);
  const [catName, setCatName] = useState(null);
  let actualData = postData?.slice(slicedData, slicedData + grid);
  if (catName) {
    actualData = postData?.slice(slicedData, slicedData + grid);
  }
  useEffect(() => {
    getData(setData, setPostData);
  }, []);
  useEffect(() => {
    handleFilter(catName, postData, data, setPostData);
  }, [catName]);
  return (
    <DataContext.Provider
      value={{
        data,
        setSliced,
        grid,
        slicedData,
        setCatName,
        catName,
        animation,
        setAnimation,
      }}
    >
      <div className="">
        {!data ? (
          <div className="min-w-full min-h-screen flex justify-center items-center text-5xl text-sky-800">
            loading
          </div>
        ) : (
          <>
            <VideoContainer video={data.video_link} />
            <div className="relative">
              <div className="palestine "></div>
              <div className="palestine_wrapper "></div>
            </div>

            <SearchAppBar />

            <Feed data={actualData} />
            <div className="container mx-auto">
              <ShopPagination
                data={postData}
                grid={grid}
                setSliceNum={setSliced}
              />
            </div>
          </>
        )}
      </div>
    </DataContext.Provider>
  );
}
function VideoContainer({ video }) {
  return (
    <div className=" w-full ">
      <video className="w-full h-full" autoPlay muted loop>
        <source
          src={`/assets/${video.src}`}
          title={video.title}
          type="video/mp4"
        />
        <img src="" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
const ShopPagination = memo(({ data, setSliceNum, grid = 3 }) => {
  const { setAnimation } = useContext(DataContext);
  const [page, setPage] = useState(1);
  const index = Math.ceil(data.length / grid);

  useEffect(() => {
    document.querySelectorAll(".pagination  li button")[1].click();
  }, [index, data.length]);

  let paginationNum = 0;

  for (let i = 0; i < index; i++) {
    paginationNum++;
  }
  const handleChange = (event, value) => {
    window.setTimeout(() => {
      setSliceNum((value - 1) * grid, value * grid);
      document.querySelector(".feed")?.scrollIntoView();
      setAnimation(false);
    }, 500);
    setPage(value);
  };
  return (
    <Stack spacing={2} className="pagination">
      <Pagination
        className="pagination_container"
        size="large"
        count={paginationNum}
        onClick={() => setAnimation(true)}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
});
export default App;

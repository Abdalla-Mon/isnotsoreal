import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { DataContext } from "../../App";
import { motion } from "framer-motion";
import styles from "./navbar.module.css";

const SearchBarContext = createContext(null);
export default function SearchBar() {
  const [openForSearch, setOpenForSearch] = useState(false);

  const [searchText, setSearchText] = React.useState("");
  const { catName, setCatName } = useContext(DataContext);
  const [dropDown, setDropDown] = React.useState(false);
  const inputRef = useRef(null);

  const searchArea = useRef(null);

  useEffect(() => {
    document.body.addEventListener("click", () => { });
  }, []);

  useLayoutEffect(() => {
    if (openForSearch) {
      searchArea.current.classList.add(`${styles.active}`);
    } else {
      searchArea.current.classList.remove(`${styles.active}`);
    }
  }, [openForSearch]);
  function handleSearchAreaDisplay() {
    setOpenForSearch(true);
    inputRef.current.focus();
    // setDropDown(false);
  }

  return (
    <SearchBarContext.Provider
      value={{
        searchText,
        setSearchText,
        dropDown,
        setDropDown,
        inputRef,
        catName,
        setCatName,
        setOpenForSearch,
        openForSearch,
      }}
    >
      <div className="relative z-10 ">
        {dropDown && (
          <div
            className="wrapper fixed top-0 left-0 w-full h-full z-10 "
            onClick={() => {
              setDropDown(false);
              setOpenForSearch(false);
            }}
          ></div>
        )}
        <div
          className={
            styles.search_parent +
            " items-center flex z-40 relative gap-8 overflow-hidden py-1"
          }
          ref={searchArea}
        >
          <div className="grow flex items-center">
            <div className=" z-10">
              <button
                className={
                  styles.searchButton + " flex justify-center items-center"
                }
                onClick={handleSearchAreaDisplay}
              >
                <img src="/assets/search2.png" alt="search Icon" width={26} />
              </button>
            </div>
            <div className={styles.c + " flex flex-1 relative py-1"}>
              <div>
                <SelectedCategory />
              </div>
              <SeachBarInput />
            </div>
          </div>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            dropDown ? { height: 400, opacity: 1 } : { height: 0, opacity: 0 }
          }
          className={
            styles.dropDown +
            " dropDown z-20 absolute p-2 text-black w-full overflow-auto "
          }
        >
          {!catName && (
            <ul>
              <div className="flex items-center gap-2">
                <h3 className="font-bold"> Categories </h3>
                <span className="grow bg-black h-[2px]"></span>
              </div>
              <FilterdCatList
                searchText={searchText}
                setCatName={setCatName}
                setSearchText={setSearchText}
                inputRef={inputRef}
              />
            </ul>
          )}
          <SearchedTitle
            searchText={searchText}
            catName={catName}
            setSearchText={setSearchText}
            setDropDown={setDropDown}
          />
        </motion.div>
      </div>{" "}
    </SearchBarContext.Provider>
  );
}

function SeachBarInput() {
  const { setDropDown, searchText, setSearchText, inputRef } =
    useContext(SearchBarContext);
  return (
    <motion.input
      onFocus={() => setDropDown(true)}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      ref={inputRef}
      className={"outline-none " + styles.inputSearch}
    />
  );
}

function SelectedCategory() {
  const { catName, setCatName, setSearchText } = useContext(SearchBarContext);
  async function handleClick() {
    setSearchText("");
    setCatName(null);
  }
  return (
    <div className="px-3">
      {catName && (
        <h3
          className={
            styles.choosed +
            " relative w-max p-2 text-white text-xs font-semibold shadow-md flex gap-2 items-center"
          }
        >
          <span>{catName.label}</span>
          <div
            onClick={handleClick}
            className="cursor-pointer text-white w-[16px]"
          >
            <img alt="" src="/assets/delete.png" />
          </div>
        </h3>
      )}
    </div>
  );
}

function FilterdCatList() {
  const { searchText, setCatName, setSearchText, inputRef } =
    useContext(SearchBarContext);
  const { data } = useContext(DataContext);
  const fikterdCat = data.categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchText.toLowerCase())
  );

  async function handleCategoryClick(cat) {
    setCatName(cat);
    setSearchText("");
    inputRef.current.focus();
  }
  return (
    <>
      {fikterdCat.map((cat) => (
        <li
          className="cursor-pointer hover:bg-slate-100 hover:text-black"
          key={cat.label}
          onClick={() => handleCategoryClick(cat)}
        >
          {cat.label}
        </li>
      ))}
    </>
  );
}

function SearchedTitle() {
  const { searchText, catName, setSearchText, setDropDown } =
    useContext(SearchBarContext);

  const { data, grid } = useContext(DataContext);
  let filterdPosts = data.posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );
  if (catName) {
    filterdPosts = data.posts
      .filter((post) => post.category_id === catName.id)
      .filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      );
  }
  async function handleClick(post, index) {
    await setDropDown(false);

    let ele = document.getElementById(
      post.id
      // `      ${(post.title + post.id).replace(/ /g, "")}`
    );
    let time = 50;
    if (!ele) {
      let pageNumber = Math.ceil(index / grid);
      document.querySelectorAll(".pagination  li button")[pageNumber].click();
      time = 550;
    }
    window.setTimeout(() => {
      ele = document.getElementById(post.id);
      window.scrollTo({
        top: ele.getBoundingClientRect().top + window.scrollY - 60,
        behavior: "smooth",
      });
    }, time);

    setSearchText("");
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <h3 className="font-bold"> Posts </h3>
        <span className="grow bg-black h-[2px]"></span>
      </div>
      <ul>
        {filterdPosts.map((post, index) => (
          <li
            key={post.id}
            className="hover:bg-teal-100 hover:text-black cursor-pointer"
            onClick={() => {
              handleClick(post, index + 1);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./Hero";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
AOS.init();
const Demo = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const usertoken = JSON.parse(localStorage.getItem("token"));

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
    // if (usertoken) {
    //   toast.success("Login Successfull");
    // }
    if (!usertoken) {
      navigate("/signin");
    }
  }, [usertoken]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setAllArticles(updatedAllArticles);
      setArticle(newArticle);
      console.log(newArticle);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    setArticle({ ...article, url: copyUrl });
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <Hero />
      <section className="mt-4 w-full max-w-xl">
        {/* search section */}
        <div className="flex flex-col w-full gap-2">
          <form
            data-aos="fade-right"
            data-aos-duration="1000"
            onSubmit={handleSubmit}
            className="relative flex justify-center items-center"
          >
            <img
              src={linkIcon}
              alt="link-icon"
              className="absolute left-0 my-2 ml-3 w-5"
            />
            <input
              type="url"
              placeholder="Paste the article link"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              onKeyDown={handleKeyDown}
              required
              className="url_input peer" // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
            />
            <button
              type="submit"
              className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
            >
              <p>↵</p>
            </button>
          </form>

          <div
            className="flex max-h-60 flex-col gap-1 overflow-y-auto"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {allArticles.reverse().map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="link_card"
              >
                <div
                  className="copy_btn bg-orange-600"
                  onClick={() => handleCopy(item.url)}
                >
                  <img
                    src={copied === item.url ? tick : copy}
                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                    className="w-[40%] h-[40%] object-contain"
                  />
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                  {item.url}
                </p>
              </div>
            ))}
          </div>
          {/* Browser History */}
        </div>

        {/* Display results */}

        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Well, that wasn't supposed to happen...
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Demo;

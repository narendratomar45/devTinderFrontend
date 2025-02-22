import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log("FEED", feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error("ERROR", error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div>
        <FeedCard user={feed?.feedUsers[0]} />
      </div>
    )
  );
};

export default Feed;

import React, { useState } from "react";
import { updateCarPopularity } from "../api";
function ThumbsUp({ count, id }) {
  
  const [upcount, setUpCount] = useState(count);
  const handleClick = async () => {
    if (upcount < 2) {
      await updateCarPopularity(id)
        .then((res) => setUpCount(+res.data.count))
        .catch((e) => alert("api down"));
    }
  };
  return (
    <div className="">
      <span className="fs-md-6 fs-lg-5">
        {upcount > 1 ? `number of interested buyers` : `be the first to like`}
      </span>
      <span
        id="boot-icon"
        className="bi bi-hand-thumbs-up fs-lg-4"
        style={{ cursor: upcount < 2 ? "pointer" : "" }}
        onClick={handleClick}
      />
      <span className="px-1 fs-md-6 fs-lg-5 text-success fw-bold">
        {upcount - 1 > 0 ? upcount - 1 : " "}
      </span>
    </div>
  );
}

export default ThumbsUp;

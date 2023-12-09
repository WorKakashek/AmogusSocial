import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const InputBar = () => {
  return (
    <div className="relative">
      <AiOutlineSearch
        size={"1.5em"}
        className=" absolute top-2 left-2 cursor-pointer"
      />
      <input
        type="text"
        placeholder="search..."
        className="pl-10 focus:border-black focus:ring-black rounded-md"
      />
    </div>
  );
};

export default InputBar;

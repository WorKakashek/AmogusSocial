import React from "react";
import Logo from "./Logo";
import InputBar from "./InputBar";
import ProfileHomeMenu from "./ProfileHomeMenu";

const Header = () => {
  return (
    <div className=" sticky top-0 bg-white px-3 z-20">
      <div className="flex items-center justify-between mx-4 xl:mx-auto">
        <Logo />
        <InputBar />
        <ProfileHomeMenu />
      </div>
    </div>
  );
};

export default Header;

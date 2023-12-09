import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="h-24 w-24 relative cursor-pointer items-center flex gap-2">
      <Image
        className="object-contain inline-grid"
        alt="logo"
        src={"/assets/among-us.svg"}
        width={29}
        height={29}
      />
      <p className="hidden lg:inline-grid font-bold">AMOGUSocial</p>
    </div>
  );
}

export default Logo;

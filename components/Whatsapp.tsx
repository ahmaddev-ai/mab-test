import Image from "next/image";
import React from "react";

const Whatsapp = () => {
  return (
    <div className="fixed   left-5 bottom-6 z-50 ">
      <a
        href={
          "https://api.whatsapp.com/send/?phone=923072770751&text&type=phone_number&app_absent=0"
        }
        target="_blank"
      >
        <Image
          alt="whatsap"
          src="/whatsapp.webp"
          width={48}
          height={48}
          className="w-[50px] h-[50px] text-black cursor-pointer animate-slow-rotate"
        />
      </a>
    </div>
  );
};

export default Whatsapp;

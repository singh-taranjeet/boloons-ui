"use client";
import { useEffect, useState } from "react";
import { breakPoints } from "./constants";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth < breakPoints.sm) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  console.log("Is MObile", isMobile);

  return isMobile;
}

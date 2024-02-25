"use client";
import { useScreenSize } from "@/app/lib/cutom-hooks.lib";
import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  src: {
    video: string;
    poster: string;
  };
}
export const BackgroundVideo = (props: BackgroundVideoProps) => {
  const { src } = props;

  // const innerWidth = useScreenSize();

  // const videoRef = useRef(null);

  // useEffect(() => {
  //   function setSource() {
  //     if (videoRef.current) {
  //       (videoRef.current as any).pause();

  //       if (innerWidth > 1536 && src["4k"]) {
  //         (videoRef.current as any).src = src["4k"];
  //       } else if (innerWidth > 768 && src[1080]) {
  //         (videoRef.current as any).src = src["1080"];
  //       } else if (src[720]) {
  //         (videoRef.current as any).src = src[720];
  //       }
  //       (videoRef.current as any).load();
  //     }
  //   }
  //   setSource();
  // }, [innerWidth, src]);

  return (
    <video
      autoPlay
      // ref={videoRef}
      muted
      poster={src.poster}
      loop
      className="fixed right-0 bottom-0 min-w-full min-h-full object-cover"
    >
      <source src={src["video"]} type="video/mp4" />
    </video>
  );
};

"use client";
import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { AppConfig } from "../../../config";
import { breakPoints } from "./style.lib";

function getUserDevice() {
  try {
    return window.innerWidth < breakPoints.sm;
  } catch (error) {
    return true;
  }
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getUserDevice);

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

  return isMobile;
}

const URL = AppConfig().apiUrl;

const socket = io(URL);

export function useWebSocket() {
  const [connected, setConnected] = useState(false);

  function onConnect() {
    console.log("connected");
    setConnected(true);
  }

  function onDisconnect() {
    setConnected(false);
    console.log("Disconnected");
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    console.log("socket hook init");

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const data = useMemo(() => {
    return {
      socket,
      connected,
    };
  }, [connected]);

  return data;
}

/**
 *
 * @param {*} ref - Ref of parent div
 * @param {*} callback - Callback which can be used to change state in component
 */
export function useOutsideClick(
  ref: MutableRefObject<any>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (evt: any) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        console.log("clicked outside");
        callback();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
}

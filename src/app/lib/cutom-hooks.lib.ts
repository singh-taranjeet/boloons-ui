"use client";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { appConstants } from "@/app/lib/constants.lib";
const RootUrl = AppConfig().apiUrl;
import { getRandomInt } from "./server.lib";
import { AppConfig } from "../../../config";
import { breakPoints } from "./style.lib";

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

  // console.log("Is MObile", isMobile);

  return isMobile;
}

export function usePlayer() {
  const [player, setPlayer] = useState<{ id: string; name: string } | null>(
    null
  );

  function updatePlayerName(name: string) {
    setPlayer({
      ...player,
      id: player?.id || "",
      name,
    });
  }

  const loadValue = useCallback(function loadvalue() {
    const info = localStorage.getItem(appConstants.playerInfoLocalStorage);
    try {
      if (!info || !Object.keys(JSON.parse(info))?.length) {
        const newInfo = {
          id: getRandomInt(),
          name: getRandomInt(),
        };
        // console.log("Player info not found", newInfo);
        localStorage.setItem(
          appConstants.playerInfoLocalStorage,
          JSON.stringify(newInfo)
        );
      } else {
        setPlayer(JSON.parse(info));
      }
    } catch (error) {
      // console.log("Error in saving player info", info, error);
      localStorage.removeItem(appConstants.playerInfoLocalStorage);
    }
  }, []);

  useEffect(() => {
    loadValue();
  }, [loadValue]);

  // Update value in local storage when the information is udpated.
  useEffect(() => {
    if (player) {
      localStorage.setItem(
        appConstants.playerInfoLocalStorage,
        JSON.stringify(player)
      );
    }
  }, [player]);

  return { player, updatePlayerName };
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

  return {
    connected,
    socket,
  };
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

export function useHttp<ResponseType>(
  url: string,
  method: "post" | "get" | "patch" | "delete"
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [response, setResponse] = useState<ResponseType | undefined>();

  useEffect(() => {
    async function invoke() {
      try {
        const res = await axios[method](`${RootUrl}${url}`);
        setResponse(res.data);
        setLoading(false);
      } catch (error: any) {
        setError({
          success: false,
          ...(error?.response?.data || "Failed"),
        });
        setLoading(false);
      }
    }
    invoke();
  }, [method, url]);

  return {
    loading,
    error,
    response,
  };
}

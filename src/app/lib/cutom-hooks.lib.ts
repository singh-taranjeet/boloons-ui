"use client";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { urls } from "@/app/lib/constants.lib";
const RootUrl = AppConfig().apiUrl;
import { throttle } from "lodash";
import { AppConfig } from "../../../config";
import { breakPoints } from "./style.lib";
import { apiRequest } from "./utils.lib";
const localStorageConstant = {
  playerName: "playerName",
  playerId: "playerId",
  user: "boloons-user",
};

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

function getThrottleVersion<PlayerType>(
  fun: (data: PlayerType) => Promise<void>
) {
  return throttle(fun, 3000, { trailing: true });
}

interface PlayerType {
  id: string;
  name: string;
}
export function usePlayer() {
  const [player, setPlayer] = useState<PlayerType>({ id: "", name: "" });

  const storeData = useCallback(function storeData(data: PlayerType) {
    setPlayer(data);
    localStorage.setItem(localStorageConstant.user, JSON.stringify(data));
  }, []);

  async function throttle(newData: PlayerType) {
    const response = await apiRequest<PlayerType, PlayerType>({
      url: urls.api.player,
      method: "patch",
      body: newData,
    });
    console.log("Request", response);
    if (response && response.data) {
      storeData(response.data);
    }
  }

  const memoisedThrottle = useCallback(throttle, [storeData]);
  const updatePlayerNameApi = getThrottleVersion<PlayerType>(memoisedThrottle);

  const updatePlayerName = useCallback(
    (name: string) => {
      setPlayer((oldPlayer) => {
        updatePlayerNameApi({ id: oldPlayer.id, name });
        return {
          ...oldPlayer,
          name,
        };
      });
    },
    [updatePlayerNameApi]
  );

  const setPlayerData = useCallback(
    async function setPlayerData() {
      const response = await apiRequest<undefined, PlayerType>({
        method: "get",
        url: urls.api.player,
      });
      if (response && response.data) {
        storeData(response.data);
      }
    },
    [storeData]
  );

  useEffect(() => {
    function avoidCalls() {
      const randomNameGenerated = "4h32jkh32j4h32j4h32j4h32kj4";
      const inProgress = localStorage.getItem(randomNameGenerated);
      if (!inProgress) {
        setPlayerData();
        localStorage.setItem(randomNameGenerated, randomNameGenerated);
        setTimeout(() => localStorage.removeItem(randomNameGenerated), 3000);
      }
    }

    async function checkLocalData() {
      try {
        const localData = localStorage.getItem(localStorageConstant.user);
        if (localData) {
          const data: PlayerType = JSON.parse(localData);
          setPlayer(data);
        } else {
          // Data not found or not valid
          avoidCalls();
        }
      } catch (error) {
        // Data not found or not valid
        avoidCalls();
      }
    }
    checkLocalData();
  }, [setPlayerData]);

  return { player, updatePlayerName };
}

const URL = AppConfig().apiUrl;

const socket = io(URL);

export function useWebSocket() {
  //const [connected, setConnected] = useState(false);

  function onConnect() {
    console.log("connected");
    //setConnected(true);
  }

  function onDisconnect() {
    //setConnected(false);
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
    };
  }, []);

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

export function useHttp<ResponseType, Body>(params: {
  url: string;
  method?: "post" | "get" | "patch" | "delete";
  onInit?: boolean;
}) {
  const { url, method = "get", onInit = true } = params;
  const [loading, setLoading] = useState(!!onInit);
  const [error, setError] = useState<any>();
  const [response, setResponse] = useState<ResponseType | undefined>();

  const invoke = useCallback(
    async function invoke(params: { body?: Body; newUrl?: string }) {
      const { body, newUrl = url } = params;
      try {
        const res = await axios[method](`${RootUrl}${newUrl}`, body || {});
        setResponse(res.data);
        if (AppConfig().env === "development") {
          console.log(`Response of ${newUrl} ${res.data}`);
        }
        setLoading(false);
      } catch (error: any) {
        if (AppConfig().env === "development") {
          console.log(`Error in ${newUrl} ${error.message}`);
        }
        setError({
          success: false,
          ...(error?.response?.data || "Failed"),
        });
        setLoading(false);
      }
    },
    [method, url]
  );

  useEffect(() => {
    if (onInit) {
      invoke({});
    }
  }, [invoke, method, onInit, url]);

  return {
    loading,
    error,
    response,
    invoke,
  };
}

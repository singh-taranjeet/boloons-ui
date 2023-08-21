"use client";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { urls } from "@/app/lib/constants.lib";
const RootUrl = AppConfig().apiUrl;
import { throttle } from "lodash";
import { AppConfig } from "../../../config";
import { breakPoints } from "./style.lib";
import { DebugLog } from "@/app/lib/utils.lib";
const localStorageConstant = {
  playerName: "playerName",
  playerId: "playerId",
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

export function usePlayer() {
  const [player, setPlayer] = useState<{ id: string; name: string }>(() => {
    try {
      const playerName = localStorage.getItem(localStorageConstant.playerName);
      const playerId = localStorage.getItem(localStorageConstant.playerId);
      return {
        id: playerId || "",
        name: playerName || "",
      };
    } catch (error) {
      return {
        id: "",
        name: "",
      };
    }
  });
  const randomNameGenerated = "4h32jkh32j4h32j4h32j4h32kj4";
  const { socket } = useWebSocket();

  const playerEndPoint = `${urls.api.player}`;

  const { loading, response, invoke } = useHttp<
    {
      success: boolean;
      data: {
        id: string;
        name: string;
      };
    },
    {}
  >({
    url: playerEndPoint,
    onInit: false,
  });

  const updatePlayerApi = useHttp({
    url: playerEndPoint,
    method: "patch",
    onInit: false,
  });

  const updatePlayerNameOnApiThrottle = throttle(updatePlayerNameOnApi, 3000, {
    trailing: true,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sdf = useCallback(updatePlayerNameOnApiThrottle, []);

  const updatePlayerName = useCallback(
    function updatePlayerName(name: string) {
      setPlayer({
        ...player,
        id: player?.id || "",
        name,
      });
      if (player?.id && name) {
        DebugLog(`Hello ${player}`);
        sdf(player.id, name);
      }
    },
    [player, sdf]
  );

  const setLocal = useCallback(function setLocal(player: {
    id: string;
    name: string;
  }) {
    const { id = "", name = "" } = player;
    localStorage.setItem(localStorageConstant.playerId, player?.id || "");
    localStorage.setItem(localStorageConstant.playerName, player?.name || "");
  },
  []);

  function updatePlayerNameOnApi(id: string, name: string) {
    if (id && name) {
      updatePlayerApi.invoke({
        body: { id, name },
      });
      setLocal({ id, name });
    }
  }

  const removeUnRequiredLocalStorageItem = useCallback(
    function removeUnRequiredLocalStorageItem() {
      setTimeout(() => {
        localStorage.removeItem(randomNameGenerated);
      }, 30000);
    },
    []
  );

  /**
   * Check if data exist in local storage
   */
  useEffect(() => {
    const inProgress = localStorage.getItem(randomNameGenerated);
    if ((!player?.name || !player?.id) && !inProgress) {
      invoke({});
      localStorage.setItem(randomNameGenerated, "true");
    }
    removeUnRequiredLocalStorageItem();
  }, [invoke, player?.id, player?.name, removeUnRequiredLocalStorageItem]);

  // Track if the respose is loaded
  useEffect(() => {
    if (!loading && response?.success) {
      setPlayer({
        id: response.data?.id || "",
        name: response.data?.name || "",
      });
      setLocal(response.data);
      socket.emit("login", { id: response.data?.id || "" });
    }
  }, [loading, response, setLocal, socket]);

  return { player, updatePlayerName };
}

const URL = AppConfig().apiUrl;

const socket = io(URL);

export function useWebSocket() {
  //const [connected, setConnected] = useState(false);

  function onConnect() {
    DebugLog("connected");
    //setConnected(true);
  }

  function onDisconnect() {
    //setConnected(false);
    DebugLog("Disconnected");
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    DebugLog("socket hook init");

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
        DebugLog("clicked outside");
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
          DebugLog(`Response of ${newUrl} ${res.data}`);
        }
        setLoading(false);
      } catch (error: any) {
        if (AppConfig().env === "development") {
          DebugLog(`Error in ${newUrl} ${error.message}`);
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

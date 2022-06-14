// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { getColorFromString, hsv2hsl, Stack, useTheme } from "@fluentui/react";
import { last } from "lodash";
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState } from "react";

import { MessageEvent, PanelExtensionContext } from "@foxglove/studio";
import { RosPath } from "@foxglove/studio-base/components/MessagePathSyntax/constants";
import parseRosPath from "@foxglove/studio-base/components/MessagePathSyntax/parseRosPath";
import { simpleGetMessagePathDataItem } from "@foxglove/studio-base/components/MessagePathSyntax/simpleGetMessagePathDataItem";
import {
  EXPERIMENTAL_PanelExtensionContextWithSettings,
  SettingsTreeAction,
} from "@foxglove/studio-base/components/SettingsTreeEditor/types";
import { fonts } from "@foxglove/studio-base/util/sharedStyleConstants";

import { getMatchingRule } from "./getMatchingRule";
import { settingsActionReducer, useSettingsTree } from "./settings";
import { Config } from "./types";

type Props = {
  context: PanelExtensionContext;
};

function getTextColorForBackground(backgroundColor: string) {
  const color = getColorFromString(backgroundColor);
  if (!color) {
    return "white";
  }
  const hsl = hsv2hsl(color.h, color.s, color.v);
  return hsl.l >= 50 ? "black" : "white";
}
const defaultConfig: Config = {
  path: "",
  style: "circle",
  fallbackColor: "#a0a0a0",
  fallbackLabel: "False",
  rules: [{ operator: "=", rawValue: "true", color: "#68e24a", label: "True" }],
};

type State = {
  path: string;
  parsedPath: RosPath | undefined;
  latestMessage: MessageEvent<unknown> | undefined;
  latestMatchingQueriedData: unknown | undefined;
};

type Action =
  | { type: "message"; message: MessageEvent<unknown> }
  | { type: "path"; path: string }
  | { type: "seek" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "message": {
      const data = state.parsedPath
        ? simpleGetMessagePathDataItem(action.message, state.parsedPath)
        : undefined;
      return {
        ...state,
        latestMessage: action.message,
        latestMatchingQueriedData: data ?? state.latestMatchingQueriedData,
      };
    }
    case "path":
      return {
        ...state,
        path: action.path,
        parsedPath: parseRosPath(action.path),
        latestMatchingQueriedData:
          state.parsedPath && state.latestMessage
            ? simpleGetMessagePathDataItem(state.latestMessage, state.parsedPath)
            : undefined,
      };

    case "seek":
      return {
        ...state,
        latestMessage: undefined,
        latestMatchingQueriedData: undefined,
      };
  }
}

export function Indicator({ context }: Props): JSX.Element {
  // panel extensions must notify when they've completed rendering
  // onRender will setRenderDone to a done callback which we can invoke after we've rendered
  const [renderDone, setRenderDone] = useState<() => void>(() => () => {});

  const [config, setConfig] = useState(() => ({
    ...defaultConfig,
    ...(context.initialState as Partial<Config>),
  }));

  const [state, dispatch] = useReducer(
    reducer,
    config,
    ({ path }): State => ({
      path,
      parsedPath: parseRosPath(path),
      latestMessage: undefined,
      latestMatchingQueriedData: undefined,
    }),
  );

  useLayoutEffect(() => {
    dispatch({ type: "path", path: config.path });
  }, [config.path]);

  useEffect(() => {
    context.saveState(config);
  }, [config, context]);

  const theme = useTheme();

  useEffect(() => {
    context.onRender = (renderState, done) => {
      setRenderDone(() => done);

      if (renderState.didSeek === true) {
        dispatch({ type: "seek" });
      }

      const message = last(renderState.currentFrame);
      if (message != undefined) {
        if (message.topic !== state.parsedPath?.topicName) {
          throw new Error(
            `Rendering incorrect path ${message.topic}, expected ${state.parsedPath?.topicName}`,
          );
        }
        dispatch({ type: "message", message });
      }
    };
    context.watch("currentFrame");
    context.watch("didSeek");

    return () => {
      context.onRender = undefined;
    };
  }, [context, state.parsedPath?.topicName]);

  const settingsActionHandler = useCallback(
    (action: SettingsTreeAction) =>
      setConfig((prevConfig) => settingsActionReducer(prevConfig, action)),
    [setConfig],
  );

  const settingsTree = useSettingsTree(config);
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    (
      context as unknown as EXPERIMENTAL_PanelExtensionContextWithSettings
    ).__updatePanelSettingsTree({
      actionHandler: settingsActionHandler,
      roots: settingsTree,
    });
  }, [context, settingsActionHandler, settingsTree]);

  useEffect(() => {
    if (state.parsedPath?.topicName != undefined) {
      context.subscribe([state.parsedPath.topicName]);
    }
    return () => context.unsubscribeAll();
  }, [context, state.parsedPath?.topicName]);

  // Indicate render is complete - the effect runs after the dom is updated
  useEffect(() => {
    renderDone();
  }, [renderDone]);

  const rawValue =
    typeof state.latestMatchingQueriedData === "boolean" ||
    typeof state.latestMatchingQueriedData === "bigint" ||
    typeof state.latestMatchingQueriedData === "string" ||
    typeof state.latestMatchingQueriedData === "number"
      ? state.latestMatchingQueriedData
      : undefined;

  const { style, rules, fallbackColor, fallbackLabel } = config;
  const matchingRule = useMemo(() => getMatchingRule(rawValue, rules), [rawValue, rules]);
  return (
    <Stack verticalFill>
      <Stack.Item
        grow
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          overflow: "hidden",
          padding: 8,
          backgroundColor: style === "full" ? matchingRule?.color ?? fallbackColor : undefined,
        }}
      >
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: theme.spacing.m }}>
          {style === "circle" && (
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: matchingRule?.color ?? fallbackColor,
                borderRadius: "50%",
                backgroundImage: [
                  `radial-gradient(transparent, transparent 55%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0.4))`,
                  `radial-gradient(circle at 38% 35%, rgba(255,255,255,0.8), transparent 30%, transparent)`,
                  `radial-gradient(circle at 46% 44%, transparent, transparent 61%, rgba(0,0,0,0.7) 74%, rgba(0,0,0,0.7))`,
                ].join(","),
                position: "relative",
              }}
            />
          )}
          <div
            style={{
              fontFamily: fonts.MONOSPACE,
              color:
                style === "full"
                  ? getTextColorForBackground(matchingRule?.color ?? fallbackColor)
                  : matchingRule?.color ?? fallbackColor,
              fontSize: theme.fonts.xxLarge.fontSize,
            }}
          >
            {matchingRule?.label ?? fallbackLabel}
          </div>
        </Stack>
      </Stack.Item>
    </Stack>
  );
}

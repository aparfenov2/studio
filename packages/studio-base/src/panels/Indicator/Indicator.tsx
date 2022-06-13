// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { getColorFromString, hsv2hsl, Stack, useTheme } from "@fluentui/react";
import produce from "immer";
import { last } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import { MessageEvent, PanelExtensionContext } from "@foxglove/studio";
import parseRosPath from "@foxglove/studio-base/components/MessagePathSyntax/parseRosPath";
import { simpleGetMessagePathDataItem } from "@foxglove/studio-base/components/MessagePathSyntax/simpleGetMessagePathDataItem";
import {
  EXPERIMENTAL_PanelExtensionContextWithSettings,
  SettingsTreeAction,
  SettingsTreeNode,
  SettingsTreeNodeAction,
  SettingsTreeRoots,
} from "@foxglove/studio-base/components/SettingsTreeEditor/types";
import { assertNever } from "@foxglove/studio-base/util/assertNever";
import { fonts } from "@foxglove/studio-base/util/sharedStyleConstants";

import { Config, Rule } from "./types";

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
function getMatchingRule(
  rawValue:
    | undefined
    | boolean
    | bigint
    | number
    | string
    | { data?: boolean | bigint | number | string },
  rules: readonly Rule[],
): Rule | undefined {
  const value = typeof rawValue === "object" ? rawValue.data : rawValue;
  if (value == undefined) {
    return undefined;
  }
  for (const rule of rules) {
    let rhs: boolean | number | string | bigint;
    try {
      if (typeof value === "boolean" || typeof value === "number") {
        rhs = JSON.parse(rule.rawValue);
        if (typeof rhs !== "boolean" && typeof rhs !== "number") {
          continue;
        }
      } else if (typeof value === "string") {
        rhs = rule.rawValue;
      } else if (typeof value === "bigint") {
        rhs = BigInt(rule.rawValue);
      } else {
        assertNever(value, "Unsupported rule value");
      }
    } catch (error) {
      continue;
    }

    if (rule.operator === "=" && value === rhs) {
      return rule;
    } else if (rule.operator === "<" && value < rhs) {
      return rule;
    } else if (rule.operator === "<=" && value <= rhs) {
      return rule;
    } else if (rule.operator === ">" && value > rhs) {
      return rule;
    } else if (rule.operator === ">=" && value >= rhs) {
      return rule;
    }
  }
  return undefined;
}

const defaultConfig: Config = {
  path: "",
  style: "circle",
  fallbackColor: "#a0a0a0",
  fallbackLabel: "False",
  rules: [{ operator: "=", rawValue: "true", color: "#68e24a", label: "True" }],
};

export function Indicator({ context }: Props): JSX.Element {
  // panel extensions must notify when they've completed rendering
  // onRender will setRenderDone to a done callback which we can invoke after we've rendered
  const [renderDone, setRenderDone] = useState<() => void>(() => () => {});

  const [config, setConfig] = useState(() => ({
    ...defaultConfig,
    ...(context.initialState as Partial<Config>),
  }));
  useEffect(() => {
    context.saveState(config);
  }, [config, context]);

  const { style, path, rules, fallbackColor, fallbackLabel } = config;

  const parsedPath = useMemo(() => parseRosPath(path), [path]);

  const theme = useTheme();
  const [latestMessage, setLatestMessage] = useState<MessageEvent<unknown> | undefined>(undefined);

  const queriedData = useMemo(() => {
    return parsedPath && latestMessage
      ? simpleGetMessagePathDataItem(latestMessage, parsedPath)
      : undefined;
  }, [parsedPath, latestMessage]);

  useEffect(() => {
    context.onRender = (renderState, done) => {
      setRenderDone(() => done);

      const message = last(renderState.currentFrame);
      if (message != undefined) {
        if (message.topic !== parsedPath?.topicName) {
          throw new Error(
            `Rendering incorrect path ${message.topic}, expected ${parsedPath?.topicName}`,
          );
        }
        setLatestMessage(message);
      }
    };
    context.watch("currentFrame");

    return () => {
      context.onRender = undefined;
    };
  }, [context, parsedPath?.topicName]);

  const settingsActionHandler = useCallback((action: SettingsTreeAction) => {
    setConfig((prevConfig) =>
      produce(prevConfig, (draft) => {
        switch (action.action) {
          case "perform-node-action":
            if (action.payload.path[0] === "rules") {
              if (action.payload.id === "delete-rule") {
                const ruleIndex = +action.payload.path[1]!;
                draft.rules.splice(ruleIndex, 1);
              } else if (
                action.payload.id === "add-rule" ||
                action.payload.id === "add-rule-above" ||
                action.payload.id === "add-rule-below"
              ) {
                let insertIndex = draft.rules.length;
                if (action.payload.id === "add-rule-above") {
                  insertIndex = +action.payload.path[1]!;
                } else if (action.payload.id === "add-rule-below") {
                  insertIndex = +action.payload.path[1]! + 1;
                }
                draft.rules.splice(insertIndex, 0, {
                  operator: "=",
                  rawValue: "true",
                  color: `#${Math.floor(Math.random() * 0x1000000).toString(16)}`,
                  label: "Label",
                });
              } else if (action.payload.id === "move-up") {
                const ruleIndex = +action.payload.path[1]!;
                const [rule] = draft.rules.splice(ruleIndex, 1);
                draft.rules.splice(ruleIndex - 1, 0, rule!);
              } else if (action.payload.id === "move-down") {
                const ruleIndex = +action.payload.path[1]!;
                const [rule] = draft.rules.splice(ruleIndex, 1);
                draft.rules.splice(ruleIndex + 1, 0, rule!);
              }
            }
            break;
          case "update":
            switch (action.payload.path[0]) {
              case "general":
                (draft as Record<string, unknown>)[action.payload.path[1]!] = action.payload.value;
                break;
              case "rules": {
                const ruleIndex = +action.payload.path[1]!;
                (draft.rules[ruleIndex] as Record<string, unknown>)[action.payload.path[2]!] =
                  action.payload.value;
                break;
              }
              default:
                throw new Error(`Unexpected payload.path[0]: ${action.payload.path[0]}`);
            }
            break;
        }
      }),
    );
  }, []);

  const settingsTree = useMemo((): SettingsTreeRoots => {
    return {
      general: {
        fields: {
          path: {
            label: "Data",
            input: "messagepath",
            value: path,
          },
          style: {
            label: "Style",
            input: "select",
            value: style,
            options: [
              { label: "Circle", value: "circle" },
              { label: "Full", value: "full" },
            ],
          },
          fallbackColor: {
            label: "Default color",
            input: "rgb",
            value: fallbackColor,
            help: "Color to use when no rules match",
          },
          fallbackLabel: {
            label: "Default label",
            input: "string",
            value: fallbackLabel,
            help: "Label to use when no rules match",
          },
        },
      },

      rules: {
        label: "Rules",
        actions: [{ id: "add-rule", label: "Add rule", icon: "Add" }],
        children: Object.fromEntries(
          rules.map((rule, i): [string, SettingsTreeNode] => {
            const actions: (SettingsTreeNodeAction | false)[] = [
              { id: "delete-rule", label: "Delete rule", icon: "Delete" },
              i > 0 && { id: "move-up", label: "Move up", icon: "MoveUp" },
              i < rules.length - 1 && { id: "move-down", label: "Move down", icon: "MoveDown" },
              { id: "add-rule-above", label: "Add rule above", icon: "Add" },
              { id: "add-rule-below", label: "Add rule below", icon: "Add" },
            ];
            return [
              i.toString(),
              {
                label: `Rule ${i + 1}`,
                actions: actions.filter(
                  (action): action is SettingsTreeNodeAction => action !== false,
                ),
                fields: {
                  operator: {
                    label: "Comparison",
                    input: "select",
                    value: rule.operator,
                    options: [
                      { label: "Equal to", value: "=" },
                      { label: "Less than", value: "<" },
                      { label: "Less than or equal to", value: "<=" },
                      { label: "Greater than", value: ">" },
                      { label: "Greater than or equal to", value: ">=" },
                    ],
                  },
                  rawValue: {
                    label: "Compare with",
                    input: "string",
                    value: rule.rawValue,
                    error: undefined, // FIXME
                  },
                  color: {
                    label: "Color",
                    input: "rgb",
                    value: rule.color,
                  },
                  label: {
                    label: "Label",
                    input: "string",
                    value: rule.label,
                  },
                },
              },
            ];
          }),
        ),
      },
    };
  }, [fallbackColor, fallbackLabel, path, rules, style]);

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
    if (parsedPath?.topicName != undefined) {
      context.subscribe([parsedPath.topicName]);
    }
    return () => context.unsubscribeAll();
  }, [context, parsedPath?.topicName]);

  // Indicate render is complete - the effect runs after the dom is updated
  useEffect(() => {
    renderDone();
  }, [renderDone]);

  const rawValue =
    typeof queriedData === "boolean" ||
    typeof queriedData === "bigint" ||
    typeof queriedData === "string" ||
    typeof queriedData === "number"
      ? queriedData
      : undefined;
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

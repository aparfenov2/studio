// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import produce from "immer";
import memoizeWeak from "memoize-weak";
import { useMemo } from "react";

import { useShallowMemo } from "@foxglove/hooks";
import {
  SettingsTreeAction,
  SettingsTreeNode,
  SettingsTreeNodeAction,
  SettingsTreeRoots,
} from "@foxglove/studio-base/components/SettingsTreeEditor/types";

import { Config, Rule } from "./types";

export function settingsActionReducer(prevConfig: Config, action: SettingsTreeAction): Config {
  return produce(prevConfig, (draft) => {
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
  });
}

const memoizedCreateRuleNode = memoizeWeak(
  (rule: Rule, i: number, rules: readonly Rule[]): SettingsTreeNode => {
    const actions: (SettingsTreeNodeAction | false)[] = [
      { id: "delete-rule", label: "Delete rule", icon: "Delete" },
      i > 0 && { id: "move-up", label: "Move up", icon: "MoveUp" },
      i < rules.length - 1 && { id: "move-down", label: "Move down", icon: "MoveDown" },
      { id: "add-rule-above", label: "Add rule above", icon: "Add" },
      { id: "add-rule-below", label: "Add rule below", icon: "Add" },
    ];
    return {
      label: `Rule ${i + 1}`,
      actions: actions.filter((action): action is SettingsTreeNodeAction => action !== false),
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
    };
  },
);

export function useSettingsTree(config: Config): SettingsTreeRoots {
  const { path, style, fallbackColor, fallbackLabel, rules } = config;
  const generalSettings: SettingsTreeNode = useMemo(
    () => ({
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
    }),
    [fallbackColor, fallbackLabel, path, style],
  );

  const ruleSettings: SettingsTreeNode = useMemo(
    () => ({
      label: "Rules",
      actions: [{ id: "add-rule", label: "Add rule", icon: "Add" }],
      children: Object.fromEntries(
        rules.map((rule, i) => [i, memoizedCreateRuleNode(rule, i, rules)]),
      ),
    }),
    [rules],
  );

  return useShallowMemo({
    general: generalSettings,
    rules: ruleSettings,
  });
}

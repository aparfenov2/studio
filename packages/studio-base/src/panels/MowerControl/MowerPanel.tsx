// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Button } from "@mui/material";
import { set } from "lodash";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { DeepPartial } from "ts-essentials";

import { ros1 as commonDefs } from "@foxglove/rosmsg-msgs-common";
import { PanelExtensionContext, Topic } from "@foxglove/studio";
import EmptyState from "@foxglove/studio-base/components/EmptyState";

import {
    SettingsTreeNodes,
    SettingsTreeNode,
    SettingsTreeAction,
  } from "@foxglove/studio";

import Stack from "@foxglove/studio-base/components/Stack";
import ThemeProvider from "@foxglove/studio-base/theme/ThemeProvider";

// import DirectionalPad, { DirectionalPadAction } from "./DirectionalPad";

type MowerPanelProps = {
    context: PanelExtensionContext;
};

// const styles = {
//     root: {
//         margin: "auto",
//     },
//     row: {
//         display: "block",
//         // whiteSpace: "nowrap",
//     },
//     cell: {
//         display: "inline-block",
//         width: "120px",
//         margin: "4px",
//         // textAlign: "center",
//     },
// };

export type Config = {
    topic: undefined | string;
};

function buildSettingsTree(config: Config, topics: readonly Topic[]): SettingsTreeNodes {
    const general: SettingsTreeNode = {
        label: "General",
        fields: {
            topic: {
                label: "Topic",
                input: "autocomplete",
                value: config.topic,
                items: topics.map((t) => t.name),
            },
        },
        children: {},
    };
    return { general };
}


export function MowerPanel(props: MowerPanelProps): JSX.Element {
    const { context } = props;
    const { saveState } = context;

    const [topics, setTopics] = useState<readonly Topic[]>([]);

    // resolve an initial config which may have some missing fields into a full config
    const [config, setConfig] = useState<Config>(() => {
        const partialConfig = context.initialState as DeepPartial<Config>;
        const {
            topic,
        } = partialConfig;
        return {
            topic,
        };
    });

    const settingsActionHandler = useCallback((action: SettingsTreeAction) => {
        if (action.action !== "update") {
            return;
        }
        setConfig((previous) => {
            const newConfig = { ...previous };
            set(newConfig, action.payload.path.slice(1), action.payload.value);
            return newConfig;
        });
    }, []);

    // setup context render handler and render done handling
    const [renderDone, setRenderDone] = useState<() => void>(() => () => { });
    const [colorScheme, setColorScheme] = useState<"dark" | "light">("light");

    // color theme, renderDone
    useLayoutEffect(() => {
        context.watch("topics");
        context.watch("colorScheme");

        context.onRender = (renderState, done) => {
            setTopics(renderState.topics ?? []);
            setRenderDone(() => done);
            if (renderState.colorScheme) {
                setColorScheme(renderState.colorScheme);
            }
        };
    }, [context]);

    // settings callback
    useEffect(() => {
        const tree = buildSettingsTree(config, topics);
        context.updatePanelSettingsEditor({
          actionHandler: settingsActionHandler,
          nodes: tree,
        });
        saveState(config);
      }, [config, context, saveState, settingsActionHandler, topics]);

    // advertise topic
    const { topic: currentTopic } = config;
    useLayoutEffect(() => {
        if (!currentTopic) {
            return;
        }
        context.advertise?.(currentTopic, "std_msgs/String", {
            datatypes: new Map([
                ["std_msgs/String", commonDefs["std_msgs/String"]],
            ]),
        });

        return () => {
            context.unadvertise?.(currentTopic);
        };
    }, [context, currentTopic]);

    // renderDone
    useLayoutEffect(() => {
        renderDone();
    }, [renderDone]);

    const canPublish = context.publish != undefined;
    const hasTopic = Boolean(currentTopic);
    // const enabled = canPublish && hasTopic;

    return (
        <ThemeProvider isDark={colorScheme === "dark"}>
            <Stack
                fullHeight
                justifyContent="center"
                alignItems="center"
                style={{ padding: "min(5%, 8px)", textAlign: "center" }}
            >
                {!canPublish && (
                    <EmptyState>
                        Please connect to a datasource that supports publishing in order to use this panel
                    </EmptyState>
                )}
                {canPublish && !hasTopic && (
                    <EmptyState>Please select a publish topic in the panel settings</EmptyState>
                )}
                {/* {enabled && <DirectionalPad onAction={setCurrentAction} disabled={!enabled} />} */}

                <Button
                                onClick={() => {
                                    if (canPublish && hasTopic) {
                                        context.publish?.(currentTopic!, {
                                            data: "go"
                                        });
                                    }
                                }}
                            >
                    Lets Go!
                </Button>

                {/* <div style={styles.root}>
                    <div style={styles.row}>
                        <div style={styles.cell}>
                            <Button
                                onClick={() => {
                                    // publish({
                                    //   linear: {
                                    //     x: 1,
                                    //     y: 0,
                                    //     z: 0,
                                    //   },
                                    //   angular: {
                                    //     x: 0,
                                    //     y: 0,
                                    //     z: 0,
                                    //   },
                                    // });
                                }}
                            >
                                Task Navigate To Point
                            </Button>
                        </div>
                        <div style={styles.cell}>
                            <Button
                                onClick={() => {
                                }}
                            >
                                Publish
                            </Button>
                        </div>
                    </div>
                    <div style={styles.row}>
                        <div style={styles.cell}>
                            <Button
                                onClick={() => {
                                }}
                            >
                                Task Go Through Polygon
                            </Button>
                        </div>
                        <div style={styles.cell}>
                            <Button
                                onClick={() => {
                                }}
                            >
                                Publish2
                            </Button>
                        </div>
                    </div>
                    <div style={styles.row}>
                        <div style={styles.cell} >
                            <Button
                                onClick={() => {
                                }}
                            >
                                Remove All Points
                            </Button>
                        </div>
                        <div style={styles.cell} ></div>
                    </div>
                </div> */}

            </Stack>
        </ThemeProvider>
    );
}

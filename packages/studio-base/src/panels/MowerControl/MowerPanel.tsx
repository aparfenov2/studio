// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import {
    Button, Box,
    FormControl, FormControlLabel,
    Grid,
    InputLabel, InputAdornment,
    LinearProgress,
    Radio, RadioGroup,
    Switch, Slider,
    TextField, Tabs, Tab
} from "@mui/material";

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

    function AutoManualRadioGroup() {
        const [value, setValue] = React.useState('manual');

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue((event.target as HTMLInputElement).value);
        };

        return (
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                    <FormControlLabel value="auto" control={<Radio />} label="Automatic" />
                </RadioGroup>
            </FormControl>
        );
    }

    function GeneralOptsPanel() {
        return (
            <Grid container
                maxWidth="sm"
                alignItems="center"
                padding={2}
            >
                <Grid xs={4}>
                    <InputLabel>Operation Mode:</InputLabel>
                </Grid>
                <Grid xs={8}>
                    <AutoManualRadioGroup />
                </Grid>
                <Grid xs={4}>
                    <InputLabel>Path Ops:</InputLabel>
                </Grid>
                <Grid xs={8}>
                    <Stack direction="row" gap={2}>
                        <Button sx={{ width: 1 }}>Add Poly</Button>
                        <Button sx={{ width: 1 }}>Build Path</Button>
                    </Stack>
                </Grid>
                <Grid xs={4}>
                    <InputLabel>Robot Control:</InputLabel>
                </Grid>
                <Grid xs={8}>
                    <Stack direction="row" gap={2}>
                        <Button
                            sx={{ width: 1 }}
                            onClick={() => {
                                if (canPublish && hasTopic) {
                                    context.publish?.(currentTopic!, {
                                        data: "go"
                                    });
                                }
                            }}
                        >Start</Button>
                        <Button sx={{ width: 1 }}>Stop</Button>
                        <Button sx={{ width: 1 }}>Reset</Button>
                    </Stack>
                </Grid>
                <Grid xs={4}>
                    <InputLabel>Progress:</InputLabel>
                </Grid>
                <Grid xs={8}>
                    <LinearProgress variant="determinate" value={10} />
                </Grid>
                <Grid xs={4}>
                    <InputLabel>Current Speed:</InputLabel>
                </Grid>
                <Grid xs={5}>
                    <TextField defaultValue="5.0"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km/h</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid xs={4}>
                    <InputLabel>Desired Speed:</InputLabel>
                </Grid>
                <Grid xs={5}>
                    <TextField defaultValue="5.0"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km/h</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid xs={3}>
                    <Button sx={{ width: 1 }}>Apply</Button>
                </Grid>
            </Grid>
        );
    }

    function PathGenPanel() {
        return (
            <Grid container
                maxWidth="sm"
                alignItems="center"
                padding={2}
            >
                <Grid xs={4}>
                    <InputLabel>Step Size:</InputLabel>
                </Grid>
                <Grid xs={8}>
                    <TextField defaultValue="0.5"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">m</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid xs={4}>
                    <InputLabel>Angle:</InputLabel>
                </Grid>
                <Grid xs={8}>
                    <TextField defaultValue="30"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">grad</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid xs={4}>
                </Grid>
                <Grid xs={8}>
                    <Slider defaultValue={30} />
                </Grid>
                <Grid xs={4}>
                    <InputLabel>Auto Angle</InputLabel>
                </Grid>
                <Grid xs={8}>
                    <Switch defaultChecked />
                </Grid>
            </Grid>
        );
    }

    // TabPanel impl.

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function BasicTabs() {
        const [value, setValue] = React.useState(0);

        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        };

        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="General" {...a11yProps(0)} />
                        <Tab label="PathGen" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <GeneralOptsPanel />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <PathGenPanel />
                </CustomTabPanel>
            </Box>
        );
    }

    return (
        <ThemeProvider isDark={colorScheme === "dark"}>
            <Stack
                fullHeight
                justifyContent="top"
                alignItems="top"
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
                <BasicTabs />
            </Stack>
        </ThemeProvider>
    );
}

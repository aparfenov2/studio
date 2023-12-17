// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import {
    Button, Box,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
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
//import { CompressedImage } from "@foxglove/schemas/schemas/typescript";

import { PanelExtensionContext, RenderState, Topic, MessageEvent } from "@foxglove/studio";
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

type StdStringMessageDef = {
    data: string;
};

type UIStateMsg = {
    state: {
        op_mode_state: "manual" | "auto";
        progress: number;
        curr_speed: number;
    },
    error?: string
};

type StdStringMessage = MessageEvent<StdStringMessageDef>;

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

type AlertDialogProps = {
    text: string;
    open: boolean;
    setOpen: (arg0: boolean) => void;
};

function AlertDialog({ text, open, setOpen }: AlertDialogProps): JSX.Element {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Backend Message"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

type SendMsgFunc = (data: {}) => void;

type ComponentProps = {
    message?: StdStringMessage;
    sendMsg: SendMsgFunc;
};

function AutoManualRadioGroup({ message, sendMsg }: ComponentProps): JSX.Element {
    const [value, setValue] = React.useState('manual');

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue((event.target as HTMLInputElement).value);
    // };

    useEffect(() => {
        if (message) {
            let json = JSON.parse(message?.message.data) as UIStateMsg;
            setValue(json.state.op_mode_state);
        }
    }, [message]);

    return (
        <Grid container
            maxWidth="sm"
            alignItems="center"
            padding={2}
        >
            <Grid item xs={8}>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                    // onChange={handleChange}
                    >
                        <FormControlLabel disabled value="manual" control={<Radio />} label="Manual" />
                        <FormControlLabel disabled value="auto" control={<Radio />} label="Automatic" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <Button sx={{ width: 1 }}
                    onClick={() => {
                        sendMsg({
                            "cmd": "switch_op_mode",
                            "displayed_value": value
                        });
                    }}
                >Switch</Button>
            </Grid>
        </Grid>
    );
}


function GeneralOptsPanel(props: ComponentProps): JSX.Element {
    const { message, sendMsg } = props
    const [progress, setProgress] = React.useState(0);
    const [currSpeed, setCurrSpeed] = React.useState(0);
    const [desiredSpeed, setDesiredSpeed] = React.useState(0);

    useEffect(() => {
        if (message) {
            let json = JSON.parse(message?.message.data) as UIStateMsg;
            setProgress(json.state.progress);
            setCurrSpeed(json.state.curr_speed);
        }
    }, [message]);

    return (
        <Grid container
            maxWidth="sm"
            alignItems="center"
            padding={2}
        >
            <Grid item xs={4}>
                <InputLabel>Operation Mode:</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <AutoManualRadioGroup {...props} />
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Path Ops:</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <Stack direction="row" gap={2}>
                    <Button sx={{ width: 1 }}
                        onClick={() => {
                            sendMsg({ "cmd": "add_poly" })
                        }}
                    >Add Poly</Button>
                    <Button sx={{ width: 1 }}
                        onClick={() => {
                            sendMsg({ "cmd": "build_path" })
                        }}
                    >Build Path</Button>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Robot Control:</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <Stack direction="row" gap={2}>
                    <Button
                        sx={{ width: 1 }}
                        onClick={() => {
                            sendMsg({ "cmd": "start" })
                        }}
                    >Start</Button>
                    <Button
                        sx={{ width: 1 }}
                        onClick={() => {
                            sendMsg({ "cmd": "stop" })
                        }}
                    >Stop</Button>
                    <Button
                        sx={{ width: 1 }}
                        onClick={() => {
                            sendMsg({ "cmd": "reset" })
                        }}
                    >Reset</Button>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Progress:</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <LinearProgress variant="determinate" value={progress} />
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Current Speed:</InputLabel>
            </Grid>
            <Grid item xs={5}>
                <TextField value={currSpeed} disabled
                    InputProps={{
                        endAdornment: <InputAdornment position="end">km/h</InputAdornment>,
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Desired Speed:</InputLabel>
            </Grid>
            <Grid item xs={5}>
                <TextField defaultValue="5.0"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">km/h</InputAdornment>,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        let f = parseFloat(event.target.value);
                        if (!isNaN(f)) {
                            setDesiredSpeed(f);
                        }
                    }}

                />
            </Grid>
            <Grid item xs={3}>
                <Button sx={{ width: 1 }}
                    onClick={() => {
                        sendMsg({
                            "cmd": "set_desired_speed",
                            "desired_speed": desiredSpeed
                        })
                    }}
                >Apply</Button>
            </Grid>
        </Grid >
    );
}

function PathGenPanel({ message, sendMsg }: ComponentProps): JSX.Element {
    const [stepSize, setStepSize] = React.useState<number>(0);
    const [angle, setAngle] = React.useState<number>(0);
    const [autoAngle, setAutoAngle] = React.useState<boolean>(true);
    return (
        <Grid container
            maxWidth="sm"
            alignItems="center"
            padding={2}
        >
            <Grid item xs={4}>
                <InputLabel>Step Size:</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField defaultValue="0.5"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">m</InputAdornment>,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        let f = parseFloat(event.target.value);
                        if (!isNaN(f)) {
                            setStepSize(f);
                        }
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Angle:</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField disabled
                    value={angle}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">grad</InputAdornment>,
                    }}
                />
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={8}>
                <Slider
                    min={-90}
                    max={90}
                    step={1}
                    defaultValue={30}
                    onChange={(event: Event, newValue: number | number[]) => {
                        setAngle(newValue as number);
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Auto Angle</InputLabel>
            </Grid>
            <Grid item xs={8}>
                <Switch defaultChecked
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setAutoAngle(event.target.checked);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button sx={{ width: 1 }}
                    onClick={() => {
                        sendMsg({
                            "cmd": "set_pathgen_props",
                            "step_size": stepSize,
                            "angle": angle,
                            "auto_angle": autoAngle
                        });
                    }}
                >Apply</Button>
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

function BasicTabs(props: ComponentProps): JSX.Element {
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
                <GeneralOptsPanel {...props} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PathGenPanel {...props} />
            </CustomTabPanel>
        </Box>
    );
}

export function MowerPanel({ context }: MowerPanelProps): JSX.Element {
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
    const [message, setMessage] = useState<StdStringMessage>();

    // color theme, renderDone
    useLayoutEffect(() => {
        context.watch("topics");
        context.watch("colorScheme");
        context.watch("currentFrame");

        context.onRender = (renderState, done) => {
            setTopics(renderState.topics ?? []);
            setRenderDone(() => done);
            if (renderState.colorScheme) {
                setColorScheme(renderState.colorScheme);
            }
            // Save the most recent message on our image topic.
            if (renderState.currentFrame && renderState.currentFrame.length > 0) {
                setMessage(renderState.currentFrame[renderState.currentFrame.length - 1] as StdStringMessage);
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
    // const { topic: currentTopic } = config;
    const currentTopic = "/ui_cmd";

    useLayoutEffect(() => {
        context.advertise?.(currentTopic, "std_msgs/String", {
            datatypes: new Map([
                ["std_msgs/String", commonDefs["std_msgs/String"]],
            ]),
        });

        return () => {
            context.unadvertise?.(currentTopic);
        };
    }, [context]);

    useEffect(() => {
        context.subscribe(["/ui_updates"]);
        return () => {
            context.unsubscribeAll();
        };
    }, [context]);

    // renderDone
    useLayoutEffect(() => {
        renderDone();
    }, [renderDone]);

    const canPublish = context.publish != undefined;
    const hasTopic = true;
    // const enabled = canPublish && hasTopic;

    function sendMsg(data: {}): void {
        if (canPublish && hasTopic) {
            context.publish?.(currentTopic!, {
                data: JSON.stringify(data)
            });
        }
    }
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertText, setAlertText] = React.useState("");

    useEffect(() => {
        if (message) {
            let json = JSON.parse(message?.message.data) as UIStateMsg;
            if (json.error) {
                setAlertText(json.error);
                setAlertOpen(true);
            }
        }
    }, [message]);

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
                <BasicTabs message={message} sendMsg={sendMsg} />
                <AlertDialog open={alertOpen} setOpen={setAlertOpen} text={alertText} />
            </Stack>
        </ThemeProvider>
    );
}

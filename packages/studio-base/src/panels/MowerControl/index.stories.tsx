// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

import { PlayerCapabilities } from "@foxglove/studio-base/players/types";
import PanelSetup from "@foxglove/studio-base/stories/PanelSetup";

import MowerPanel from "./index";

export default {
  title: "panels/Mower",
  component: MowerPanel,
  decorators: [
    (StoryComponent: Story): JSX.Element => {
      return (
        <PanelSetup
          fixture={{ capabilities: [PlayerCapabilities.advertise], publish: action("publish") }}
        >
          <StoryComponent />
        </PanelSetup>
      );
    },
  ],
};

export const Unconfigured = (): JSX.Element => {
  return <MowerPanel />;
};
export const WithTopic = (): JSX.Element => {
  return <MowerPanel overrideConfig={{ topic: "/abc" }} />;
};

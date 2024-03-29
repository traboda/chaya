import React from 'react';
import { Meta, Story } from '@storybook/react';


import { Card, SettingCard, Switch } from '../../src';

const meta: Meta = {
  title: 'Compositions/Settings',
  parameters:{
    options: { showPanel: false },
  },
};

export default meta;

const SwitchSettingTemplate: Story = () => {

  const [isActivated, setIsActivated] = React.useState(true);
  const [isMarketingEmailsActivated, setIsMarketingEmailsActivated] = React.useState(true);
  const [isPolicyEmailsActivated, setIsPolicyEmailsActivated] = React.useState(true);

  return (
    <div className="flex flex-col dar-justify-center items-center p-30">
      <SettingCard
        labels={{
          title: 'Enable Notifications',
          description: 'Receive notifications for new messages',
        }}
        subSettingRenderer={() => isActivated && (
          <Card className="flex flex-col gap-3 mt-3 px-2">
            <div>
              <div className="text-lg font-medium mb-2">
                Emails You Receive
              </div>
            </div>
            <SettingCard
              labels={{
                title: 'Receive Marketing Emails',
                description: 'Receive marketing emails about our latest products and features, and other updates.',
              }}
            >
              <Switch value={isMarketingEmailsActivated} onChange={setIsMarketingEmailsActivated} />
            </SettingCard>
            <SettingCard
              labels={{
                title: 'Receive Policy Emails',
                description: 'Receive emails about our policies and terms.',
              }}
            >
              <Switch value={isPolicyEmailsActivated} onChange={setIsPolicyEmailsActivated} />
            </SettingCard>
          </Card>
        )}
      >
        <Switch value={isActivated} onChange={setIsActivated} />
      </SettingCard>
    </div>
  );
};

export const SettingSwitch = SwitchSettingTemplate.bind({});
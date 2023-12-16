import { Meta, Story } from '@storybook/react';
import React from 'react';

import {
  Badge,
  Button, Card,
  PageNavigator,
  PinInput,
  SearchBox,
  SelectorButton,
  SimpleSelect,
  Switch,
  TagSelector,
  TextInput,
} from '../../src';

const meta: Meta = {
  title: 'Compositions/Forms',
  parameters:{
    options: { showPanel: false },
  },
};

export default meta;

const HeightPreviewCardTemplate: Story = () => (
  // @ts-ignore
  <div background="#111">
    <div className="dsr-flex dsr-flex-wrap dsr-items-end">
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <PinInput labels={{ label: 'hello' }} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <SearchBox keyword="abc" setKeyword={() => {}} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <SelectorButton name="hello" options={[{ label: 'hello', value: 'hello' }]} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" type="password" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <PinInput variant="classic" labels={{ label: 'hello' }} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <SimpleSelect value="hello" name="hello" options={[{ label: 'hello', value: 'hello' }]} labels={{ label: 'hello' }} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <Switch label="hello" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" type="textarea" rows={1} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TagSelector labels={{ title: 'hello' }} value="hello" options={[{ label: 'hello', value: 'hello' }, { label: 'bye', value: 'bye' }]} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <Button>
          hi elllo
        </Button>
      </div>
      <div className="dsr-w-1/3 dsr-p-1">
        <PageNavigator
          page={1}
          itemsPerPage={30}
          totalCount={100}
          hideItemsPerPage
        />
      </div>
      <div className="dsr-w-1/8 dsr-p-1">
        <Button variant="outline">
          hi elllo
        </Button>
      </div>
      <div className="dsr-w-1/8 dsr-p-1">
        <Badge variant="outline" size="md">
          hi elllo
        </Badge>
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <Card className="dsr-p-2">
          j1
        </Card>
      </div>
    </div>
  </div>
);
export const HeightPreviewCard = HeightPreviewCardTemplate.bind({});

HeightPreviewCard.args = {};
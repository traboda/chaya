import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, Modal, SimpleSelect } from '../../../src';
import { ModalProps } from '../../../src/components/Modal';

const meta: Meta = {
  title: 'Components/Overlays/Modal',
  component: Modal,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    maxWidth: {
      control: {
        type: 'range',
        min: 0,
        max: 1000,
        step: 10,
      },
    },
    minHeight: {
      control: {
        type: 'range',
        min: 0,
        max: 500,
        step: 10,
      },
    },
    maxHeight: {
      control: {
        type: 'range',
        min: 0,
        max: 500,
        step: 10,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut consequuntur dignissimos, distinctio
            ea error magnam molestias nam quaerat qui quia ullam voluptate. Aperiam eaque est facere facilis incidunt ipsum
            iste itaque magnam minus nisi, nobis non nulla reiciendis suscipit tempore, temporibus ut veniam voluptatem?
            Aliquid explicabo, fuga iusto nam porro temporibus tenetur velit! Dicta, quis sint! Commodi consequatur cum
            deleniti dolores, quam reiciendis. Accusamus amet cum debitis, eos eum ipsam itaque modi quis repellendus
            voluptas! Consequatur, deleniti dolore eius eligendi eos excepturi fugit illum magnam molestias mollitia natus
            nemo non pariatur provident quas, reiciendis saepe similique temporibus veritatis.`;

const Template: Story<ModalProps> = args => {

  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const [subject, setSubject] = React.useState('cs');

  React.useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        open
      </button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SimpleSelect
          value={subject}
          name="subject"
          labels={{
            label: 'Subject',
          }}
          hideLabel
          options={[
            { value: 'cs', label: 'Computer Science' },
            { value: 'math', label: 'Mathematics' },
            { value: 'physics', label: 'Physics' },
            { value: 'chemistry', label: 'Chemistry' },
            { value: 'biology', label: 'Biology' },
          ]}
          onChange={setSubject}
        />
        {Array(8).fill(lorem).map(l => <p>{l}</p>)}
        <div className="dsr-absolute dsr-bottom-0 dsr-left-0 dsr-w-full dsr-p-4" style={{ bottom: '0dvh' }}>
          <Button className="dsr-w-full">Sticky Button</Button>
        </div>
      </Modal>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
  onClose: () => {},
  title: 'Playback Settings',
  description: 'Get queue and radio updates based on your listening behaviour. You can change this at any time in your settings.',
  contentClassName: 'dsr-p-1',
  maxHeight: 500,
};
 

export const WithButtons = Template.bind({});

WithButtons.args = {
  isOpen: true,
  onClose: () => {},
  title: 'Delete Challenge',
  contentClassName: 'dsr-p-4',
  primaryButton: {
    children: 'Delete',
    color: 'danger',
    onClick: () => {
      console.log('delete');
    },
  },
  secondaryButton: {
    children: 'Cancel',
    onClick: () => {
      console.log('cancel');
    },
  },
};


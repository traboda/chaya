import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Drawer } from '../../../index';
import { DrawerProps } from '../../../components/Drawer';

const meta: Meta = {
  title: 'Components/Overlays/Drawer',
  component: Drawer,
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

const Template: Story<DrawerProps> = args => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        open
      </button>
      {Array(8).fill(lorem).map(l => <p>{l}</p>)}
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '1rem' }}>
          {Array(1).fill(lorem).map(l => <p>{l}</p>)}
        </div>
      </Drawer>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
  position: 'right',
  maxWidth: '300px',
};

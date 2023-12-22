import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertProps } from '../../../src';

const meta: Meta<AlertProps> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<AlertProps>;


export const Primary: Story = {
  args: {
    title: 'Subscription Expiring',
    description: 'Your account is about to expire. Renew your subscription now!',
    variant: 'solid',
    primaryButton: {
      children: 'Renew',
      onClick: () => {
        alert('Renew clicked');
      },
    },
    secondaryButton: {
      children: 'Support',
      onClick: () => {
        alert('Support contacted');
      },
    },
  },
};

export const OutlineVariant: Story = {
  args: {
    title: 'Subscription Expiring',
    description: 'Your account is about to expire. Renew your subscription now!',
    variant: 'outline',
    primaryButton: {
      children: 'Renew',
      onClick: () => {
        alert('Renew clicked');
      },
    },
    secondaryButton: {
      children: 'Support',
      onClick: () => {
        alert('Support contacted');
      },
    },
  },
};

export const DismissibleAlert: Story = {
  tags: ['unlisted'],
  args: {
    title: 'Subscription Expiring',
    description: 'Your account is about to expire. Renew your subscription now!',
    variant: 'solid',
    allowDismissal: true,
  },
};

const ColorVariants: {
  color: AlertProps['type'],
  title: string,
  description: string,
}[] = [
  {
    color: 'primary',
    title: 'New Region Launched',
    description: 'We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details.',
  },
  {
    color: 'secondary',
    title: 'New Region Launched',
    description: 'We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details.',
  },
  {
    color: 'success',
    title: 'Order placed',
    description: 'Your order has been placed successfully. Thank you for your purchase!',
  },
  {
    color: 'danger',
    title: 'Subscription Expiring',
    description: 'Your account is about to expire. Renew your subscription now!',
  },
  {
    color: 'warning',
    title: 'Unusual Activity Detected',
    description: 'We have detected an unusual activity in your account. Review your account activity.',
  },
  {
    color: 'black',
    title: 'New Region Launched',
    description: 'We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details.',
  },
  {
    color: 'white',
    title: 'New Region Launched',
    description: 'We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details.',
  },
  {
    color: 'shade',
    title: 'New Region Launched',
    description: 'We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details.',
  },
  {
    color: 'contrast',
    title: 'New Region Launched',
    description: 'We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details.',
  },
];


const AlertColorVariants = ({ variant }: { variant: AlertProps['variant'] }) => (
  <table
    className="dsr-flex dsr-flex-col dsr-items-start dsr-border-dashed dsr-border dsr-gap-2"
    style={{ padding: '5vh 5vw', borderColor: 'rgba(200, 200, 200, 0.8)', background: 'rgba(200, 200, 200, 0.15)' }}
  >
    {ColorVariants.map(({ color, title, description }) => (
      <tr className="dsr-flex dsr-flex-wrap dsr-mx-0 dsr-w-full">
        <td style={{ width: '30%' }} className="dsr-p-3 dsr-opacity-80 dsr-flex dsr-justify-end dsr-text-sm">{color}</td>
        <td style={{ width: '70%' }}>
          <Alert type={color} title={title} description={description} variant={variant} />
        </td>
      </tr>
    ))}
  </table>
);

export const SolidColorVariants: Story = {
  tags: ['unlisted'],
  args: {
    variant: 'solid',
  },
  render: (args) => <AlertColorVariants variant="solid" {...args} />,
};

export const OutlineColorVariants: Story = {
  tags: ['unlisted'],
  args: {
    variant: 'outline',
  },
  render: (args) => <AlertColorVariants variant="outline" {...args} />,
};



// const Template: Story = args => <Alert {...args} />;
//
// export const Default = Template.bind({});
//
// Default.args = {
//   title: 'Your account is about to expire. Renew your subscription now!',
//   variant: 'filled',
// };

// const TypesTemplate: Story = args => (
//   <div>
//     <Alert
//       {...args}
//       title="Just letting you know that this is a default alert."
//       className="dsr-my-2"
//     />
//     <Alert
//       {...args}
//       title="Your purchase is successful. Thank you for your purchase!"
//       type="success"
//       className="dsr-my-2"
//     />
//     <Alert
//       {...args}
//       title="Your subscription is about to expire. Please recharge to continue using our services."
//       type="danger"
//       className="dsr-my-2"
//     />
//     <Alert
//       {...args}
//       title="We have detected an unusual activity in your account. Review your account activity."
//       type="warning"
//       className="dsr-my-2"
//     />
//     <Alert
//       {...args}
//       title="We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details."
//       className="dsr-my-2"
//     />
//   </div>
// );
//
// TypesTemplate.args = {};
// export const FilledTypes = TypesTemplate.bind({});
//
// const OutlineTypesTemplate: Story = args => (
//   <div>
//     <Alert
//       {...args}
//       variant="outline"
//       title="Just letting you know that this is a default alert."
//       className="dsr-my-2"
//     />
//     <Alert
//       {...args}
//       variant="outline"
//       title="Your purchase is successful. Thank you for your purchase!"
//       type="success"
//       className="dsr-my-2"
//     />
//     <Alert
//       {...args}
//       variant="outline"
//       title="Your subscription is about to expire. Please recharge to continue using our services."
//       type="danger"
//       className="dsr-my-2"
//     />
//     <Alert
//       {...args}
//       variant="outline"
//       title="We have detected an unusual activity in your account. Review your account activity."
//       type="warning"
//       className="dsr-my-2"
//     />
//     <Alert
//       {...args}
//       variant="outline"
//       title="We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details."
//       className="dsr-my-2"
//     />
//   </div>
// );
//
// OutlineTypesTemplate.args = {};
//
// export const OutlinedTypes = OutlineTypesTemplate.bind({});
//
// export const WithButton = Template.bind({});
//
// WithButton.args = {
//   title: 'Your account is about to expire. Renew your subscription now!',
//   variant: 'filled',
//   type: 'danger',
//   allowDismissal: true,
//   primaryButton: {
//     children: 'Renew',
//     onClick: () => {
//       alert('Renew clicked');
//     },
//   },
//   secondaryButton: {
//     children: 'Cancel',
//     onClick: () => {
//       alert('Cancel clicked');
//     },
//   },
// };

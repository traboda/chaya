import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { PinInput, PinInputProps } from '../../../src';

const meta: Meta<PinInputProps> = {
  title: 'Components/Inputs/Pin Input',
  component: PinInput,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export type Story = StoryObj<PinInputProps>;

const DefaultTemplate = (args: PinInputProps) => {

  const [value, setValue] = useState(args.value ?? '');

  return (
    <div style={{ width: '300px', maxWidth: '100%' }}>
      <PinInput {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Primary: Story = {
  args: {
    labels: {
      label: 'Enter OTP',
      placeholder: 'A1232R',
    },
    digits: 6,
  },
  render: DefaultTemplate,
};

export const ClassicVariant: Story = {
  storyName: 'Classic PinInput Variant',
  tags: ['unlisted'],
  args: {
    variant: 'classic',
    labels: {
      label: 'Enter OTP',
      placeholder: 'A1232R',
    },
    digits: 6,
  },
  render: DefaultTemplate,
};

export const MaskedVariant: Story = {
  storyName: 'Masked PinInput Variant',
  tags: ['unlisted'],
  args: {
    labels: {
      label: 'Enter Your Pin',
    },
    digits: 6,
    mask: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div
        className="flex justify-center items-center border-dashed border"
        style={{ padding: '2.5vh 0', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
      >
        <DefaultTemplate {...args} />
      </div>
      <div
        className="flex justify-center items-center border-dashed border mt-3"
        style={{ padding: '2.5vh 0', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
      >
        <DefaultTemplate {...args} variant="classic" />
      </div>
    </div>
  ),
};

//
//
// export const FormSubmission: Story<PinInputProps> = (args) => {
//   const [value, setValue] = useState(args.value);
//   useEffect(() => setValue(args.value), [args.value]);
//
//   return (
//     <form onSubmit={(e) => { e.preventDefault(); console.log('pin submitted'); }}>
//       <div style={{ width: '450px', maxWidth: '100%' }}>
//         <div className="mb-3">
//           Value:
//           {value}
//         </div>
//         <PinInput {...args} labels={{ label: 'Enter Your Pin' }} value={value} onChange={setValue} />
//         <button type="submit">
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };
//
// FormSubmission.args = {
//   isRequired: true,
// };

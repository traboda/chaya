import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import RadioGroup, { RadioGroupProps } from '../../../src/components/RadioGroup';

const meta: Meta<RadioGroupProps<any>> = {
  title: 'Components/Inputs/RadioGroup',
  component: RadioGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story<Type> = StoryObj<RadioGroupProps<Type>>;

const options = [
  { label: 'Emirates', value: 'emirates' },
  { label: 'Qantas', value: 'qantas' },
  { label: 'Qatar Airways', value: 'qatar-airways' },
  { label: 'Singapore Airlines', value: 'singapore-airlines' },
  { label: 'Cathay Pacific', value: 'cathay-pacific' },
  { label: 'Virgin Atlantic', value: 'virgin-atlantic' },
];

const StoryTemplate = (args: Partial<RadioGroupProps<string>>) => {
  const [value, setValue] = useState(args.value ?? null);

  useEffect(() => {
    setValue(args.value || null);
  }, [args.value]);

  return (
    <RadioGroup {...args} options={args?.options || options} value={value ?? ''} onChange={setValue} />
  );
};

export const Primary: Story<string> = {
  args: {
    options,
    label: 'Select your favorite airline',
  },
  render: (args) => <StoryTemplate {...args} />,
};

export const HorizontalPrimary: Story<string> = {
  tags: ['unlisted'],
  args: {
    options,
    label: 'Select your favorite airline',
    alignment: 'horizontal',
  },
  render: (args) => <StoryTemplate {...args} />,
};

export const Disabled: Story<string> = {
  tags: ['unlisted'],
  args: {
    options,
    label: 'Select your favorite airline',
    isDisabled: true,
  },
  render: (args) => <StoryTemplate {...args} />,
};

export const OptionDisabled: Story<string> = {
  tags: ['unlisted'],
  args: {
    options: options.map(option => ({ ...option, isDisabled: option.value === 'emirates' })),
    label: 'Select your second favorite airline',
  },
  render: (args) => <StoryTemplate {...args} />,
};

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const RadioGroupSizesShowcase = ({ alignment }: { alignment: RadioGroupProps<string>['alignment'] }) => (
  <div
    className={clsx([
      'flex border-dashed border',
      alignment === 'vertical' ? 'flex-wrap justify-center' : 'flex-col gap-3',
    ])}
    style={{ padding: '2.5vh 2.5vw', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
  >
    {sizes.map((size, index) => (
      <div
        className={clsx([
          alignment === 'horizontal' ? 'flex flex-wrap mx-0' : 'flex flex-col gap-2',
        ])}
        style={{ width: alignment === 'horizontal' ? '100%' : '50%' }}
      >
        <div style={{ width: '10%' }} className="p-3 opacity-80 flex justify-end text-sm">{size}</div>
        <div style={{ width: '90%', background: 'rgba(200, 200, 200, 0.35)', borderColor: 'rgba(180, 180, 180, 0.8)' }} className="border-dashed flex items-center border p-1">
          <StoryTemplate alignment={alignment} size={size as keyof RadioGroupProps<string>['size']} value={options[index].value} />
        </div>
      </div>
    ))}
  </div>
);

export const HorizontalSizes: Story<string> = {
  tags: ['unlisted'],
  args: {
    options,
  },
  render: () => <RadioGroupSizesShowcase alignment="horizontal" />,
};

export const VerticalSizes: Story<string> = {
  tags: ['unlisted'],
  args: {
    options,
  },
  render: () => <RadioGroupSizesShowcase alignment="vertical" />,
};


const colorVariants: {
  color: RadioGroupProps<string>['color'],
  label: string,
  activeItem: RadioGroupProps<string>['value'],
}[] = [
  { color: 'primary', label: 'Primary', activeItem: 'emirates' },
  { color: 'secondary', label: 'Secondary', activeItem: 'qantas' },
  { color: 'warning', label: 'Warning', activeItem: 'qatar-airways' },
  { color: 'danger', label: 'Danger', activeItem: 'singapore-airlines' },
  { color: 'success', label: 'Success', activeItem: 'cathay-pacific' },
  // { color: 'contrast', label: 'Contrast', activeItem: 'OPENED' },
  // { color: 'shade', label: 'Shade', activeItem: 'CLICKED' },
  // { color: 'black', label: 'Black', activeItem: 'BOUNCED' },
  // { color: 'white', label: 'White', activeItem: 'ALL' },
];

const RadioGroupColorShowcase = ({ alignment }: { alignment: RadioGroupProps<string>['alignment'] }) => (
  <table
    className="flex flex-col items-start border-dashed border gap-2"
    style={{ padding: '5vh 5vw', borderColor: 'rgba(200, 200, 200, 0.8)', background: 'rgba(200, 200, 200, 0.15)' }}
  >
    {colorVariants.map(({ color, label, activeItem }) => (
      <tr className="flex flex-wrap mx-0 w-full">
        <td style={{ width: '10%' }} className="p-3 opacity-80 flex justify-end text-sm">{label}</td>
        <td style={{ width: '90%' }}>
          <StoryTemplate color={color} value={activeItem} alignment={alignment} />
        </td>
      </tr>
    ))}
  </table>
);


export const HorizontalColors: Story<string> = {
  tags: ['unlisted'],
  args: {
    options,
  },
  render: () => <RadioGroupColorShowcase alignment="horizontal" />,
};

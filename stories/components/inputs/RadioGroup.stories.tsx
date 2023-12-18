import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import { RadioGroup, RadioGroupProps } from '../../../src';

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
      'dsr-flex dsr-border-dashed dsr-border',
      alignment === 'vertical' ? 'dsr-flex-wrap dsr-justify-center' : 'dsr-flex-col dsr-gap-3',
    ])}
    style={{ padding: '2.5vh 2.5vw', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
  >
    {sizes.map((size, index) => (
      <div
        className={clsx([
          alignment === 'horizontal' ? 'dsr-flex dsr-flex-wrap dsr-mx-0' : 'dsr-flex dsr-flex-col dsr-gap-2',
        ])}
        style={{ width: alignment === 'horizontal' ? '100%' : '50%' }}
      >
        <div style={{ width: '10%' }} className="dsr-p-3 dsr-opacity-80 dsr-flex dsr-justify-end dsr-text-sm">{size}</div>
        <div style={{ width: '90%', background: 'rgba(200, 200, 200, 0.35)', borderColor: 'rgba(180, 180, 180, 0.8)' }} className="dsr-border-dashed dsr-flex dsr-items-center dsr-border dsr-p-1">
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
    className="dsr-flex dsr-flex-col dsr-items-start dsr-border-dashed dsr-border dsr-gap-2"
    style={{ padding: '5vh 5vw', borderColor: 'rgba(200, 200, 200, 0.8)', background: 'rgba(200, 200, 200, 0.15)' }}
  >
    {colorVariants.map(({ color, label, activeItem }) => (
      <tr className="dsr-flex dsr-flex-wrap dsr-mx-0 dsr-w-full">
        <td style={{ width: '10%' }} className="dsr-p-3 dsr-opacity-80 dsr-flex dsr-justify-end dsr-text-sm">{label}</td>
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

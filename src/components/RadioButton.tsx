import React from 'react';
import styled from '@emotion/styled';

const Radio = styled.div`

  .colorScheme {
    --primary: ${({ theme }) => theme.primary};
    --other: ${({ theme }) => theme.isDarkTheme ? '#d5d2d2' : '#444242'}
  }

  /* label */
  label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;

    margin: 0.5rem 0;

    cursor: pointer;
    position: relative;
  }


  /* input */
  input {
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }


  /* .design */
  .design {
    width: 1rem;
    height: 1rem;

    border: 0.063rem solid;
    border-radius: 100%;
    margin-right: 0.5rem;

    position: relative;
  }

  .design::before,
  .design::after {
    content: "";
    display: block;

    width: inherit;
    height: inherit;

    border-radius: inherit;

    position: absolute;
    transform: scale(0);
    transform-origin: center center;
  }

  .design:before {
    background: var(--other);
    opacity: 0;
    transition: .3s;
  }

  .design::after {
    background: var(--primary);
    opacity: .4;
    transition: .6s;
  }

  /* checked state */
  input:checked+.design::before {
    opacity: 1;
    transform: scale(.6);
  }


  /* other states */
  input:hover+.design,
  input:focus+.design {
    border: 0.063rem solid var(--primary);
  }

  input:hover+.design:before,
  input:focus+.design:before {
    background: var(--primary);
  }

  input:hover~.text {
    color: var(--primary);
  }

  input:focus+.design::after,
  input:active+.design::after {
    opacity: .1;
    transform: scale(2.6);
  }
`;

type RadioButtonProps = {
    label: string
    options: string[]
    name: string
    value: string,
    onChange: (value: string) => void
    required: boolean
};

const RadioButtons = ({ label, options, name, value, required, onChange = () => {}}: RadioButtonProps) => (
    <Radio>
        <React.Fragment>
            <div>
                <label className="block text-lg mb-2">
                    {label}
                    {required && <span className="pl-1 text-red-500">*</span>}
                </label>
                <div>
                    {options.map((l, i) => (
                        <div key={'radio_' + i} className="block mb-1 ml-1">
                            <label className="colorScheme">
                                <input
                                    name={name}
                                    type="radio"
                                    value={l}
                                    checked={value === l}
                                    required={required}
                                    id={'id_' + i}
                                    onChange={() => onChange((value !== l || required) ? l : null)}
                                />
                                <span className="design"></span>
                                <span className="text">{l}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    </Radio>
);

export default RadioButtons;
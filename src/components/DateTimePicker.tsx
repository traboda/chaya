'use client';
import React, { useEffect, useState } from 'react';
import { formatISO, format, parse, parseISO } from 'date-fns';
import clsx from 'clsx';

import mcs from '../utils/merge';

import Label from './Label';

export type DateTimePickerProps = {
  name: string
  label: string
  // time in ISO timestamp
  value?: string
  id?: string
  className?: string
  inputClassName?: string
  hideLabel?: boolean
  min?: Date
  max?: Date
  isRequired?: boolean
  isDisabled?: boolean
  onChange?: (val: string | null) => void
};

const getUnixZero = () => '1970-01-01T00:00:00.000Z';

const DateTimePicker = ({
  name, label, value, min, max, onChange = () => {}, isRequired = false, hideLabel = false,
  id, className, inputClassName, isDisabled = false,
}: DateTimePickerProps) => {

  const [supported, setSupported] = useState(true);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const stringFormat = 'yyyy-MM-dd\'T\'HH:mm';
  const stringDateFormat = 'yyyy-MM-dd';
  const stringTimeFormat = 'HH:mm';
  const parseDate = (_date: string) => setDate(format(parseISO(_date), stringDateFormat));
  const parseTime = (_time: string) => setTime(format(parseISO(`2020-05-25 ${_time}`), stringTimeFormat));
  const parseDateTime = () => date && time ? formatISO(parseISO(`${date} ${time}`)) : null;

  useEffect(() => {
    const test = document.createElement('input');
    test.type = 'datetime-local';
    if (test.type === 'text') setSupported(false);

    if (value) {
      parseDate(value);
      setTime(format(parseISO(value), stringTimeFormat));
    }
  }, []);

  useEffect(() => {
    if (date && time) onChange(parseDateTime());
  }, [date, time]);

  const inputClass = mcs([
    'px-2.5 py-2 block w-full bg-background placeholder:text-color focus:outline-none',
    'text-color border dark:border-neutral-500/70 border-neutral-500/20 bg-background-lighten-1 shadow-inner rounded-lg placeholder:opacity-50 group-focus-within:border-primary text-base',
    inputClassName,
  ]);

  return (
    <div className={className}>
      {(!hideLabel) && (
        <div className="flex flex-wrap px-1 mx-0">
          <div className="w-3/4 text-md px-0">
            <Label>
              {label}
              {isRequired && <span className="required-marker">*</span>}
            </Label>
          </div>
        </div>
      )}
      {supported ? (
        <input
          id={id}
          type="datetime-local"
          className={inputClass}
          name={name}
          required={isRequired}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          value={value == getUnixZero() ? undefined : value ? format(parseISO(value), stringFormat) : undefined}
          min={min ? format(min, stringFormat) : undefined}
          max={max ? format(max, stringFormat) : undefined}
          onChange={(e) => {
            onChange(
              e.currentTarget.value ?
                formatISO(
                  parse(
                    e.currentTarget.value,
                    stringFormat,
                    new Date(),
                  ),
                ) : getUnixZero(),
            );
          }}
        />
      ) : (
        <React.Fragment>
          <input
            id={id ? `${id}_date` : undefined}
            type="date"
            className={inputClassName}
            required={isRequired}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            value={date ? date : undefined}
            min={min ? format(min, stringDateFormat) : undefined}
            max={max ? format(max, stringDateFormat) : undefined}
            onChange={(e) => parseDate(e.target.value)}
          />
          <input
            id={id ? `${id}_time` : undefined}
            type="time"
            required={isRequired}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            value={time ? time : undefined}
            className={clsx(['mt-2', inputClassName])}
            min={min ? format(min, stringTimeFormat) : undefined}
            max={max ? format(max, stringTimeFormat) : undefined}
            onChange={(e) => parseTime(e.target.value)}
          />
          <input
            type="hidden"
            name={name}
            value={value ? format(parseISO(value), stringFormat) : undefined}
          />
        </React.Fragment>
      )}
    </div>
  );

};

export default DateTimePicker;

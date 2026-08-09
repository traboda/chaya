// tailwind merge
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const mcs = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default mcs;

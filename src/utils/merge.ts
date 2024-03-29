// tailwind merge

import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

const mcs = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default mcs;
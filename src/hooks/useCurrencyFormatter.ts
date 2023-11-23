'use client';
import { useRef } from 'react';

const CURRENCY_LOCALE_MAPPING = {
  'INR': 'en-IN',
  'USD': 'en-US',
  'EUR': 'en-GB',
  'GBP': 'en-GB',
  'AUD': 'en-AU',
  'CAD': 'en-CA',
  'JPY': 'ja-JP',
  'CNY': 'zh-CN',
  'NZD': 'en-NZ',
  'SGD': 'en-SG',
  'HKD': 'zh-HK',
  'TWD': 'zh-TW',
  'KRW': 'ko-KR',
  'TRY': 'tr-TR',
  'RUB': 'ru-RU',
  'BRL': 'pt-BR',
  'AED': 'ar-AE',
  'SAR': 'ar-SA',
  'QAR': 'ar-QA',
  'OMR': 'ar-OM',
};

const useCurrencyFormatter = () => {

  const numberFormatter = useRef<(amount: number, currency?: string, decimals?: number, locale?: string) => string>(
    (amount, currency = 'INR', decimals = 0, locale = undefined) => {
      let lcl = 'en-IN';
      if (locale) {
        lcl = locale;
      } else if (currency in CURRENCY_LOCALE_MAPPING) {
        lcl = CURRENCY_LOCALE_MAPPING[currency as keyof typeof CURRENCY_LOCALE_MAPPING];
      }
      return amount.toLocaleString(lcl, {
        style: 'currency',
        currency,
        maximumFractionDigits: decimals,
      });
    },
  );

  return numberFormatter.current;
};

export default useCurrencyFormatter;
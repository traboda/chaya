'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

import Modal from './Modal';
import Button, { ButtonProps } from './Button';
import TextInput from './TextInput';

export type ConfirmationDialogProps = {
  labels: {
    title: string,
    description?: string,
    confirm?: string,
    cancel?: string,
    confirmationText?: string,
    confirmationTextLabel?: string,
    passwordLabel?: string,
    passwordPlaceholder?: string,
  },
  isOpen?: boolean,
  requirePassword?: boolean,
  requireConfirmationText?: boolean,
  onConfirm?: (args: { password?: string, }) => void,
  onCancel?: () => void,
  className?: string
  formID?: string,
  confirmButtonProps?: ButtonProps,
  cancelButtonProps?: ButtonProps,
};

const defaultLabels = {
  confirm: 'Confirm',
  cancel: 'Cancel',
  confirmationText: 'CONFIRM',
  confirmationTextLabel: 'Confirmation Text',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your password',
};

const ConfirmationDialog = ({
  labels: initialLabels, isOpen = false, requireConfirmationText = false, requirePassword = false,
  onConfirm = () => {}, onCancel = () => {}, className, formID,
  confirmButtonProps, cancelButtonProps,
}: ConfirmationDialogProps) => {

  const labels = { ...defaultLabels, ...initialLabels };

  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');

  const confirmAction = (e: FormEvent) => {
    e.preventDefault();
    if (requirePassword && password?.length === 0) return;
    if (requireConfirmationText && confirmText !== labels.confirmationText) return;
    onConfirm({ password });
  };

  useEffect(() => setPassword(''), [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      headerClassName="dsr-w-[450px]"
      contentClassName={clsx('confirmation-dialog dsr-w-[450px] dsr-max-w-full', className)}
      title={labels?.title}
      description={labels.description}
    >
      <form id={formID} onSubmit={confirmAction}>
        {(requireConfirmationText || requirePassword) && (
          <div className="dsr-p-1 dsr-my-4">
            {requireConfirmationText && (
              <TextInput
                className="dsr-mb-3"
                label={labels?.confirmationTextLabel}
                placeholder={`Enter "${labels?.confirmationText}" to confirm`}
                name="confirmationText"
                value={confirmText}
                onChange={setConfirmText}
                isRequired
              />
            )}
            {requirePassword && (
              <TextInput
                className="dsr-mb-3"
                label={labels?.passwordLabel}
                placeholder={labels?.passwordPlaceholder}
                name="password"
                type="password"
                value={password}
                onChange={setPassword}
                isRequired
              />
            )}
          </div>
        )}
        <div className="dsr-flex dsr-justify-end dsr-gap-2">
          <Button
            color="contrast"
            onClick={onCancel}
            type="button"
            {...cancelButtonProps}
            className={clsx(['cancel-button', confirmButtonProps?.className])}
          >
            {labels?.cancel}
          </Button>
          <Button
            autoFocus
            type="submit"
            isDisabled={(requireConfirmationText && confirmText !== labels.confirmationText) || (requirePassword && password?.length === 0)}
            {...confirmButtonProps}
            className={clsx(['confirm-button', confirmButtonProps?.className])}
          >
            {labels?.confirm}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmationDialog;
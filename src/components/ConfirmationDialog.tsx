import React, { FormEvent, useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Card from './Card';
import TextInput from './TextInput';
import DSRContext from '../contexts/DSRContext';


type ConfirmationDialog = {
  labels?: {
    title?: string,
    description?: string,
    confirm?: string,
    cancel?: string,
    confirmationText?: string,
  },
  isOpen?: boolean,
  requirePassword?: boolean,
  requireConfirmationText?: boolean,
  onConfirm?: (args: {
    password?: string,
  }) => void,
  onCancel?: () => void
};

const defaultLabels = {
  title: 'Are You Sure?',
  description: "You can't undo this action afterwards.",
  confirm: 'Confirm',
  cancel: 'Cancel',
  confirmationText: 'CONFIRM',
};

const ConfirmationDialog = ({
  labels: _labels, isOpen = false, requireConfirmationText, requirePassword,
  onConfirm = () => {}, onCancel = () => {},
}: ConfirmationDialog) => {

  const labels = { ...defaultLabels, ..._labels };
  const { theme } = useContext(DSRContext);

  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');

  const confirmAction = (e: FormEvent) => {
    e.preventDefault();
    if (requirePassword && password?.length === 0)
      return;
    if (requireConfirmationText && confirmText !== labels.confirmationText)
      return;
    onConfirm({ password });
  };

  useEffect(() => setPassword(''), [isOpen]);

  return (
      <Modal isOpen={isOpen} onClose={onCancel}>
          <Card className="confirmation-dialog" background={theme?.background}>
              <div className="dsr-p-2">
                  <h2 className="dsr-font-semibold dsr-text-2xl dsr-mb-2">{labels?.title}</h2>
                  <p style={{ width: '450px', maxWidth: '100%' }} className="dsr-text-lg">
                      {labels?.description}
                  </p>
              </div>
              <form className="dsr-py-2" onSubmit={confirmAction}>
                  {requireConfirmationText && (
                  <TextInput
                      label={`Enter "${labels?.confirmationText}" to confirm`}
                      name="confirmationText"
                      value={confirmText}
                      onChange={setConfirmText}
                      required
                  />
                  )}
                  {requirePassword && (
                  <div className="dsr-mb-3">
                      <TextInput
                          label="Enter Your Password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={setPassword}
                          required
                      />
                  </div>
                  )}
                  <div className="dsr-flex dsr-justify-end">
                      <Button
                          color="shade"
                          size="lg"
                          onClick={onCancel}
                          type="button"
                          className="dsr-mr-2"
                      >
                          {labels?.cancel}
                      </Button>
                      <Button
                          size="lg"
                          type="submit"
                      >
                          {labels?.confirm}
                      </Button>
                  </div>
              </form>
          </Card>
      </Modal>
  );

};

export default ConfirmationDialog;
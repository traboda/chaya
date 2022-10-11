import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Card from "./Card";
import {useTheme} from "@emotion/react";
import TextInput from "./TextInput";


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

    const labels = {...defaultLabels, ..._labels};
    const theme = useTheme();

    const [confirmText, setConfirmText] = useState('');
    const [password, setPassword] = useState('');

    const confirmAction = (e) => {
        e.preventDefault();
        if(requirePassword && password?.length === 0)
            return;
        if(requireConfirmationText && confirmText !== labels.confirmationText)
            return;
        onConfirm({ password });
    }

    useEffect(() => setPassword(''), [isOpen]);

    return (
      <Modal isOpen={isOpen} onClose={onCancel}>
          <Card className="confirmation-dialog" background={theme.background}>
              <div className="p-2">
                  <h2 className="font-semibold text-2xl mb-2">{labels?.title}</h2>
                  <p style={{ width: '450px', maxWidth: '100%' }} className="text-lg">
                      {labels?.description}
                  </p>
              </div>
              <form className="py-2" onSubmit={confirmAction}>
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
                      <div className="mb-3">
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
                  <div className="flex justify-end">
                      <Button
                          color="shade"
                          size="lg"
                          onClick={onCancel}
                          type="button"
                          className="mr-2"
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
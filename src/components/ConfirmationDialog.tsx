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
          <Card background={theme.background}>
              <div className="p-2">
                  <h2 className="font-semibold text-2xl mb-2">{labels?.title}</h2>
                  <p className="text-lg">{labels?.description}</p>
              </div>
              <form className="py-2" onSubmit={confirmAction}>
                  {requireConfirmationText && (
                      <TextInput
                          label={`Enter "${labels?.confirmationText} to confirm"`}
                          name="confirmationText"
                          value={confirmText}
                          onChange={setConfirmText}
                          required
                      />
                  )}
                  {requirePassword && (
                      <TextInput
                          label="Enter Your Password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={setPassword}
                          required
                      />
                  )}
                  <div className="flex justify-end mt-4 px-2">
                      <Button
                          variant="success"
                          onClick={onCancel}
                          text={labels?.cancel}
                          px={6}
                          py={2}
                          type="button"
                          className="mr-3"
                      />
                      <Button
                          variant="danger"
                          type="submit"
                          text={labels?.confirm}
                          px={6}
                          py={2}
                      />
                  </div>
              </form>
          </Card>
      </Modal>
    );

};

export default ConfirmationDialog;
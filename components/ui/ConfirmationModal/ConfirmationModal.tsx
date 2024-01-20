import { Button } from "..";

interface ModalProps {
  text: string;
  cancelButton: () => void;
  confirmationButton: () => void;
}

export const ConfirmationModal: React.FC<ModalProps> = ({
  text,
  cancelButton,
  confirmationButton,
}) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-80">
      <div className="modal-container bg-white p-4 rounded translate-y-[-10vh] ">
        <p className="text-gray-800 text-lg mb-4">{text}</p>
        <div className="flex justify-end">
          <Button
            label="Cancel"
            onClick={cancelButton}
            className="mr-2 bg-gray-500"
          />
          <Button
            label="Delete"
            onClick={confirmationButton}
            className="bg-red-500 hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
};

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "../../UI/Button";
import Modal, { ModalFooter } from "../../UI/Modal";

const DeletePageModal = ({
  isOpen,
  onClose,
  page,
  onConfirm,
  loading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Page">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Are you sure you want to delete this page?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This action cannot be undone. The page "{page?.title}" and all
              its data will be permanently removed.
            </p>
          </div>
        </div>
      </div>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm} loading={loading}>
          {loading ? "Deleting..." : "Delete Page"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeletePageModal;


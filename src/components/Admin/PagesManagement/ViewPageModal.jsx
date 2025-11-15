import { EyeIcon } from "@heroicons/react/24/outline";
import Modal from "../../UI/Modal";

const ViewPageModal = ({ isOpen, onClose, page }) => {
  if (!page) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="xl">
      <div className="relative bg-white/10 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow">
              <EyeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Page Preview</h2>
              <p className="text-sm text-gray-300">/{page.slug}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/${page.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white hover:text-white rounded-xl font-semibold text-sm transition-all duration-200"
            >
              Open in new tab
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white hover:text-white rounded-xl font-semibold text-sm transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="p-0 bg-white/5">
        <div className="h-[80vh]">
          <iframe
            title="page-preview"
            src={`/${page.slug}`}
            className="w-full h-full border-0 bg-white"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewPageModal;


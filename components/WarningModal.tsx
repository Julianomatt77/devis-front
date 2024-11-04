import {Button} from "@/components/ui/button";

export default function WarningModal({ onClose, onConfirm , type}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                            Attention
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="modal-close"
                            onClick={onClose}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Vous allez supprimer un {type}. Cette action est irréversible.
                        </p>
                    </div>
                    <div className="flex items-center justify-evenly p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <Button onClick={onClose}>Annuler</Button>
                        <Button variant="destructive" onClick={onConfirm}>Confirmer</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
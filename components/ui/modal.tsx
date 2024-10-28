export default function Modal({ children, onClose }) {
    // Fonction pour gérer la fermeture en cliquant à l'extérieur de la modal
    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-background') {
            onClose();
        }
    };

    return (
        <div
            id="modal-background"
            className="fixed inset-0 max-h-screen z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleOutsideClick}
        >
            <div className="relative w-full max-h-screen max-w-4xl p-6 bg-accent rounded-lg shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    &#x2715;
                </button>
                {children}
            </div>
        </div>
    );
}

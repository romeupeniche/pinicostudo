const ConfirmDeleteModal: React.FC<{ open: boolean, onClose: () => void, confirm: () => void, activityTitle: string }> = ({ onClose, confirm, activityTitle, open }) => {
    if (!open) return null;
    console.log("entrou")
    return (
        <div onClick={() => onClose()} className="flex items-center justify-center w-full h-full fixed backdrop-blur-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-black/70 border border-white/20 p-5 rounded-xl">
                <h3>Tem certeza que deseja excluir a atividade <span className="font-semibold">{activityTitle}</span>?</h3>
                <nav className="flex gap-2 mt-2 justify-center">
                    <button
                        className="flex-1 mt-2 p-1 bg-red-500/50 rounded-full border border-white/20 cursor-pointer hover:bg-red-500/30 transition-colors"
                        onClick={() => confirm()}>Deletar</button>
                    <button
                        className="flex-1 mt-2 p-1 bg-black/50 rounded-full border border-white/20 cursor-pointer hover:bg-white/5 transition-colors"
                        onClick={() => onClose()}
                    >
                        Cancelar
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;
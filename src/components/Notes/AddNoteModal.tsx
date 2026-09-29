import CloseIcon from "../icons/CloseIcon";

const AddNoteModal:
    React.FC<{
        open: boolean,
        onClose: () => void,
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
        title: string,
        setTitle: (title: string) => void,
        edit?: boolean
    }> = ({ open: _open, onClose, handleSubmit, title, setTitle, edit = false }) => {
        return (
            <div onClick={() => onClose()} className="flex items-center justify-center w-full h-full fixed backdrop-blur-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-black/70 border border-white/20 p-5 rounded-xl">
                    <button className="self-end cursor-pointer transition-colors hover:text-red-800" onClick={onClose}>
                        <CloseIcon className="w-4 h-4" />
                    </button>
                    <h3>{edit ? "Editar anotação" : "Adicionar anotação"}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col mt-4 space-y-2">
                        <label htmlFor="title" className="self-start text-xs">Título</label>
                        <input
                            id="title"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="border hover:bg-white/5 transition-colors border-white/20 rounded-md p-1 bg-black/30 text-white outline-none focus:border-white/40" />
                    </form>
                </div>
            </div>
        );
    }

export default AddNoteModal;
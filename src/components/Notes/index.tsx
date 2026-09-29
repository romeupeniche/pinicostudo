import { useState } from "react";
import AddIcon from "../icons/AddIcon";

const Notes: React.FC = () => {
    const [_modal, setModalOpen] = useState<boolean>(false);

    return (
        <section className="flex flex-col items-center justify-between space-y-2">
            <header className="w-full flex px-4 items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider">
                    Anotações
                </h3>
                <button onClick={() => setModalOpen(true)} className="cursor-pointer hover:text-white/80 transition-colors">
                    <AddIcon className="w-5 h-5" />
                </button>
            </header>
            <section className="flex flex-col justify-center w-full space-y-4">
                <p className="text-center">ta limpo chefe</p>
            </section>
        </section>
    );
}

export default Notes;
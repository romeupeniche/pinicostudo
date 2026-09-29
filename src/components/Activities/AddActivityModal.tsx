import { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import { course } from "../../constants/course";
import { useActivityStore, type Activity } from "../../store/useActivityStore";

const AddActivityModal: React.FC<{ open: boolean; onClose: () => void; edit?: boolean; activity?: Activity }> = ({ open, onClose, edit = false, activity = null }) => {
    if (!open) return null;
    const subjectsInfo = course.subjects.map((subject) => ({ code: subject.code, color: subject.color }));
    const { addActivity, updateActivity } = useActivityStore();

    const getParsedDate = (givenDate?: string) => {
        const date = givenDate ? new Date(givenDate) : new Date();
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date.toISOString().slice(0, 16);
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(activity?.title || '');
    const [subject, setSubject] = useState<string>(activity?.subject_code || course.subjects[0]?.code || '');
    const [marks, setMarks] = useState<string>(activity?.total_marks?.toString() || '');
    const [location, setLocation] = useState<string>(activity?.location || 'submissions');
    const [openingDate, setOpeningDate] = useState<string>(getParsedDate(activity?.opening_date || ''));
    const [closingDate, setClosingDate] = useState<string>(activity?.closing_date ? getParsedDate(activity?.closing_date) : '');
    const [description, setDescription] = useState<string>(activity?.description || '');
    const [hasGrade, setHasGrade] = useState<boolean>(!!(activity?.total_marks) || false);

    const isAbleToSubmit = !!(
        title.trim() &&
        subject &&
        location &&
        openingDate &&
        closingDate &&
        (!hasGrade || (marks !== '' && Number(marks) >= 0 && Number(marks) <= 100))
    );

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isAbleToSubmit) return;

        setLoading(true);

        const activityPayload = {
            subject_code: subject,
            title: title.trim(),
            total_marks: hasGrade ? Number(marks) : 0,
            location: location as "Quizzes" | "Submissions" | "Content" | "Outro",
            description: description.trim() || undefined,
            opening_date: new Date(openingDate).toISOString(),
            closing_date: new Date(closingDate).toISOString(),
            completed: activity?.completed || false,
        };

        let success = false;
        if (edit && activity) {
            success = await updateActivity(activity.id, activityPayload);
        } else {
            success = await addActivity(activityPayload);
        }

        if (success) {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div onClick={() => onClose()} className="flex items-center justify-center w-full h-full fixed backdrop-blur-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-black/70 border border-white/20 p-5 rounded-xl">
                <button className="self-end cursor-pointer transition-colors hover:text-red-800" onClick={onClose}>
                    <CloseIcon className="w-4 h-4" />
                </button>
                <h3>{edit ? "Editar atividade" : "Adicionar atividade"}</h3>
                <form onSubmit={handleSubmit} className="flex flex-col mt-4 space-y-2">
                    <label htmlFor="title" className="self-start text-xs">Título</label>
                    <input
                        id="title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="border hover:bg-white/5 transition-colors border-white/20 rounded-md p-1 bg-black/30 text-white outline-none focus:border-white/40" />

                    <label htmlFor="subject" className="self-start text-xs">Matéria</label>
                    <select
                        id="subject"
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                        className="border hover:bg-white/5 transition-colors border-white/20 rounded-md p-1.5 text-white outline-none focus:border-white/40 cursor-pointer"
                    >
                        {subjectsInfo.map((option) => (
                            <option key={option.code} value={option.code} className={`cursor-pointer ${option.color}`}>
                                {option.code.toUpperCase()}
                            </option>
                        ))}
                    </select>

                    <div className="flex items-center justify-between">
                        <label htmlFor="marks" className="self-start text-xs">Valor</label>
                        <label className="flex items-center gap-1.5 text-xs cursor-pointer text-slate-300">
                            <input
                                type="checkbox"
                                checked={hasGrade}
                                onChange={(e) => setHasGrade(e.target.checked)}
                                defaultChecked
                                className="rounded bg-black/30 border-white/20 text-emerald-500 focus:ring-0 cursor-pointer"
                            />
                            Possui nota
                        </label>
                    </div>
                    <div className={`relative flex items-center transition-opacity ${!hasGrade ? 'pointer-events-none opacity-40' : ''}`}>
                        <input
                            id="marks"
                            type="text"
                            inputMode="numeric"
                            onChange={(e) => setMarks(e.target.value.replace(/\D/g, ''))}
                            onBlur={(e) => {
                                if (e.target.value === '0') setMarks("");
                                else if (Number(e.target.value) > 100) setMarks("100");
                                else if (Number(e.target.value) < 0) setMarks("0");
                                else setMarks(e.target.value)
                            }}
                            value={marks}
                            placeholder="0"
                            max="100"
                            maxLength={2}
                            min="0"
                            disabled={!hasGrade}
                            className="border not-disabled:hover:bg-white/5 transition-colors border-white/20 rounded-md p-1 w-full bg-black/30 text-white pr-8 outline-none focus:border-white/40" />
                        <span className="absolute right-3 text-xs text-slate-400 pointer-events-none">
                            %
                        </span>
                    </div>

                    <label htmlFor="location" className="self-start text-xs">Local</label>
                    <select
                        id="location"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        className="border hover:bg-white/5 transition-colors border-white/20 rounded-md p-1.5 text-white outline-none focus:border-white/40 cursor-pointer"
                    >
                        {["submissions", "quizzes", "content", "outro"].map((option) => (
                            <option key={option} value={option} className="text-white cursor-pointer">
                                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="description" className="self-start text-xs">Descrição</label>
                    <textarea
                        id="description"
                        rows={3}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Detalhes sobre a atividade..."
                        className="border hover:bg-white/5 transition-colors border-white/20 rounded-md p-2 bg-black/30 text-white outline-none focus:border-white/40 resize-none text-sm" />

                    <label htmlFor="opening" className="self-start text-xs">Abre</label>
                    <input
                        id="opening"
                        type="datetime-local"
                        onChange={(e) => setOpeningDate(e.target.value)}
                        value={openingDate}
                        className="border hover:bg-white/5 transition-colors border-white/20 rounded-md p-1 bg-black/30 text-white outline-none focus:border-white/40" />

                    <label htmlFor="closing" className="self-start text-xs">Fecha</label>
                    <input
                        id="closing"
                        type="datetime-local"
                        onChange={(e) => setClosingDate(e.target.value)}
                        value={closingDate}
                        className="border hover:bg-white/5 transition-colors border-white/20 rounded-md p-1 bg-black/30 text-white outline-none focus:border-white/40" />
                    <button
                        type="submit"
                        disabled={!isAbleToSubmit}
                        className="flex-1 mt-2 p-1 disabled:pointer-events-none disabled:opacity-40 bg-black/50 rounded-full border border-white/50 cursor-pointer not-disabled:hover:bg-white/5 transition-colors"
                    >
                        {loading ? (edit ? "Editando..." : "Adicionando...") : (edit ? "Editar" : "Adicionar")}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddActivityModal;
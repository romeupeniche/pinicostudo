import { useActivityStore, type Activity } from "../../store/useActivityStore";
import { course } from "../../constants/course";
import CloseIcon from "../icons/CloseIcon";
import LocationIcon from "../icons/LocationIcon";
import CalendarAdd from "../icons/CalendarAdd";
import CalendarClose from "../icons/CalendarClose";
import { dateFormatter } from "../../utils/dateFormatter";
import PercentageIcon from "../icons/PercentageIcon";
import TrashIcon from "../icons/TrashIcon";
import CheckIcon from "../icons/CheckIcon";
import PencilIcon from "../icons/PencilIcon";
import { useState } from "react";
import AddActivityModal from "./AddActivityModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const EditActivityModal: React.FC<{ open: boolean, onClose: () => void, activity: Activity }> = ({ onClose, open, activity }) => {
    if (!open) return null;
    const { toggleActivity, loading, deleteActivity, forceDisableLoading } = useActivityStore();
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const activityDetails = [
        {
            icon: <LocationIcon className="w-4 h-4" />,
            label: activity.location.charAt(0).toUpperCase() + activity.location.slice(1).toLowerCase()
        },
        {
            icon: <CalendarAdd className="w-4 h-4" />,
            label: dateFormatter(activity.opening_date, true)
        },
        {
            icon: <CalendarClose className="w-4 h-4" />,
            label: dateFormatter(activity.closing_date, true)
        },
        {
            icon: <PercentageIcon className="w-4 h-4" />,
            label: activity.total_marks > 0 ? activity.total_marks + "%" : 'N/A'
        }
    ]

    const color = course.subjects.find((subject) => subject.code === activity.subject_code)?.color;

    const handleCheckActivity = () => {
        toggleActivity(activity.id, !activity.completed);
    };

    const handleEditActivity = () => {
        setEditModalOpen(true);
    };
    const handleDeleteActivity = () => {
        deleteActivity(activity.id);
        forceDisableLoading();
    };

    return (
        <>
            <div className="z-20">
                <AddActivityModal open={editModalOpen} onClose={() => setEditModalOpen(false)} edit activity={activity} />
                <ConfirmDeleteModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} confirm={handleDeleteActivity} activityTitle={activity.title} />
            </div>
            <div onClick={() => onClose()} className="flex z-10 items-center justify-center w-full h-full fixed backdrop-blur-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div onClick={(e) => e.stopPropagation()} className="flex flex-col w-1/2 overflow-hidden bg-black/70 border border-white/20 p-5 rounded-xl">
                    <header className="flex justify-between items-center h-5 mb-1">
                        <h4 className={`${color} font-semibold text-sm uppercase tracking-wider`}>{activity.subject_code}</h4>
                        <button className="cursor-pointer transition-colors hover:text-red-800" onClick={onClose}>
                            <CloseIcon className="w-4 h-4" />
                        </button>
                    </header>
                    <h3 className="text-sm font-semibold text-white">{activity.title}</h3>
                    <p className="text-xs">{activity.description}</p>

                    <div className="flex flex-col gap-2 items-start mt-2 text-xs text-slate-400">
                        {activityDetails.map(({ icon, label }, i) => (
                            <span key={i} className="flex gap-2 items-center">
                                {icon} {label}
                            </span>
                        ))}
                    </div>
                    <nav className="flex md:justify-between gap-2 mt-4">
                        <button
                            onClick={handleCheckActivity}
                            className="md:flex-0 md:min-w-30 flex-1 bg-green-500/40 flex cursor-pointer hover:border-white/40 transition-colors text-white items-center gap-2 rounded-full border border-white/20 text-sm px-2 py-0.5"
                        >
                            <CheckIcon
                                className="w-4 h-4"
                            />
                            {loading ? "Carregando..." : activity.completed ? "Concluído" : "Concluir"}
                        </button>
                        <nav className="flex gap-2">
                            <button
                                onClick={handleEditActivity}
                                className="flex cursor-pointer hover:border-white/40 transition-colors text-white items-center gap-2 bg-blue-500/40 rounded-full border border-white/20 text-xs px-2 py-0.5"
                            >
                                <PencilIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setDeleteModalOpen(true)}
                                className="flex cursor-pointer hover:border-white/40 transition-colors text-white items-center gap-2 bg-red-500/40 rounded-full border border-white/20 text-xs px-2 py-0.5"
                            >
                                <TrashIcon className="w-3.5 h-3.5" />
                            </button>
                        </nav>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default EditActivityModal;
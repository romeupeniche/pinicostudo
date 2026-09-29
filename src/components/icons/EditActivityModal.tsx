import type { Activity } from "../../store/useActivityStore";
import { course } from "../../constants/course";
import CloseIcon from "../icons/CloseIcon";
import LocationIcon from "../icons/LocationIcon";
import CalendarAdd from "../icons/CalendarAdd";
import CalendarClose from "../icons/CalendarClose";
import { dateFormatter } from "../../utils/dateFormatter";
import PercentageIcon from "../icons/PercentageIcon";

const EditActivityModal: React.FC<{ open: boolean, onClose: () => void, activity: Activity }> = ({ onClose, open, activity }) => {
    if (!open) return null;
    const activityDetails = [
        {
            icon: <LocationIcon className="w-4 h-4" />,
            label: activity.location.charAt(0).toUpperCase() + activity.location.slice(1).toLowerCase()
        },
        {
            icon: <CalendarAdd className="w-4 h-4" />,
            label: dateFormatter(activity.opening_date)
        },
        {
            icon: <CalendarClose className="w-4 h-4" />,
            label: dateFormatter(activity.closing_date)
        },
        {
            icon: <PercentageIcon className="w-4 h-4" />,
            label: activity.total_marks > 0 ? activity.total_marks + "%" : 'N/A'
        }
    ]

    const color = course.subjects.find((subject) => subject.code === activity.subject_code)?.color;

    const openingDate = dateFormatter(activity.opening_date);
    const closingDate = dateFormatter(activity.closing_date);

    return (
        <div onClick={() => onClose()} className="flex items-center justify-center w-full h-full fixed backdrop-blur-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                    {activityDetails.map(({ icon, label }) => (
                        <span className="flex gap-2 items-center">
                            {icon} {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EditActivityModal;
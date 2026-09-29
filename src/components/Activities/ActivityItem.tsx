import { type Activity } from "../../store/useActivityStore";
import { course } from "../../constants/course";
import EditActivityModal from "./EditActivityModal";
import { useState } from "react";

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
    const [editActivityModalOpen, setEditActivityModalOpen] = useState<boolean>(false);
    const color = course.subjects.find((subject) => subject.code === activity.subject_code)?.color;

    const formatLocation = (loc: string) => {
        if (!loc) return '';
        return loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            weekday: 'long',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).split(" de ")
            .map((part, index) => {
                if (index === 1) {
                    return part.charAt(0).toUpperCase() + part.slice(1);
                }
                return part.charAt(0).toUpperCase() + part.slice(1);
            })
            .join(" de ");
    };

    return (
        <>
            <div onClick={() => setEditActivityModalOpen(true)} className={`cursor-pointer flex flex-col justify-between p-3 bg-black/20 border border-white/10 rounded-xl transition-all hover:bg-white/5 ${activity.completed ? 'opacity-40 line-through' : ''}`}>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className={`${color} font-semibold uppercase tracking-wider`}>
                        {activity.subject_code}
                    </span>
                    <span className="bg-white/10 px-2 py-0.5 rounded-full text-[10px]">
                        {formatLocation(activity.location)}
                    </span>
                </div>

                <h3 className="text-sm font-medium text-white mb-2">
                    {activity.title}
                </h3>

                {activity.description && (
                    <p className="text-xs text-zinc-400 mb-3 max-w-[60%] self-center text-ellipsis text-nowrap overflow-hidden">
                        {activity.description}
                    </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <span className="text-slate-300">
                        {activity.total_marks > 0 ? `${activity.total_marks}%` : '-'}
                    </span>
                    <span className="text-slate-400">
                        Fecha:
                        <span className="font-bold ml-1">{formatDate(activity.closing_date)}</span>
                    </span>
                </div>
            </div>
            <EditActivityModal activity={activity} open={editActivityModalOpen} onClose={() => setEditActivityModalOpen(false)} />
        </>
    );
};

export default ActivityItem;
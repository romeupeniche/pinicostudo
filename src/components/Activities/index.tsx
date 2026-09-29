import { useEffect, useState } from "react";
import { useActivityStore } from "../../store/useActivityStore";
import AddIcon from "../icons/AddIcon";
import ActivityItem from "./ActivityItem";
import AddActivityModal from "./AddActivityModal";

const Activities: React.FC = () => {
    const { fetchActivities, loading } = useActivityStore();
    const activities = useActivityStore((state) => state.activities).sort((a, b) => a.closing_date.localeCompare(b.closing_date));
    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <section className="flex flex-col items-center justify-between space-y-2">
            <header className="w-full flex px-4 items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider">
                    Atividades
                </h3>
                <button onClick={() => setModalOpen(true)} className="cursor-pointer hover:text-white/80 transition-colors">
                    <AddIcon className="w-5 h-5" />
                </button>
            </header>
            <section className="flex flex-col justify-center w-full space-y-4">
                {loading && <p className="text-center">Carregando...</p>}
                {!loading && activities.length === 0 && <p className="text-center">ta limpo chefe</p>}
                {activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)}
            </section>

            <AddActivityModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
}

export default Activities;
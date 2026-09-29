import { getTodayClasses } from "../../utils/getTodayClasses";


const TodayClasses: React.FC<{ currentTime: Date }> = ({ currentTime }) => {
    const todayClasses = getTodayClasses();

    return (
        <section>
            <div className="space-y-3 px-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-4">
                    Para hoje ({todayClasses.length})
                </h3>

                {todayClasses.map((cls, index) => {
                    const colorMatch = cls.subjectColor?.match(/\[(.*?)\]/);
                    const exactColor = colorMatch ? colorMatch[1] : "#fff";

                    const currentHours = currentTime.getHours();
                    const currentMinutes = currentTime.getMinutes();
                    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

                    const [startHour, startMin] = cls.startTime.split(':').map(Number);
                    const [endHour, endMin] = cls.endTime.split(':').map(Number);

                    const startTimeInMinutes = startHour * 60 + startMin;
                    const endTimeInMinutes = endHour * 60 + endMin;

                    const isOngoing = currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
                    const isFinished = currentTimeInMinutes >= endTimeInMinutes;

                    return (
                        <div
                            key={index}
                            className={`group relative border p-4 rounded-2xl transition-all duration-200 flex items-center justify-between overflow-hidden ${isFinished
                                ? 'bg-black/15 opacity-40 border-white/5'
                                : 'bg-black/30 hover:bg-black/60 border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div
                                style={{ backgroundColor: isFinished ? '#52525b' : exactColor }}
                                className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all"
                            />

                            <div className="pl-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        style={{ color: isFinished ? '#71717a' : exactColor }}
                                        className={`text-xs font-bold tracking-wide`}
                                    >
                                        {cls.subjectCode}
                                    </span>
                                    <span>-</span>
                                    <span className="text-xs font-medium">
                                        Prédio {cls.building} • Sala {cls.room}
                                    </span>

                                    {isOngoing && (
                                        <span className="ml-1 p-1 text-[10px] font-bold bg-emerald-500 rounded-full animate-pulse" />
                                    )}
                                </div>
                                <h4 className={`font-semibold text-base ${isFinished ? 'text-zinc-400 line-through' : 'text-white'}`}>
                                    {cls.subjectName}
                                </h4>
                                <p className="text-xs mt-0.5">Prof. {cls.professor.name}</p>
                            </div>

                            <div className="text-right shrink-0">
                                <span className={`text-sm font-bold px-3 py-1.5 rounded-xl border ${isFinished
                                    ? 'bg-black/20 text-zinc-500 border-white/5'
                                    : isOngoing
                                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                                        : 'text-white bg-black/30 border-slate-700/50'
                                    }`}>
                                    {cls.startTime} - {cls.endTime}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default TodayClasses;
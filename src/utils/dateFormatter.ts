import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dateFormatter = (
  date: Date | string | number = new Date(),
  time: boolean = false,
): string => {
  const parsedDate = new Date(date);

  const formatted = format(parsedDate, "EEEE, d 'de' MMMM", {
    locale: ptBR,
  });

  return (
    formatted
      .split(" de ")
      .map((part, index) => {
        if (index === 1) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" de ") +
    (time
      ? ` às ${parsedDate.getHours()}:${parsedDate.getMinutes() === 0 ? "00" : parsedDate.getMinutes()}`
      : "")
  );
};

export const getRelativeTime = (dateString: string) => {
  if (!dateString) return "";

  const targetDate = new Date(dateString);
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Expirado";
  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Amanhã";
  return `Daqui a ${diffDays} dias`;
};

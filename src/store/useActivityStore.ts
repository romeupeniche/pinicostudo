import { create } from "zustand";
import { supabase } from "../services/supabase";

export interface Activity {
  id: string;
  subject_code: string;
  title: string;
  total_marks: number;
  got_marks?: number;
  location: "Quizzes" | "Submissions" | "Content" | "Outro";
  description?: string;
  opening_date: string;
  closing_date: string;
  completed: boolean;
}

interface ActivityState {
  activities: Activity[];
  loading: boolean;
  fetchActivities: () => Promise<void>;
  addActivity: (newActivity: Omit<Activity, "id">) => Promise<boolean>;
  toggleActivity: (id: string, completed: boolean) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  forceDisableLoading: () => void;
  updateActivity: (
    id: string,
    updatedActivity: Partial<Activity>,
  ) => Promise<boolean>;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  loading: false,

  fetchActivities: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("closing_date", { ascending: true });

    if (error) {
      console.error("Erro ao buscar atividades:", error.message);
    } else {
      set({ activities: data || [] });
    }
    set({ loading: false });
  },

  addActivity: async (newActivity) => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("activities")
      .insert([newActivity])
      .select();

    set({ loading: false });

    if (error) {
      console.error("Erro ao adicionar atividade:", error.message);
      return false;
    }

    if (data) {
      set({ activities: [...get().activities, data[0]] });
    }
    return true;
  },

  toggleActivity: async (id, completed) => {
    set({ loading: true });
    const { error } = await supabase
      .from("activities")
      .update({ completed })
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar atividade:", error.message);
      set({ loading: false });
      return;
    }

    set({
      activities: get().activities.map((act) =>
        act.id === id ? { ...act, completed } : act,
      ),
    });
    set({ loading: false });
  },

  updateActivity: async (id, updatedActivity) => {
    set({ loading: true });
    const { error } = await supabase
      .from("activities")
      .update(updatedActivity)
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar atividade:", error.message);
      set({ loading: false });
      return false;
    }

    set({
      activities: get().activities.map((act) =>
        act.id === id ? { ...act, ...updatedActivity } : act,
      ),
    });
    set({ loading: false });
    return true;
  },

  deleteActivity: async (id) => {
    set({ loading: true });
    const { error } = await supabase.from("activities").delete().eq("id", id);

    if (error) {
      console.error("Erro ao deletar atividade:", error.message);
      set({ loading: false });
      return;
    }

    set({ activities: get().activities.filter((act) => act.id !== id) });
  },

  forceDisableLoading: () => set({ loading: false }),
}));

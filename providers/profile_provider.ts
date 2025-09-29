import Api from "@/core/api/api";
import { create } from 'zustand'

const api = new Api();

type ProfileState = {
    isLoading: boolean,
    country: string,
    trimesterStage?: number,
    currentWeek?: number,
    dueDate?: Date | null,
    everydayMeal: string,
    foodsToAvoid: string[]
    anythingElse: string,
    startLoading: () => void,
    stopLoading: () => void,
    setLoading: (isLoading: boolean) => void,
    setCountry: (country: string) => void,
    setTrimesterStage: (trimesterStage: number) => void,
    setCurrentWeek: (currentWeek: number) => void
    setDueDate: (dueDate: Date | null) => void
    setEverydayMeal: (everydayMeal: string) => void
    setFoodsToAvoid: (foodsToAvoid: string[]) => void
    setAnythingElse: (anythingElse: string) => void
}


export const useProfileState = create<ProfileState>((set) => ({
    // STATES
    isLoading: false,
    country: '',
    trimesterStage: 0,
    currentWeek: 0,
    dueDate: null,
    everydayMeal: '',
    foodsToAvoid: [],
    anythingElse: '',

    // METHODS
    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setCountry: (country: string) => {
        set({ country })
    },
    setTrimesterStage: (trimesterStage: number) => set({ trimesterStage }),
    setCurrentWeek: (currentWeek: number) => set({ currentWeek }),
    setDueDate: (dueDate: Date | null) => set({ dueDate }),
    setEverydayMeal: (everydayMeal: string) => set({ everydayMeal }),
    setFoodsToAvoid: (foodsToAvoid: string[]) => set({ foodsToAvoid }),
    setAnythingElse: (anythingElse: string) => set({ anythingElse }),
}))

import {KEY, buildStreak, formattedDate, shouldIncrementOrResetStreakCount, Streak, updateStreak} from "./utils";

export function streakCounter(storage: Storage, date: Date): Streak {
    const streakInLocalStorage = storage.getItem(KEY);

    if (streakInLocalStorage) {
        try {
            const storedStreak = JSON.parse(streakInLocalStorage || "") as Streak;
            const state = shouldIncrementOrResetStreakCount(date, storedStreak.lastLoginDate);
            const SHOULD_INCREMENT = state === "increment";
            const SHOULD_RESET = state === "reset";

            if (SHOULD_INCREMENT) {
                const updatedStreak = buildStreak(date, {
                    startDate: storedStreak.startDate,
                    currentCount: storedStreak.currentCount + 1,
                    lastLoginDate: formattedDate(date)
                });
                updateStreak(storage, updatedStreak);
                return updatedStreak;
            }

            if (SHOULD_RESET) {
                const updatedStreak = buildStreak(date);
                updateStreak(storage, updatedStreak);
                return updatedStreak;
            }

            return storedStreak;
        }
        catch (error) {
            console.error("Failed to parse streak from localStorage");
        }
    }

    const streak = buildStreak(date);
    // store in the localStorage
    storage.setItem(KEY, JSON.stringify(streak));

    return streak;
}
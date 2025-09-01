interface HistoryEntry {
    players: (string | null)[] | null
    winner: 0 | 1
}

export const bracketHistory = $state({
    list: [] as HistoryEntry[]
})
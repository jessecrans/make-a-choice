class Entries {
    list: string[] = $state([]);

    setLocal() {
        localStorage.setItem("global-entries", JSON.stringify(this.list));
    }

    getLocal() {
        const savedEntries = localStorage.getItem("global-entries");
        if (savedEntries) this.list = JSON.parse(savedEntries);
    }

    add(entry: string) {
        this.list = [entry, ...this.list];
    }

    removeIndex(index: number) {
        this.list = this.list.filter((_, i) => i !== index);
    }

    removeEntry(entry: string) {
        const index = this.list.indexOf(entry);
        if (index > -1) {
            this.removeIndex(index);
        }
    }
}

export const entries = new Entries();
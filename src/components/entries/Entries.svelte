<script lang="ts">
    import { onMount } from "svelte";
    import { entries } from "./entriesState.svelte";
    import EntriesEntry from "./EntriesEntry.svelte";

    onMount(() => {
        entries.getLocal();
    });

    $effect(() => {
        entries.setLocal();
    });

    let newEntry = $state("");

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (newEntry.trim() !== "") {
                entries.add(newEntry.trim());
                newEntry = "";
            }
        }
    };
</script>

<div class="flex flex-col gap-4 text-xl text-purple-800">
    <input
        type="text"
        placeholder="Add new entry..."
        bind:value={newEntry}
        onkeydown={handleKeyDown}
        class="border-2 border-purple-400 p-4 rounded-xl"
    />

    <!-- List -->
    <ul class="flex flex-col gap-2">
        {#each entries.list as entry, index (`${entry}-${index}`)}
            <EntriesEntry
                {entry}
                deleteFunction={() => entries.removeIndex(index)}
            />
        {/each}
    </ul>
</div>

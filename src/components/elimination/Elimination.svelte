<script lang="ts">
    import { onMount } from "svelte";
    import Entries from "../entries/Entries.svelte";
    import { entries } from "../entries/entriesState.svelte";

    let eliminating: boolean = false;
    let eliminated: string[] = [];

    onMount(() => {
        entries.getLocal();

        const savedEliminated = localStorage.getItem("elimination-eliminated");
        if (savedEliminated) {
            eliminated = JSON.parse(savedEliminated);
        }

        const savedEliminating = localStorage.getItem(
            "elimination-eliminating",
        );
        if (savedEliminating) {
            eliminating = JSON.parse(savedEliminating);
        }
    });

    const saveEliminated = () => {
        localStorage.setItem(
            "elimination-eliminated",
            JSON.stringify(eliminated),
        );
    };

    const handleElimination = (index: number) => {
        if (entries.list.length <= 1) {
            return;
        }

        eliminated = [...eliminated, entries.list[index]];
        saveEliminated();
        entries.removeIndex(index);
    };

    const handleStart = () => {
        eliminating = !eliminating;
        localStorage.setItem(
            "elimination-eliminating",
            JSON.stringify(eliminating),
        );

        eliminated = [];
        saveEliminated();

        if (!eliminating) {
            entries.list = [];
            entries.setLocal(); // otherwise the onMount in Entries component will run and repopulate it with the same data
        }
    };

    const eliminationHoverStyle =
        "text-white hover:border-red-300 hover:bg-red-100 hover:text-red-300";
    const eliminationWinnerStyle = "text-gold";
</script>

<div class="flex flex-col gap-4 text-xl text-purple-800">
    <!-- Entry input -->
    {#if !eliminating}
        <!-- <input
            type="text"
            placeholder="Add new entry..."
            bind:value={newEntry}
            on:keydown={handleKeyDown}
            class="border-2 border-purple-400 p-4 rounded-xl"
        /> -->
        <Entries />
    {:else}
        <!-- Entry list -->
        <h2 class="text-center">Remaining</h2>
        <ul class="flex flex-col gap-2">
            {#each entries.list as entry, index (index)}
                <button on:click={() => handleElimination(index)}>
                    <li
                        class={`border-2 border-purple-400 rounded-xl p-4 flex justify-between ${entries.list.length > 1 ? eliminationHoverStyle : eliminationWinnerStyle} transition shadow-lg`}
                    >
                        <p class="text-purple-600">{entry}</p>
                        {#if entries.list.length > 1}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="size-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        {:else}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="size-6 text-amber-300"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        {/if}
                    </li>
                </button>
            {/each}
        </ul>

        <!-- Eliminated list -->
        <h2 class="text-center">Eliminated</h2>
        <ul class="flex flex-col gap-2">
            {#each eliminated as elimEntry, index (index)}
                <li
                    class="bg-neutral-200 border-2 border-neutral-500 text-black opacity-30 rounded-xl p-4 shadow-lg"
                >
                    {elimEntry}
                </li>
            {/each}
        </ul>
    {/if}

    <!-- Start Stop button -->
    <button
        class="btn-regular"
        disabled={entries.list.length === 0 &&
        eliminated.length === 0 &&
        !eliminating
            ? true
            : false}
        on:click={() => handleStart()}
    >
        {eliminating ? "Stop Eliminating" : "Start Eliminating"}
    </button>
</div>

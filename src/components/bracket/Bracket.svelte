<script lang="ts">
    import { onMount } from "svelte";
    import BracketNode from "./BracketNode.svelte";
    import {
        bracket,
        buildBracket,
        updateTree,
    } from "./bracketState.svelte.ts";
    import { entries } from "../entries/entriesState.svelte.ts";
    import Entries from "../entries/Entries.svelte";
    import { bracketHistory } from "./bracketHistoryState.svelte.ts";
    import { Icon, Trophy } from "svelte-hero-icons";

    let started = $state(false);

    onMount(() => {
        const savedBracket = localStorage.getItem("bracket-node");
        if (savedBracket) {
            bracket.node = JSON.parse(savedBracket);
        }

        const savedHistory = localStorage.getItem("bracket-history");
        if (savedHistory) {
            bracketHistory.list = JSON.parse(savedHistory);
        }

        const savedStarted = localStorage.getItem("bracket-started");
        if (savedStarted) started = JSON.parse(savedStarted);
    });

    $effect(() => {
        localStorage.setItem("bracket-node", JSON.stringify(bracket.node));

        localStorage.setItem("bracket-started", JSON.stringify(started));

        localStorage.setItem(
            "bracket-history",
            JSON.stringify(bracketHistory.list),
        );
    });

    const handleStart = () => {
        started = !started;

        // build tree from entries
        bracket.node = buildBracket(entries.list);
        updateTree(bracket.node);

        // reset bracket history
        bracketHistory.list = [];
    };

    const handleStop = () => {
        started = !started;

        // reset entries
        entries.list = [];
        entries.setLocal();

        // reset tree
        bracket.node = buildBracket(entries.list);
        updateTree(bracket.node);
    };
</script>

<div class="w-full">
    {#if !started}
        <Entries />
        <button
            class="btn-regular w-full mt-4"
            onclick={handleStart}
            disabled={entries.list.length === 0 && !started ? true : false}
        >
            Start
        </button>
    {:else}
        {#if bracket.node.winner !== null}
            <div
                class="text-center mb-4 text-4xl font-bold text-purple-600 flex items-center justify-center gap-8"
            >
                <Icon src={Trophy} solid class="text-amber-300" size="32" />
                {bracket.node.players![bracket.node.winner]}
                <Icon src={Trophy} solid class="text-amber-300" size="32" />
            </div>
        {/if}
        <BracketNode node={bracket.node} />
        <h2 class="text-purple-600 text-2xl font-bold text-center my-8">
            History
        </h2>
        <ul class="flex flex-col gap-2 w-full">
            {#each bracketHistory.list as entry, index (entry)}
                <li class="flex w-full justify-between gap-4 items-center">
                    <button
                        class="border-2 border-purple-400 rounded-xl shadow-lg p-2 w-full disabled:grayscale disabled:opacity-50"
                        disabled={entry.winner === 1 ? true : false}
                    >
                        {entry.players![0]}
                    </button>
                    <p>vs.</p>
                    <button
                        class="border-2 border-purple-400 rounded-xl shadow-lg p-2 w-full disabled:grayscale disabled:opacity-50"
                        disabled={entry.winner === 0 ? true : false}
                    >
                        {entry.players![1]}
                    </button>
                </li>
            {/each}
            <!-- {#if bracketHistory.list.length === 0}
                <p>...</p>
            {/if} -->
        </ul>
        <button class="btn-regular w-full mt-4" onclick={handleStop}>
            Stop
        </button>
    {/if}
</div>

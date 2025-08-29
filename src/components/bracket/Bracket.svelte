<script lang="ts">
    import { onMount } from "svelte";
    import BracketNode from "./BracketNode.svelte";
    import {
        bracket,
        buildBracket,
        updatePlayers,
        updateTree,
    } from "./bracketState.svelte.ts";

    let entries = [
        "appel",
        "citroen",
        "deur",
        "eten",
        "fruit",
        "giraf",
    ];

    onMount(() => {
        const savedBracket = localStorage.getItem("bracket-node");
        if (savedBracket) {
            bracket.node = JSON.parse(savedBracket);
        }
    });

    $effect(() => {
        localStorage.setItem("bracket-node", JSON.stringify(bracket.node));
    });

    const handleReset = () => {
        bracket.node = buildBracket(entries);
        updateTree(bracket.node);
        console.log($state.snapshot(bracket.node));
    };

    handleReset();
</script>

<div class="">
    {#if bracket.node.winner !== null}
        <p class="text-center mb-4 text-2xl font-bold text-purple-600">
            {bracket.node.players![bracket.node.winner]}
        </p>
    {/if}
    <BracketNode node={bracket.node} />
    <button onclick={handleReset} class="btn-regular mt-4">reset</button>
</div>

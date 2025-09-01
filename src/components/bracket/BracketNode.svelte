<script lang="ts">
    import {
        bracket,
        pickWinner,
        updateTree,
        type BracketNode,
    } from "./bracketState.svelte";
    import Self from "./BracketNode.svelte";
    import { bracketHistory } from "./bracketHistoryState.svelte";

    export interface Props {
        node: BracketNode;
    }

    let { node }: Props = $props();

    const handleClick = (index: 0 | 1) => {
        if (node.winner === null) {
            bracketHistory.list = [{players: node.players, winner: index}, ...bracketHistory.list]
            pickWinner(node, index);
        }
        updateTree(bracket.node);
    };
</script>

<div class="flex justify-between items-center gap-4 w-full">
    <!-- {JSON.stringify(node.players)} -->
    {#if node.players && node.players[0] && node.players[1]}
        <button onclick={() => handleClick(0)} class="border-2 border-purple-400 rounded-xl p-8 shadow-lg w-full hover:bg-purple-50 hover:cursor-pointer text-purple-800">
            {node.players[0]}
        </button>
        <p>vs.</p>
        <button onclick={() => handleClick(1)} class="border-2 border-purple-400 rounded-xl p-8 shadow-lg w-full hover:bg-purple-50 hover:cursor-pointer text-purple-800">
            {node.players[1]}
        </button>
    {:else if node.players}
        {#if !node.players[0] && node.left}
            <Self node={node.left} />
        {:else if !node.players[1] && node.right}
            <Self node={node.right} />
        {/if}
    {:else if node.left}
        <Self node={node.left} />
    {:else if node.right}
        <Self node={node.right} />
    {:else}
        <p>ERROR</p>
    {/if}
</div>

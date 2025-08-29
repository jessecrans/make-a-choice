<script lang="ts">
    import {
        bracket,
        pickWinner,
        updateTree,
        type BracketNode,
    } from "./bracketState.svelte";
    import Self from "./BracketNode.svelte";

    export interface Props {
        node: BracketNode;
    }

    let { node }: Props = $props();

    const handleClick = (index: 0 | 1) => {
        pickWinner(node, index);
        console.log($state.snapshot(bracket.node));
        updateTree(bracket.node);
        console.log($state.snapshot(bracket.node));
    };
</script>

<div class="flex justify-between items-center gap-4 w-full">
    <!-- {JSON.stringify(node.players)} -->
    {#if node.players && node.players[0] && node.players[1]}
        <button onclick={() => handleClick(0)} class="btn-regular w-full">
            {node.players[0]}
        </button>
        <p>vs.</p>
        <button onclick={() => handleClick(1)} class="btn-regular w-full">
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

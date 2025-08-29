export interface BracketNode {
    players: (string | null)[] | null
    winner: 0 | 1 | null
    left: BracketNode | null
    right: BracketNode | null
}

export const bracket = $state({
    node: {
        players: null,
        winner: null,
        left: null,
        right: null
    } as BracketNode
});

export const buildBracket = (entries: string[]): BracketNode => {
    if (entries.length <= 2) {
        return {
            players: entries.length === 0 ? null : entries.length === 1 ? [entries[0], null] : [entries[0], entries[1]],
            winner: null,
            left: null,
            right: null
        }
    }

    const middle = Math.floor(entries.length / 2);
    const left = entries.slice(0, middle);
    const right = entries.slice(middle);

    return {
        players: null, winner: null, left: buildBracket(left), right: buildBracket(right)
    };
}

/**
 * 
 * @param node Bracket node to update the winner if possible
 */
const updateWinner = (node: BracketNode): 0 | 1 | null => {
    if (node.winner !== null) return node.winner;

    if (node.players) {
        if (!node.players[0] && node.players[1] && !node.left) {
            return 1;
        } else if (!node.players[1] && node.players[0] && !node.right) {
            return 0;
        }
    }

    return null;
}

export const updatePlayers = (node: BracketNode): (string | null)[] | null => {
    // if players are already known, dont do anything
    if (
        node.players && (
            (node.players[0] && node.players[1]) || 
            (node.players[0] && !node.players[1] && !node.right) ||
            (node.players[1] && !node.players[0] && !node.left)
        )
    ) {
        return node.players;
    }

    let newPlayers: (string | null)[] = [null, null];

    if (node.players && node.players[0]) {
        newPlayers[0] = node.players[0];
    } else if (node.left) {
        node.left.winner = updateWinner(node.left);
        if (node.left.winner !== null) {
            const leftPlayer = node.left.players![node.left!.winner];
            newPlayers[0] = leftPlayer;
        }
    }

    if (node.players && node.players[1]) {
        newPlayers[1] = node.players[1];
    } else if (node.right) {
        node.right.winner = updateWinner(node.right);
        if (node.right.winner !== null) {
            const rightPlayer = node.right.players![node.right!.winner];
            newPlayers[1] = rightPlayer;
        }
    }

    return (newPlayers[0] === null && newPlayers[1] === null) ? null : newPlayers;
}

export const updateTree = (node: BracketNode) => {
    if (node.left) updateTree(node.left);
    if (node.right) updateTree(node.right);

    const updated = updatePlayers(node);
    if (updated) {
        node.players = updated;
        node.winner = updateWinner(node);
    }
}

export const pickWinner = (node: BracketNode, winner: 0 | 1) => {
    node.winner = winner;
}

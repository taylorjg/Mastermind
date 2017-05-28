export const evaluateGuess = (secret, guess) => {
    const pairs = secret.map((item, index) => [item, guess[index]]);
    const matchingPairs = pairs.filter(([item1, item2]) => item1 === item2);
    const remainingPairs = pairs.filter(([item1, item2]) => item1 !== item2);
    const remainingSecretPegs = remainingPairs.map(pair => pair[0]);
    const remainingGuessPegs = remainingPairs.map(pair => pair[1]);
    const seed = { total: 0, done: []};
    const acc = remainingGuessPegs.reduce((acc, el) => {
        if (acc.done.includes(el)) return acc;
        const ns = remainingSecretPegs.filter(peg => peg === el).length;
        const ng = remainingGuessPegs.filter(peg => peg === el).length;
        const total = acc.total + Math.min(ns, ng);
        const done = acc.done.slice();
        done.push(el);
        return { total, done };
    }, seed);
    return {
        blacks: matchingPairs.length,
        whites: acc.total
    };
};

export const evaluateGuess = (secret, guess) => {
    const pairs = secret.map((item, index) => [item, guess[index]]);
    const matchingPairs = pairs.filter(([item1, item2]) => item1 === item2);
    const remainingPairs = pairs.filter(([item1, item2]) => item1 !== item2);
    const remainingSecretPegs = remainingPairs.map(pair => pair[0]);
    const remainingGuessPegs = remainingPairs.map(pair => pair[1]);
    const remainingCommonSecretPegs = remainingSecretPegs.filter(peg => remainingGuessPegs.includes(peg));
    const remainingCommonGuessPegs = remainingGuessPegs.filter(peg => remainingSecretPegs.includes(peg));
    const minRemainingCommon = Math.min(remainingCommonGuessPegs.length, remainingCommonSecretPegs.length);
    return {
        blacks: matchingPairs.length,
        whites: minRemainingCommon
    };
};
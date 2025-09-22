
type TitleCaseProps = {
    text: string;
    excludedWords?: string[];
}

export function titleCaseWithExclusions({ text, excludedWords }: TitleCaseProps): string {
    if (!excludedWords) {
        excludedWords = ['a', 'an', 'the', 'and', 'or', 'with', 'by', 'for', 'of', 'to', 'in', 'on', 'at', 'from', 'as'];
    }

    // Convert excluded words to lowercase for case-insensitive matching
    const excludedSet = new Set(excludedWords.map(word => word.toLowerCase()));

    const words = text.toLowerCase().split(' ');
    const capitalizedWords = words.map((word, index) => {
        // Always capitalize the first word, regardless of whether it's in the exclusion list
        if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }

        if (excludedSet.has(word)) {
            return word;
        }

        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(' ');
}

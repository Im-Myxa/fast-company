export function paginate(items, currentNumber, pageSize) {
    const startIndex = (currentNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
};

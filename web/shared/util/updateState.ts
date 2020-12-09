export const updateState = <T>( oldState: T, updatedValues: Partial<T> ): T => ({
    ...oldState,
    ...updatedValues,
});

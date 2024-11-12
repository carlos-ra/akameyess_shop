interface UserState {
    user: {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
    } | null;
    loading: boolean;
    error: string | null;
}
export declare const registerUser: import("@reduxjs/toolkit").AsyncThunk<{
    uid: string;
    email: string | null;
    displayName: string;
    photoURL: string | null;
}, {
    email: string;
    password: string;
    displayName: string;
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const loginUser: import("@reduxjs/toolkit").AsyncThunk<{
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}, {
    email: string;
    password: string;
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const signInWithGoogle: import("@reduxjs/toolkit").AsyncThunk<{
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const signOut: import("@reduxjs/toolkit").AsyncThunk<undefined, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/setUser">, clearError: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/clearError">;
declare const _default: import("redux").Reducer<UserState>;
export default _default;

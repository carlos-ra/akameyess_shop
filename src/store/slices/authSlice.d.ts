interface AuthState {
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
    photoURL: null;
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
    displayName: any;
    photoURL: any;
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
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
} | null, "auth/setUser">, clearError: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearError">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;

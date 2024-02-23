export enum LoginStatus {
    userNotFound,
    passwordWrong,
    ok,
}

export interface LoginResult {
    status: LoginStatus;
    session?: string;
}

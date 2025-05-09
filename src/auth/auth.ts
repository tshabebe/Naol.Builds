import { cookies } from "next/headers";
import { cache } from "react";
import { type SessionValidationResult, validateSessionToken } from "./lucia";

export const AUTH_TOKEN_COOKIE_NAME = "session";

export const validateSession = cache(
	async (): Promise<SessionValidationResult> => {
		const token = (await cookies()).get("session")?.value ?? null;
		if (!token) {
			return { session: null, user: null };
		}
		const result = validateSessionToken(token);
		return result;
	},
);

export const checkLoggedIn = async () => {
	const cookieStore = await cookies();
	const isLoggedIn = !!cookieStore.get(AUTH_TOKEN_COOKIE_NAME);
	return isLoggedIn;
};

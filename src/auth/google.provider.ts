import { env } from "@/config/env";
import { paths } from "@/config/paths";
import { db } from "@/db";
import { oauthAccountTable, userTable } from "@/db/schema";
import { generateId } from "@/lib/id";
import { getBaseUrl } from "@/lib/utils";
import { Google, OAuth2RequestError, generateState } from "arctic";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";
import {
	createSession,
	generateSessionToken,
	setSessionTokenCookie,
} from "./lucia";

const google =
	env.GOOGLE_CLIENT_ID !== undefined &&
	env.GOOGLE_CLIENT_SECRET !== undefined &&
	new Google(
		env.GOOGLE_CLIENT_ID,
		env.GOOGLE_CLIENT_SECRET,
		`${getBaseUrl()}${paths.auth.callback.getHref()}`,
	);

export async function createGoogleAuthorizationURL(): Promise<Response> {
	if (!google) {
		return new Response(null, {
			status: 404,
			statusText: "Not Found",
		});
	}

	const state = generateState();
	const googleRedirectUrl = await google.createAuthorizationURL(
		state,
		env.GOOGLE_AUTH,
		{
			scopes: ["profile", "email"],
		},
	);

	(await cookies()).set("google_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	return Response.redirect(googleRedirectUrl);
}

const googleUser = z.object({
	sub: z.string(),
	email: z.string(),
	picture: z.string(),
	name: z.string(),
});
/**
 * This function validates the Google callback.
 * @param request The request.
 * @returns The response.
 */
export async function validateGoogleCallback(
	request: Request,
): Promise<Response> {
	if (!google) {
		return new Response(null, {
			status: 404,
			statusText: "Not Found",
		});
	}
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState =
		(await cookies()).get("google_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(
			code,
			env.GOOGLE_AUTH,
		);

		const googleUserResponse = await fetch(
			"https://openidconnect.googleapis.com/v1/userinfo",
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		);
		const parsedRes = googleUser.safeParse(await googleUserResponse.json());

		if (!parsedRes.success) {
			return new Response(null, {
				status: 400,
			});
		}

		const { sub, email, picture, name } = parsedRes.data;

		const [existingUser] = await db
			.select()
			.from(oauthAccountTable)
			.where(eq(oauthAccountTable.providerUserId, sub));
		if (existingUser) {
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, existingUser.userId);
			await setSessionTokenCookie(sessionToken, session.expiresAt);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/",
				},
			});
		}

		const userRole = email === "teshomeabebe234@gmail.com" ? "admin" : "user";
		const userId = generateId();
		await db.insert(userTable).values({
			id: userId,
			email,
			userRole: userRole,
			name,
			avatarUrl: picture,
		});
		await db.insert(oauthAccountTable).values({
			providerId: "google",
			providerUserId: sub,
			userId,
		});

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, userId);
		await setSessionTokenCookie(sessionToken, session.expiresAt);

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
			},
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			});
		}

		return new Response(null, {
			status: 500,
		});
	}
}

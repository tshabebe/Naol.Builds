export const paths = {
	home: {
		getHref: () => "/",
	},
	social: {
		gitHub: {
			getHref: () => "https://github.com/tshabebe/Instuctise",
		},
		twitter: {
			getHref: () => "#",
		},
		linkedIn: {
			getHref: () => "#",
		},
	},
	auth: {
		register: {
			getHref: () => "/login",
		},
		login: {
			getHref: (userRole: string) => `/login/google?userRole=${userRole}`,
		},
		callback: {
			getHref: () => "/login/google/callback",
		},
	},

	app: {
		root: {
			getHref: () => "/",
		},
		projects: {
			getHref: () => "/projects",
		},
		blogs: {
			getHref: () => "/blogs",
		},
		bucketList: {
			getHref: () => "/bucket-list",
		},
	},
	landing: {
		root: {
			getHref: () => "/",
		},
		projects: {
			getHref: () => "/pricing",
		},
		skills: {
			getHref: () => "/faq",
		},
		blogs: {
			getHref: () => "/blogs",
		},
	},
} as const;

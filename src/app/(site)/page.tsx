import { checkLoggedIn } from "@/auth/auth";
import { paths } from "@/config/paths";
import { redirect } from "next/navigation";

async function LandingPage() {
	const isLoggedIn = await checkLoggedIn();
	if (isLoggedIn) {
		redirect(paths.app.dashboard.getHref());
	}
	return <div>{}</div>;
}

export default LandingPage;

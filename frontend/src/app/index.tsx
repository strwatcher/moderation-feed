import { createRoot } from "react-dom/client";
import { Page } from "../pages/main/ui";

import "@/shared/styles/global.scss";
import { SnackbarProvider } from "notistack";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

createRoot(root).render(
	<SnackbarProvider>
		<Page />
	</SnackbarProvider>,
);

import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Layout from "./Pages/Layout";
import { BrowserRouter } from "react-router-dom";
import "../css/app.css";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <BrowserRouter>
                <Layout>
                    <ChakraProvider>
                        <App {...props} />
                    </ChakraProvider>
                </Layout>
            </BrowserRouter>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

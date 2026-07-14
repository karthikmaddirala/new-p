import { FC, useEffect, lazy, Suspense } from "react";
import { Box, Center, Container, Spinner, useColorMode } from "@chakra-ui/react";
import AOS from "aos";

import "./App.scss";
import "aos/dist/aos.css";

import ScrollArrow from "pages/scroll";
import { MouseGlow } from "components/MouseGlow";
import { TechTicker } from "components/TechTicker";

const WannaSee = lazy(() => import("pages/wanna-see/WannaSee").then((m) => ({ default: m.WannaSee })));

const Navbar = lazy(() => import("shared/navbar/Navbar").then((m) => ({ default: m.Navbar })));
const Landing = lazy(() => import("pages/landing/Landing").then((m) => ({ default: m.Landing })));
const PageHeader = lazy(() => import("shared/page-header/PageHeader").then((m) => ({ default: m.PageHeader })));
const Footer = lazy(() => import("shared/footer/Footer").then((m) => ({ default: m.Footer })));
const FeaturedProjects = lazy(() => import("pages/featured-projects/FeaturedProjects").then((m) => ({ default: m.FeaturedProjects })));
const About = lazy(() => import("pages/about/About").then((m) => ({ default: m.About })));

const Loader: FC = () => (
    <Center w="100%" h="100vh">
        <Spinner size="lg" color="cyan.400" />
    </Center>
);

export const App: FC = () => {
    const { setColorMode } = useColorMode();
    useEffect(() => {
        setColorMode("dark");   // dark-mode only
        AOS.init({ once: true, duration: 600, offset: 80 });
    }, [setColorMode]);

    return (
        <Suspense fallback={<Loader />}>
            <MouseGlow />
            <Navbar />

            <Box pt="56px">
                <Container maxW="7xl" px={{ base: 4, md: 6 }}>
                    <section>
                        <Landing />
                    </section>
                </Container>

                {/* Tech ticker — full bleed */}
                <TechTicker />

                <Container maxW="7xl" px={{ base: 4, md: 6 }}>
                    <section>
                        <PageHeader id="page-work" label="Projects" />
                        <FeaturedProjects />
                    </section>

                    <section>
                        <PageHeader id="page-about" label="About Me" />
                        <About />
                    </section>

                    {/* Wanna see me? CTA */}
                    <WannaSee />
                </Container>

                <Footer />
            </Box>

            <ScrollArrow />
        </Suspense>
    );
};

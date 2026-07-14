import { FC } from "react";

import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { configs } from "shared/content/Content";
import { onResumeOpen } from "utils/Functions";
import { AboutPageId, ContactPageId, ExperiencePageId, useScroll, WorkPageId } from "utils/useScroll";
import { MenuDrawer } from "./drawer/Drawer";

const MotionBox = motion(Box);

const navLinks = [
    { label: "Projects", id: WorkPageId },
    { label: "Experience", id: ExperiencePageId },
    { label: "About", id: AboutPageId },
    { label: "Contact", id: ContactPageId },
];

export const Navbar: FC = () => {
    const currentPage = useScroll();

    const glassBg = useColorModeValue("rgba(248,250,255,0.85)", "rgba(5,5,15,0.85)");
    const borderColor = useColorModeValue("rgba(0,217,255,0.2)", "rgba(0,217,255,0.15)");
    const linkColor = useColorModeValue("#1a202c", "#e2e8f0");
    const activeColor = "#00D9FF";

    const toSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <MotionBox
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex={100}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" } as any}
        >
            <Box
                bg={glassBg}
                style={{ backdropFilter: "blur(20px)", willChange: "backdrop-filter" }}
                borderBottom="1px solid"
                borderColor={borderColor}
            >
                <Flex
                    maxW="1400px"
                    mx="auto"
                    px={{ base: "20px", md: "40px" }}
                    py="16px"
                    align="center"
                    justify="space-between"
                >
                    {/* Logo */}
                    <Box
                        cursor="pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        style={{
                            background: "linear-gradient(to right, #00D9FF, #9B59B6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 800,
                            fontSize: "18px",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        <Text display={{ base: "block", md: "none" }} fontWeight="inherit" fontSize="inherit">
                            {configs.common.logoType.mobile}
                        </Text>
                        <Text display={{ base: "none", md: "block" }} fontWeight="inherit" fontSize="inherit">
                            {configs.common.logoType.desktop}
                        </Text>
                    </Box>

                    {/* Desktop nav links */}
                    <Flex display={{ base: "none", md: "flex" }} align="center" gap="8px">
                        {navLinks.map(({ label, id }) => {
                            const isActive = currentPage === id;
                            return (
                                <Box
                                    key={id}
                                    as="button"
                                    onClick={() => toSection(id)}
                                    px="16px"
                                    py="8px"
                                    borderRadius="full"
                                    fontSize="14px"
                                    fontWeight={isActive ? 700 : 500}
                                    style={{
                                        color: isActive ? activeColor : linkColor,
                                        background: isActive ? "rgba(0,217,255,0.08)" : "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        letterSpacing: "0.3px",
                                        transition: "all 0.2s",
                                    }}
                                    _hover={{
                                        bg: "rgba(0,217,255,0.08)",
                                        style: { color: activeColor },
                                    }}
                                >
                                    {label}
                                </Box>
                            );
                        })}

                        {/* Resume pill */}
                        <Box
                            as="button"
                            onClick={onResumeOpen}
                            px="20px"
                            py="8px"
                            borderRadius="full"
                            fontSize="14px"
                            fontWeight={700}
                            style={{
                                background: "linear-gradient(to right, #00B4D8, #7C3AED)",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                letterSpacing: "0.3px",
                                transition: "all 0.2s",
                            }}
                        >
                            Resume
                        </Box>

                    </Flex>

                    {/* Mobile */}
                    <Flex display={{ base: "flex", md: "none" }} align="center" gap="8px">
                        <MenuDrawer currentPage={currentPage} onSectionClick={toSection} />
                    </Flex>
                </Flex>
            </Box>
        </MotionBox>
    );
};

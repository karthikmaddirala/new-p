import { FC, useEffect, useState } from "react";

import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { configs } from "shared/content/Content";
import { Socials } from "shared/socials/Socials";
import { WorkPageId } from "utils/useScroll";
import { onResumeOpen } from "utils/Functions";
import { NeuralBackground } from "components/NeuralBackground";

const MotionBox = motion(Box);

const TypewriterRole: FC<{ roles: string[] }> = ({ roles }) => {
    const [index, setIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = roles[index];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setIndex((i) => (i + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, deleting, index, roles]);

    return (
        <Text
            as="span"
            bgGradient="linear(to-r, cyan.400, purple.400)"
            bgClip="text"
            fontWeight="800"
        >
            {displayed}
            <Box
                as="span"
                display="inline-block"
                w="3px"
                h="1em"
                bg="cyan.400"
                ml="1"
                borderRadius="sm"
                sx={{
                    animation: "blink 1s step-end infinite",
                    "@keyframes blink": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0 },
                    },
                }}
                verticalAlign="middle"
            />
        </Text>
    );
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: "easeOut" },
    }),
};

export const Landing: FC = () => {
    const roles = (configs.landing as any).roles ?? ["AI / ML Engineer", "Generative AI Developer", "Data Scientist"];
    const tagline = (configs.landing as any).tagline ?? "";

    const mutedColor = useColorModeValue("gray.600", "whiteAlpha.700");
    const cardBg = useColorModeValue("rgba(255,255,255,0.6)", "rgba(15,15,30,0.6)");
    const cardBorder = useColorModeValue("rgba(0,217,255,0.2)", "rgba(0,217,255,0.15)");

    const scrollToWork = () => {
        document.getElementById(WorkPageId)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Box id="page-landing" pt={{ base: 2, md: 4 }} pb={{ base: 6, md: 8 }} position="relative" overflow="hidden">
            <NeuralBackground />
            <Flex
                direction={{ base: "column", lg: "row" }}
                align="center"
                justify="space-between"
                gap={{ base: 10, lg: 14 }}
                position="relative"
                zIndex={1}
            >
                    {/* Left content */}
                    <Stack flex="1" spacing="6" maxW={{ lg: "600px" }}>
                        {/* Badge */}
                        <MotionBox
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                        >
                            <Box
                                display="inline-flex"
                                alignItems="center"
                                gap="2"
                                px="4"
                                py="1.5"
                                borderRadius="full"
                                border="1px solid"
                                borderColor={cardBorder}
                                bg="rgba(0,217,255,0.06)"
                                backdropFilter="blur(10px)"
                                willChange="backdrop-filter"
                            >
                                <Box
                                    w="8px"
                                    h="8px"
                                    borderRadius="full"
                                    bg="green.400"
                                    boxShadow="0 0 8px #68D391"
                                    sx={{ animation: "pulse 2s infinite", willChange: "box-shadow" }}
                                />
                                <Text fontSize="sm" fontWeight="600" color="green.400">
                                    Open to Opportunities
                                </Text>
                            </Box>
                        </MotionBox>

                        {/* Greeting */}
                        <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
                            <Text
                                fontSize={{ base: "xl", md: "2xl" }}
                                fontWeight="500"
                                color={mutedColor}
                                letterSpacing="wide"
                            >
                                {configs.landing.headline1}
                            </Text>
                            <Text
                                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                                fontWeight="800"
                                lineHeight="1.05"
                                letterSpacing="tight"
                                mt="1"
                            >
                                {configs.landing.headline2}
                            </Text>
                        </MotionBox>

                        {/* Typewriter */}
                        <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.35}>
                            <Text fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} fontWeight="600" minH="2.2em">
                                <TypewriterRole roles={roles} />
                            </Text>
                        </MotionBox>

                        {/* Tagline */}
                        <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.45}>
                            <Text fontSize={{ base: "md", md: "lg" }} color={mutedColor} lineHeight="1.8" maxW="520px">
                                {tagline}
                            </Text>
                        </MotionBox>

                        {/* CTA buttons */}
                        <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.55}>
                            <HStack spacing="4" flexWrap="wrap">
                                <Button
                                    size="lg"
                                    borderRadius="full"
                                    px="8"
                                    bgGradient="linear(to-r, cyan.500, purple.600)"
                                    color="white"
                                    fontWeight="700"
                                    letterSpacing="wide"
                                    _hover={{
                                        bgGradient: "linear(to-r, cyan.400, purple.500)",
                                        boxShadow: "0 0 30px rgba(0,217,255,0.5)",
                                        transform: "translateY(-2px)",
                                    }}
                                    transition="all 0.25s"
                                    onClick={scrollToWork}
                                >
                                    View Projects
                                </Button>
                                <Button
                                    size="lg"
                                    borderRadius="full"
                                    px="8"
                                    variant="outline"
                                    borderColor="cyan.500"
                                    color="cyan.400"
                                    fontWeight="600"
                                    letterSpacing="wide"
                                    _hover={{
                                        bg: "rgba(0,217,255,0.08)",
                                        borderColor: "cyan.400",
                                        boxShadow: "0 0 20px rgba(0,217,255,0.25)",
                                        transform: "translateY(-2px)",
                                    }}
                                    transition="all 0.25s"
                                    onClick={onResumeOpen}
                                >
                                    Resume
                                </Button>
                            </HStack>
                        </MotionBox>

                        {/* Socials */}
                        <MotionBox variants={fadeUp} initial="hidden" animate="visible" custom={0.65}>
                            <Socials delay={800} resume={false} />
                        </MotionBox>

                    </Stack>

                    {/* Right — profile picture */}
                    <MotionBox
                        flex="0 0 auto"
                        display={{ base: "none", lg: "block" }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 } as any}
                    >
                        <Box position="relative" w="340px" h="340px">
                            {/* Glow ring */}
                            <Box
                                position="absolute"
                                inset="-12px"
                                borderRadius="full"
                                bgGradient="linear(to-br, cyan.400, purple.600)"
                                opacity="0.25"
                                filter="blur(24px)"
                                sx={{ animation: "glow-pulse 3s ease-in-out infinite", willChange: "filter, opacity" }}
                            />
                            {/* Gradient ring border */}
                            <Box
                                position="absolute"
                                inset="-4px"
                                borderRadius="full"
                                bgGradient="linear(to-br, cyan.400, purple.600)"
                                p="4px"
                            >
                                <Box borderRadius="full" overflow="hidden" w="100%" h="100%" bg="gray.900">
                                    <picture>
                                        <source type="image/webp" srcSet={configs.landing.picture} />
                                        <source type="image/jpeg" srcSet={configs.landing.jpg} />
                                        <Image
                                            src={configs.landing.jpg}
                                            alt="Sai Karthik Maddirala"
                                            w="340px"
                                            h="340px"
                                            objectFit="cover"
                                            objectPosition="center 22%"
                                            borderRadius="full"
                                            decoding="async"
                                        />
                                    </picture>
                                </Box>
                            </Box>
                            {/* Floating badge: Current role */}
                            <Box
                                position="absolute"
                                top="352px"
                                right="8px"
                                px="4"
                                py="2"
                                borderRadius="xl"
                                bg={cardBg}
                                border="1px solid"
                                borderColor={cardBorder}
                                backdropFilter="blur(16px)"
                                willChange="backdrop-filter"
                                boxShadow="0 8px 32px rgba(0,217,255,0.15)"
                                whiteSpace="nowrap"
                                sx={{ animation: "float 4s ease-in-out infinite" }}
                            >
                                <Text fontSize="xs" color={mutedColor} fontWeight="500">Current Role</Text>
                                <Text fontSize="sm" fontWeight="700" color="cyan.400">
                                    ML Engineer @ CDF
                                </Text>
                            </Box>
                        </Box>
                    </MotionBox>
                </Flex>
        </Box>
    );
};

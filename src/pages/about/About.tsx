import { FC } from "react";

import { Box, Flex, Heading, Image, Text, Button, Badge, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { configs } from "shared/content/Content";
import { Education } from "pages/about/education/Education";
import { Experience } from "pages/about/experience/Experience";
import { Skills } from "pages/about/skills/Skills";
import { onResumeOpen } from "utils/Functions";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: "easeOut" } }),
};

export const About: FC = () => {
    const cardBorder = useColorModeValue("rgba(0,217,255,0.15)", "rgba(0,217,255,0.12)");
    const mutedColor = useColorModeValue("gray.600", "whiteAlpha.700");

    const summary =
        "ML / AI Engineer with hands-on experience across the full model lifecycle — data curation, training, evaluation, deployment, and monitoring.\n" +
        "Skilled across deep learning, computer vision, and Generative AI / LLM systems (RAG, AI agents) using PyTorch, LangChain, and Claude/OpenAI APIs.\n" +
        "Focused on shipping production-grade, real-time ML systems with strong MLOps practices across cloud and containerized environments.";

    return (
        <Box>
            {/* Profile banner */}
            <MotionFlex
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                pt="8"
                gap={{ base: 6, md: 8, lg: 12 }}
                direction={{ base: "column", md: "row" }}
                align={{ base: "center", md: "flex-start" }}
            >
                {/* Avatar */}
                <Box flexShrink={0} position="relative">
                    <Box
                        position="absolute"
                        inset="-8px"
                        borderRadius="2xl"
                        bgGradient="linear(to-br, cyan.400, purple.600)"
                        opacity="0.2"
                        filter="blur(16px)"
                    />
                    <Box
                        borderRadius="2xl"
                        overflow="hidden"
                        border="2px solid"
                        borderColor={cardBorder}
                        position="relative"
                        w={{ base: "180px", md: "220px" }}
                        h={{ base: "180px", md: "220px" }}
                    >
                        <picture>
                            <source type="image/webp" srcSet={configs.common.mainPicture} />
                            <source type="image/jpeg" srcSet={configs.common.mainPictureJPG} />
                            <Image
                                src={configs.common.mainPicture}
                                alt="Sai Karthik Maddirala"
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </picture>
                    </Box>
                </Box>

                {/* Bio */}
                <Box flex="1">
                    <Flex align="center" gap="3" flexWrap="wrap" mb="2">
                        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" letterSpacing="tight">
                            {configs.common.name}
                        </Heading>
                        <Badge
                            borderRadius="full"
                            px="3"
                            py="1"
                            fontSize="xs"
                            fontWeight="700"
                            bgGradient="linear(to-r, cyan.500, purple.600)"
                            color="white"
                        >
                            AI / ML Engineer
                        </Badge>
                    </Flex>

                    <Text fontSize="sm" color="cyan.400" fontWeight="600" mb="4">
                        Kansas, USA &nbsp;·&nbsp; Open to Opportunities
                    </Text>

                    <Text fontSize={{ base: "sm", md: "md" }} color={mutedColor} lineHeight="1.85" maxW="640px" whiteSpace="pre-line">
                        {summary}
                    </Text>

                    <Button
                        mt="5"
                        size="sm"
                        px="6"
                        borderRadius="full"
                        bgGradient="linear(to-r, cyan.500, purple.600)"
                        color="white"
                        fontWeight="600"
                        _hover={{
                            bgGradient: "linear(to-r, cyan.400, purple.500)",
                            boxShadow: "0 0 20px rgba(0,217,255,0.4)",
                        }}
                        transition="all 0.2s"
                        onClick={onResumeOpen}
                    >
                        Download Resume
                    </Button>
                </Box>
            </MotionFlex>

            {/* Experience + Education */}
            <Flex
                direction={{ base: "column", xl: "row" }}
                gap={{ base: 14, xl: 12 }}
                mt="16"
            >
                <MotionBox
                    flex="1"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.1}
                >
                    <Experience />
                </MotionBox>

                <MotionBox
                    flex="0 0 auto"
                    w={{ xl: "340px" }}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                >
                    <Education />
                </MotionBox>
            </Flex>

            {/* Skills */}
            <MotionBox
                pt="16"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
            >
                <Skills />
            </MotionBox>
        </Box>
    );
};

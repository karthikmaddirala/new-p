import { FC } from "react";

import { Box, Flex, Text, Wrap, WrapItem, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { configs } from "shared/content/Content";
import { ArticleTitle } from "../common/title/Title";

const MotionBox = motion(Box);
const MotionWrapItem = motion(WrapItem);

const categoryColors: Record<string, { gradient: string; glow: string }> = {
    "Languages":              { gradient: "linear(to-r, cyan.400, blue.500)",     glow: "rgba(0,217,255,0.3)" },
    "Machine Learning":       { gradient: "linear(to-r, blue.400, cyan.500)",     glow: "rgba(66,153,225,0.3)" },
    "Deep Learning":          { gradient: "linear(to-r, purple.400, pink.500)",   glow: "rgba(159,122,234,0.3)" },
    "Generative AI & LLMs":   { gradient: "linear(to-r, pink.400, purple.500)",   glow: "rgba(237,100,166,0.3)" },
    "NLP":                    { gradient: "linear(to-r, teal.400, cyan.500)",     glow: "rgba(56,178,172,0.3)" },
    "Data Engineering":       { gradient: "linear(to-r, orange.400, yellow.400)", glow: "rgba(237,137,54,0.3)" },
    "Cloud & MLOps":          { gradient: "linear(to-r, blue.500, purple.500)",   glow: "rgba(66,153,225,0.3)" },
    "Databases & APIs":       { gradient: "linear(to-r, green.400, teal.500)",    glow: "rgba(72,187,120,0.3)" },
};

const SkillPill: FC<{ tag: string; glow: string; gradient: string; i: number }> = ({ tag, glow, gradient, i }) => {
    const pillBg = useColorModeValue("rgba(255,255,255,0.5)", "rgba(15,15,30,0.5)");
    const pillBorder = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.08)");

    return (
        <MotionWrapItem
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 } as any}
            whileHover={{ scale: 1.08, y: -2 } as any}
        >
            <Box
                px="3"
                py="1"
                borderRadius="full"
                bg={pillBg}
                border="1px solid"
                borderColor={pillBorder}
                backdropFilter="blur(8px)"
                willChange="backdrop-filter"
                cursor="default"
                _hover={{
                    boxShadow: `0 0 14px ${glow}`,
                    borderColor: "transparent",
                    backgroundImage: gradient,
                    backgroundSize: "100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                transition="all 0.2s"
                role="group"
            >
                <Text
                    fontSize="sm"
                    fontWeight="600"
                    bgGradient={gradient}
                    bgClip="text"
                    whiteSpace="nowrap"
                >
                    {tag}
                </Text>
            </Box>
        </MotionWrapItem>
    );
};

export const Skills: FC = () => {
    const sectionBg = useColorModeValue("rgba(0,217,255,0.03)", "rgba(0,217,255,0.03)");
    const sectionBorder = useColorModeValue("rgba(0,217,255,0.12)", "rgba(0,217,255,0.1)");
    const labelColor = useColorModeValue("gray.500", "whiteAlpha.600");

    return (
        <Box>
            <ArticleTitle title="Skills" pb="2" />
            <Flex direction="column" gap="3" mt="5">
                {configs.about.skills.map((skill, si) => {
                    const colors = categoryColors[skill.title] ?? {
                        gradient: "linear(to-r, cyan.400, purple.400)",
                        glow: "rgba(0,217,255,0.3)",
                    };
                    return (
                        <MotionBox
                            key={skill.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: si * 0.07 } as any}
                            p="4"
                            borderRadius="2xl"
                            bg={sectionBg}
                            border="1px solid"
                            borderColor={sectionBorder}
                            backdropFilter="blur(8px)"
                            willChange="backdrop-filter"
                        >
                            <Text
                                fontSize="xs"
                                fontWeight="700"
                                textTransform="uppercase"
                                letterSpacing="widest"
                                color={labelColor}
                                mb="2"
                            >
                                {skill.title}
                            </Text>
                            <Wrap spacing="2">
                                {skill.tools.map((tool, i) => (
                                    <SkillPill
                                        key={tool}
                                        tag={tool}
                                        glow={colors.glow}
                                        gradient={colors.gradient}
                                        i={i}
                                    />
                                ))}
                            </Wrap>
                        </MotionBox>
                    );
                })}
            </Flex>
        </Box>
    );
};

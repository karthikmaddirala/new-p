import { FC, useState } from "react";

import {
    Box,
    Flex,
    Text,
    Badge,
    Collapse,
    UnorderedList,
    ListItem,
    useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { configs } from "shared/content/Content";
import { ArticleTitle } from "pages/about/common/title/Title";

const MotionBox = motion(Box);

const companyColors: Record<string, string> = {
    "Chubb Limited": "cyan",
    "Epic Games": "purple",
    "Tejas Networks": "blue",
};

const ExperienceCard: FC<{
    exp: (typeof configs.about.experiences)[0];
    index: number;
    isLast: boolean;
}> = ({ exp, index, isLast }) => {
    const [expanded, setExpanded] = useState(index === 0);
    const cardBg = useColorModeValue("rgba(255,255,255,0.7)", "rgba(13,12,30,0.7)");
    const cardBorder = useColorModeValue("rgba(0,217,255,0.15)", "rgba(0,217,255,0.12)");
    const mutedColor = useColorModeValue("gray.500", "whiteAlpha.600");
    const accentColor = companyColors[exp.company] ?? "cyan";

    return (
        <MotionBox
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1 } as any}
        >
            <Flex gap="4">
                {/* Timeline column */}
                <Flex direction="column" align="center" flexShrink={0} w="40px">
                    {/* Node */}
                    <Box
                        w="16px"
                        h="16px"
                        borderRadius="full"
                        bgGradient={`linear(to-br, ${accentColor}.400, purple.500)`}
                        boxShadow={`0 0 12px var(--chakra-colors-${accentColor}-400)`}
                        flexShrink={0}
                        mt="4"
                        border="3px solid"
                        borderColor={`${accentColor}.300`}
                    />
                    {/* Connector line */}
                    {!isLast && (
                        <Box
                            flex="1"
                            w="2px"
                            mt="2"
                            bgGradient={`linear(to-b, ${accentColor}.400, purple.600, transparent)`}
                            opacity="0.5"
                            minH="40px"
                        />
                    )}
                </Flex>

                {/* Card */}
                <Box
                    flex="1"
                    mb={isLast ? "0" : "6"}
                    bg={cardBg}
                    border="1px solid"
                    borderColor={expanded ? `${accentColor}.400` : cardBorder}
                    borderRadius="2xl"
                    p="5"
                    backdropFilter="blur(16px)"
                    willChange="backdrop-filter"
                    cursor="pointer"
                    onClick={() => setExpanded(!expanded)}
                    _hover={{
                        borderColor: `${accentColor}.400`,
                        boxShadow: `0 0 20px rgba(0,217,255,0.12)`,
                        transform: "translateY(-2px)",
                    }}
                    transition="all 0.25s"
                    boxShadow={expanded ? `0 0 24px rgba(0,217,255,0.1)` : "none"}
                >
                    <Flex justify="space-between" align="flex-start" gap="3" wrap="wrap">
                        <Box flex="1">
                            <Text fontWeight="700" fontSize="lg" lineHeight="1.3">
                                {exp.position}
                            </Text>
                            <Text
                                fontWeight="600"
                                fontSize="sm"
                                bgGradient={`linear(to-r, ${accentColor}.400, purple.400)`}
                                bgClip="text"
                                mt="0.5"
                            >
                                {exp.company}
                            </Text>
                        </Box>
                        <Flex align="center" gap="2" flexShrink={0}>
                            <Badge
                                borderRadius="full"
                                px="3"
                                py="1"
                                fontSize="xs"
                                fontWeight="600"
                                colorScheme={accentColor}
                                variant="subtle"
                            >
                                {exp.duration}
                            </Badge>
                            <Box
                                transform={expanded ? "rotate(180deg)" : "rotate(0deg)"}
                                transition="transform 0.3s"
                                color={mutedColor}
                                fontSize="lg"
                                lineHeight="1"
                            >
                                ↓
                            </Box>
                        </Flex>
                    </Flex>

                    <Collapse in={expanded} animateOpacity>
                        <Box mt="4" pt="4" borderTop="1px solid" borderColor={cardBorder}>
                            <UnorderedList spacing="2" ml="0" styleType="none">
                                {exp.description.map((point, i) => (
                                    <ListItem
                                        key={i}
                                        fontSize="sm"
                                        color={mutedColor}
                                        lineHeight="1.7"
                                        display="flex"
                                        gap="2"
                                        alignItems="flex-start"
                                    >
                                        <Box as="span" color={`${accentColor}.400`} flexShrink={0} mt="0.5">▸</Box>
                                        <Box as="span">{point}</Box>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Box>
                    </Collapse>
                </Box>
            </Flex>
        </MotionBox>
    );
};

export const Experience: FC = () => {
    return (
        <Box id="page-experience">
            <ArticleTitle title="Experience" />
            <Box mt="6">
                {configs.about.experiences.map((exp, idx) => (
                    <ExperienceCard
                        key={exp.id}
                        exp={exp}
                        index={idx}
                        isLast={idx === configs.about.experiences.length - 1}
                    />
                ))}
            </Box>
        </Box>
    );
};

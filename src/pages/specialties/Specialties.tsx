import { FC } from "react";
import { Box, Flex, Grid, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const specialties = [
    {
        icon: "🧠",
        title: "Generative AI & LLMs",
        description:
            "RAG pipelines, LangChain agents, OpenAI API integrations, prompt engineering, and document intelligence systems deployed in production.",
        tags: ["LangChain", "RAG", "OpenAI", "FAISS", "LangGraph", "CrewAI"],
        border: "rgba(0,217,255,0.25)",
        glowColor: "rgba(0,217,255,0.12)",
        accentGradient: "linear(to-r, cyan.400, blue.400)",
    },
    {
        icon: "⚙️",
        title: "ML Engineering",
        description:
            "End-to-end model lifecycle: feature engineering, training, hyperparameter tuning, A/B experiments, drift detection, and MLOps at scale.",
        tags: ["PyTorch", "XGBoost", "MLflow", "Kubernetes", "Docker", "DVC"],
        border: "rgba(124,58,237,0.25)",
        glowColor: "rgba(124,58,237,0.12)",
        accentGradient: "linear(to-r, purple.400, pink.400)",
    },
    {
        icon: "📡",
        title: "Data Engineering",
        description:
            "Scalable real-time and batch pipelines — Kafka streaming, Spark processing, Snowflake warehousing, and Power BI dashboards for stakeholders.",
        tags: ["PySpark", "Kafka", "Airflow", "Snowflake", "AWS", "Power BI"],
        border: "rgba(59,130,246,0.25)",
        glowColor: "rgba(59,130,246,0.12)",
        accentGradient: "linear(to-r, blue.400, cyan.400)",
    },
];

export const Specialties: FC = () => {
    const mutedColor = useColorModeValue("gray.600", "whiteAlpha.700");
    const cardBg = useColorModeValue("rgba(255,255,255,0.55)", "rgba(10,10,22,0.55)");

    return (
        <Box pb="4">
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={{ base: 5, md: 6 }}
            >
                {specialties.map((s, i) => (
                    <MotionBox
                        key={s.title}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 } as any}
                        whileHover={{ y: -6 } as any}
                    >
                        <Box
                            p="6"
                            h="100%"
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor={s.border}
                            bg={cardBg}
                            backdropFilter="blur(16px)"
                            willChange="backdrop-filter"
                            _hover={{
                                boxShadow: `0 0 40px ${s.glowColor}, 0 8px 32px rgba(0,0,0,0.08)`,
                                borderColor: s.border.replace("0.25", "0.5"),
                            }}
                            transition="all 0.3s ease"
                        >
                            <Text fontSize="2xl" mb="3" lineHeight="1">
                                {s.icon}
                            </Text>
                            <Heading
                                fontSize="md"
                                fontWeight="700"
                                mb="3"
                                bgGradient={s.accentGradient}
                                bgClip="text"
                                letterSpacing="tight"
                            >
                                {s.title}
                            </Heading>
                            <Text fontSize="sm" color={mutedColor} lineHeight="1.8" mb="4">
                                {s.description}
                            </Text>
                            <Flex gap="2" flexWrap="wrap">
                                {s.tags.map((tag) => (
                                    <Box
                                        key={tag}
                                        px="2.5"
                                        py="0.5"
                                        borderRadius="full"
                                        bg="rgba(0,217,255,0.05)"
                                        border="1px solid"
                                        borderColor="rgba(0,217,255,0.15)"
                                        fontSize="xs"
                                        fontWeight="600"
                                        color="cyan.500"
                                    >
                                        {tag}
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                    </MotionBox>
                ))}
            </Grid>
        </Box>
    );
};

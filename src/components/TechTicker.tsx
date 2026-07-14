import { FC } from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const techs = [
    "Python", "PyTorch", "TensorFlow", "LangChain", "OpenAI API", "RAG",
    "FAISS", "Pinecone", "Scikit-learn", "XGBoost", "LightGBM", "Apache Spark",
    "PySpark", "Kafka", "Airflow", "Snowflake", "Docker", "Kubernetes",
    "MLflow", "AWS SageMaker", "Azure ML", "Databricks", "LangGraph",
    "CrewAI", "BERT", "Transformers", "FastAPI", "PostgreSQL", "MongoDB",
    "GitHub Actions", "SHAP", "LIME", "Hugging Face", "spaCy", "DVC",
];

const Pill: FC<{ label: string }> = ({ label }) => {
    const border = useColorModeValue("rgba(0,217,255,0.2)", "rgba(0,217,255,0.15)");
    const bg = useColorModeValue("rgba(0,217,255,0.05)", "rgba(0,217,255,0.04)");
    return (
        <Flex
            align="center"
            px="4"
            py="1.5"
            borderRadius="full"
            border="1px solid"
            borderColor={border}
            bg={bg}
            flexShrink={0}
        >
            <Text fontSize="sm" fontWeight="600" color="cyan.500" whiteSpace="nowrap">
                {label}
            </Text>
        </Flex>
    );
};

export const TechTicker: FC = () => {
    const borderColor = useColorModeValue("rgba(0,217,255,0.1)", "rgba(0,217,255,0.08)");

    return (
        <Box
            py="4"
            my="6"
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor={borderColor}
            overflow="hidden"
            position="relative"
        >
            {/* fade edges */}
            <Box
                position="absolute"
                left="0"
                top="0"
                bottom="0"
                w="80px"
                bgGradient="linear(to-r, var(--chakra-colors-white), transparent)"
                zIndex={1}
                pointerEvents="none"
                _dark={{ bgGradient: "linear(to-r, #05050F, transparent)" }}
            />
            <Box
                position="absolute"
                right="0"
                top="0"
                bottom="0"
                w="80px"
                bgGradient="linear(to-l, var(--chakra-colors-white), transparent)"
                zIndex={1}
                pointerEvents="none"
                _dark={{ bgGradient: "linear(to-l, #05050F, transparent)" }}
            />

            <Flex
                gap="3"
                sx={{
                    width: "max-content",
                    animation: "ticker 45s linear infinite",
                    "@keyframes ticker": {
                        "0%": { transform: "translateX(0)" },
                        "100%": { transform: "translateX(-50%)" },
                    },
                }}
            >
                {[...techs, ...techs].map((t, i) => (
                    <Pill key={`${t}-${i}`} label={t} />
                ))}
            </Flex>
        </Box>
    );
};

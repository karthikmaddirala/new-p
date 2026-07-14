import { FC } from "react";

import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { configs } from "shared/content/Content";
import { onResumeOpen } from "utils/Functions";

const MotionBox = motion(Box);

export const WannaSee: FC = () => {
    const cardBg = useColorModeValue("rgba(255,255,255,0.5)", "rgba(10,10,22,0.5)");
    const cardBorder = useColorModeValue("rgba(0,217,255,0.2)", "rgba(0,217,255,0.15)");
    const mutedColor = useColorModeValue("gray.500", "whiteAlpha.600");

    return (
        <MotionBox
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 } as any}
            mt="20"
            mb="4"
        >
            <Box
                borderRadius="3xl"
                border="1px solid"
                borderColor={cardBorder}
                bg={cardBg}
                backdropFilter="blur(20px)"
                willChange="backdrop-filter"
                overflow="hidden"
                position="relative"
                p={{ base: 10, md: 16 }}
                textAlign="center"
            >
                {/* Background glow blobs */}
                <Box
                    position="absolute"
                    top="-60px"
                    left="10%"
                    w="300px"
                    h="300px"
                    borderRadius="full"
                    bgGradient="radial(rgba(0,217,255,0.12), transparent)"
                    pointerEvents="none"
                    filter="blur(40px)"
                />
                <Box
                    position="absolute"
                    bottom="-60px"
                    right="10%"
                    w="300px"
                    h="300px"
                    borderRadius="full"
                    bgGradient="radial(rgba(124,58,237,0.12), transparent)"
                    pointerEvents="none"
                    filter="blur(40px)"
                />

                <Box position="relative" zIndex={1}>
                    {/* Emoji wave */}
                    <Text
                        fontSize="4xl"
                        mb="4"
                        sx={{ animation: "wave 2s ease-in-out infinite", display: "inline-block",
                            "@keyframes wave": {
                                "0%, 100%": { transform: "rotate(0deg)" },
                                "25%": { transform: "rotate(20deg)" },
                                "75%": { transform: "rotate(-10deg)" },
                            }
                        }}
                    >
                        👋
                    </Text>

                    <Text
                        fontSize={{ base: "3xl", md: "5xl" }}
                        fontWeight="900"
                        letterSpacing="tight"
                        lineHeight="1.1"
                        mb="4"
                    >
                        Wanna see me{" "}
                        <Box as="span" bgGradient="linear(to-r, cyan.400, purple.400)" bgClip="text">
                            in action?
                        </Box>
                    </Text>

                    <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color={mutedColor}
                        maxW="480px"
                        mx="auto"
                        lineHeight="1.8"
                        mb="8"
                    >
                        I'm currently open to AI/ML engineering roles. Let's talk about what we can build together.
                    </Text>

                    <Flex justify="center" gap="4" flexWrap="wrap">
                        <Box
                            as="button"
                            onClick={onResumeOpen}
                            px="8"
                            py="3.5"
                            borderRadius="full"
                            fontSize="md"
                            fontWeight="800"
                            letterSpacing="wide"
                            color="white"
                            style={{ background: "linear-gradient(to right, #00B4D8, #7C3AED)" }}
                            transition="all 0.25s"
                            _hover={{
                                transform: "translateY(-2px)",
                                boxShadow: "0 0 30px rgba(0,217,255,0.5)",
                            }}
                        >
                            View My Resume
                        </Box>
                        <Box
                            as="a"
                            href={`mailto:${configs.common.email}`}
                            px="8"
                            py="3.5"
                            borderRadius="full"
                            fontSize="md"
                            fontWeight="700"
                            letterSpacing="wide"
                            border="2px solid"
                            borderColor="cyan.500"
                            color="cyan.400"
                            transition="all 0.25s"
                            _hover={{
                                bg: "rgba(0,217,255,0.08)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 0 20px rgba(0,217,255,0.25)",
                            }}
                        >
                            Say Hello 👋
                        </Box>
                        <Box
                            as="a"
                            href={configs.common.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            px="8"
                            py="3.5"
                            borderRadius="full"
                            fontSize="md"
                            fontWeight="700"
                            letterSpacing="wide"
                            border="1px solid"
                            borderColor={cardBorder}
                            color={mutedColor}
                            transition="all 0.25s"
                            _hover={{
                                borderColor: "cyan.400",
                                color: "cyan.400",
                                transform: "translateY(-2px)",
                            }}
                        >
                            LinkedIn
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </MotionBox>
    );
};

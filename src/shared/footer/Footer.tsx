import { FC } from "react";

import { Box, Button, Container, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { configs } from "shared/content/Content";
import { onMailTo } from "utils/Functions";
import { Socials } from "shared/socials/Socials";

const MotionBox = motion(Box);

export const Footer: FC = () => {
    const cardBorder = useColorModeValue("rgba(0,217,255,0.15)", "rgba(0,217,255,0.12)");
    const mutedColor = useColorModeValue("gray.500", "whiteAlpha.600");

    return (
        <Box
            id="page-contact"
            mt="24"
            pt="1"
            borderTop="1px solid"
            borderColor={cardBorder}
            position="relative"
        >
            {/* Glow line at top */}
            <Box
                h="1px"
                bgGradient="linear(to-r, transparent, cyan.400, purple.600, transparent)"
                position="absolute"
                top="0"
                left="0"
                right="0"
            />

            <Container maxW="7xl" px={{ base: 4, md: 6 }} py="20">
                <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 } as any}
                    textAlign="center"
                >
                    <Text
                        fontSize="xs"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        bgGradient="linear(to-r, cyan.400, purple.400)"
                        bgClip="text"
                        mb="4"
                    >
                        Get In Touch
                    </Text>

                    <Heading
                        fontSize={{ base: "3xl", md: "5xl" }}
                        fontWeight="800"
                        letterSpacing="tight"
                        lineHeight="1.1"
                        mb="4"
                    >
                        Let's Build Something
                        <Box as="span" bgGradient="linear(to-r, cyan.400, purple.400)" bgClip="text"> Great</Box>
                    </Heading>

                    <Text fontSize={{ base: "md", md: "lg" }} color={mutedColor} maxW="480px" mx="auto" mb="8" lineHeight="1.7">
                        Open to AI/ML engineering roles, research collaborations, and interesting problems worth solving.
                    </Text>

                    <Flex justify="center" gap="4" flexWrap="wrap" mb="10">
                        <Button
                            size="lg"
                            borderRadius="full"
                            px="8"
                            bgGradient="linear(to-r, cyan.500, purple.600)"
                            color="white"
                            fontWeight="700"
                            onClick={onMailTo}
                            _hover={{
                                bgGradient: "linear(to-r, cyan.400, purple.500)",
                                boxShadow: "0 0 30px rgba(0,217,255,0.5)",
                                transform: "translateY(-2px)",
                            }}
                            transition="all 0.25s"
                        >
                            Say Hello
                        </Button>
                        <Button
                            size="lg"
                            borderRadius="full"
                            px="8"
                            variant="outline"
                            borderColor="cyan.500"
                            color="cyan.400"
                            fontWeight="600"
                            as="a"
                            href={`mailto:${configs.common.email}`}
                            _hover={{
                                bg: "rgba(0,217,255,0.08)",
                                boxShadow: "0 0 20px rgba(0,217,255,0.25)",
                                transform: "translateY(-2px)",
                            }}
                            transition="all 0.25s"
                        >
                            {configs.common.email}
                        </Button>
                    </Flex>

                    <Socials delay={100} />

                    <Text mt="12" fontSize="xs" color={mutedColor}>
                        © {new Date().getFullYear()} Sai Karthik Maddirala — Built with React & Chakra UI
                    </Text>
                </MotionBox>
            </Container>
        </Box>
    );
};

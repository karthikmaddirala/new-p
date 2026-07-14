import { FC } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface Props {
    id?: string;
    label: string;
}

export const PageHeader: FC<Props> = ({ id, label }) => {

    return (
        <MotionBox
            id={id}
            pt={{ base: "8", md: "12" }}
            pb="6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 } as any}
        >
            <Flex align="center" gap="4">
                <Box w="48px" h="2px" borderRadius="full" bgGradient="linear(to-r, cyan.400, purple.500)" />
                <Text
                    fontSize="xs"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    bgGradient="linear(to-r, cyan.400, purple.400)"
                    bgClip="text"
                >
                    {label}
                </Text>
            </Flex>
        </MotionBox>
    );
};

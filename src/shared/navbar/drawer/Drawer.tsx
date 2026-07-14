import { FC, useRef } from "react";

import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    IconButton,
    StyleProps,
    Flex,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";

import { ColorModeButton } from "shared/color-mode-button/ColorModeButton";
import { AboutPageId, ContactPageId, ExperiencePageId, WorkPageId } from "utils/useScroll";
import { MenuIcon } from "utils/Icons";
import { Socials } from "shared/socials/Socials";
import { onResumeOpen } from "utils/Functions";

interface Props extends StyleProps {
    onSectionClick: (section: string) => void;
    currentPage: string;
}

export const MenuDrawer: FC<Props> = ({ onSectionClick, currentPage, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<any>(null);
    const navItemColor = useColorModeValue("gray.800", "white");

    return (
        <Box {...props}>
            <Button
                as={IconButton}
                variant="icon"
                ref={btnRef}
                onClick={onOpen}
                aria-label="open drawer"
                fontSize="lg"
                color="primary.500"
                icon={<MenuIcon />}
                px="0"
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} autoFocus={false}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader px="4">
                        <Flex justifyContent="space-between">
                            <ColorModeButton />
                            <DrawerCloseButton position="relative" top="0" right="0" />
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack spacing="5" my="12" align="stretch">
                            {[
                                { label: "Projects", id: WorkPageId },
                                { label: "Experience", id: ExperiencePageId },
                                { label: "About", id: AboutPageId },
                                { label: "Contact", id: ContactPageId },
                            ].map(({ label, id }, i) => (
                                <Button
                                    key={id}
                                    variant="ghost"
                                    justifyContent="flex-start"
                                    color={currentPage === id ? "cyan.400" : navItemColor}
                                    fontWeight={currentPage === id ? "700" : "600"}
                                    fontSize="xl"
                                    borderRadius="xl"
                                    px="4"
                                    _hover={{ bg: "rgba(0,217,255,0.08)", color: "cyan.400" }}
                                    onClick={() => {
                                        onClose();
                                        setTimeout(() => onSectionClick(id), 250);
                                    }}
                                >
                                    {label}
                                </Button>
                            ))}
                            <Button
                                mt="2"
                                borderRadius="full"
                                bgGradient="linear(to-r, cyan.500, purple.600)"
                                color="white"
                                fontWeight="600"
                                fontSize="md"
                                onClick={onResumeOpen}
                                _hover={{ bgGradient: "linear(to-r, cyan.400, purple.500)" }}
                            >
                                Resume
                            </Button>
                        </VStack>
                        <Flex justifyContent="center" mt="8">
                            <Socials delay={100} resume={false} />
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

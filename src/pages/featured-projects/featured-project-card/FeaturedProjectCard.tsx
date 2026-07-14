import { FC, useState } from "react";

import {
    Box,
    Flex,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Wrap,
    WrapItem,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiFileText, FiMaximize2, FiExternalLink } from "react-icons/fi";

const MotionBox = motion(Box);

export interface ProjectCardProps {
    id: string;
    title: string;
    year: string;
    github?: string;
    report?: string;
    tags: string[];
    description: string;
    description2?: string;
    image: string;
    jpg: string;
    videoUrl?: string;
    demo?: string;
}

const TagPill: FC<{ tag: string; large?: boolean }> = ({ tag, large }) => (
    <WrapItem>
        <Box
            px={large ? "3" : "2.5"}
            py={large ? "1" : "0.5"}
            borderRadius="full"
            bg="rgba(0,217,255,0.08)"
            border="1px solid rgba(0,217,255,0.2)"
            fontSize={large ? "xs" : "10px"}
            fontWeight="700"
            color="cyan.400"
            letterSpacing="wide"
            whiteSpace="nowrap"
        >
            {tag}
        </Box>
    </WrapItem>
);

const ActionLink: FC<{ href: string; icon: any; label: string; primary?: boolean }> = ({
    href, icon: Icon, label, primary,
}) => (
    <Box
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        display="flex"
        alignItems="center"
        gap="2"
        px="5"
        py="2"
        borderRadius="full"
        fontSize="sm"
        fontWeight="700"
        transition="all 0.2s"
        style={
            primary
                ? { background: "linear-gradient(to right, #00B4D8, #7C3AED)", color: "white" }
                : { border: "1px solid rgba(0,217,255,0.4)", color: "#00D9FF", background: "transparent" }
        }
        _hover={primary ? { opacity: 0.9 } : { background: "rgba(0,217,255,0.1)" }}
    >
        <Box as={Icon} boxSize="15px" />
        {label}
    </Box>
);

/* ─── Thumbnail: an SVG (e.g. the animated diagram) renders directly so it keeps animating;
      raster images fall back through <picture> for webp/jpeg. ─── */
const Thumb: FC<{ image: string; jpg: string; title: string; style?: any }> = ({ image, jpg, title, style }) => {
    const src = jpg || image;
    if (src.split("?")[0].endsWith(".svg")) {
        return <Image src={src} alt={title} w="100%" h="100%" objectFit="cover" objectPosition="top" style={style} loading="lazy" decoding="async" />;
    }
    return (
        <picture>
            <source srcSet={image} type="image/webp" />
            <source srcSet={jpg} type="image/jpeg" />
            <Image src={jpg || image} alt={title} w="100%" h="100%" objectFit="cover" style={style}
                fallbackSrc="https://via.placeholder.com/600x400?text=Project" loading="lazy" decoding="async" />
        </picture>
    );
};

/* ─── Full-screen project modal ─────────────────── */
const ProjectModal: FC<ProjectCardProps & { isOpen: boolean; onClose: () => void }> = ({
    title, github, report, tags, description, description2, image, jpg, videoUrl, demo,
    isOpen, onClose,
}) => {
    const mutedColor = useColorModeValue("gray.600", "whiteAlpha.700");
    const bodyBg = useColorModeValue("white", "#0A0A16");
    const borderColor = useColorModeValue("rgba(0,217,255,0.15)", "rgba(0,217,255,0.12)");
    const preview = useDisclosure();

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside" isCentered>
            <ModalOverlay backdropFilter="blur(16px)" bg="rgba(0,0,0,0.7)" willChange="backdrop-filter" />
            <ModalContent
                bg={bodyBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="2xl"
                overflow="hidden"
                mx="4"
            >
                {/* Hero image */}
                <Box position="relative" h={{ base: "220px", md: "300px" }} overflow="hidden">
                    <Thumb image={image} jpg={jpg} title={title} />
                    <Box
                        position="absolute"
                        inset="0"
                        bgGradient="linear(to-t, rgba(0,0,0,0.7) 0%, transparent 50%)"
                    />
                    <Box position="absolute" bottom="5" left="6">
                        <Text
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="900"
                            color="white"
                            letterSpacing="tight"
                            lineHeight="1.2"
                        >
                            {title}
                        </Text>
                    </Box>
                    <ModalCloseButton
                        top="3"
                        right="3"
                        bg="rgba(0,0,0,0.5)"
                        color="white"
                        borderRadius="full"
                        _hover={{ bg: "rgba(0,217,255,0.3)" }}
                    />
                </Box>

                <ModalBody px={{ base: 5, md: 8 }} py="6">
                    {/* Tags */}
                    <Wrap spacing="2" mb="6">
                        {tags.map((t) => <TagPill key={t} tag={t} large />)}
                    </Wrap>

                    {/* Prominent live preview (opens the embedded showcase in a popup) */}
                    {demo && (
                        <Box
                            as="button"
                            onClick={preview.onOpen}
                            display="inline-flex"
                            alignItems="center"
                            gap="2"
                            mb="6"
                            px="6"
                            py="3"
                            borderRadius="full"
                            fontSize="md"
                            fontWeight="800"
                            transition="all 0.2s"
                            style={{ background: "linear-gradient(to right, #00B4D8, #7C3AED)", color: "white", border: "none", cursor: "pointer" }}
                            _hover={{ opacity: 0.92, transform: "translateY(-1px)" }}
                        >
                            <Box as={FiExternalLink} boxSize="18px" />
                            Open Live Preview
                        </Box>
                    )}

                    {/* Description */}
                    <Text fontSize="md" color={mutedColor} lineHeight="1.85" mb={description2 ? "4" : "6"}>
                        {description}
                    </Text>
                    {description2 && (
                        <Text fontSize="md" color={mutedColor} lineHeight="1.85" mb="6">
                            {description2}
                        </Text>
                    )}

                    {/* Video embed placeholder */}
                    {videoUrl && (
                        <Box borderRadius="xl" overflow="hidden" mb="6" border="1px solid" borderColor={borderColor}>
                            <Box
                                as="iframe"
                                src={videoUrl}
                                title={title}
                                w="100%"
                                h="300px"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </Box>
                    )}

                    {/* Actions */}
                    <HStack spacing="3" flexWrap="wrap">
                        {demo && (
                            <Box
                                as="button"
                                onClick={preview.onOpen}
                                display="flex"
                                alignItems="center"
                                gap="2"
                                px="5"
                                py="2"
                                borderRadius="full"
                                fontSize="sm"
                                fontWeight="700"
                                transition="all 0.2s"
                                style={{ background: "linear-gradient(to right, #00B4D8, #7C3AED)", color: "white", border: "none", cursor: "pointer" }}
                                _hover={{ opacity: 0.9 }}
                            >
                                <Box as={FiExternalLink} boxSize="15px" />
                                Live Preview
                            </Box>
                        )}
                        {github && <ActionLink href={github} icon={FiGithub} label="View on GitHub" />}
                        {report && <ActionLink href={report} icon={FiFileText} label="Read Report" primary />}
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>

        {demo && (
            <Modal isOpen={preview.isOpen} onClose={preview.onClose} size="full" isCentered>
                <ModalOverlay bg="rgba(0,0,0,0.85)" backdropFilter="blur(6px)" willChange="backdrop-filter" />
                <ModalContent bg="#0A0A16" m="0" borderRadius="0" overflow="hidden">
                    <ModalCloseButton
                        zIndex={20}
                        size="lg"
                        top="4"
                        right="4"
                        bg="rgba(0,0,0,0.6)"
                        color="white"
                        borderRadius="full"
                        _hover={{ bg: "rgba(0,217,255,0.3)" }}
                    />
                    <Box as="iframe" src={demo} title={`${title} — live preview`} w="100%" h="100vh" style={{ border: 0 }} />
                </ModalContent>
            </Modal>
        )}
        </>
    );
};

/* ─── Card ──────────────────────────────────────── */
export const FeaturedProjectCard: FC<ProjectCardProps> = (props) => {
    const { title, tags, description, image, jpg } = props;
    const [hovered, setHovered] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const preview = useDisclosure();   // demo projects open the live showcase directly

    const cardBg = useColorModeValue("rgba(255,255,255,0.65)", "rgba(10,10,22,0.7)");
    const cardBorder = useColorModeValue("rgba(0,217,255,0.18)", "rgba(0,217,255,0.15)");
    const mutedColor = useColorModeValue("gray.600", "whiteAlpha.700");
    const overlayBg = useColorModeValue("rgba(255,255,255,0.9)", "rgba(10,10,22,0.9)");

    return (
        <>
            <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 } as any}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={props.demo ? preview.onOpen : onOpen}
                cursor="pointer"
            >
                <Box
                    bg={cardBg}
                    border="1px solid"
                    borderColor={hovered ? "cyan.500" : cardBorder}
                    borderRadius="2xl"
                    backdropFilter="blur(20px)"
                    willChange="backdrop-filter"
                    overflow="hidden"
                    boxShadow={hovered
                        ? "0 0 40px rgba(0,217,255,0.15), 0 16px 48px rgba(0,0,0,0.15)"
                        : "0 2px 16px rgba(0,0,0,0.06)"}
                    transition="border-color 0.3s, box-shadow 0.3s"
                    position="relative"
                >
                    {/* Image */}
                    <Box
                        overflow="hidden"
                        position="relative"
                        style={{
                            height: hovered ? "180px" : "220px",
                            transition: "height 0.4s cubic-bezier(0.4,0,0.2,1)",
                        }}
                    >
                        <Thumb
                            image={image}
                            jpg={jpg}
                            title={title}
                            style={{
                                transform: hovered ? "scale(1.06)" : "scale(1)",
                                transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                            }}
                        />
                        <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            right="0"
                            h="80px"
                            bgGradient={useColorModeValue(
                                "linear(to-t, rgba(255,255,255,0.9), transparent)",
                                "linear(to-t, rgba(10,10,22,0.9), transparent)"
                            )}
                        />
                        {/* "Click to expand" hint */}
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        left: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "6px 12px",
                                        borderRadius: "999px",
                                        background: "rgba(0,217,255,0.15)",
                                        border: "1px solid rgba(0,217,255,0.3)",
                                        backdropFilter: "blur(8px)",
                                        willChange: "backdrop-filter",
                                        color: "#00D9FF",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                    }}
                                >
                                    <FiMaximize2 size={12} />
                                    Click to expand
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>

                    {/* Card body */}
                    <Box px="5" pt="3" pb="4">
                        <Text
                            fontSize="md"
                            fontWeight="800"
                            letterSpacing="tight"
                            lineHeight="1.3"
                            mb="2"
                            bgGradient={hovered ? "linear(to-r, cyan.400, purple.400)" : undefined}
                            bgClip={hovered ? "text" : undefined}
                            transition="all 0.3s"
                        >
                            {title}
                        </Text>

                        <Wrap spacing="1.5" mb="3">
                            {tags.slice(0, 5).map((tag) => (
                                <TagPill key={tag} tag={tag} />
                            ))}
                            {tags.length > 5 && (
                                <WrapItem>
                                    <Text fontSize="10px" fontWeight="600" color={mutedColor} px="1">
                                        +{tags.length - 5} more
                                    </Text>
                                </WrapItem>
                            )}
                        </Wrap>

                        {/* Expand on hover */}
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <Text
                                        fontSize="sm"
                                        color={mutedColor}
                                        lineHeight="1.75"
                                        mb="3"
                                        noOfLines={3}
                                    >
                                        {description}
                                    </Text>
                                    <Text
                                        fontSize="xs"
                                        color="cyan.400"
                                        fontWeight="700"
                                        letterSpacing="wide"
                                    >
                                        {props.demo ? "Click to open the live preview →" : "Click for full details →"}
                                    </Text>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>
                </Box>
            </MotionBox>

            <ProjectModal {...props} isOpen={isOpen} onClose={onClose} />

            {props.demo && (
                <Modal isOpen={preview.isOpen} onClose={preview.onClose} size="6xl" isCentered>
                    <ModalOverlay bg="rgba(0,0,0,0.8)" backdropFilter="blur(8px)" willChange="backdrop-filter" />
                    <ModalContent bg="#0A0A16" borderRadius="2xl" overflow="hidden" mx="4" my="6" border="1px solid rgba(0,217,255,0.25)" boxShadow="0 30px 90px rgba(0,0,0,0.7)">
                        <ModalCloseButton zIndex={20} size="lg" top="3" right="3" bg="rgba(0,0,0,0.6)" color="white" borderRadius="full" _hover={{ bg: "rgba(0,217,255,0.3)" }} />
                        <Box as="iframe" src={props.demo} title={`${title} — live preview`} w="100%" h="82vh" style={{ border: 0, display: "block" }} />
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

export enum ImagePosition { Right, Left }

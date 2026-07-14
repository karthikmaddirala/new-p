import { useEffect, useState, useRef } from "react";
import { Flex, Button, IconButton, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "utils/Icons";

const ScrollArrow = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [shake, setShake] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Hide arrow near bottom of page
      if (scrollPosition + 50 >= pageHeight) {
        setShowArrow(false);
        return;
      }

      // Hide arrow when scrolling manually
      setShowArrow(false);

      if (hideTimeout.current) clearTimeout(hideTimeout.current);

      hideTimeout.current = setTimeout(() => {
        setShowArrow(true);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  // 👉 Add periodic shake every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (showArrow) {
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [showArrow]);

  const scrollIntoView = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  if (!showArrow) return null;

  return (
    <Flex
      direction="column"
      align="center"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="100"
      pointerEvents="none"
    >
      <Flex direction="column" align="center" pointerEvents="auto">
        <Text fontSize="11px" fontWeight="700" letterSpacing="0.22em" textTransform="uppercase" color="cyan.300" opacity={0.85} mb="-2px">
          Scroll
        </Text>
        <Button
          as={IconButton}
          icon={<ChevronDownIcon />}
          fontSize="3xl"
          aria-label="Scroll down"
          variant="ghost"
          onClick={scrollIntoView}
          className={shake ? "shake-down" : ""}
          _hover={{ background: "transparent" }}
          _focus={{ background: "transparent", boxShadow: "none" }}
          _active={{ background: "transparent" }}
        />
      </Flex>
    </Flex>
  );
};

export default ScrollArrow;

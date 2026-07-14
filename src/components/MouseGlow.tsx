import { FC, useEffect, useRef } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

export const MouseGlow: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isDark = useColorModeValue(false, true);

    useEffect(() => {
        let raf = 0, lx = 0, ly = 0;
        const move = (e: MouseEvent) => {
            lx = e.clientX - 300; ly = e.clientY - 300;
            if (raf) return;               // throttle to one update per frame
            raf = requestAnimationFrame(() => {
                raf = 0;
                if (ref.current) ref.current.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
            });
        };
        window.addEventListener("mousemove", move);
        return () => { window.removeEventListener("mousemove", move); if (raf) cancelAnimationFrame(raf); };
    }, []);

    if (!isDark) return null;

    return (
        <Box
            ref={ref}
            position="fixed"
            left="0"
            top="0"
            w="600px"
            h="600px"
            borderRadius="full"
            pointerEvents="none"
            zIndex={0}
            style={{
                background:
                    "radial-gradient(circle, rgba(0,217,255,0.055) 0%, rgba(124,58,237,0.025) 40%, transparent 70%)",
                transition: "transform 0.12s ease-out",
                willChange: "transform",
            }}
        />
    );
};

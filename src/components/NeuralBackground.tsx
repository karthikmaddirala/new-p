import { FC, useEffect, useRef } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
}

export const NeuralBackground: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDark = useColorModeValue(false, true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const count = 40;
        const maxDist = 125;
        const nodes: Node[] = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            r: Math.random() * 1.8 + 0.8,
        }));

        let raf = 0;
        // Only burn CPU on this animation while the canvas is actually visible —
        // it lives at the top of a one-page site, so once the user scrolls past
        // it (or switches tabs) there's no visual reason to keep animating.
        let isVisible = true;
        let isPageVisible = document.visibilityState === "visible";

        const nodeColor = isDark ? "0,217,255" : "0,180,216";

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodes.forEach((n) => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < maxDist) {
                        const alpha = (1 - d / maxDist) * (isDark ? 0.18 : 0.1);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${nodeColor},${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach((n) => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${nodeColor},${isDark ? 0.5 : 0.35})`;
                ctx.fill();
            });

            raf = requestAnimationFrame(animate);
        };

        const start = () => {
            if (raf) return;
            raf = requestAnimationFrame(animate);
        };
        const stop = () => {
            if (!raf) return;
            cancelAnimationFrame(raf);
            raf = 0;
        };
        const sync = () => {
            if (isVisible && isPageVisible) start();
            else stop();
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                sync();
            },
            { threshold: 0 }
        );
        io.observe(canvas);

        const onVisibilityChange = () => {
            isPageVisible = document.visibilityState === "visible";
            sync();
        };
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            stop();
            io.disconnect();
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("resize", resize);
        };
    }, [isDark]);

    return (
        <Box
            as="canvas"
            ref={canvasRef as any}
            position="absolute"
            inset="0"
            w="100%"
            h="100%"
            pointerEvents="none"
            zIndex={0}
        />
    );
};

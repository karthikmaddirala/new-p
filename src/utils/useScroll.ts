import { useEffect, useState } from "react";

export const WorkPageId = "page-work";
export const ExperiencePageId = "page-experience";
export const AboutPageId = "page-about";
export const ContactPageId = "page-contact";

export enum Page {
    Work = "work",
    Experience = "experience",
    About = "about",
    Contact = "contact",
}

const pageIds = [WorkPageId, ExperiencePageId, AboutPageId, ContactPageId];

export const useScroll = () => {
    const [page, setPage] = useState<string>("");

    const scrollHandler = () => {
        const documentTop = document.scrollingElement?.scrollTop!;
        const pages = pageIds.map((page) => document.getElementById(page));
        let newPage = "";

        pages.forEach((page) => {
            if (page) {
                const top = page.offsetTop;
                const height = page.clientHeight;

                if (top < documentTop && top + height > documentTop) {
                    newPage = page.id;
                }
            }
        });

        setPage(newPage);
    };

    useEffect(() => {
        setTimeout(() => {
            scrollHandler();
        }, 100);

        document.addEventListener("scroll", scrollHandler);

        return () => {
            document.removeEventListener("scroll", () => {});
        };
    }, []);

    return page;
};

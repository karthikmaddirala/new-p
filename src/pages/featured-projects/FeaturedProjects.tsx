import { FC } from "react";
import { Grid } from "@chakra-ui/react";

import { FeaturedProjectCard } from "pages/featured-projects/featured-project-card/FeaturedProjectCard";
import { configs } from "shared/content/Content";

export const FeaturedProjects: FC = () => {
    return (
        <Grid
            id="featured-projects"
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={{ base: 6, md: 8 }}
            mt="4"
        >
            {configs.featuredProjects.map((project) => (
                <FeaturedProjectCard
                    key={project.id}
                    {...project}
                    videoUrl={(project as any).videoUrl}
                />
            ))}
        </Grid>
    );
};

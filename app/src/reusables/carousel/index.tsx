import type { ReactNode } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { useCarousel, type Slide } from '@/reusables/carousel/use-carousel';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface CarouselProps {
  slides: Slide[];
  /** Time in ms between automatic slides (default 5000). */
  interval?: number;
  /** Optional custom styles for the root container. */
  sx?: SxProps<Theme>;
  /** Optional custom styles for the individual images. */
  imageSx?: SxProps<Theme>;
  /** Render custom UI (e.g. dots, arrows) using the current state. */
  children?: (currentIndex: number, setCurrentIndex: (index: number) => void) => ReactNode;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

const DEFAULT_INTERVAL_MS = 5000;

/* =====================================================================
 * Static styles
 * ===================================================================== */

const ROOT_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};

/** Shared style for every slide layer; active state is applied per-render. */
const slideSx = (isActive: boolean): SxProps<Theme> => ({
  position: 'absolute',
  inset: 0,
  opacity: isActive ? 1 : 0,
  transition: 'opacity 1.4s ease',
  zIndex: isActive ? 1 : 0,
});

const IMAGE_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center center',
  transform: 'scale(1.3)',
};

/* =====================================================================
 * Carousel
 * ===================================================================== */

export const Carousel = ({
  slides,
  interval = DEFAULT_INTERVAL_MS,
  sx,
  imageSx,
  children,
}: CarouselProps) => {
  const { current, setCurrent } = useCarousel(slides.length, interval);

  return (
    <Box sx={[ROOT_SX, ...(Array.isArray(sx) ? sx : [sx])]}>
      {slides.map((slide, index) => {
        const isActive = index === current;

        return (
          <Box key={slide.id} sx={slideSx(isActive)}>
            <Box
              component="img"
              src={slide.image}
              alt={slide.alt}
              sx={[IMAGE_SX, ...(Array.isArray(imageSx) ? imageSx : [imageSx])]}
            />
          </Box>
        );
      })}

      {children?.(current, setCurrent)}
    </Box>
  );
};

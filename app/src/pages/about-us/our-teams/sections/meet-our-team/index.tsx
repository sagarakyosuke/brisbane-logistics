import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Chat, ArrowForward } from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette, shadows } from '@/utilities/themes';
import {
  meetOurTeamData,
  type TeamMember,
} from '@/utilities/_mock/about-us/our-team/meet-our-team';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const HEADER_WRAP_SX: SxProps<Theme> = {
  mb: 6,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 1.5,
};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
  },
  gap: 3,
};

/* ── Team Card Styles ─────────────────────────────────────────────── */

const CARD_SX: SxProps<Theme> = {
  bgcolor: palette.white,
  borderRadius: '16px',
  border: `1px solid ${palette.line}`,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.base,
  },
};

const cardAvatarSx = (color: 'navy' | 'orange'): SxProps<Theme> => ({
  position: 'relative',
  height: 240,
  bgcolor: color === 'navy' ? palette.navy : palette.orange,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // Diagonal stripes pattern to match screenshot
  backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)`,
});

const INITIALS_SX = (color: 'navy' | 'orange'): SxProps<Theme> => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  color: color === 'navy' ? palette.white : palette.navy,
  letterSpacing: '0.02em',
  zIndex: 1,
});

const PHOTO_BADGE_SX: SxProps<Theme> = {
  position: 'absolute',
  bottom: 16,
  left: 16,
  bgcolor: palette.peach,
  color: palette.navy,
  border: `1px dashed ${palette.orange2}`,
  px: 1.5,
  py: 0.5,
  borderRadius: '999px',
  fontSize: '0.65rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  zIndex: 2,
};

const PROFILE_IMG_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const INFO_WRAP_SX: SxProps<Theme> = {
  p: 2.5,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const NAME_SX: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 700,
  color: palette.navy,
  mb: 0.5,
};

const ROLE_SX: SxProps<Theme> = {
  fontSize: '0.85rem',
  color: palette.muted,
};

/* ── Contact Card Styles ──────────────────────────────────────────── */

const CONTACT_CARD_SX: SxProps<Theme> = {
  bgcolor: 'transparent',
  borderRadius: '16px',
  border: `1px dashed ${palette.line}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: 4,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  minHeight: 340, // Match the height of the team cards
  '&:hover': {
    bgcolor: palette.mist,
    borderColor: palette.orange,
    '& .arrow-icon': {
      transform: 'translateX(6px)',
      color: palette.orange,
    },
  },
};

const CONTACT_ICON_BOX_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  mb: 3,
};

const CONTACT_TITLE_SX: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 700,
  color: palette.navy,
  mb: 1,
};

const CONTACT_DESC_SX: SxProps<Theme> = {
  fontSize: '0.9rem',
  color: palette.muted,
  mb: 4,
};

const CONTACT_ARROW_SX: SxProps<Theme> = {
  fontSize: 32,
  color: palette.navy,
  transition: 'all 0.3s ease',
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const MeetOurTeamSection = () => {
  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={HEADER_WRAP_SX}>
          <SectionEyebrow>{meetOurTeamData.eyebrow}</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            {meetOurTeamData.title}
          </Typography>
        </Box>

        <Box sx={GRID_SX}>
          {meetOurTeamData.members.map((member: TeamMember) => (
            <Box key={member.id} sx={CARD_SX}>
              <Box sx={cardAvatarSx(member.color)}>
                {member.image ? (
                  <Box component="img" src={member.image} alt={member.name} sx={PROFILE_IMG_SX} />
                ) : (
                  <>
                    <Typography sx={INITIALS_SX(member.color)}>{member.initials}</Typography>
                    <Box sx={PHOTO_BADGE_SX}>Photo to be supplied</Box>
                  </>
                )}
              </Box>
              <Box sx={INFO_WRAP_SX}>
                <Typography sx={NAME_SX}>{member.name}</Typography>
                <Typography sx={ROLE_SX}>{member.role}</Typography>
              </Box>
            </Box>
          ))}

          {/* Contact Card */}
          <Box sx={CONTACT_CARD_SX}>
            <Box sx={CONTACT_ICON_BOX_SX}>
              <Chat fontSize="medium" />
            </Box>
            <Typography sx={CONTACT_TITLE_SX}>Want to talk to the team?</Typography>
            <Typography sx={CONTACT_DESC_SX}>Book a call</Typography>
            <ArrowForward className="arrow-icon" sx={CONTACT_ARROW_SX} />
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};

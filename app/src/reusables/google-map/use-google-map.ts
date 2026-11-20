const GOOGLE_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d918.6548070876212!2d153.1076375877993!3d-27.464319866784862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915f19ddd85889%3a0xfa7c3beb31da6a36!2sbrisbane%20logistics!5e1!3m2!1sen!2sph!4v1795138216885!5m2!1sen!2sph';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Brisbane+Logistics';

export const useGoogleMap = () => {
  return {
    embedUrl: GOOGLE_MAP_EMBED_URL,
    mapsUrl: GOOGLE_MAPS_URL,
    title: 'Brisbane Logistics Location',
  };
};

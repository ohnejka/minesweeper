const sizes = {
  MOBILE_TINY_WIDTH: '320px',
  TABLET_WIDTH: '768px',
  DESKTOP_WIDTH: '1024px',
  DESKTOP_LARGE_WIDTH: '1440px',
  DESKTOP_HD_WIDTH: '1920px',
  DESKTOP_ULTRA_WIDTH: '2560px',
};

export const device = {
  mobileTiny: `(max-width: ${sizes.MOBILE_TINY_WIDTH})`,
  mobile: `(max-width: ${sizes.TABLET_WIDTH} - 1px)`,
  mobile_tablet: `(max-width: ${sizes.DESKTOP_WIDTH} - 1px)`,
  //
  desktop: `(min-width: ${sizes.DESKTOP_WIDTH})`,
  desktopLarge: `(min-width: ${sizes.DESKTOP_LARGE_WIDTH})`,
  desktopHD: `(min-width: ${sizes.DESKTOP_HD_WIDTH})`,
  desktopUltra: `(min-width: ${sizes.DESKTOP_ULTRA_WIDTH})`,
  //
  tabletOnly: `(min-width: ${sizes.TABLET_WIDTH}) and (max-width: ${sizes.DESKTOP_WIDTH} - 1px})`,
};

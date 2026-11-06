import React from 'react';

// Exact SVG Icons extracted from Plus UI 3.0.0 (theme-1915278968279215939.xml)

export const MenuHamburgerIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 17 7 12 2 7" />
    <line x1="8" x2="22" y1="5" y2="5" />
    <line x1="12" x2="22" y1="12" y2="12" />
    <line x1="8" x2="22" y1="19" y2="19" />
  </svg>
);

export const SearchNormalIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <g>
      <circle cx="11.36167" cy="11.36167" r="9.36167" />
      <line x1="22" x2="19.9332" y1="22" y2="19.9332" />
    </g>
  </svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18V15" />
    <path d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z" />
  </svg>
);

export const Folder2Icon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2H17C19 2 20 3 20 5V6.38" strokeMiterlimit="10" />
    <path d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z" strokeMiterlimit="10" />
  </svg>
);

export const FolderFavoriteIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.19997 14.78L11.78 17.04C11.9 17.15 12.09 17.15 12.21 17.04L14.79 14.78C15.46 14.19 15.55 13.19 14.99 12.49C14.43 11.79 13.41 11.66 12.7 12.2L12 12.74L11.29 12.21C10.57 11.67 9.55997 11.8 8.99997 12.5C8.43997 13.19 8.52997 14.2 9.19997 14.78Z" />
    <path d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z" strokeMiterlimit="10" />
  </svg>
);

export const FolderCodeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z" strokeMiterlimit="10" />
    <path className="text-[#60cdff]" d="M9.5 12L7.5 14.5L9.5 17" />
    <path className="text-[#60cdff]" d="M14.5 12L16.5 14.5L14.5 17" />
  </svg>
);

// svg.archive (Plus UI Yer İmleri)
export const ArchiveIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" />
  </svg>
);

// svg.archive-add (Plus UI Sabitleme)
export const ArchiveAddIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 10.6499H9.5" strokeMiterlimit="10" />
    <path d="M12 8.20996V13.21" strokeMiterlimit="10" />
    <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" />
  </svg>
);

// svg.eye (Plus UI Görüntülenme Sayısı)
export const EyeIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" />
    <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" />
  </svg>
);

// svg.message-notif-1 (Plus UI Yorum/Mesaj Sayısı)
export const MessageNotif1Icon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H14" />
    <path d="M19.5 7C20.8807 7 22 5.88071 22 4.5C22 3.11929 20.8807 2 19.5 2C18.1193 2 17 3.11929 17 4.5C17 5.88071 18.1193 7 19.5 7Z" />
  </svg>
);

// svg.translate-1 (Plus UI Otomatik Çeviri)
export const TranslateIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M.5,2V18A1.5,1.5,0,0,0,2,19.5H17L10.5.5H2A1.5,1.5,0,0,0,.5,2Z" />
    <path d="M12,4.5H22A1.5,1.5,0,0,1,23.5,6V22A1.5,1.5,0,0,1,22,23.5H13.5l-1.5-4" />
    <line x1="17" x2="13.5" y1="19.5" y2="23.5" />
    <line className="text-[#60cdff]" x1="14.5" x2="21.5" y1="10.5" y2="10.5" />
    <line className="text-[#60cdff]" x1="17.5" x2="17.5" y1="9.5" y2="10.5" />
    <path className="text-[#60cdff]" d="M20,10.5c0,1.1-1.77,4.42-4,6" />
    <path className="text-[#60cdff]" d="M16,13c.54,1.33,4,4.5,4,4.5" />
    <path className="text-[#60cdff]" d="M10.1,7.46a4,4,0,1,0,1.4,3h-4" />
  </svg>
);

export const Link21Icon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.0601 10.9399C15.3101 13.1899 15.3101 16.8299 13.0601 19.0699C10.8101 21.3099 7.17009 21.3199 4.93009 19.0699C2.69009 16.8199 2.68009 13.1799 4.93009 10.9399" />
    <path d="M10.59 13.4099C8.24996 11.0699 8.24996 7.26988 10.59 4.91988C12.93 2.56988 16.73 2.57988 19.08 4.91988C21.43 7.25988 21.42 11.0599 19.08 13.4099" />
  </svg>
);

// svg.profile-1 (Plus UI Profil & Ayarlar)
export const Profile1Icon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" />
    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" />
  </svg>
);

export const PulseIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

// sun-moon-icon (Plus UI Tema Değiştirici)
export const SunMoonIcon: React.FC<{ className?: string; isDark?: boolean }> = ({ className = 'w-4 h-4', isDark = true }) => {
  return (
    <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {isDark ? (
        // Moon Icon
        <g className="d1">
          <path d="M183.72453,170.371a10.4306,10.4306,0,0,1-.8987,3.793,11.19849,11.19849,0,0,1-5.73738,5.72881,10.43255,10.43255,0,0,1-3.77582.89138,1.99388,1.99388,0,0,0-1.52447,3.18176,10.82936,10.82936,0,1,0,15.118-15.11819A1.99364,1.99364,0,0,0,183.72453,170.371Z" transform="translate(-169.3959 -166.45548)" />
        </g>
      ) : (
        // Sun Icon
        <g className="d2">
          <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" />
          <path d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
};

export const MoonSunIcon = SunMoonIcon;

export const ArrowUp4Icon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <g transform="translate(2.500000, 3.000000)">
      <path d="M9.5,18 C3.00557739,18 0.456662548,17.5386801 0.0435259337,15.2033146 C-0.36961068,12.8679491 2.27382642,8.47741935 3.08841712,7.02846996 C5.81256986,2.18407813 7.66371927,0 9.5,0 C11.3362807,0 13.1874301,2.18407813 15.9115829,7.02846996 C16.7261736,8.47741935 19.3696107,12.8679491 18.9564741,15.2033146 C18.5443995,17.5386801 15.9944226,18 9.5,18 Z" />
    </g>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 32 32">
    <path d="M22,3H10a7,7,0,0,0-7,7V22a7,7,0,0,0,7,7H22a7,7,0,0,0,7-7V10A7,7,0,0,0,22,3Zm5,19a5,5,0,0,1-5,5H10a5,5,0,0,1-5-5V10a5,5,0,0,1,5-5H22a5,5,0,0,1,5,5Z" />
    <path d="M16,9.5A6.5,6.5,0,1,0,22.5,16,6.51,6.51,0,0,0,16,9.5Zm0,11A4.5,4.5,0,1,1,20.5,16,4.51,4.51,0,0,1,16,20.5Z" />
    <circle cx="23" cy="9" r="1" />
  </svg>
);

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 32 32">
    <path d="M24,28a1,1,0,0,1-.62-.22l-6.54-5.23a1.83,1.83,0,0,1-.13.16l-4,4a1,1,0,0,1-1.65-.36L8.2,18.72,2.55,15.89a1,1,0,0,1,.09-1.82l26-10a1,1,0,0,1,1,.17,1,1,0,0,1,.33,1l-5,22a1,1,0,0,1-.65.72A1,1,0,0,1,24,28Zm-8.43-9,7.81,6.25L27.61,6.61,5.47,15.12l4,2a1,1,0,0,1,.49.54l2.45,6.54,2.89-2.88-1.9-1.53A1,1,0,0,1,13,19a1,1,0,0,1,.35-.78l7-6a1,1,0,1,1,1.3,1.52Z" />
  </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

// svg.verify-1 (Plus UI Onay Rozeti)
export const Verify1Icon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="m21.56 10.739-1.36-1.58c-.26-.3-.47-.86-.47-1.26v-1.7c0-1.06-.87-1.93-1.93-1.93h-1.7c-.39 0-.96-.21-1.26-.47l-1.58-1.36c-.69-.59-1.82-.59-2.52 0l-1.57 1.37c-.3.25-.87.46-1.26.46H6.18c-1.06 0-1.93.87-1.93 1.93v1.71c0 .39-.21.95-.46 1.25l-1.35 1.59c-.58.69-.58 1.81 0 2.5l1.35 1.59c.25.3.46.86.46 1.25v1.71c0 1.06.87 1.93 1.93 1.93h1.73c.39 0 .96.21 1.26.47l1.58 1.36c.69.59 1.82.59 2.52 0l1.58-1.36c.3-.26.86-.47 1.26-.47h1.7c1.06 0 1.93-.87 1.93-1.93v-1.7c0-.39.21-.96.47-1.26l1.36-1.58c.58-.69.58-1.83-.01-2.52Zm-5.4-.63-4.83 4.83a.75.75 0 0 1-1.06 0l-2.42-2.42a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l1.89 1.89 4.3-4.3c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06Z" />
  </svg>
);

export const BloggerBIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M21.976 24H2.026C.9 24 0 23.1 0 21.976V2.026C0 .9.9 0 2.025 0H22.05C23.1 0 24 .9 24 2.025v19.95C24 23.1 23.1 24 21.976 24zM12 3.975H9c-2.775 0-5.025 2.25-5.025 5.025v6c0 2.774 2.25 5.024 5.025 5.024h6c2.774 0 5.024-2.25 5.024-5.024v-3.975c0-.6-.45-1.05-1.05-1.05H18c-.524 0-.976-.45-.976-.976 0-2.776-2.25-5.026-5.024-5.026zm3.074 12H9c-.525 0-.975-.45-.975-.975s.45-.976.975-.976h6.074c.526 0 .977.45.977.976s-.45.976-.975.976zm-2.55-7.95c.527 0 .976.45.976.975s-.45.975-.975.975h-3.6c-.525 0-.976-.45-.976-.975s.45-.975.975-.975h3.6z" />
  </svg>
);

export const ArrowSwapHorizontalIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 14.99L15.49 20.01" strokeMiterlimit="10" />
    <path d="M3.5 14.99H20.5" strokeMiterlimit="10" />
    <path className="text-[#60cdff]" d="M3.5 9.00999L8.51 3.98999" strokeMiterlimit="10" />
    <path className="text-[#60cdff]" d="M20.5 9.01001H3.5" strokeMiterlimit="10" />
  </svg>
);

export const SpeedometerIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.14 19.5C20.91 17.7 22 15.22 22 12.5C22 6.98 17.52 2.5 12 2.5C6.48 2.5 2 6.98 2 12.5C2 15.22 3.08 17.68 4.84 19.49" strokeMiterlimit="10" />
    <path className="text-[#60cdff]" d="M12 21.5C13.8667 21.5 15.38 19.9867 15.38 18.12C15.38 16.2533 13.8667 14.74 12 14.74C10.1333 14.74 8.62 16.2533 8.62 18.12C8.62 19.9867 10.1333 21.5 12 21.5Z" strokeMiterlimit="10" />
    <path className="text-[#60cdff]" d="M15.25 12H16C16.82 12 17.5 11.33 17.5 10.5C17.5 9.68 16.82 9 16 9C15.18 9 14.5 9.67 14.5 10.5V11.25C14.5 11.66 14.84 12 15.25 12Z" strokeMiterlimit="10" />
  </svg>
);

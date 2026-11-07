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
    <path className="text-[var(--linkC,#9aa0a6)]" d="M9.5 12L7.5 14.5L9.5 17" />
    <path className="text-[var(--linkC,#9aa0a6)]" d="M14.5 12L16.5 14.5L14.5 17" />
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
    <line className="text-[var(--linkC,#9aa0a6)]" x1="14.5" x2="21.5" y1="10.5" y2="10.5" />
    <line className="text-[var(--linkC,#9aa0a6)]" x1="17.5" x2="17.5" y1="9.5" y2="10.5" />
    <path className="text-[var(--linkC,#9aa0a6)]" d="M20,10.5c0,1.1-1.77,4.42-4,6" />
    <path className="text-[var(--linkC,#9aa0a6)]" d="M16,13c.54,1.33,4,4.5,4,4.5" />
    <path className="text-[var(--linkC,#9aa0a6)]" d="M10.1,7.46a4,4,0,1,0,1.4,3h-4" />
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
    <path className="text-[var(--linkC,#9aa0a6)]" d="M3.5 9.00999L8.51 3.98999" strokeMiterlimit="10" />
    <path className="text-[var(--linkC,#9aa0a6)]" d="M20.5 9.01001H3.5" strokeMiterlimit="10" />
  </svg>
);

export const SpeedometerIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.14 19.5C20.91 17.7 22 15.22 22 12.5C22 6.98 17.52 2.5 12 2.5C6.48 2.5 2 6.98 2 12.5C2 15.22 3.08 17.68 4.84 19.49" strokeMiterlimit="10" />
    <path className="text-[var(--linkC,#9aa0a6)]" d="M12 21.5C13.8667 21.5 15.38 19.9867 15.38 18.12C15.38 16.2533 13.8667 14.74 12 14.74C10.1333 14.74 8.62 16.2533 8.62 18.12C8.62 19.9867 10.1333 21.5 12 21.5Z" strokeMiterlimit="10" />
    <path className="text-[var(--linkC,#9aa0a6)]" d="M15.25 12H16C16.82 12 17.5 11.33 17.5 10.5C17.5 9.68 16.82 9 16 9C15.18 9 14.5 9.67 14.5 10.5V11.25C14.5 11.66 14.84 12 15.25 12Z" strokeMiterlimit="10" />
  </svg>
);

export const VkIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M22 5.81c0-.2-.08-.5-.28-.7-.2-.2-.5-.28-.7-.28h-2.5c-.3 0-.6.1-.8.3-.2.2-.4.5-.4.8 0 0-1.3 3.1-3.1 5.2-.6.6-1 .8-1.4.8-.2 0-.4-.2-.5-.6V5.8c0-.3-.1-.6-.3-.8s-.5-.3-.8-.3H8c-.3 0-.6.2-.8.4-.2.2-.2.5-.2.5s0 2.2.9 2.5c.3.1.6 0 .8-.3.3-.4.8-1.2.9-1.9h2.3v6.7c0 .4-.2.7-.5.9-.3.2-.8.1-1.3-.4-1.8-2-3.1-5.1-3.1-5.1s-.2-.4-.4-.6c-.2-.2-.5-.3-.8-.3H2.8c-.3 0-.6.1-.8.3-.2.2 0 .5 0 .5s3.6 8.3 7.8 12.5c3.8 3.8 8.1 3.6 8.1 3.6h2c.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8v-2.7c0-.4.2-.7.5-.9.3-.2.7-.2 1 0 1.2.7 2.1 1.6 3.1 2.6.4.4.8.6 1.2.6h2.5c.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8 0-.4-.2-.8-.5-1.2-1-1-2-2-3.1-3-.3-.3-.4-.7-.2-1.1.5-1.1.9-2.3 1.2-3.5.1-.4-.1-.7-.4-.9z" />
  </svg>
);

export const MatrixIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.058c.222-.446.543-.807.965-1.082.42-.275.931-.413 1.533-.413.65 0 1.228.163 1.735.488.508.326.87.801 1.087 1.427.254-.457.62-.835 1.099-1.134.48-.3 1.04-.45 1.68-.45.69 0 1.306.166 1.848.498.542.333.948.81 1.218 1.433.27.623.406 1.401.406 2.334V20.4H16.8v-6.07c0-.662-.058-1.192-.174-1.59-.117-.398-.328-.7-.633-.906-.305-.205-.72-.308-1.246-.308-.49 0-.904.108-1.243.324-.34.216-.582.527-.726.932-.145.405-.217.954-.217 1.647V20.4H10.1v-6.07c0-.648-.057-1.173-.17-1.576-.114-.403-.322-.708-.624-.914-.303-.207-.714-.31-1.233-.31-.504 0-.93.109-1.278.326-.348.217-.597.53-.746.938-.15.409-.224.965-.224 1.668V20.4H3.36V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z" />
  </svg>
);

export const ArchiveTickIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11.5L11 13.5L15 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z" />
  </svg>
);

// Blogger XML 1:1 svg.ranking (Sabitlenmiş Gönderi / #FeaturedPost01 başlık ikonu)
export const RankingIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.3 8.10998L14.62 10.75C14.8 11.11 15.28 11.47 15.68 11.53L18.07 11.93C19.6 12.19 19.96 13.29 18.86 14.39L17 16.25C16.69 16.56 16.51 17.17 16.61 17.61L17.14 19.92C17.56 21.74 16.59 22.45 14.98 21.5L12.74 20.17C12.33 19.93 11.67 19.93 11.26 20.17L9.01996 21.5C7.40996 22.45 6.43995 21.74 6.85995 19.92L7.38998 17.61C7.48998 17.18 7.30997 16.57 6.99997 16.25L5.13998 14.39C4.03998 13.29 4.39996 12.18 5.92996 11.93L8.31997 11.53C8.71997 11.46 9.19997 11.11 9.37997 10.75L10.7 8.10998C11.41 6.67998 12.59 6.67998 13.3 8.10998Z" />
    <path className="c" d="M6 9V2" />
    <path className="c" d="M18 9V2" />
    <path className="c" d="M12 4V2" />
  </svg>
);

// Blogger XML 1:1 document-icon (Son Eklenen Bağlantılar / .blogT başlık ikonu)
export const DocumentIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <g transform="translate(3.610000, 2.750100)">
      <line className="c" x1="11.9858" x2="4.7658" y1="12.9463" y2="12.9463" />
      <line className="c" x1="11.9858" x2="4.7658" y1="9.1865" y2="9.1865" />
      <line className="c" x1="7.521" x2="4.766" y1="5.4272" y2="5.4272" />
      <path d="M7.63833441e-14,9.25 C7.63833441e-14,16.187 2.098,18.5 8.391,18.5 C14.685,18.5 16.782,16.187 16.782,9.25 C16.782,2.313 14.685,0 8.391,0 C2.098,0 7.63833441e-14,2.313 7.63833441e-14,9.25 Z" />
    </g>
  </svg>
);

// Blogger XML 1:1 tag-icon (Etiketler / #Label01 başlık ikonu)
export const TagBloggerIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.16989 15.3L8.69989 19.83C10.5599 21.69 13.5799 21.69 15.4499 19.83L19.8399 15.44C21.6999 13.58 21.6999 10.56 19.8399 8.69005L15.2999 4.17005C14.3499 3.22005 13.0399 2.71005 11.6999 2.78005L6.69989 3.02005C4.69989 3.11005 3.10989 4.70005 3.00989 6.69005L2.76989 11.69C2.70989 13.04 3.21989 14.35 4.16989 15.3Z" />
    <path className="c" d="M9.5 12C10.8807 12 12 10.8807 12 9.5C12 8.11929 10.8807 7 9.5 7C8.11929 7 7 8.11929 7 9.5C7 10.8807 8.11929 12 9.5 12Z" />
  </svg>
);

// Blogger XML 1:1 chat-icon (Bize Ulaşın / #ContactForm2 başlık ikonu)
export const ChatBloggerIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <g transform="translate(2.000000, 2.000000)">
      <path d="M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z" />
    </g>
  </svg>
);

// svg.hierarchy-4 (Blogger XML 1:1 - Hizmetler)
export const Hierarchy4Icon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12H18" />
    <path d="M18 4H14C12 4 11 5 11 7V17C11 19 12 20 14 20H18" />
    <path className="c" d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" />
    <path className="c" d="M20 6C21.1046 6 22 5.10457 22 4C22 2.89543 21.1046 2 20 2C18.8954 2 18 2.89543 18 4C18 5.10457 18.8954 6 20 6Z" />
    <path className="c" d="M20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22Z" />
    <path className="c" d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" />
  </svg>
);

// svg.flash (Blogger XML 1:1 - Klasör / Menü)
export const FlashIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.08998 13.28H9.17998V20.48C9.17998 22.16 10.09 22.5 11.2 21.24L18.77 12.64C19.7 11.59 19.31 10.72 17.9 10.72H14.81V3.52002C14.81 1.84002 13.9 1.50002 12.79 2.76002L5.21998 11.36C4.29998 12.42 4.68998 13.28 6.08998 13.28Z" strokeMiterlimit="10" />
  </svg>
);

// svg.edit-3 (Blogger XML 1:1 - Notlarınız)
export const Edit3Icon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <g transform="translate(3.500000, 3.500000)">
      <line className="c" x1="9.8352" x2="16.2122" y1="16.0078" y2="16.0078" />
      <path d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z" />
      <line x1="7.0041" x2="11.8681" y1="3.7114" y2="7.3624" />
    </g>
  </svg>
);

// svg.profile-2user (Blogger XML 1:1 - Forumlarınız)
export const Profile2UserIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <g transform="translate(2.749500, 2.549500)">
      <path d="M6.809,18.9067 C3.137,18.9067 9.41469125e-14,18.3517 9.41469125e-14,16.1277 C9.41469125e-14,13.9037 3.117,11.8997 6.809,11.8997 C10.481,11.8997 13.617,13.8847 13.617,16.1077 C13.617,18.3307 10.501,18.9067 6.809,18.9067 Z" />
      <path d="M6.809,8.728 C9.219,8.728 11.173,6.774 11.173,4.364 C11.173,1.954 9.219,-2.48689958e-14 6.809,-2.48689958e-14 C4.399,-2.48689958e-14 2.44496883,1.954 2.44496883,4.364 C2.436,6.766 4.377,8.72 6.778,8.728 L6.809,8.728 Z" />
      <path className="c" d="M14.0517,7.5293 C15.4547,7.1543 16.4887007,5.8753 16.4887007,4.3533 C16.4897,2.7653 15.3627,1.4393 13.8647,1.1323" />
      <path className="c" d="M14.7113,11.104 C16.6993,11.104 18.3973,12.452 18.3973,13.655 C18.3973,14.364 17.8123,15.092 16.9223,15.301" />
    </g>
  </svg>
);

// svg.sms-edit (Blogger XML 1:1 - Geri Bildirim)
export const SmsEditIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V11.5" strokeMiterlimit="10" />
    <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" strokeMiterlimit="10" />
    <path className="c" d="M19.21 14.77L15.6701 18.31C15.5301 18.45 15.4 18.71 15.37 18.9L15.18 20.25C15.11 20.74 15.45 21.0801 15.94 21.0101L17.29 20.82C17.48 20.79 17.75 20.66 17.88 20.52L21.4201 16.9801C22.0301 16.3701 22.3201 15.6601 21.4201 14.7601C20.5301 13.8701 19.82 14.16 19.21 14.77Z" strokeMiterlimit="10" />
    <path className="c" d="M18.7001 15.28C19.0001 16.36 19.8401 17.2 20.9201 17.5" strokeMiterlimit="10" />
  </svg>
);

// ChevronDown (Blogger XML 1:1 - Menü Açılır Ok)
export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
    <g transform="translate(12.000000, 12.000000) rotate(0.000000) translate(-12.000000, -12.000000) translate(5.000000, 8.500000)">
      <polyline points="14 0 7 7 0 0" />
    </g>
  </svg>
);

// svg.plus (Blogger XML 1:1 .mNav - Menü Açma Butonu)
export const PlusNavIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`line ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12H18" />
    <path d="M12 18V6" />
  </svg>
);

// svg.whatsapp (Blogger XML 1:1 - Whatsapp / Telefon)
export const WhatsappIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 32 32">
    <path d="M16,2A13,13,0,0,0,8,25.23V29a1,1,0,0,0,.51.87A1,1,0,0,0,9,30a1,1,0,0,0,.51-.14l3.65-2.19A12.64,12.64,0,0,0,16,28,13,13,0,0,0,16,2Zm0,24a11.13,11.13,0,0,1-2.76-.36,1,1,0,0,0-.76.11L10,27.23v-2.5a1,1,0,0,0-.42-.81A11,11,0,1,1,16,26Z" />
    <path d="M19.86,15.18a1.9,1.9,0,0,0-2.64,0l-.09.09-1.4-1.4.09-.09a1.86,1.86,0,0,0,0-2.64L14.23,9.55a1.9,1.9,0,0,0-2.64,0l-.8.79a3.56,3.56,0,0,0-.5,3.76,10.64,10.64,0,0,0,2.62,4A8.7,8.7,0,0,0,18.56,21a2.92,2.92,0,0,0,2.1-.79l.79-.8a1.86,1.86,0,0,0,0-2.64Zm-.62,3.61c-.57.58-2.78,0-4.92-2.11a8.88,8.88,0,0,1-2.13-3.21c-.26-.79-.25-1.44,0-1.71l.7-.7,1.4,1.4-.7.7a1,1,0,0,0,0,1.41l2.82,2.82a1,1,0,0,0,1.41,0l.7-.7,1.4,1.4Z" />
  </svg>
);

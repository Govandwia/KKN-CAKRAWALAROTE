type IconName =
  | 'ship'
  | 'waves'
  | 'utensils'
  | 'camera'
  | 'anchor'
  | 'mountain'
  | 'leaf'
  | 'music'
  | 'map-pin'
  | 'droplets'
  | 'store'
  | 'plane'
  | 'home'
  | 'wine'
  | 'scissors'
  | 'star'
  | 'users'
  | 'sun'
  | 'search'
  | 'compass'
  | 'spark'
  | 'route'
  | 'clock'
  | 'weave'
  | 'mask'
  | 'palm'
  | 'beach'
  | 'nature'
  | 'culture';

type IconProps = {
  name: IconName;
  className?: string;
};

const iconPaths: Record<IconName, JSX.Element> = {
  ship: <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2" />, 
  waves: <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />, 
  utensils: <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />, 
  camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
  anchor: <><circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></>,
  mountain: <path d="m8 3 4 8 5-5 5 15H2L8 3z" />, 
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  'map-pin': <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  droplets: <><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" /><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" /></>,
  store: <><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /></>,
  plane: <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2a.5.5 0 0 0-.3.8L4 10l3 1-1 3 2 2 1-3 3.5 2.5.8 2.5a.5.5 0 0 0 .8.3l3.5-3.5-3.3-.1z" />, 
  home: <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />, 
  wine: <path d="M8 22h8M7 10h10M12 15v7M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z" />, 
  scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></>,
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />, 
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  sun: <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>,
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  compass: <><circle cx="12" cy="12" r="10" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8z" /></>,
  spark: <path d="M12 2 9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z" />, 
  route: <><path d="M4 18c1.7 0 3-1.3 3-3s-1.3-3-3-3M20 9c-1.7 0-3 1.3-3 3s1.3 3 3 3" /><path d="M4 12h16" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  weave: <path d="M4 4h16v16H4z" />, 
  mask: <path d="M12 3c3 0 7 2 7 6 0 5-4 12-7 12s-7-7-7-12c0-4 4-6 7-6z" />, 
  palm: <path d="M12 2c4 4 6 8 6 12 0 4-2 8-6 10-4-2-6-6-6-10 0-4 2-8 6-12z" />, 
  beach: <path d="M3 19c3-4 6-6 9-6s6 2 9 6" />, 
  nature: <path d="M3 20l6-9 4 6 3-4 5 7H3z" />, 
  culture: <path d="M4 4h16v16H4zM8 8h8v8H8z" />
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

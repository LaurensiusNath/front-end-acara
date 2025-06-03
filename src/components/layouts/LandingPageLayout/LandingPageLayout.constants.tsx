import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
  { label: "Login", href: "/auth/login", variant: "solid" },
  { label: "Register", href: "/auth/register", variant: "bordered" },
];

const SOCIALS_ITEMS = [
  { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
  { label: "Facebook", href: "https://facebook.com", icon: <FaFacebook /> },
  { label: "TikTok", href: "https://tiktok.com", icon: <FaTiktok /> },
  { label: "X", href: "https://x.com", icon: <FaXTwitter /> },
  { label: "YouTube", href: "https://youtube.com", icon: <FaYoutube /> },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIALS_ITEMS };

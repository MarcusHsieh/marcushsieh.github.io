export interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  tags: string[];
}

export interface SocialLink {
  name: string;
  icon: JSX.Element;
  url: string;
}
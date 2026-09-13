export const sharingPages = {
  home: {
    path: "/",
    title: "I build software and robots.",
    label: "Digital garden",
  },
  about: { path: "/about/", title: "A little about me.", label: "About" },
  projects: {
    path: "/projects/",
    title: "Things I’m building and exploring.",
    label: "Projects",
  },
  notes: {
    path: "/notes/",
    title: "Notes, questions, and things worth coming back to.",
    label: "Notes",
  },
};
export function pageSharingImage(path: string) {
  const match = Object.entries(sharingPages).find(
    ([, page]) => page.path === path,
  );
  return match
    ? {
        src: `/sharing/pages/${match[0]}.png`,
        alt: `${match[1].title} — Lukas Bühler`,
      }
    : undefined;
}

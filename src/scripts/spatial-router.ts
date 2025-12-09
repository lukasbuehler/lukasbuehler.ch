// src/scripts/spatial-router.ts

// Define your room map order
const ROOM_ORDER = ["/hobbies", "/", "/workspace"];

export function getRoomIndex(path: string) {
  // Normalize path (remove trailing slash if needed)
  const p = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return ROOM_ORDER.indexOf(p);
}

export function getNextRoom(currentPath: string, direction: "next" | "prev") {
  const currentIndex = getRoomIndex(currentPath);
  if (currentIndex === -1) return "/"; // Default to home if lost

  if (direction === "next") {
    // Wrap around: If at end, go to start
    return ROOM_ORDER[(currentIndex + 1) % ROOM_ORDER.length];
  } else {
    // Wrap backwards: If at start, go to end
    return ROOM_ORDER[
      (currentIndex - 1 + ROOM_ORDER.length) % ROOM_ORDER.length
    ];
  }
}

// Calculates if we should slide LEFT or RIGHT based on the shortest visual path
export function getSlideAnimation(currentPath: string, targetPath: string) {
  const current = getRoomIndex(currentPath);
  const target = getRoomIndex(targetPath);
  const len = ROOM_ORDER.length;

  // Simple distance
  const diff = target - current;

  // Wrap-around logic
  // If moving 1 step right (e.g. 0 -> 1) OR wrapping from End to Start (e.g. 2 -> 0)
  // We consider that a "Forward/Right" movement
  if (diff === 1 || diff === -(len - 1)) {
    return "slide-right"; // Content moves left, camera moves right
  }

  // If moving 1 step left (e.g. 1 -> 0) OR wrapping from Start to End (e.g. 0 -> 2)
  if (diff === -1 || diff === len - 1) {
    return "slide-left";
  }

  // Fallback for jumping across multiple rooms (use shortest raw distance)
  return diff > 0 ? "slide-right" : "slide-left";
}

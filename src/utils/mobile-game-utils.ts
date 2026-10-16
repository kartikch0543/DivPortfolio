/**
 * Utilities for launching WebGL games on mobile browsers with automatic fullscreen
 * and landscape orientation lock.
 */

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || "";
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return mobileRegex.test(userAgent) || (hasTouch && window.innerWidth < 1024);
}

export async function enterGameFullscreenLandscape(
  targetElement?: HTMLElement | null
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const target = targetElement || document.documentElement;

  // 1. Request fullscreen
  try {
    const el = target as unknown as {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        await el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        await el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        await el.msRequestFullscreen();
      }
    }
  } catch (err) {
    console.warn("Fullscreen request error (or permission denied):", err);
  }

  // 2. Lock screen orientation to landscape
  try {
    const orientationObj = screen.orientation as unknown as {
      lock?: (orientation: string) => Promise<void>;
    };

    if (orientationObj && typeof orientationObj.lock === "function") {
      await orientationObj.lock("landscape").catch((e) => {
        console.warn("Screen orientation lock rejected:", e);
      });
    } else {
      const legacyScreen = screen as unknown as {
        lockOrientation?: (o: string) => boolean;
        webkitLockOrientation?: (o: string) => boolean;
        mozLockOrientation?: (o: string) => boolean;
        msLockOrientation?: (o: string) => boolean;
      };
      if (legacyScreen.lockOrientation) {
        legacyScreen.lockOrientation("landscape");
      } else if (legacyScreen.webkitLockOrientation) {
        legacyScreen.webkitLockOrientation("landscape");
      } else if (legacyScreen.mozLockOrientation) {
        legacyScreen.mozLockOrientation("landscape");
      } else if (legacyScreen.msLockOrientation) {
        legacyScreen.msLockOrientation("landscape");
      }
    }
  } catch (err) {
    console.warn("Orientation lock error:", err);
  }

  return true;
}

export async function exitGameFullscreen(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
        await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
      }
    }

    if (screen.orientation && typeof screen.orientation.unlock === "function") {
      screen.orientation.unlock();
    }
  } catch (err) {
    console.warn("Exit fullscreen error:", err);
  }
}

// Google Dot & TV Navigation / Gamepad Engine
// Extracted from Plus UI 3.0.0 (theme-1915278968279215939.xml lines 55-100, 17685-17720, 18540-18925)

interface TVNavState {
  pointer: boolean;
  current: HTMLElement | null;
  running: boolean;
  dotX: number;
  dotY: number;
  dotVisible: boolean;
  held: Record<string, boolean>;
  lastKey: string;
  lastKeyAt: number;
}

const state: TVNavState = {
  pointer: true,
  current: null,
  running: false,
  dotX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  dotY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  dotVisible: false,
  held: {},
  lastKey: '',
  lastKeyAt: 0,
};

let focusDotEl: HTMLDivElement | null = null;
let virtualCursorEl: HTMLDivElement | null = null;

function ensureFocusDot(): HTMLDivElement {
  if (!focusDotEl) {
    focusDotEl = document.getElementById('tv-focus-dot') as HTMLDivElement;
    if (!focusDotEl) {
      focusDotEl = document.createElement('div');
      focusDotEl.id = 'tv-focus-dot';
      document.body.appendChild(focusDotEl);
    }
  }
  return focusDotEl;
}

function ensureVirtualCursor(): HTMLDivElement {
  if (!virtualCursorEl) {
    virtualCursorEl = document.getElementById('tv-virtual-cursor') as HTMLDivElement;
    if (!virtualCursorEl) {
      virtualCursorEl = document.createElement('div');
      virtualCursorEl.id = 'tv-virtual-cursor';
      document.body.appendChild(virtualCursorEl);
    }
  }
  return virtualCursorEl;
}

export function updateFocusDot(el: HTMLElement | null) {
  const dot = ensureFocusDot();
  if (state.pointer || !el || el === document.body || el === document.documentElement) {
    dot.classList.remove('on');
    return;
  }

  const r = el.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0 || r.bottom < 0 || r.top > window.innerHeight) {
    dot.classList.remove('on');
    return;
  }

  dot.style.left = `${Math.round(r.right - 4)}px`;
  dot.style.top = `${Math.round(r.top + 4)}px`;
  dot.classList.add('on');
}

export function hideFocusDot() {
  if (focusDotEl) {
    focusDotEl.classList.remove('on');
  }
}

function isEditable(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    (el as HTMLElement).isContentEditable
  );
}

function isVisible(el: HTMLElement): boolean {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

function getFocusableElements(): HTMLElement[] {
  const selector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
  return nodes.filter(el => isVisible(el) && !el.closest('[hidden]') && !el.closest('[aria-hidden="true"]'));
}

function spatialMove(dir: 'up' | 'down' | 'left' | 'right') {
  const current = (document.activeElement as HTMLElement) || state.current;
  const elements = getFocusableElements();
  if (!elements.length) return;

  if (!current || current === document.body || elements.indexOf(current) === -1) {
    elements[0]?.focus();
    state.pointer = false;
    updateFocusDot(elements[0]);
    return;
  }

  const curRect = current.getBoundingClientRect();
  const curCenterX = curRect.left + curRect.width / 2;
  const curCenterY = curRect.top + curRect.height / 2;

  let best: HTMLElement | null = null;
  let bestScore = Infinity;

  for (const el of elements) {
    if (el === current) continue;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const dx = cx - curCenterX;
    const dy = cy - curCenterY;

    let inDirection = false;
    let primaryDist = 0;
    let secondaryDist = 0;

    switch (dir) {
      case 'left':
        inDirection = dx < -4;
        primaryDist = -dx;
        secondaryDist = Math.abs(dy);
        break;
      case 'right':
        inDirection = dx > 4;
        primaryDist = dx;
        secondaryDist = Math.abs(dy);
        break;
      case 'up':
        inDirection = dy < -4;
        primaryDist = -dy;
        secondaryDist = Math.abs(dx);
        break;
      case 'down':
        inDirection = dy > 4;
        primaryDist = dy;
        secondaryDist = Math.abs(dx);
        break;
    }

    if (inDirection) {
      // Score based on distance with weight on directional alignment
      const score = primaryDist + secondaryDist * 2.2;
      if (score < bestScore) {
        bestScore = score;
        best = el;
      }
    }
  }

  if (best) {
    state.pointer = false;
    best.focus({ preventScroll: false });
    best.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    state.current = best;
    updateFocusDot(best);
  }
}

// Gamepad Virtual Cursor updates
function updateVirtualCursor(dx: number, dy: number) {
  const cursor = ensureVirtualCursor();
  if (!state.dotVisible) {
    state.dotVisible = true;
    cursor.classList.add('active');
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  state.dotX = Math.max(10, Math.min(vw - 10, state.dotX + dx));
  state.dotY = Math.max(10, Math.min(vh - 10, state.dotY + dy));

  cursor.style.left = `${state.dotX}px`;
  cursor.style.top = `${state.dotY}px`;

  // Edge scroll
  const edgeMargin = 40;
  const scrollSpeed = 14;
  if (state.dotY < edgeMargin) {
    window.scrollBy({ top: -scrollSpeed, behavior: 'auto' });
  } else if (state.dotY > vh - edgeMargin) {
    window.scrollBy({ top: scrollSpeed, behavior: 'auto' });
  }

  // Hover detection
  const target = document.elementFromPoint(state.dotX, state.dotY);
  if (target) {
    const clickable = target.closest('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])');
    if (clickable) {
      cursor.classList.add('hovering-link');
    } else {
      cursor.classList.remove('hovering-link');
    }
  } else {
    cursor.classList.remove('hovering-link');
  }
}

function clickVirtualCursor() {
  const cursor = ensureVirtualCursor();
  cursor.classList.add('clicking');
  setTimeout(() => cursor.classList.remove('clicking'), 150);

  const target = document.elementFromPoint(state.dotX, state.dotY);
  if (target) {
    const clickable = target.closest<HTMLElement>('a, button, input, textarea, select, label, [role="button"], [tabindex]:not([tabindex="-1"])') || (target as HTMLElement);
    if (clickable) {
      clickable.click();
      if (typeof clickable.focus === 'function') {
        try { clickable.focus({ preventScroll: true }); } catch (e) {}
      }
    }
  }
}

export function initTvNavigation(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleKey = (ev: KeyboardEvent) => {
    const key = ev.key;

    if (key === 'Tab') {
      state.pointer = false;
      requestAnimationFrame(() => {
        if (document.activeElement && document.activeElement !== document.body) {
          updateFocusDot(document.activeElement as HTMLElement);
        }
      });
      setTimeout(() => {
        if (document.activeElement && document.activeElement !== document.body) {
          updateFocusDot(document.activeElement as HTMLElement);
        }
      }, 40);
      return;
    }

    // If writing in input, allow typing and arrow navigation inside text
    if (isEditable(document.activeElement)) {
      if (key === 'Escape') {
        (document.activeElement as HTMLElement).blur();
        hideFocusDot();
      }
      return;
    }

    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;

    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
      ev.preventDefault();
      const dirMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };
      spatialMove(dirMap[key]);
      return;
    }

    if (key === 'Escape') {
      hideFocusDot();
      if (document.activeElement && document.activeElement !== document.body) {
        (document.activeElement as HTMLElement).blur();
      }
    }
  };

  const handleFocusIn = () => {
    if (!state.pointer && document.activeElement && document.activeElement !== document.body) {
      updateFocusDot(document.activeElement as HTMLElement);
    }
  };

  const handleFocusOut = () => {
    setTimeout(() => {
      if (!state.pointer && document.activeElement && document.activeElement !== document.body) {
        updateFocusDot(document.activeElement as HTMLElement);
      } else if (state.pointer) {
        hideFocusDot();
      }
    }, 20);
  };

  const handlePointerDown = () => {
    state.pointer = true;
    hideFocusDot();
    if (virtualCursorEl) {
      virtualCursorEl.classList.remove('active');
      state.dotVisible = false;
    }
  };

  const handleScroll = () => {
    if (!state.pointer && document.activeElement && document.activeElement !== document.body) {
      updateFocusDot(document.activeElement as HTMLElement);
    }
  };

  // Gamepad Loop
  let animationFrameId: number;

  const pollGamepad = () => {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < gamepads.length; i++) {
      const gp = gamepads[i];
      if (!gp || !gp.connected) continue;

      const buttons = gp.buttons;
      const axes = gp.axes;

      // Left Stick (Virtual Mouse Cursor)
      const lx = axes[0] || 0;
      const ly = axes[1] || 0;
      const deadzone = 0.15;
      const dotSpeed = 16;

      if (Math.abs(lx) > deadzone || Math.abs(ly) > deadzone) {
        state.pointer = false;
        updateVirtualCursor(lx * dotSpeed, ly * dotSpeed);
      }

      // Right Stick (Scroll)
      const rx = axes[2] || 0;
      const ry = axes[3] || 0;
      if (Math.abs(ry) > 0.2) {
        window.scrollBy({ top: ry * 20, behavior: 'auto' });
      }

      // Helper for button press detection (rising edge)
      const isPressed = (btnIdx: number, id: string, action: () => void) => {
        const btn = buttons[btnIdx];
        const down = btn && (btn.pressed || btn.value > 0.5);
        if (down && !state.held[id]) {
          state.held[id] = true;
          action();
        } else if (!down && state.held[id]) {
          delete state.held[id];
        }
      };

      // Button 0 (A / OK)
      isPressed(0, 'pad-ok', () => {
        if (state.dotVisible) {
          clickVirtualCursor();
        } else if (document.activeElement && !isEditable(document.activeElement)) {
          (document.activeElement as HTMLElement).click();
        }
      });

      // Button 1 (B / Cancel / Back)
      isPressed(1, 'pad-back', () => {
        const closeBtn = document.querySelector<HTMLElement>('[aria-label="Kapat"], [title="Kapat"], .fCls, .modal-close');
        if (closeBtn) closeBtn.click();
        else window.history.back();
      });

      // D-Pad Up / Down / Left / Right (Spatial Nav)
      isPressed(12, 'dpad-up', () => spatialMove('up'));
      isPressed(13, 'dpad-down', () => spatialMove('down'));
      isPressed(14, 'dpad-left', () => spatialMove('left'));
      isPressed(15, 'dpad-right', () => spatialMove('right'));

      // LB / RB (Quick Scroll)
      isPressed(4, 'pad-lb', () => window.scrollBy({ top: -window.innerHeight * 0.7, behavior: 'smooth' }));
      isPressed(5, 'pad-rb', () => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' }));

      // Button 2 (X / Search)
      isPressed(2, 'pad-search', () => {
        const searchInput = document.querySelector<HTMLElement>('input[type="search"], input[placeholder*="Bul"]');
        if (searchInput) searchInput.click();
      });

      // Button 3 (Y / Theme)
      isPressed(3, 'pad-theme', () => {
        const themeBtn = document.querySelector<HTMLElement>('button[title*="Karanlık"], button[title*="Aydınlık"], button[title*="Mod"]');
        if (themeBtn) themeBtn.click();
      });

      // Button 9 (Start / Menu)
      isPressed(9, 'pad-menu', () => {
        const hamburgerBtn = document.querySelector<HTMLElement>('button[title*="Menü"]');
        if (hamburgerBtn) hamburgerBtn.click();
      });
    }

    animationFrameId = requestAnimationFrame(pollGamepad);
  };

  window.addEventListener('keydown', handleKey, true);
  window.addEventListener('focusin', handleFocusIn);
  window.addEventListener('focusout', handleFocusOut);
  window.addEventListener('mousedown', handlePointerDown, true);
  window.addEventListener('touchstart', handlePointerDown, true);
  window.addEventListener('scroll', handleScroll, { passive: true });

  animationFrameId = requestAnimationFrame(pollGamepad);

  return () => {
    window.removeEventListener('keydown', handleKey, true);
    window.removeEventListener('focusin', handleFocusIn);
    window.removeEventListener('focusout', handleFocusOut);
    window.removeEventListener('mousedown', handlePointerDown, true);
    window.removeEventListener('touchstart', handlePointerDown, true);
    window.removeEventListener('scroll', handleScroll);
    cancelAnimationFrame(animationFrameId);
  };
}

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType,
  gain = 0.08,
  when = 0
) {
  const ctx = getCtx();
  if (!ctx) return;
  const t0 = ctx.currentTime + when;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export function playCorrect() {
  tone(523.25, 0.12, "sine", 0.09);
  tone(659.25, 0.14, "sine", 0.08, 0.1);
  tone(783.99, 0.18, "triangle", 0.07, 0.2);
}

export function playWrong() {
  tone(220, 0.18, "sawtooth", 0.05);
  tone(165, 0.22, "sawtooth", 0.04, 0.12);
}

export function playClick() {
  tone(440, 0.04, "square", 0.03);
}

export function playStreak() {
  tone(523.25, 0.1, "sine", 0.08);
  tone(659.25, 0.1, "sine", 0.08, 0.08);
  tone(783.99, 0.1, "sine", 0.08, 0.16);
  tone(1046.5, 0.22, "triangle", 0.09, 0.26);
}

export function playLevelUp() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    tone(f, 0.16, "triangle", 0.07, i * 0.09);
  });
}

export function playKnow() {
  tone(600, 0.1, "sine", 0.07);
  tone(900, 0.16, "sine", 0.06, 0.09);
}

export function unlockAudio() {
  const ctx = getCtx();
  if (ctx?.state === "suspended") void ctx.resume();
}

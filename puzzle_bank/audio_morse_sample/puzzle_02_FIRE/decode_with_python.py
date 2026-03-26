# decode_with_python.py - helper to analyze morse audio pulses (beginner friendly)
import wave, struct, sys

def read_wav(path):
    wf = wave.open(path, 'rb')
    fr = wf.getframerate(); n = wf.getnframes()
    data = wf.readframes(n)
    samples = struct.unpack('<' + 'h'*n, data)
    wf.close()
    return samples, fr

def detect_pulses(samples, fr, threshold=500):
    amp  = [abs(s) for s in samples]
    tone = [1 if a > threshold else 0 for a in amp]
    runs = []
    prev = tone[0]; count = 1
    for t in tone[1:]:
        if t == prev:
            count += 1
        else:
            runs.append((prev, count/fr))
            prev = t; count = 1
    runs.append((prev, count/fr))
    return runs

def classify(dur):
    if dur < 0.05:   return None           # noise, skip
    if dur < 0.25:   return 'DOT  (.)'
    if dur < 0.55:   return 'DASH (-)   OR letter gap'
    return                  'WORD GAP'

if __name__ == '__main__':
    import sys
    # auto-detect wav file in current folder
    import glob
    wavs = glob.glob('*.wav')
    path = sys.argv[1] if len(sys.argv) > 1 else (wavs[0] if wavs else 'morse.wav')
    print(f"Analyzing: {path}")
    samples, fr = read_wav(path)
    runs = detect_pulses(samples, fr)
    print(f"Sample rate: {fr} Hz  |  Duration: {len(samples)/fr:.2f}s\n")
    print(f"{'State':<10} {'Duration':>10}   Classification")
    print("-" * 50)
    for state, dur in runs:
        if dur < 0.01: continue   # skip very tiny noise
        label = ('TONE   ' if state==1 else 'SILENCE')
        cls   = classify(dur) if state==1 else ('letter gap' if 0.25<dur<0.55 else ('word gap' if dur>0.55 else 'elem gap'))
        print(f"{label:<10} {dur:>10.3f}s   {cls}")
    print("\nTip: TONE durations ~0.12s = dot, ~0.36s = dash.")
    print("     SILENCE ~0.12s = within letter, ~0.36s = between letters.")

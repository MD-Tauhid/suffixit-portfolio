import os
import subprocess
import time

SOURCE_DIR = 'public/assets/How-we-work-video'
TARGET_DIR = 'public/assets/process'

VIDEOS = [
    {
        'id': 'understand',
        'source': 'Discovery & Architecture Strategy.mp4',
        'title': 'Step 01 - Understand'
    },
    {
        'id': 'design',
        'source': 'UIUX & Interactive Prototyping.mp4',
        'title': 'Step 02 - Design'
    },
    {
        'id': 'build',
        'source': 'Agile Engineering & Rigorous QA.mp4',
        'title': 'Step 03 - Build'
    },
    {
        'id': 'launch',
        'source': 'Production Release & 247 Operations.mp4',
        'title': 'Step 04 - Launch & Support'
    }
]

os.makedirs(TARGET_DIR, exist_ok=True)

def optimize_video(item):
    source_path = os.path.join(SOURCE_DIR, item['source'])
    out_mp4 = os.path.join(TARGET_DIR, f"{item['id']}.mp4")
    out_webm = os.path.join(TARGET_DIR, f"{item['id']}.webm")
    out_poster = os.path.join(TARGET_DIR, f"{item['id']}-poster.webp")
    out_poster_jpg = os.path.join(TARGET_DIR, f"{item['id']}.jpg")

    print(f"\n==========================================")
    print(f"Processing: {item['title']} ({item['source']})")
    print(f"==========================================")

    # 1. Get source duration
    cmd_dur = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', source_path]
    dur = float(subprocess.check_output(cmd_dur).decode().strip())
    print(f"Source duration: {dur:.3f}s")

    # Seamless crossfade parameters:
    # Crossfade 0.5s from start to end
    fade_dur = 0.5
    main_start = fade_dur
    main_end = dur
    main_len = main_end - main_start
    offset = main_len - fade_dur

    filter_str = (
        f"[0:v]split[a][b];"
        f"[a]trim=start={main_start},setpts=PTS-STARTPTS[main];"
        f"[b]trim=end={fade_dur},setpts=PTS-STARTPTS[fade];"
        f"[main][fade]xfade=transition=fade:duration={fade_dur}:offset={offset:.3f}[v]"
    )

    # 2. Render Optimized MP4 (H.264 High Profile, faststart for instant web playback, no audio)
    print(f"Encoding optimized MP4: {out_mp4}...")
    t0 = time.time()
    cmd_mp4 = [
        'ffmpeg', '-y', '-i', source_path,
        '-filter_complex', filter_str,
        '-map', '[v]',
        '-an', # strip unused audio stream
        '-c:v', 'libx264',
        '-profile:v', 'high',
        '-level', '4.1',
        '-pix_fmt', 'yuv420p',
        '-crf', '22',
        '-preset', 'slow',
        '-movflags', '+faststart',
        out_mp4
    ]
    subprocess.run(cmd_mp4, check=True)
    mp4_sz = os.path.getsize(out_mp4)
    print(f"MP4 done in {time.time()-t0:.2f}s! Size: {mp4_sz / 1024:.1f} KB")

    # 3. Render Optimized WebM (VP9, for modern browsers with highest compression)
    print(f"Encoding optimized WebM: {out_webm}...")
    t0 = time.time()
    cmd_webm = [
        'ffmpeg', '-y', '-i', source_path,
        '-filter_complex', filter_str,
        '-map', '[v]',
        '-an',
        '-c:v', 'libvpx-vp9',
        '-b:v', '0',
        '-crf', '28',
        '-row-mt', '1',
        '-speed', '2',
        out_webm
    ]
    subprocess.run(cmd_webm, check=True)
    webm_sz = os.path.getsize(out_webm)
    print(f"WebM done in {time.time()-t0:.2f}s! Size: {webm_sz / 1024:.1f} KB")

    # 4. Extract High-Res Poster Images (WebP + JPG fallback)
    print(f"Extracting poster images...")
    cmd_poster_webp = [
        'ffmpeg', '-y', '-ss', '00:00:00.8', '-i', out_mp4,
        '-vframes', '1',
        '-c:v', 'libwebp',
        '-quality', '90',
        out_poster
    ]
    subprocess.run(cmd_poster_webp, check=True)

    cmd_poster_jpg = [
        'ffmpeg', '-y', '-ss', '00:00:00.8', '-i', out_mp4,
        '-vframes', '1',
        '-q:v', '2',
        out_poster_jpg
    ]
    subprocess.run(cmd_poster_jpg, check=True)
    print(f"Posters saved: {out_poster} ({os.path.getsize(out_poster)/1024:.1f} KB), {out_poster_jpg}")

def main():
    start = time.time()
    for item in VIDEOS:
        optimize_video(item)
    print(f"\n==========================================")
    print(f"ALL 4 VIDEOS FULLY OPTIMIZED in {time.time()-start:.2f}s!")
    print(f"==========================================")

if __name__ == '__main__':
    main()

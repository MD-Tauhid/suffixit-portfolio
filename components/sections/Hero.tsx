import MetroHero from "@/components/ui/scroll-locked-video-hero";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden p-0 m-0" style={{ padding: 0, margin: 0 }}>
      <MetroHero
        videoSrc="/assets/video/hero4.mp4"
        reverseVideoSrc="/assets/video/hero4-reverse.mp4"
        poster="/assets/video/hero4-poster.jpg"
        scrubDistance={1400}
      />
    </section>
  );
}

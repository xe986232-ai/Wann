export function SiteIntro() {
  return (
    <section className="relative z-10 px-[5%] py-10 md:px-[3%] lg:py-20">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 text-center">
        <h2
          className="font-medium text-foreground"
          style={{
            fontSize: "26px",
            WebkitTextSizeAdjust: "none",
            textSizeAdjust: "none",
          }}
        >
          FL Studio Mobile Projects &amp; Royalty-Free Samples
        </h2>
        <p
          className="text-muted"
          style={{
            fontSize: "16px",
            lineHeight: "1.7",
            WebkitTextSizeAdjust: "none",
            textSizeAdjust: "none",
          }}
        >
          Rizwoow is your go-to source for ready-to-use FL Studio Mobile
          project files and royalty-free samples. Every project comes fully
          arranged and easy to customize, so you can drop it straight into
          your own FLM session and start producing right away. Pair it with
          our sample packs — drums, melodies, vocals, and one-shots crafted
          for producers who want fresh sounds without the wait. New projects
          and samples added regularly, all ready to download and use in your
          own tracks.
        </p>
      </div>
    </section>
  );
}

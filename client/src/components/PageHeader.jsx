function PageHeader({ eyebrow, title, text }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-8 pt-12 sm:px-8 lg:px-12">
      {eyebrow ? (
        <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
      ) : null}
      {title ? (
        <h1 className="font-display reveal reveal-delay-1 mt-3 text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
      ) : null}
      {text ? <p className="reveal reveal-delay-2 mt-4 max-w-2xl text-slate-300">{text}</p> : null}
    </section>
  )
}

export default PageHeader

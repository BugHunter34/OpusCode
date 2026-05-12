function TeamGrid({ members }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <article
            key={member.name}
            className={`glass-panel reveal flex h-full min-h-[430px] flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[color:var(--accent)] ${
              index % 3 === 0 ? 'reveal-delay-1' : index % 3 === 1 ? 'reveal-delay-2' : 'reveal-delay-3'
            }`}
          >
            
            {/* Info */}
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {member.tag}
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-white">{member.name}</h2>
            
            <p className="mt-1 text-xl font-bold text-accent-soft">{member.role}</p>
            <p>  </p>
            {/* Photo Grid*/}
            {member.imageUrl && (
              <div className="mb-4 overflow-hidden rounded-xl bg-slate-800">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="h-48 w-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Photo'
                  }}
                />
              </div>
            )}
            <p className="mt-3 text-sm text-slate-300 font-bold">{member.desc}</p>

            {/* Skills */}
            {member.items && member.items.length > 0 && (
              <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-200">
                {member.items.map((item) => (
                  item.trim() !== '' && (
                    <li
                      key={item}
                      className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2"
                    >
                      {item}
                    </li>
                  )
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default TeamGrid
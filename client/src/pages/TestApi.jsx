import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function TestPage() {
  const { t } = useTranslation('common');
  const [rootMessage, setRootMessage] = useState('');
  const [inputText, setInputText] = useState('');
  const [postResponse, setPostResponse] = useState('');

  useEffect(() => {
    fetch('https://api.opuscode.dev/') 
      .then((res) => res.json())
      .then((data) => setRootMessage(data.message))
      .catch((err) => console.error("Error fetching root:", err));
  }, []);

  const handlePostRequest = async () => {
    if (!inputText.trim()) return;

    try {
      const response = await fetch('https://api.opuscode.dev/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setPostResponse(data.message);
      setInputText(''); // Clear input after sending
    } catch (err) {
      console.error("Error posting data:", err);
    }
  };

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
        
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Endpoint Testing
        </p>
        <h2 className="mt-2 text-center text-3xl font-semibold text-white">
          {t('testApi.title')}
        </h2>

        {/* Display GET response */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-center">
          <strong className="text-sm font-medium text-slate-300">
            {t('testApi.getLabel')}
          </strong> 
          <p className="mt-2 font-mono text-accent-soft">
            {rootMessage || t('testApi.loading')}
          </p>
        </div>

        {/* Input and POST button */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('testApi.placeholder')}
            className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[color:var(--accent)]"
          />
          <button 
            onClick={handlePostRequest} 
            className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 transition hover:brightness-110"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {t('testApi.sendBtn')}
          </button>
        </div>

        {/* Display POST response */}
        {postResponse && (
          <div className="mt-6 rounded-xl border border-lime-500/20 bg-lime-500/10 p-4 text-center">
            <p className="text-sm font-semibold text-lime-300">
              {postResponse}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
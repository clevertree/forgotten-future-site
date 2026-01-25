'use client';

import { useState, useEffect } from 'react';

interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

interface RepoData {
  name: string;
  version: string;
  commits: Commit[];
  repoUrl: string;
}

interface RepoStatusProps {
  name: string;
  apiUrl: string;
  repoUrl: string;
  initialData?: RepoData;
}

export default function RepoStatus({ name, apiUrl, repoUrl, initialData }: RepoStatusProps) {
  const [data, setData] = useState<RepoData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch commits
        const commitsRes = await fetch(`${apiUrl}/commits?per_page=3`);
        if (!commitsRes.ok) throw new Error('Failed to fetch commits');
        const commitsData = await commitsRes.json();

        // Fetch version (heuristic: try VERSION then package.json)
        let version = 'v?.?.?';
        try {
          // Try VERSION file first
          const versionRes = await fetch(`${apiUrl}/contents/VERSION`);
          if (versionRes.ok) {
            const vData = await versionRes.json();
            version = 'v' + atob(vData.content).trim();
          } else {
            // Try package.json
            const pkgRes = await fetch(`${apiUrl}/contents/package.json`);
            if (pkgRes.ok) {
              const pData = await pkgRes.json();
              const pkg = JSON.parse(atob(pData.content));
              version = 'v' + pkg.version;
            }
          }
        } catch (vErr) {
          console.error(`Error fetching version for ${name}:`, vErr);
        }

        setData({
          name,
          version,
          commits: commitsData.map((c: any) => ({
            sha: c.sha.substring(0, 7),
            message: c.commit.message.split('\n')[0],
            date: c.commit.author.date,
            url: c.html_url
          })),
          repoUrl
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [name, apiUrl, repoUrl]);

  if (loading) {
    return (
      <div className="glass-panel animate-pulse h-48 flex items-center justify-center">
        <span className="text-muted text-xs uppercase tracking-widest">Scanning {name}...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass-panel border-element-fire/30">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Repository: {name}</h3>
        <p className="text-element-fire text-[10px] font-mono">Signal Lost: {error || 'Unknown Error'}</p>
      </div>
    );
  }

  return (
    <div className="glass-panel group hover:border-accent/30 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest">Repository: {data.name}</h3>
        <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">{data.version}</span>
      </div>
      <div className="space-y-3 mb-6">
        <div className="text-[10px] text-muted font-mono leading-tight">
          {data.commits.map((commit) => (
            <div key={commit.sha} className="flex flex-col mb-2 last:mb-0">
              <div className="flex gap-2 items-baseline">
                <span className="text-[9px] text-muted/60 whitespace-nowrap">
                  {new Date(commit.date).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </span>
                <span className="text-secondary break-words">{commit.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <a href={data.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-accent uppercase tracking-widest hover:text-accent-bright inline-flex items-center gap-2">
        GitHub Source <span className="text-lg">→</span>
      </a>
    </div>
  );
}

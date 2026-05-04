import { useEffect, useState } from "react";

interface WidgetData {
  name: string;
  presence_count: number;
  members: { id: string; username: string; status: string; avatar_url?: string }[];
  channels: { id: string; name: string; position: number }[];
  instant_invite: string | null;
}

interface Props {
  guildId: string;
}

/**
 * Reads live data from Discord's public widget endpoint.
 * The server admin must enable "Server Widget" in Server Settings → Widget.
 */
export const useDiscordWidget = (guildId: string) => {
  const [data, setData] = useState<WidgetData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!guildId || guildId === "YOUR_GUILD_ID") {
      setError("guild_id_missing");
      return;
    }
    fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
      .then((r) => {
        if (!r.ok) throw new Error("widget_disabled");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, [guildId]);

  return { data, error };
};

const DiscordLiveStats = ({ guildId }: Props) => {
  const { data, error } = useDiscordWidget(guildId);

  const stats = [
    {
      value: data ? `${data.presence_count}` : error ? "5.2K+" : "...",
      label: "Online agora",
      live: !!data,
    },
    {
      value: data ? `${data.channels.length}` : error ? "120+" : "...",
      label: "Canais de voz",
      live: !!data,
    },
    { value: "24/7", label: "Comunidade ativa", live: false },
    {
      value: data ? data.name.slice(0, 12) : error ? "CYBER//WORLD" : "...",
      label: "Servidor",
      live: !!data,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="relative glass rounded-2xl p-6 text-center hover:border-primary/60 transition-all hover:-translate-y-1 hover:glow-primary"
        >
          {s.live && (
            <div className="absolute top-3 right-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-mono text-accent">LIVE</span>
            </div>
          )}
          <div className="text-3xl md:text-4xl font-black text-gradient mb-1 truncate">
            {s.value}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscordLiveStats;

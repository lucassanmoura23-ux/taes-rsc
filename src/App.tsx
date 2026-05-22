import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Printer,
  Trash2,
  CheckCircle2,
  Info,
  ChevronRight,
  TrendingUp,
  ArrowLeft,
  AlertCircle,
  Scale,
  Award,
  FileText,
  BarChart3,
  User,
  Hash,
  Briefcase,
  MapPin,
  RefreshCw,
  Plus,
  Minus,
} from "lucide-react";
import { NIVEIS, REQ_INFO, CRITERIOS, fmt } from "./data";
import { Criterio, Nivel } from "./types";
import PrintView from "./components/PrintView";

export default function App() {
  const [view, setView] = useState<string>("landing");
  
  // Persistent profile states
  const [nome, setNome] = useState<string>(() => {
    return localStorage.getItem("rsc_pcctae_nome") || "";
  });
  const [siape, setSiape] = useState<string>(() => {
    return localStorage.getItem("rsc_pcctae_siape") || "";
  });
  const [cargo, setCargo] = useState<string>(() => {
    return localStorage.getItem("rsc_pcctae_cargo") || "";
  });
  const [lotacao, setLotacao] = useState<string>(() => {
    return localStorage.getItem("rsc_pcctae_lotacao") || "";
  });
  const [nivelPleiteado, setNivelPleiteado] = useState<string>(() => {
    return localStorage.getItem("rsc_pcctae_nivelPleiteado") || "";
  });

  // Persistent quantities state
  const [qtds, setQtds] = useState<Record<string, number | string>>(() => {
    try {
      const saved = localStorage.getItem("rsc_pcctae_qtds");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [busca, setBusca] = useState<string>("");
  const [filtroReq, setFiltroReq] = useState<string>("Todos");

  // Sync profile data with localStorage on change
  useEffect(() => {
    localStorage.setItem("rsc_pcctae_nome", nome);
  }, [nome]);
  useEffect(() => {
    localStorage.setItem("rsc_pcctae_siape", siape);
  }, [siape]);
  useEffect(() => {
    localStorage.setItem("rsc_pcctae_cargo", cargo);
  }, [cargo]);
  useEffect(() => {
    localStorage.setItem("rsc_pcctae_lotacao", lotacao);
  }, [lotacao]);
  useEffect(() => {
    localStorage.setItem("rsc_pcctae_nivelPleiteado", nivelPleiteado);
  }, [nivelPleiteado]);

  const setQtd = (id: string, v: string | number) => {
    let num: number | string = "";
    if (v !== "") {
      const parsed = parseFloat(v as string);
      num = isNaN(parsed) ? "" : Math.max(0, parsed);
    }
    setQtds((q) => {
      const updated = { ...q, [id]: num };
      localStorage.setItem("rsc_pcctae_qtds", JSON.stringify(updated));
      return updated;
    });
  };

  const incrementQtd = (id: string) => {
    const current = Number(qtds[id] || 0);
    setQtd(id, current + 1);
  };

  const decrementQtd = (id: string) => {
    const current = Number(qtds[id] || 0);
    if (current > 0) {
      setQtd(id, Math.max(0, current - 1));
    }
  };

  const handleClearAll = () => {
    if (confirm("Deseja realmente limpar todos os critérios preenchidos?")) {
      setQtds({});
      localStorage.removeItem("rsc_pcctae_qtds");
    }
  };

  const itensPreenchidos = useMemo(() => {
    return CRITERIOS.filter((c) => Number(qtds[c.n] || 0) > 0);
  }, [qtds]);

  const totalPts = useMemo(() => {
    return itensPreenchidos.reduce((a, c) => a + c.pts * Number(qtds[c.n] || 0), 0);
  }, [itensPreenchidos, qtds]);

  const totalItens = itensPreenchidos.length;

  const reqsComPontos = useMemo(() => {
    const s = new Set<string>();
    itensPreenchidos.forEach((c) => s.add(c.req));
    return s;
  }, [itensPreenchidos]);

  const nivelAtingido = useMemo(() => {
    const eligible = NIVEIS.filter((n) => {
      const ptsOk = totalPts >= n.minPts;
      const itensOk = totalItens >= n.minItens;
      const reqsOk = !n.reqs || n.reqs.some((r) => reqsComPontos.has(r));
      return ptsOk && itensOk && reqsOk;
    });
    return eligible[eligible.length - 1];
  }, [totalPts, totalItens, reqsComPontos]);

  const filtrados = useMemo(() => {
    return CRITERIOS.filter((c) => {
      const matchReq = filtroReq === "Todos" || c.req === filtroReq;
      const matchSearch =
        !busca ||
        c.desc.toLowerCase().includes(busca.toLowerCase()) ||
        c.n.toLowerCase().includes(busca.toLowerCase());
      return matchReq && matchSearch;
    });
  }, [busca, filtroReq]);

  // ── VIEW: IMPRESSÃO ──────────────────────────────────────────────────────────
  if (view === "print") {
    return (
      <PrintView
        nome={nome}
        siape={siape}
        cargo={cargo}
        lotacao={lotacao}
        nivelPleiteado={nivelPleiteado}
        itensPreenchidos={itensPreenchidos}
        qtds={qtds}
        totalPts={totalPts}
        totalItens={totalItens}
        reqsComPontos={reqsComPontos}
        nivelAtingido={nivelAtingido}
        onVoltar={() => setView("calculator")}
      />
    );
  }

  // ── VIEW: LANDING ────────────────────────────────────────────────────────────
  if (view === "landing") {
    return (
      <div className="min-h-screen bg-[#080d2c] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[140px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-600 rounded-full blur-[120px] opacity-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full text-center relative z-10"
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="bg-white/5 border border-white/10 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 font-mono">
              Lei nº 11.091/2005 · Lei nº 15.367/2026 · Decreto MEC EMI nº 8/2026
            </span>
          </div>

          {/* Icon + Title */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-700 shadow-2xl shadow-cyan-500/30 mb-6 rotate-3">
              <Scale className="text-white w-10 h-10 -rotate-3" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">
              AUTOAVALIAÇÃO RSC-PCCTAE
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-semibold mb-2">
              Reconhecimento de Saberes e Competências
            </p>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              Verifique os critérios de progressão oficial de acordo com a minuta do Decreto regulamentador do PCCTAE. Salve, imprima ou gere o PDF de forma estritamente local e segura.
            </p>
          </div>

          {/* Informational Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: "6 Requisitos", sub: "Anexos I a VI" },
              { label: "6 Níveis", sub: "RSC-I ao RSC-VI" },
              { label: "57 Critérios", sub: "Todos mapeados" },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-white/5 border border-white/15 rounded-2xl p-4 text-center hover:border-white/30 transition-all duration-300 backdrop-blur-md"
              >
                <div className="text-white font-black text-sm md:text-base font-sans">{c.label}</div>
                <div className="text-slate-500 text-[9px] font-black uppercase tracking-wider mt-0.5 font-mono">
                  {c.sub}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView("calculator")}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#080d2c] px-8 py-4 rounded-xl font-black text-base shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Iniciar Painel
              <ChevronRight size={18} />
            </motion.button>
          </div>

          <p className="text-slate-500 text-[10px] mt-8 font-semibold uppercase tracking-wider">
            Painel Estritamente Local · Seus dados não saem do navegador
          </p>
          <p className="text-slate-400 text-[11px] mt-2 font-semibold">
            Desenvolvido por <span className="text-cyan-400 font-bold">Lucas Santana de Moura</span>
          </p>
        </motion.div>
      </div>
    );
  }

  // ── VIEW: CALCULADORA ────────────────────────────────────────────────────────
  return (
    <div className="bg-slate-50 min-h-screen pb-40 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-[#080d2c] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <FileText size={260} className="absolute -right-8 -top-8 text-white rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setView("landing")}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                >
                  <ArrowLeft size={14} /> Voltar à tela inicial
                </button>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none mb-1">
                Painel de Autodeclaração RSC-PCCTAE
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                Desenvolvido por <strong className="text-cyan-400">Lucas Santana de Moura</strong> com base nas diretrizes do Decreto MEC EMI nº 8/2026 e Lei nº 15.367/2026.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-4">
                <div className="bg-cyan-500 p-2.5 rounded-xl shadow-md">
                  <TrendingUp className="text-[#080d2c] w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest font-mono">
                    Nível Atingível
                  </div>
                  <div className="text-base font-black text-white">{nivelAtingido?.nome || "Nenhum de momento"}</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-4">
                <div className="bg-slate-800 p-2.5 rounded-xl">
                  <BarChart3 className="text-cyan-400 w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] text-[#22d3ee] font-black uppercase tracking-widest font-mono">
                    Pontos Acumulados
                  </div>
                  <div className="text-base font-black text-white font-mono">
                    {fmt(totalPts)}{" "}
                    <span className="text-slate-500 text-xs font-normal font-sans">pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 -mt-5">
        
        {/* Important Warning Banners */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex flex-col md:flex-row gap-4 items-start shadow-sm">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="text-xs text-amber-900 leading-relaxed">
            <p className="font-bold uppercase tracking-wider mb-1">Informativos Importantes do Decreto:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li><strong>Estágio Probatório:</strong> O servidor que estiver em estágio probatório não poderá ser concedido o RSC (Art. 12 do Decreto), porém as atividades realizadas durante o período poderão ser computadas a qualquer tempo (Parágrafo único).</li>
              <li><strong>Análise de Duplicidade:</strong> Cada atividade realizada somente poderá ser utilizada uma única vez para fins de pontuação (Art. 4º, § 2º).</li>
              <li><strong>Interstício:</strong> É necessário cumprir interstício de três anos após a última concessão (Art. 11).</li>
            </ul>
          </div>
        </div>

        {/* ── Dados Funcionais Form ────────────────────────────────────────────── */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-500" />
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Award size={16} className="text-cyan-600" /> Dados de Identificação Funcional
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <User size={10} className="text-slate-400" /> Nome Completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Insira seu nome para o relatório"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Hash size={10} className="text-slate-400" /> Matrícula SIAPE
              </label>
              <input
                type="text"
                value={siape}
                onChange={(e) => setSiape(e.target.value)}
                placeholder="Ex: 1234567"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Briefcase size={10} className="text-slate-400" /> Cargo Efetivo
              </label>
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Ex: Assistente em Administração"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <MapPin size={10} className="text-slate-400" /> Unidade de Lotação
              </label>
              <input
                type="text"
                value={lotacao}
                onChange={(e) => setLotacao(e.target.value)}
                placeholder="Ex: Reitoria / Campus"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            <div className="lg:col-span-2">
              <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Nível RSC-PCCTAE Pleiteado
              </label>
              <div className="relative">
                <select
                  value={nivelPleiteado}
                  onChange={(e) => setNivelPleiteado(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-[#080d2c] focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 outline-none appearance-none cursor-pointer"
                >
                  <option value="">Selecione o nível que deseja pleitear no momento...</option>
                  {NIVEIS.map((n) => (
                    <option key={n.nome} value={n.nome}>
                      {n.nome} — {n.desc}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                  ▼
                </div>
              </div>
            </div>

            {nivelPleiteado && (() => {
              const n = NIVEIS.find((nv) => nv.nome === nivelPleiteado);
              if (!n) return null;
              const ptsOk = totalPts >= n.minPts;
              const itensOk = totalItens >= n.minItens;
              const reqsOk = !n.reqs || n.reqs.some((r) => reqsComPontos.has(r));
              const ok = ptsOk && itensOk && reqsOk;
              return (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`rounded-xl p-3 border-2 flex items-start gap-2.5 ${
                      ok ? "bg-emerald-50/50 border-emerald-200" : "bg-amber-50/50 border-amber-200"
                    }`}
                  >
                    {ok ? (
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-black text-xs ${ok ? "text-emerald-800" : "text-amber-800"}`}>
                        {ok ? `${n.nome} Aprovado para Simulação` : `${n.nome} com Pendência`}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1 text-[8px] font-mono font-bold tracking-wider">
                        <span className={ptsOk ? "text-emerald-600" : "text-slate-400"}>
                          {ptsOk ? "✓" : "✗"} {fmt(totalPts)}/{n.minPts} pts
                        </span>
                        <span className={itensOk ? "text-emerald-600" : "text-slate-400"}>
                          {ptsOk ? "✓" : "✗"} {totalItens}/{n.minItens} itens
                        </span>
                        {n.reqs && (
                          <span className={reqsOk ? "text-emerald-600" : "text-slate-400"}>
                            {reqsOk ? "✓" : "✗"} Mín. 1 em: {n.reqs.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              );
            })()}
          </div>
        </section>

        {/* ── Progress Dashboard grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {NIVEIS.map((n) => {
            const ptsOk = totalPts >= n.minPts;
            const itensOk = totalItens >= n.minItens;
            const reqsOk = !n.reqs || n.reqs.some((r) => reqsComPontos.has(r));
            const ok = ptsOk && itensOk && reqsOk;
            const percentage = Math.min(100, (totalPts / n.minPts) * 100);

            return (
              <motion.div
                key={n.nome}
                whileHover={{ y: -2 }}
                className={`rounded-2xl p-4 border transition-all ${
                  ok
                    ? "bg-[#080d2c] border-cyan-500 text-white shadow-md"
                    : "bg-white border-slate-100 hover:border-slate-200 text-slate-800 shadow-sm"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-black uppercase tracking-tight ${ok ? "text-cyan-400" : "text-slate-400"}`}>
                    {n.nome}
                  </span>
                  {ok ? (
                    <CheckCircle2 size={13} className="text-[#34d399]" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-slate-200" />
                  )}
                </div>

                <div>
                  <div className="text-[10px] font-medium leading-tight mb-2 opacity-80">
                    Mínimo: <span className="font-bold">{n.minPts} pts</span>
                  </div>
                  <div className={`h-1 w-full rounded-full overflow-hidden mb-2 ${ok ? "bg-white/15" : "bg-slate-100"}`}>
                    <div
                      className={`h-full transition-all duration-500 ${ok ? "bg-cyan-400" : "bg-cyan-500"}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className={`text-[8px] font-bold ${ptsOk ? (ok ? "text-cyan-400" : "text-emerald-500") : "text-slate-300"}`}>
                      PTS
                    </span>
                    <span className={`text-[8px] font-bold ${itensOk ? (ok ? "text-cyan-400" : "text-emerald-500") : "text-slate-300"}`}>
                      ITENS
                    </span>
                    {n.reqs && (
                      <span className={`text-[8px] font-bold ${reqsOk ? (ok ? "text-cyan-400" : "text-emerald-500") : "text-slate-300"}`}>
                        REQ
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Search & Filter Criteria Tab ───────────────────────────────── */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/60">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-end">
              <div className="flex-1 w-full">
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Search size={16} className="text-slate-600" /> Critérios de Avaliação (Anexos de Pontuação)
                </h2>
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Filtrar por palavras-chaves ou código de item (ex: I-1, VI-10)..."
                    className="w-full bg-white border-2 border-slate-100 rounded-xl pl-10 pr-5 py-3 text-xs font-semibold focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Requirement Filters */}
              <div className="flex flex-wrap gap-1 leading-none">
                {["Todos", "I", "II", "III", "IV", "V", "VI"].map((r) => {
                  const info = r !== "Todos" ? REQ_INFO[r] : null;
                  const isSelected = filtroReq === r;

                  return (
                    <button
                      key={r}
                      onClick={() => setFiltroReq(r)}
                      style={isSelected && info ? { backgroundColor: info.cor, borderColor: info.cor } : {}}
                      className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all border cursor-pointer ${
                        isSelected
                          ? r === "Todos"
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "text-white"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {r === "Todos" ? "Todos Anexos" : `Req ${r}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {totalItens > 0 && (
              <div className="flex items-center justify-between mb-5 px-4 py-3 bg-cyan-50/50 rounded-2xl border border-cyan-100">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-[#080d2c] uppercase tracking-wider">
                    {totalItens} critério{totalItens > 1 ? "s" : ""} carregado{totalItens > 1 ? "s" : ""} com valor
                  </span>
                </div>
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Trash2 size={11} /> Limpar Seleção
                </button>
              </div>
            )}

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {filtrados.map((item) => {
                  const info = REQ_INFO[item.req];
                  const value = qtds[item.n] ?? "";
                  const countVal = Number(value);
                  const subTotal = countVal > 0 ? item.pts * countVal : 0;
                  const isFilled = countVal > 0;

                  return (
                    <motion.div
                      layout
                      key={item.n}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-2xl border transition-all ${
                        isFilled
                          ? "border-slate-200 bg-white shadow-sm"
                          : "border-slate-100 bg-white hover:border-slate-200/60"
                      }`}
                      style={
                        isFilled
                          ? { borderLeftColor: info.cor, borderLeftWidth: "4px" }
                          : undefined
                      }
                    >
                      <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* Requirement Badge / Code */}
                        <div
                          className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center font-black text-xs transition-all font-mono`}
                          style={
                            isFilled
                              ? { backgroundColor: info.bg, color: info.cor }
                              : { backgroundColor: "#f8fafc", color: "#94a3b8" }
                          }
                        >
                          {item.n}
                        </div>

                        {/* Description text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[9px]">
                            <span
                              className="font-black uppercase tracking-wider px-2 py-0.5 rounded-full border"
                              style={{
                                color: info.cor,
                                borderColor: `${info.cor}30`,
                                backgroundColor: `${info.cor}08`,
                              }}
                            >
                              Requisito {item.req} — {info.label}
                            </span>
                            <span className="text-slate-400 font-semibold italic capitalize">
                              ({item.unid})
                            </span>
                          </div>
                          <p className="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        {/* Inputs and Math calculations */}
                        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-none border-slate-100 justify-between md:justify-end">
                          <div className="text-left md:text-right font-mono">
                            <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                              Valor Item
                            </div>
                            <div className="text-sm font-black text-slate-800">{fmt(item.pts)}</div>
                          </div>

                          <div className="h-6 w-px bg-slate-100 hidden sm:block" />

                          {/* Quick buttons */}
                          <div className="flex items-center gap-1">
                            {/* Decrement */}
                            <button
                              type="button"
                              onClick={() => decrementQtd(item.n)}
                              disabled={countVal === 0}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors shadow-sm cursor-pointer border ${
                                countVal > 0
                                  ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                  : "bg-slate-50 border-slate-100 text-slate-300 pointer-events-none"
                              }`}
                            >
                              <Minus size={10} />
                            </button>

                            {/* Direct text input */}
                            <div className="w-16">
                              <input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={value}
                                onChange={(e) => setQtd(item.n, e.target.value)}
                                className={`w-full text-center py-1 text-sm font-black rounded-lg outline-none font-mono transition-all ${
                                  isFilled
                                    ? "text-[#080d2c] bg-slate-100 focus:bg-white"
                                    : "bg-slate-50 text-slate-700 border border-slate-100 focus:border-slate-300"
                                }`}
                              />
                            </div>

                            {/* Increment */}
                            <button
                              type="button"
                              onClick={() => incrementQtd(item.n)}
                              className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm transition-colors cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          {/* Computed Subtotal item */}
                          {isFilled && (
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="min-w-16 text-right font-mono"
                            >
                              <div className="text-[8px] font-black uppercase tracking-wider mb-0.5" style={{ color: info.cor }}>
                                Pontuação
                              </div>
                              <div className="text-sm font-black" style={{ color: info.cor }}>
                                {fmt(subTotal)}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filtrados.length === 0 && (
                <div className="text-center py-24 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                  <Search size={36} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400 font-bold text-xs">Nenhum critério compatível encontrado.</p>
                  <p className="text-slate-300 text-[10px] mt-0.5">
                    Modifique sua busca ou selecione outro anexo de requisito.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Bar */}
      <AnimatePresence>
        {totalItens > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-4 left-0 right-0 z-40 px-4"
          >
            <div className="max-w-3xl mx-auto bg-[#080d2c]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-3.5 flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-5 px-3">
                <div>
                  <div className="text-[8px] text-cyan-400 font-black uppercase tracking-wider font-mono">
                    Itens Ativados
                  </div>
                  <div className="text-lg font-black text-white leading-none font-mono">
                    {totalItens}
                  </div>
                </div>

                <div className="h-6 w-px bg-white/10" />

                <div>
                  <div className="text-[8px] text-cyan-400 font-black uppercase tracking-wider font-mono">
                    Pontos Calculados
                  </div>
                  <div className="text-lg font-black text-white leading-none font-mono">
                    {fmt(totalPts)}
                  </div>
                </div>

                {nivelAtingido && (
                  <>
                    <div className="h-6 w-px bg-white/10" />
                    <div>
                      <div className="text-[8px] text-emerald-400 font-black uppercase tracking-wider font-mono">
                        Nível Aprovado
                      </div>
                      <div className="text-sm font-black text-[#58e0a2] leading-none">
                        {nivelAtingido.nome}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setView("print")}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#080d2c] px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-md"
              >
                <Printer size={14} /> Relatório Completo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

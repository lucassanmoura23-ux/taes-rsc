import { useMemo } from "react";
import { ArrowLeft, Printer, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { Criterio, Nivel } from "../types";
import { REQ_INFO, NIVEIS, fmt, PRINT_CSS } from "../data";

interface PrintViewProps {
  nome: string;
  siape: string;
  cargo: string;
  lotacao: string;
  nivelPleiteado: string;
  itensPreenchidos: Criterio[];
  qtds: Record<string, number | string>;
  totalPts: number;
  totalItens: number;
  reqsComPontos: Set<string>;
  nivelAtingido: Nivel | undefined;
  onVoltar: () => void;
}

export default function PrintView({
  nome,
  siape,
  cargo,
  lotacao,
  nivelPleiteado,
  itensPreenchidos,
  qtds,
  totalPts,
  totalItens,
  reqsComPontos,
  nivelAtingido,
  onVoltar,
}: PrintViewProps) {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const byReq = useMemo(() => {
    const g: Record<string, Criterio[]> = {};
    itensPreenchidos.forEach((item) => {
      if (!g[item.req]) g[item.req] = [];
      g[item.req].push(item);
    });
    return g;
  }, [itensPreenchidos]);

  const ptsPorReq = useMemo(() => {
    const r: Record<string, number> = {};
    itensPreenchidos.forEach((item) => {
      r[item.req] = (r[item.req] || 0) + item.pts * Number(qtds[item.n] || 0);
    });
    return r;
  }, [itensPreenchidos, qtds]);

  const nAlvo = NIVEIS.find((n) => n.nome === nivelPleiteado);
  const aprovado =
    nAlvo &&
    totalPts >= nAlvo.minPts &&
    totalItens >= nAlvo.minItens &&
    (!nAlvo.reqs || nAlvo.reqs.some((r) => reqsComPontos.has(r)));

  return (
    <div className="bg-slate-100 min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      {/* Barra de controle — só na tela */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <button
            onClick={onVoltar}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Voltar à calculadora
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Info size={14} />
            <span>Este documento é uma autoavaliação para fins de planejamento pessoal</span>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            <Printer size={16} /> Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Documento */}
      <div className="print-doc max-w-5xl mx-auto px-4 py-8 bg-white shadow-xl my-6 rounded-2xl print:shadow-none print:rounded-none print:my-0">
        {/* Cabeçalho */}
        <div className="text-center pb-6 mb-8 border-b-2 border-slate-800">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
            Rede Federal de Educação Profissional, Científica e Tecnológica — PCCTAE
          </p>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            FORMULÁRIO DE AUTOAVALIAÇÃO RSC-PCCTAE
          </h1>
          <p className="text-base font-semibold text-slate-600 mt-1">
            Reconhecimento de Saberes e Competências
          </p>
          <p className="text-[10px] text-slate-400 mt-3 font-medium">
            Base legal: Lei nº 11.091/2005 | Lei nº 15.367, de 30/03/2026 | Decreto MEC — EMI nº 8/2026
          </p>
        </div>

        {/* Dados funcionais */}
        <div className="mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            I. Identificação do Servidor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 rounded-xl overflow-hidden text-sm">
            {[
              ["Nome completo", nome || "—"],
              ["SIAPE", siape || "—"],
              ["Cargo efetivo", cargo || "—"],
              ["Unidade de Lotação", lotacao || "—"],
              ["Nível RSC-PCCTAE Pleiteado", nivelPleiteado || "—"],
              ["Data da autoavaliação", hoje],
            ].map(([label, val], i) => (
              <div
                key={i}
                className="flex gap-0 border-b border-slate-100 last:border-0 md:[&:nth-last-child(-n+2)]:border-0"
              >
                <span className="bg-slate-50 px-4 py-2.5 font-semibold text-slate-500 w-48 shrink-0 border-r border-slate-100">
                  {label}
                </span>
                <span className="px-4 py-2.5 text-slate-800 font-medium flex-1">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Critérios por requisito */}
        <div className="mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            II. Critérios e Pontuação Declarada
          </h2>

          {Object.keys(byReq).length === 0 ? (
            <p className="text-slate-400 text-sm italic">Nenhum critério preenchido.</p>
          ) : (
            (Object.entries(byReq) as Array<[string, Criterio[]]>).map(([req, items]) => {
              const info = REQ_INFO[req];
              const subTotal = ptsPorReq[req] || 0;
              return (
                <div key={req} className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: info.cor }}
                      />
                      <span
                        className="text-xs font-black uppercase tracking-wider"
                        style={{ color: info.cor }}
                      >
                        Requisito {req} — {info.label}
                      </span>
                    </div>
                    <span className="text-xs font-black text-slate-500">
                      Subtotal: <strong className="text-slate-800">{fmt(subTotal)} pts</strong>
                    </span>
                  </div>
                  <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
                        <th className="px-3 py-2 text-left font-black w-12">Item</th>
                        <th className="px-3 py-2 text-left font-black">Descrição do Critério</th>
                        <th className="px-3 py-2 text-center font-black w-24">Unidade</th>
                        <th className="px-3 py-2 text-center font-black w-16">Pts Unit.</th>
                        <th className="px-3 py-2 text-center font-black w-16">Qtd.</th>
                        <th className="px-3 py-2 text-center font-black w-20">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => {
                        const qtd = Number(qtds[item.n] || 0);
                        return (
                          <tr
                            key={item.n}
                            className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                          >
                            <td className="px-3 py-2 font-black text-slate-400 text-center">
                              {item.n}
                            </td>
                            <td className="px-3 py-2 text-slate-700 leading-snug">
                              {item.desc}
                            </td>
                            <td className="px-3 py-2 text-center text-slate-500 italic capitalize">
                              {item.unid}
                            </td>
                            <td className="px-3 py-2 text-center font-bold text-slate-800">
                              {fmt(item.pts)}
                            </td>
                            <td className="px-3 py-2 text-center font-black text-slate-900">
                              {fmt(qtd)}
                            </td>
                            <td
                              className="px-3 py-2 text-center font-black"
                              style={{ color: info.cor }}
                            >
                              {fmt(item.pts * qtd)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })
          )}
        </div>

        {/* Resumo por requisito */}
        <div className="mb-8 page-break">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            III. Resumo de Pontuação
          </h2>
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-800 text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-black">Requisito</th>
                <th className="px-4 py-3 text-left font-black">Descrição</th>
                <th className="px-4 py-3 text-center font-black w-24">Itens</th>
                <th className="px-4 py-3 text-center font-black w-28">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {["I", "II", "III", "IV", "V", "VI"].map((req, i) => {
                const info = REQ_INFO[req];
                const pts = ptsPorReq[req] || 0;
                const itens = byReq[req]?.length || 0;
                return (
                  <tr key={req} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: info.cor }}
                        />
                        <span className="font-black text-xs" style={{ color: info.cor }}>
                          Req. {req}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{info.label}</td>
                    <td className="px-4 py-3 text-center font-bold text-slate-800">
                      {itens > 0 ? itens : "—"}
                    </td>
                    <td
                      className="px-4 py-3 text-center font-black"
                      style={{ color: pts > 0 ? info.cor : "#94a3b8" }}
                    >
                      {pts > 0 ? fmt(pts) : "—"}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-slate-800 text-white font-black">
                <td className="px-4 py-3 text-sm" colSpan={2}>
                  TOTAL GERAL
                </td>
                <td className="px-4 py-3 text-center text-sm">{totalItens}</td>
                <td className="px-4 py-3 text-center text-sm text-amber-400">
                  {fmt(totalPts)} pts
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Análise por nível */}
        <div className="mb-8 font-sans">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            IV. Análise por Nível RSC-PCCTAE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {NIVEIS.map((n) => {
              const pOk = totalPts >= n.minPts;
              const iOk = totalItens >= n.minItens;
              const rOk = !n.reqs || n.reqs.some((r) => reqsComPontos.has(r));
              const ok = pOk && iOk && rOk;
              const alvo = n.nome === nivelPleiteado;
              return (
                <div
                  key={n.nome}
                  className={`rounded-xl border-2 p-4 ${
                    ok
                      ? "border-emerald-500 bg-emerald-50"
                      : alvo
                      ? "border-amber-400 bg-amber-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 col-auto">
                    <span
                      className={`text-sm font-black ${
                        ok ? "text-emerald-700" : alvo ? "text-amber-700" : "text-slate-600"
                      }`}
                    >
                      {n.nome}
                    </span>
                    {ok ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : alvo ? (
                      <AlertCircle size={16} className="text-amber-500" />
                    ) : null}
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div
                      className={`flex items-center gap-1 ${
                        pOk ? "text-emerald-600 font-bold" : "text-slate-400"
                      }`}
                    >
                      {pOk ? "✓" : "✗"} {fmt(totalPts)}/{n.minPts} pts
                    </div>
                    <div
                      className={`flex items-center gap-1 ${
                        iOk ? "text-emerald-600 font-bold" : "text-slate-400"
                      }`}
                    >
                      {iOk ? "✓" : "✗"} {totalItens}/{n.minItens} itens
                    </div>
                    {n.reqs && (
                      <div
                        className={`flex items-center gap-1 ${
                          rOk ? "text-emerald-600 font-bold" : "text-slate-400"
                        }`}
                      >
                        {rOk ? "✓" : "✗"} Req. qualificador
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conclusão */}
        <div
          className={`rounded-2xl p-6 mb-8 border-2 ${
            aprovado ? "bg-emerald-50 border-emerald-400" : "bg-slate-50 border-slate-200"
          }`}
        >
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
            V. Conclusão da Autoavaliação
          </h2>
          {aprovado ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                Com base nos critérios declarados, o servidor <strong>{nome || "declarante"}</strong> atinge os requisitos mínimos para concessão do <strong>{nivelPleiteado}</strong>, nos termos do Art. 4º do Decreto regulamentador. Pontuação total apurada: <strong>{fmt(totalPts)} pontos</strong> em <strong>{totalItens} critérios específicos</strong>.
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              {nivelPleiteado
                ? `Com base nos critérios declarados, o servidor ainda não atinge os requisitos mínimos para concessão do ${nivelPleiteado}. Pontuação apurada: ${fmt(totalPts)} pts em ${totalItens} critérios.`
                : `Nenhum nível foi selecionado. Pontuação total apurada: ${fmt(totalPts)} pts em ${totalItens} critérios.`}
              {nivelAtingido && ` O nível máximo atingível com a pontuação atual é ${nivelAtingido.nome}.`}
            </p>
          )}
        </div>

        {/* Declaração e assinatura */}
        <div className="mb-8 border border-slate-200 rounded-xl p-5 text-xs text-slate-500 leading-relaxed">
          <p className="font-bold text-slate-700 mb-2">
            DECLARAÇÃO DE CONFORMIDADE (Art. 13, inciso I, alínea c)
          </p>
          <p>
            Declaro, para os devidos fins, que todas as atividades e produções descritas neste formulário são verídicas, ocorreram durante o exercício do cargo, e não foram utilizadas em concessões anteriores de RSC-PCCTAE, conforme exigido pelo Art. 13, inciso I, alínea c, do Decreto regulamentador. Estou ciente de que a comprovação documental de cada item é obrigatória para instrução do processo junto à CRSC-PCCTAE da instituição federal de ensino de lotação.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 mt-12 pt-6 border-t border-slate-200">
          <div className="text-center">
            <div className="border-b border-slate-400 mb-2 pb-6" />
            <p className="text-xs font-bold text-slate-600">{nome || "Servidor(a)"}</p>
            <p className="text-[10px] text-slate-400">
              {cargo || "Cargo"} — SIAPE {siape || "—"}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Assinatura do Servidor</p>
          </div>
          <div className="text-center">
            <div className="border-b border-slate-400 mb-2 pb-6" />
            <p className="text-xs font-bold text-slate-600">CRSC-PCCTAE</p>
            <p className="text-[10px] text-slate-400">Comissão para RSC-PCCTAE da Instituição</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Coordenador(a) / Carimbo</p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center text-[9px] text-slate-300 font-medium uppercase tracking-widest">
          RSC-PCCTAE — Autoavaliação Individual | Desenvolvido por Lucas Santana de Moura | Lei nº 11.091/2005 | Lei nº 15.367/2026 | Decreto MEC EMI nº 8/2026
        </div>
      </div>
    </div>
  );
}

import { Nivel, RequisitoInfo, Criterio } from "./types";

export const fmt = (n: number | string): string => {
  const num = typeof n === "string" ? parseFloat(n) : n;
  if (isNaN(num) || num === 0) return "0";
  return num % 1 === 0 ? String(num) : num.toFixed(1).replace(".", ",");
};

export const NIVEIS: Nivel[] = [
  {
    nome: "RSC-I", minPts: 10, minItens: 1, reqs: null,
    desc: "10 pts mínimos e 1 critério (qualquer requisito)"
  },
  {
    nome: "RSC-II", minPts: 15, minItens: 2, reqs: null,
    desc: "15 pts mínimos e 2 critérios (qualquer requisito)"
  },
  {
    nome: "RSC-III", minPts: 25, minItens: 2, reqs: null,
    desc: "25 pts mínimos e 2 critérios (qualquer requisito)"
  },
  {
    nome: "RSC-IV", minPts: 30, minItens: 3, reqs: ["II", "IV", "V", "VI"],
    desc: "30 pts mínimos, 3 critérios e ao menos 1 nos Req. II, IV, V ou VI"
  },
  {
    nome: "RSC-V", minPts: 52, minItens: 5, reqs: ["IV", "V", "VI"],
    desc: "52 pts mínimos, 5 critérios e ao menos 1 nos Req. IV, V ou VI"
  },
  {
    nome: "RSC-VI", minPts: 75, minItens: 7, reqs: ["VI"],
    desc: "75 pts mínimos, 7 critérios e ao menos 1 no Req. VI"
  },
];

export const REQ_INFO: Record<string, RequisitoInfo> = {
  I:   { label: "Grupos de Trabalho e Comissões",      cor: "#6366f1", bg: "#eef2ff" },
  II:  { label: "Projetos Institucionais",              cor: "#0ea5e9", bg: "#e0f2fe" },
  III: { label: "Premiações e Reconhecimentos",         cor: "#d97706", bg: "#fef3c7" },
  IV:  { label: "Responsabilidades Técnico-Adm.",       cor: "#10b981", bg: "#d1fae5" },
  V:   { label: "Funções e Cargos de Direção",          cor: "#8b5cf6", bg: "#ede9fe" },
  VI:  { label: "Produção e Difusão de Conhecimento",   cor: "#ef4444", bg: "#fee2e2" },
};

export const CRITERIOS: Criterio[] = [
  // ANEXO I
  { n: "I-1",   req: "I",   pts: 3,    unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de mandato como membro de conselhos superiores e conselhos de unidades e órgãos colegiados das instituições federais de ensino." },
  { n: "I-2",   req: "I",   pts: 4.5,  unid: "por designação",                       desc: "Coordenação ou presidência de núcleos, representações, grupos de trabalho ou similares, comissões ou comitês previstos no âmbito da administração pública, regularmente instituídos, ou reconhecidos pelo órgão ou pela entidade." },
  { n: "I-3",   req: "I",   pts: 3,    unid: "por designação",                       desc: "Participação como membro de núcleos, representações, grupos de trabalho ou similares, comissões ou comitês previstos no âmbito da administração pública, regularmente instituídos." },
  { n: "I-4",   req: "I",   pts: 15,   unid: "por designação",                       desc: "Participação como defensor dativo ou como membro de equipe designada em processos de apuração de materialidade e responsabilidade, como sindicância, processo administrativo disciplinar e tomada de contas especial." },
  { n: "I-5",   req: "I",   pts: 4.5,  unid: "por designação",                       desc: "Atuação em atividades de organização, fiscalização, execução de exame de seleção, vestibular ou concursos." },
  { n: "I-6",   req: "I",   pts: 3,    unid: "por designação",                       desc: "Atuação em atividades de elaboração, revisionamento ou correção de provas de exame de seleção, vestibular ou concursos." },
  { n: "I-7",   req: "I",   pts: 1.5,  unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de mandato em entidade sindical representativa da categoria." },
  { n: "I-8",   req: "I",   pts: 3,    unid: "por designação",                       desc: "Participação como membro em programas ou projetos de políticas públicas externas à instituição." },
  { n: "I-9",   req: "I",   pts: 7.5,  unid: "por designação",                       desc: "Representação legal da instituição ou responsabilidade técnica em órgãos de fiscalização, controle e regulação, ou em qualquer outra entidade pública." },
  { n: "I-10",  req: "I",   pts: 4.5,  unid: "por produto",                          desc: "Trabalho desenvolvido em órgãos estatais ou paraestatais, escolas de governo, agências reguladoras e organismos internacionais." },
  // ANEXO II
  { n: "II-1",  req: "II",  pts: 7.5,  unid: "por projeto",                          desc: "Coordenação de projetos institucionais (ensino, pesquisa, extensão, gestão e inovação)." },
  { n: "II-2",  req: "II",  pts: 4.5,  unid: "por projeto",                          desc: "Participação em atividades técnicas ou especializadas em projetos, incluindo a elaboração de projetos pedagógicos, programas ou ações institucionais (ensino, pesquisa, extensão, gestão e inovação)." },
  { n: "II-3",  req: "II",  pts: 7.5,  unid: "por mandato",                          desc: "Participação em comissão/conselho editorial de livros, revistas, publicações científicas ou outras publicações acadêmicas." },
  { n: "II-4",  req: "II",  pts: 3,    unid: "por projeto",                          desc: "Participação em atividade de cooperação técnica interinstitucional em projetos institucionais." },
  { n: "II-5",  req: "II",  pts: 3,    unid: "por designação",                       desc: "Participação em atividades de orientação, tutoria, preceptoria ou supervisão." },
  { n: "II-6",  req: "II",  pts: 3,    unid: "por produto",                          desc: "Participação em atividades de produção/reformulação de material acessível, técnico de referência (manuais, roteiros técnicos)." },
  { n: "II-7",  req: "II",  pts: 3,    unid: "por evento",                           desc: "Participação em atividade de avaliação de trabalho ou atuação como jurado em eventos acadêmicos, científicos, culturais, esportivos e técnicos." },
  { n: "II-8",  req: "II",  pts: 3,    unid: "por projeto",                          desc: "Participação em atividade institucional de produção audiovisual, artística, exposição, podcast ou outras formas de apresentação." },
  { n: "II-9",  req: "II",  pts: 3,    unid: "por capacitação",                      desc: "Participação em programas de formação continuada ou ações de desenvolvimento de competências (carga horária mínima de 10h), desde que não utilizada para aceleração da promoção na carreira." },
  { n: "II-10", req: "II",  pts: 1,    unid: "por ano ou fração acima de 6 meses",  desc: "Desempenho de atividade técnica de natureza especializada, com contribuição institucional relevante na área de atuação." },
  { n: "II-11", req: "II",  pts: 1,    unid: "por evento",                           desc: "Participação em congresso, simpósio, fórum, conferência, colóquio, mesa-redonda, workshop, seminário, mostra/feira, treinamento, ações de campo, saídas pedagógicas, eventos científicos/esportivos/artísticos/culturais/sindicais (carga horária mínima de 4h)." },
  // ANEXO III
  { n: "III-1", req: "III", pts: 20,   unid: "por prêmio",                           desc: "Recebimento de reconhecimento, menção honrosa ou premiação de âmbito internacional." },
  { n: "III-2", req: "III", pts: 15,   unid: "por prêmio",                           desc: "Recebimento de reconhecimento, menção honrosa ou premiação de âmbito nacional." },
  { n: "III-3", req: "III", pts: 7.5,  unid: "por prêmio",                           desc: "Recebimento de reconhecimento, menção honrosa ou premiação de âmbito local ou institucional, formalmente instituídos." },
  // ANEXO IV
  { n: "IV-1",  req: "IV",  pts: 4.5,  unid: "por sistema",                          desc: "Atuação diferenciada em atividades de execução/operação, desenvolvimento, colaboração nos sistemas estruturantes da administração pública." },
  { n: "IV-2",  req: "IV",  pts: 3,    unid: "por designação",                       desc: "Elaboração de projeto básico ou de termo de referência, ou participação como membro da equipe de planejamento da contratação." },
  { n: "IV-3",  req: "IV",  pts: 4.5,  unid: "por designação",                       desc: "Exercício de atividades de gestão ou fiscalização de contratos de aquisição, serviços, convênios e acordos ou instrumentos correlatos." },
  { n: "IV-4",  req: "IV",  pts: 3,    unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de atividades relacionadas a licitação e a respectivas excepcionalidades." },
  { n: "IV-5",  req: "IV",  pts: 3,    unid: "por ano ou fração acima de 6 meses",  desc: "Participação em atividades de apoio técnico especializado em políticas, programas e ações de promoção na área de saúde humana, animal e ambiente, de acessibilidade ou diversidade." },
  { n: "IV-6",  req: "IV",  pts: 3,    unid: "por ano ou fração acima de 6 meses",  desc: "Atuação em ambientes ou processos que demandem condições especiais de segurança, cuidado ou conformidade." },
  { n: "IV-7",  req: "IV",  pts: 3,    unid: "por designação",                       desc: "Atuação diferenciada em sistemas ou processos de trabalho institucionais no âmbito do ensino, pesquisa, extensão, gestão e inovação." },
  { n: "IV-8",  req: "IV",  pts: 4.5,  unid: "por ano ou fração acima de 6 meses",  desc: "Atuação como responsável formal por setor ou unidade, formalmente designado." },
  // ANEXO V
  { n: "V-1T",  req: "V",   pts: 9,    unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de Cargo de Direção (CD-02) ou equivalente — como TITULAR." },
  { n: "V-1S",  req: "V",   pts: 4.5,  unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de Cargo de Direção (CD-02) ou equivalente — como SUBSTITUTO." },
  { n: "V-2T",  req: "V",   pts: 7.5,  unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de Cargo de Direção (CD-03 e CD-04) ou equivalente — como TITULAR." },
  { n: "V-2S",  req: "V",   pts: 3,    unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de Cargo de Direção (CD-03 e CD-04) ou equivalente — como SUBSTITUTO." },
  { n: "V-3T",  req: "V",   pts: 4.5,  unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de Função Gratificada (FG-01 e FG-02) ou equivalente — como TITULAR." },
  { n: "V-3S",  req: "V",   pts: 1.5,  unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de Função Gratificada (FG-01 e FG-02) ou equivalente — como SUBSTITUTO." },
  { n: "V-4T",  req: "V",   pts: 3,    unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de Função Gratificada (a partir da FG-03) ou equivalente — como TITULAR." },
  { n: "V-4S",  req: "V",   pts: 1,    unid: "por ano ou fração acima de 6 meses",  desc: "Exercício de Função Gratificada (a partir da FG-03) ou equivalente — como SUBSTITUTO." },
  // ANEXO VI
  { n: "VI-1",  req: "VI",  pts: 30,   unid: "por patente",                          desc: "Carta Patente." },
  { n: "VI-2",  req: "VI",  pts: 25,   unid: "por projeto",                          desc: "Participação no desenvolvimento de protótipos, depósitos ou registros de propriedade intelectual ou privilégio de invenção." },
  { n: "VI-3",  req: "VI",  pts: 20,   unid: "por produto",                          desc: "Participação em transferência de tecnologia, licenciamento ou exploração de ativo tecnológico, como autor ou inventor." },
  { n: "VI-4",  req: "VI",  pts: 15,   unid: "por curso",                            desc: "Conclusão de curso de educação formal superior ao exigido para o ingresso no cargo de que é titular e que não seja utilizado para percepção do atual nível de Incentivo à Qualificação – IQ." },
  { n: "VI-5",  req: "VI",  pts: 15,   unid: "por produto",                          desc: "Participação na implantação ou desenvolvimento de produto, projeto, processo, técnica ou tecnologia de interesse institucional." },
  { n: "VI-6",  req: "VI",  pts: 15,   unid: "por certificado",                      desc: "Certificação profissional por órgão ou entidade competente demonstrando domínio de conhecimento técnico na área de atuação." },
  { n: "VI-7",  req: "VI",  pts: 7.5,  unid: "por grupo de pesquisa",               desc: "Atuação em atividade de liderança ou vice-liderança de grupo de pesquisa ou extensão registrada." },
  { n: "VI-8",  req: "VI",  pts: 3,    unid: "por projeto",                          desc: "Participação como membro em grupo de pesquisa devidamente registrado em órgão ou sistema oficial de reconhecimento institucional." },
  { n: "VI-9",  req: "VI",  pts: 7.5,  unid: "por projeto",                          desc: "Aprovação de projeto para a captação de recursos." },
  { n: "VI-10", req: "VI",  pts: 20,   unid: "por produto",                          desc: "Publicação ou organização de livro (com ISBN e Conselho Editorial)." },
  { n: "VI-11", req: "VI",  pts: 7.5,  unid: "por publicação",                       desc: "Autoria ou coautoria de capítulo de livro, de artigo publicado em revista especializada, jornal científico ou periódico." },
  { n: "VI-12", req: "VI",  pts: 4.5,  unid: "por produto",                          desc: "Apresentação de trabalho em congresso, seminário ou outros eventos." },
  { n: "VI-13", req: "VI",  pts: 4.5,  unid: "por produto",                          desc: "Produção de material técnico, científico, metodológico ou administrativo estruturado que visa à difusão do conhecimento." },
  { n: "VI-14", req: "VI",  pts: 4.5,  unid: "por projeto",                          desc: "Participação em atividade de avaliação do projeto de ensino, pesquisa, extensão ou inovação." },
  { n: "VI-15", req: "VI",  pts: 3,    unid: "por evento",                           desc: "Participação em atividade de difusão ou apoio à formação institucional (expositor, facilitador, colaborador)." },
  { n: "VI-16", req: "VI",  pts: 4.5,  unid: "por curso",                            desc: "Atuação como instrutor, tutor, palestrante, autor técnico ou orientador em ação formativa estruturada." },
  { n: "VI-17", req: "VI",  pts: 4.5,  unid: "por evento",                           desc: "Atuação na coordenação/mediação de fórum, congresso, mesa-redonda, simpósio, seminário, oficina e outros eventos." },
  { n: "VI-18", req: "VI",  pts: 7.5,  unid: "por orientação",                       desc: "Exercício de atividade de orientação ou coorientação de trabalho de conclusão de curso em diferentes modalidades de ensino." },
  { n: "VI-19", req: "VI",  pts: 3,    unid: "por produto",                          desc: "Autoria de obra artística ou cultural registrada." },
  { n: "VI-20", req: "VI",  pts: 1,    unid: "por mês",                              desc: "Atuação no enfrentamento de situações de surto, epidemias e pandemia." },
];

export const PRINT_CSS = `
  @media print {
    @page { 
      size: A4; 
      margin: 15mm 15mm 15mm 15mm; 
    }
    
    html, body { 
      width: 100% !important;
      height: auto !important;
      background-color: white !important;
      color: #0f172a !important;
      -webkit-print-color-adjust: exact !important; 
      print-color-adjust: exact !important; 
      font-size: 11px !important;
    }
    
    .no-print { 
      display: none !important; 
    }
    
    .print-doc { 
      display: block !important; 
      padding: 0 !important; 
      margin: 0 !important; 
      width: 100% !important; 
      max-width: 100% !important; 
      box-shadow: none !important; 
      border: none !important;
      background: white !important;
    }
    
    /* Perfect column and wrapping flows for printable tables */
    .overflow-x-auto {
      overflow: visible !important;
      overflow-x: visible !important;
      border: none !important;
    }
    
    table { 
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      table-layout: auto !important;
      border-collapse: collapse !important;
      font-size: 9px !important; 
    }
    
    th, td { 
      word-break: break-word !important;
      white-space: normal !important;
      padding: 5px 6px !important;
    }
    
    th {
      background-color: #f1f5f9 !important;
      color: #334155 !important;
    }
    
    tr {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    .page-break { 
      page-break-inside: avoid !important;
      break-inside: avoid !important; 
    }
    
    /* Optimize spacing to avoid blank overflow pages */
    .mb-8 { margin-bottom: 15px !important; }
    .mb-6 { margin-bottom: 12px !important; }
    .mt-12 { margin-top: 20px !important; }
    .pb-6 { padding-bottom: 6px !important; }
    .py-8 { padding-top: 0px !important; padding-bottom: 0px !important; }
    
    h1 { font-size: 16px !important; margin-bottom: 2px !important; }
    h2 { font-size: 10px !important; margin-top: 10px !important; margin-bottom: 4px !important; }
    p { line-height: 1.3 !important; }
  }
  @media screen {
    .print-doc { display: block; }
  }
`;

export interface Nivel {
  nome: string;
  minPts: number;
  minItens: number;
  reqs: string[] | null;
  desc: string;
}

export interface RequisitoInfo {
  label: string;
  cor: string;
  bg: string;
}

export interface Criterio {
  n: string;
  req: string;
  pts: number;
  unid: string;
  desc: string;
}

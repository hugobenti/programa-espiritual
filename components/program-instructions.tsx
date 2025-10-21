import React, { useMemo, useState } from "react";

// Texto da oração (mantido igual ao livreto)
const ORACAO = `SENHOR,\nTU PODES TODAS AS COISAS.\nTU PODES CONCEDER-ME A GRAÇA QUE TANTO ALMEJO.\nCRIA, SENHOR,\nAS POSSIBILIDADES PARA A REALIZAÇÃO DO MEU DESEJO,\nEM NOME DE JESUS, AMÉM.`;

// Passos principais
const TRES_PONTOS: { titulo: string; conteudo: React.ReactNode }[] = [
  {
    titulo: "Pergunte a si mesmo",
    conteudo: (
      <p className="text-slate-700">
        O que desejo é justo? Se puder responder afirmativamente faça então, a
        DEUS, a seguinte oração:
      </p>
    ),
  },
  {
    titulo: "Imagine firmemente",
    conteudo: (
      <p className="text-slate-700">
        Que seu desejo já está se materializando. Crie em sua mente a imagem de
        seu desejo realizado. A cada dia tente ver o seu desejo com mais clareza
        e mais detalhes.
      </p>
    ),
  },
  {
    titulo: "Entregue a Deus",
    conteudo: (
      <p className="text-slate-700">
        Coloque então nas mãos de Deus a realização de seu desejo e siga as
        orientações do TODO PODEROSO. Tente entender os sinais que chegam até
        você no cotidiano da sua vida. Pratique a crença e sustente firme no
        pensamento aquilo que idealizou. Faça isso e ficará surpreso pelos
        caminhos estranhos através dos quais se materializará seu ideal.
      </p>
    ),
  },
];

// Checklist das instruções
const CHECKLIST = [
  "Leia todas as afirmativas de uma vez para entender o conteúdo delas e gravar seu conceito no espírito.",
  "Depois, começando por um Domingo, leia uma afirmativa a cada dia.",
  "Procure memorizar o que leu.",
  "Durante o dia repita a afirmativa a fim de gravá-la no espírito.",
  "Afirme sempre que acredita na veracidade destas palavras.",
];

export default function ProgramInstructions() {
  const oracaoMultilinha = useMemo(
    () =>
      ORACAO.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      )),
    []
  );

  return (
    <div className=" flex flex-col justify-center items-center px-4 sm:px-8">
      <div className="max-w-2xl mt-8">
        <div className="prose prose-stone mx-auto text-left border rounded-lg p-4 bg-amber-100">
          <p className="text-lg">Atenção!</p>
          <p className="text-base font-medium">
            Não ponha em dúvida os conceitos aqui apresentados. Há em nosso
            espírito todos os recursos de que necessitamos para a solução de
            nossos problemas. As idéias acham-se presentes em nosso inconsciente
            e quando libertadas pela força da oração podem conduzir-nos ao êxito
            de qualquer projeto.
          </p>
        </div>

        <div className="pt-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Para receber as graças que deseja concentre-se em três pontos:
          </h2>
          <ol className="mt-4 space-y-6">
            {TRES_PONTOS.map((p, idx) => (
              <li
                key={idx}
                className="group py-4 md:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      {p.titulo}
                    </h3>
                    <div className="mt-2 leading-relaxed">{p.conteudo}</div>
                    {idx === 0 && (
                      <blockquote
                        className="mt-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 md:p-5"
                        aria-label="Oração"
                      >
                        <p className="font-semibold text-slate-900">Oração</p>
                        <p className="mt-2 whitespace-pre-wrap font-medium tracking-wide text-slate-800 uppercase">
                          {oracaoMultilinha}
                        </p>
                      </blockquote>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Observação */}
        <div className="border-t border-slate-100 p-6 md:p-8 bg-slate-50/50">
          <h2 className="text-xl font-semibold text-slate-900">Observação</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            A oração contida no 1º ponto deverá ser repetida diariamente, várias
            vezes. Tantas vezes quantas forem possíveis repetir. Aproveite todos
            os momentos disponíveis para fazê-la. Concentre-se por alguns
            segundos e repita com fé.
          </p>
          <blockquote
            className="mt-4 rounded-xl border border-slate-200 bg-white p-4 md:p-5"
            aria-label="Oração (repetição)"
          >
            <p className="mt-1 whitespace-pre-wrap font-medium tracking-wide text-slate-800 uppercase">
              {oracaoMultilinha}
            </p>
          </blockquote>
        </div>

        {/* Instruções */}
        <div className="border-t border-slate-100 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Instruções</h2>
          <ul className="mt-4 space-y-3">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300"
                >
                  <span className="h-3 w-3 rounded-sm bg-slate-900"></span>
                </span>
                <p className="text-slate-700 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

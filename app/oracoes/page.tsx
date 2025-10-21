"use client";

import { useMemo } from "react";

type Prayer = { title: string; content: string };

// 🔎 Normaliza e transforma o content em blocos (parágrafos/linhas)
function useFormattedContent(content: string) {
  return useMemo(() => {
    if (!content) return [];

    // 1) Normaliza quebras: aceita \r\n, \n e também "/n"
    const normalized = content.replace(/\r\n/g, "\n").replace(/\/n/g, "\n"); // suporta "/n" vindo de fontes externas

    // 2) Parágrafos: duas quebras indicam novo parágrafo
    const paragraphs = normalized
      .split(/\n{2,}/) // separa por linhas em branco
      .map((p) => p.trim())
      .filter(Boolean);

    // 3) Para cada parágrafo, linhas únicas viram <br/>
    const blocks = paragraphs.map((p) => p.split(/\n/));

    return blocks; // string[][]
  }, [content]);
}

function PrayerCard({ prayer }: { prayer: Prayer }) {
  const blocks = useFormattedContent(prayer.content);

  return (
    <article className="rounded-2xl border bg-background p-5 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight">{prayer.title}</h2>

      <div className="mt-3 leading-relaxed text-pretty">
        {blocks.map((lines, i) => (
          <p key={i} className="indent-6">
            {lines.map((line, j) => (
              <span key={j}>
                {line}
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        ))}
      </div>
    </article>
  );
}

const PRAYERS: Prayer[] = [
  {
    title: "ORAÇÃO DA MANHÃ",
    content: `SENHOR, no silêncio deste dia que amanhece, venho pedir-TE a paz, a sabedoria, a força.\n
Quero ver hoje o mundo com os olhos cheios de amor, ser paciente, compreensivo, calmo e prudente. Ver além das aparências, TEUS filhos como TU mesmo os vê, e assim, não ver senão o bem em cada um.\n
Cerra meus ouvidos de toda calúnia.\n
Guarda minha fala de toda maldade.\n
Que só de bênçãos se encha meu espírito, e que todos que a mim se achegarem sintam a TUA presença.\n
Reveste-me de TUA beleza, SENHOR, e que no decurso deste dia, eu TE revele a todos.`,
  },
  {
    title: "ORAÇÃO AO ESPÍRITO SANTO",
    content: `Ó Espírito Santo, renovai-nos sempre com os Vossos dons.\n
Dai-nos o dom da Sabedoria para que possamos ser dirigidos e orientados por Vós;\n
Dai-nos o dom do Entendimento para que sejamos iluminados e guiados em nossas decisões;\n
Dai-nos o dom da Fortaleza para que encontremos força constante, nas dificuldades;\n
Dai-nos o dom do discernimento para que conheçamos os caminhos e as ações de Deus na nossa vida e possamos sempre fazer o Dinos o dom da Fé para que sempre nos dirijamos a Deus, com confiança filial;\n
Divino Espirito Santo, concedei-nos, com o Vosso auxilio, glorificar a Deus, agora e sempre. Amém.\n
Pe Oliveiros de Jesus Reis`,
  },
  {
    title: "CONVITE AO SENHOR",
    content: `SENHOR JESUS, eu vos convido a entrar em meu coração, minha alma, meu corpo e minha mente. Peço-VOS que caminheis comigo em minha jornada por este mundo repleto de contradições e áreas críticas que precisam ser melhoradas. Ajuda-me a ficar sempre em união CONTIGO e com o ESPÍRITO SANTO. Que minha vontade se una à VOSSA para que minhas atitudes façam a vontade de nosso PAl todo poderoso.`,
  },
  {
    title: "PARA FALAR COM DEUS",
    content: `Há momentos em que pensamos que Deus nos esqueceu. Mas Ele está sempre ao nosso lado, esperando que o busquemos em oração.\n
A oração mais eficiente é uma conversa interior com DEUS. Aquela em que a gente se liga a ELE por alguns instantes e fala com o coração, de maneira simples e verdadeira.\n
Esta é a forma que temos para chegar até Deus. É um dom muito especial e assertivo que ELE nos deu.\n
A oração pode nos ajudar a encontrar qualquer direção que desejamos para a\n
nossa vida.\n
E o mais importante: Se as coisas não estão acontecendo como a desejamos, podemos ter a certeza que Deus esta nos levando para uma alternativa bem melhor.`,
  },
  {
    title: "CONVERSANDO COM DEUS",
    content: `Senhor DEUS, peço bênçãos para minha vida e a de todos aqueles que amo. Que TUA divina luz brilhe sobre nós e nos proteja de todo mal e perigo ao nosso redor.\n
Com TEU poder, desfaça as barreiras que possam nos impedir de avançar e com a TUA virtude penetra todos o caminhos da nossa vida para mantê-los cheio de luz, energia, humildade, caridade e abundância.\n
SENHOR, dirija meus passos, para que eu siga com integridade e honestidade.\n
Abençoe sempre o meu viver, meu lar e minhas ações.\n
Me entrego em TUAS poderosas mãos, na certeza de que tudo posso alcançar, pois tudo o que faço é para merecer o TEU amor.\n
Agradeço Senhor, por tudo aquilo que já recebi e por tudo que ainda estou por receber.`,
  },
  {
    title: "BENÇÃO PARA O LAR",
    content: `DEUS PAI, criador de todas as coisas, invocamos o TEU Espírito Santo sobre o nosso lar e todos os seus moradores.\n
Que TEUS anjos, nossos zelosos guardadores, nos protejam de todos os perigos e nos reguem sempre com a TUA paz e serenidade.\n
Afaste de nós qualquer divisão e falta de fé. Que seja constante a TUA presença em nossa vida e em nossos corações, guardando-nos na TUA luz.\n
Abençoa este lar e todos os que visitam. Por CRISTO, nosso SENHOR.\n
Amém.`,
  },
  {
    title: "ORAÇÃO DA NOITE",
    content: `SENHOR, no silêncio deste dia que termina entrego a TI o meu cansaço.\n
Agradeço pela esperança que hoje animou meus passos, pela alegria e paz que vi no rosto das pessoas ao meu redor.\n
Agradeço pelos inúmeros exemplos e lições que hoje recebi dos meus irmãos.\n
Obrigado por me dar força naqueles momentos de desânimo ou de problemas que tive que superar, lembrando-me que TU és meu PAI.\n
Obrigado pela luz, pelo alimento, pela brisa e pelo meu desejo de superação.\n
Peço também o TEU perdão, SENHOR:\n
Por meu semblante às vezes fechado, por minha impaciência, e por não me lembrar que não sou TEU único filho, mas irmão de muitos.\n
Perdão, SENHOR, pela minha falta de compreensão e por não ter evitado as lágrimas diante de um banal dissabor.\n
Perdoa-me PAI, e abençoa os meus propósitos para o dia de amanhã e que ao despertar, me invada o entusiasmo e uma nova alegria de viver.\n
Peço PAI, zele por meu descanso. Amém.`,
  },

  {
    title: "AGRADECIMENTO",
    content: `SENHOR, agradeço-TE hoje e sempre por tudo que sou e por tudo que tenho, por minha família, meus amigos e pelos bons e maus momentos dos meus dias.
Agradeço por tudo que deu certo em minha vida e por todos os meus erros e fracassos, pois foi através deles e com TUA ajuda que aprendi a transformá-los em acertos e vitórias.
CODODO`,
  },

  {
    title: 'PARÁFRASE DO "PAI NOSSO"',
    content: `Se em minha vida não ajo como filho de Deus, fechando meu coração ao amor, será inútil dizer: Pai Nosso.\n
Se os meus valores são representados pelos bens da Jerra, será inútil dizer: Que estais no céu\n
Se penso apenas em ser cristão por medo, superstição ou comodismo, será inútil dizer:\n
Santificado seja o vosso nome\n
Se acho tão sedutora a vida aqui, cheia de supérfluos e futilidades, será inútil dizer: Venha a nós o vosso reino.\n
Se no fundo eu quero mesmo é que todos os meus desejos se realizem e o resto que se dane, será\n
inutil dizer: Seja feita a uossa wontade.\n
Se preiro acumular riquezas, despresando meus irmãos que passam fome, será inútil dizer:O pão nosso de cada dia nos dai hoje.\n
Se não importo em ferir, injustiçar, oprimir e magoar aos que atravessam meu caminho, será inútil dizer: Perdoai as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido.\n
Se escolho sempre o caminho mais fácil, que nem sempre é o mais correto, será inútil dizer:\n
Enão nos deixeis cair em tentação.\n
Se por vontade procuro ou me deixo seduzir pelos prazeres materiais que prejudicam e afetam outras pessoas, será inútil dizer:\n
Lierai-nos do mal\n
E sabendo que sou assim, tão fraco, continuo me omitindo e nada faço para me modificar, será inútil dizer: Amém.`,
  },
];

export default function OracoesPage() {
  return (
    <main className="mx-auto  md:px-40 px-6 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Orações</h1>
      </header>

      <section className="space-y-6 gap-6 grid md:grid-cols-2 ">
        {PRAYERS.map((p, idx) => (
          <PrayerCard key={`${p.title}-${idx}`} prayer={p} />
        ))}
      </section>
    </main>
  );
}

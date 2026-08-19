# Deysiane Ride

PROMPT COMPLETO — MINI APP DEYSIANE UBER PARTICULAR

Crie do zero um mini aplicativo web de solicitação de corridas particulares, extremamente simples, rápido, bonito e pensado principalmente para celular.

Nome:

Deysiane Uber Particular

WhatsApp oficial:

34 99840-2888

Link oficial:

https://wa.link/ptzng7

Número internacional para geração dinâmica da mensagem:

5534998402888

Utilizar a logomarca oficial Deysiane Uber Particular que será enviada ao projeto.

IMPORTANTE:

Não redesenhar, reinterpretar ou alterar a escrita da logo.

A escrita correta é:

Deysiane Uber Particular



OBJETIVO DO APLICATIVO

O aplicativo tem somente uma função principal:

Local de partida → Destino → Solicitar corrida → WhatsApp

Não criar:

cadastro;

login de cliente;

área de cliente;

pagamento;

fidelidade;

várias categorias;

agendamento escolar;

formulários grandes;

telas desnecessárias.

Quero um mini aplicativo rápido para facilitar o dia a dia da motorista.



IDENTIDADE VISUAL

Criar uma interface profissional e elegante.

Paleta:

Preto como fundo principal

Grafite nos cards

Rosa pink/neon nos destaques

Branco para textos

Verde apenas para WhatsApp ou status disponível

Visual moderno relacionado a mobilidade.

Usar:

sombras suaves;

bordas arredondadas;

detalhes rosa;

pequenos efeitos luminosos;

ícones modernos;

mapa integrado;

animações discretas.

Evitar aparência infantil.

Não exagerar no neon.



CABEÇALHO

No topo:

Logo oficial Deysiane Uber Particular

Ao lado ou abaixo colocar indicador:

🟢 Disponível

Criar uma pequena frase:

Peça sua corrida com segurança e praticidade.

Texto menor:

Informe seu local de partida e para onde deseja ir.

Não colocar textos demais.



CARD PRINCIPAL

Criar um card elegante em grafite/preto levemente mais claro que o fundo.

Dentro dele colocar somente dois campos.

CAMPO 1

Título:

Local de partida

Campo GRANDE com:

fundo totalmente branco;

texto digitado preto;

cursor rosa;

ícone de localização rosa;

bordas arredondadas.

IMPORTANTE:

O campo onde o usuário digita deve ser BRANCO.

Não utilizar fundo preto ou grafite dentro dos campos.

O texto digitado precisa ficar perfeitamente visível.

Placeholder simples:

Digite seu local de partida



CAMPO 2

Título:

Para onde você vai?

Mesmo estilo:

fundo branco;

texto preto;

ícone de destino rosa;

bordas arredondadas.

Placeholder:

Digite seu destino

Não colocar exemplos embaixo.

Não escrever:

“hospital”, “supermercado”, “rua”, “escola” etc.

A tela precisa ficar limpa.



GPS DO CELULAR

Ao abrir o aplicativo, solicitar autorização para acessar a localização do dispositivo.

Utilizar:

navigator.geolocation

Quando autorizado:

obter latitude e longitude do usuário.

Depois fazer reverse geocoding para identificar:

cidade;

estado;

bairro;

região atual.

Essa informação deve ser usada para melhorar automaticamente a busca dos dois campos.

Não precisa preencher obrigatoriamente o campo com a localização atual.

O principal objetivo do GPS é entender:

“Em qual cidade esta pessoa está pesquisando?”



PESQUISA INTELIGENTE DE ENDEREÇOS

Esta é uma das funções MAIS IMPORTANTES.

Integrar um serviço REAL de mapas e lugares.

Preferencialmente:

Google Maps Platform + Places Autocomplete

ou outro serviço real equivalente que ofereça:

autocomplete;

geocoding;

estabelecimentos;

endereços;

ruas;

números;

coordenadas.

NÃO criar resultados fictícios.

NÃO usar lista mockada.



PRIORIZAR A CIDADE ATUAL

Se o GPS identificar, por exemplo:

Patrocínio - MG

quando a pessoa começar a digitar:

Rua Presidente…

o autocomplete deve priorizar primeiro:

ruas existentes em Patrocínio - MG.

Não quero que os primeiros resultados sejam cidades distantes.

Utilizar a latitude e longitude do GPS como:

location bias

na pesquisa.

Também restringir preferencialmente os resultados para:

Brasil

country:

BR



BUSCAR RUA ENQUANTO DIGITA

Não esperar a pessoa terminar de escrever.

A partir dos primeiros caracteres, começar a mostrar sugestões.

Exemplo:

Usuário digita:

Rua Joaquim

Mostrar imediatamente possíveis ruas próximas.

Abaixo de cada resultado mostrar:

Nome

e abaixo:

endereço completo

Exemplo visual:

📍 Rua Joaquim Carlos
Centro, Patrocínio - MG



NÚMERO DO ENDEREÇO

Permitir pesquisar também endereço com número.

Exemplo:

Rua Joaquim Carlos 120

A busca deve tentar localizar:

rua + número + cidade atual.

Se o usuário selecionar primeiro a rua e depois acrescentar número, atualizar/geocodificar o endereço completo.

Não limitar o autocomplete apenas a estabelecimentos.

Precisa funcionar muito bem para:

ruas residenciais + número.



COMÉRCIOS E PONTOS CONHECIDOS

Também permitir localizar estabelecimentos.

Se a pessoa começar a escrever o nome de:

comércio;

mercado;

restaurante;

hospital;

clínica;

escola;

empresa;

praça;

rodoviária;

ponto conhecido;

mostrar resultados próximos da localização atual.

A cidade identificada pelo celular deve ser usada para priorizar esses resultados.



LISTA DE SUGESTÕES

As sugestões devem aparecer logo abaixo do campo digitado.

Design:

fundo branco;

texto principal preto;

endereço secundário cinza;

ícone rosa;

separadores discretos.

Quando tocar em um resultado:

preencher o campo.

Salvar também:

nome;

endereço formatado;

latitude;

longitude.



MAPA

Abaixo dos campos colocar um mapa integrado.

O mapa deve ser bonito, mas não muito alto.

Ao abrir:

centralizar aproximadamente na cidade atual.

Depois de selecionar o local de partida:

mostrar marcador:

📍 Partida

Depois de selecionar o destino:

mostrar marcador:

🏁 Destino

Quando os dois estiverem definidos:

desenhar a rota entre eles.

Ajustar automaticamente o zoom para mostrar os dois pontos.



BOTÃO SOLICITAR CORRIDA

Criar um grande botão rosa:

SOLICITAR CORRIDA

Ícone de carro.

Enquanto os dois endereços não estiverem selecionados corretamente:

deixar o botão desativado.

Depois que:

Local de partida + Destino

estiverem preenchidos corretamente:

ativar o botão.



ENVIO DIRETO PARA O WHATSAPP

Esta função precisa FUNCIONAR DE VERDADE.

Não criar segunda tela.

Não criar confirmação adicional.

Ao clicar:

SOLICITAR CORRIDA

abrir imediatamente o WhatsApp da Deysiane.

Usar:

5534998402888

para criar dinamicamente a mensagem.

O link:

https://wa.link/ptzng7

pode continuar disponível como botão simples de WhatsApp.

PORÉM:

para o botão SOLICITAR CORRIDA, montar dinamicamente uma URL do WhatsApp que aceite mensagem personalizada.

Utilizar uma estrutura equivalente a:

https://wa.me/5534998402888?text=MENSAGEM_CODIFICADA

Gerar a mensagem usando:

encodeURIComponent()

para evitar erros de acentuação, espaços ou emojis.



MENSAGEM AUTOMÁTICA

Enviar exatamente em um formato bonito e simples:

Olá, Deysiane! Desejo solicitar uma corrida. 🚗

📍 Local de partida:
[ENDEREÇO SELECIONADO]

🏁 Destino:
[DESTINO SELECIONADO]

Substituir automaticamente:

[ENDEREÇO SELECIONADO]

e

[DESTINO SELECIONADO]

pelos dados reais escolhidos pelo usuário.

Não deixar os textos entre colchetes na mensagem final.



EMOJIS DO WHATSAPP

Não usar ícones personalizados ou caracteres desconhecidos dentro da mensagem.

Usar SOMENTE emojis Unicode padrão amplamente suportados:

🚗

📍

🏁

Não converter emojis para ícones gráficos.

Não utilizar fontes de ícones dentro do texto enviado ao WhatsApp.

Montar a mensagem como string Unicode normal e depois utilizar:

encodeURIComponent()

Isso deve evitar aparecer:



ou quadrados/pontos de interrogação no WhatsApp.



BOTÃO WHATSAPP SECUNDÁRIO

Abaixo do botão principal colocar discretamente:

Falar com a Deysiane

Com ícone oficial do WhatsApp.

Esse botão pode utilizar diretamente:

https://wa.link/ptzng7



VISUAL MAIS PROFISSIONAL

A interface não deve ficar simples demais.

Adicionar detalhes discretos relacionados a mobilidade:

linha gráfica representando uma rota;

pequenos pins;

efeito rosa ao redor do botão principal;

detalhe de estrada no fundo;

silhueta discreta de carro;

pequenos pontos de mapa.

Não atrapalhar a leitura.

A interface continua minimalista.



ESTRUTURA VISUAL DA TELA

A tela deve seguir aproximadamente esta ordem:

LOGO DEYSIANE UBER PARTICULAR

🟢 Disponível

Peça sua corrida com segurança e praticidade.

Local de partida

[ CAMPO BRANCO ]

Para onde você vai?

[ CAMPO BRANCO ]

[ MAPA ]

SOLICITAR CORRIDA

Falar com a Deysiane



RESPONSIVIDADE

Prioridade total para:

smartphones Android e iPhone.

A interface deve se adaptar perfeitamente.

Não permitir:

elementos cortados;

mapa saindo da tela;

botão escondido;

texto minúsculo;

campos difíceis de tocar.

Botões e inputs devem ser grandes e confortáveis.



PWA

Preparar o projeto como PWA instalável.

Nome:

Deysiane Uber

Ícone:

logo oficial.

Splash screen:

fundo preto + logo centralizada.



TRATAMENTO DE ERROS

Se a pessoa negar acesso ao GPS:

não bloquear o aplicativo.

Mostrar discretamente:

Localização não autorizada. Digite seu endereço normalmente.

A pesquisa deve continuar funcionando.

Se não encontrar a rua:

permitir digitar:

rua + número + cidade

e pesquisar novamente.

Se o GPS estiver disponível:

sempre priorizar resultados próximos da cidade atual.



IMPORTANTE PARA A BUSCA

Não fazer simplesmente uma pesquisa textual genérica.

O comportamento desejado é:

GPS → identifica cidade atual → usuário começa a digitar → autocomplete prioriza lugares daquela cidade.

Exemplo:

Celular localizado em:

Patrocínio - MG

Usuário começa a escrever:

Avenida Faria…

O aplicativo deve priorizar endereços existentes próximos de:

Patrocínio - MG

e não mostrar primeiro resultados de São Paulo, Rio de Janeiro ou outras cidades.



EXPERIÊNCIA FINAL

O usuário deve conseguir fazer tudo praticamente em uma única tela:

1. Abrir o app

2. GPS identifica a cidade

3. Digitar a rua de partida

4. Escolher a sugestão correta

5. Digitar o destino

6. Escolher a sugestão correta

7. Visualizar a rota no mapa

8. Tocar em SOLICITAR CORRIDA

9. WhatsApp abre com a mensagem pronta

Sem cadastro.

Sem burocracia.

Sem telas extras.

Sem precisar digitar novamente os endereços.



REGRA FINAL

Não criar funcionalidades adicionais além das solicitadas.

O objetivo é fazer um mini aplicativo elegante de corridas particulares para:

Deysiane Uber Particular

com foco absoluto em:

GPS + ENDEREÇO INTELIGENTE + MAPA + WHATSAPP.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/301b14d9-749f-4bee-92f3-5fe0d40dda9c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

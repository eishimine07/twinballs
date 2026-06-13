# Twinballs — Especificação do Jogo

Documento de referência completo para recriar o Twinballs em qualquer tecnologia.

---

## Visão Geral

Twinballs é um jogo de puzzle em que o jogador controla **duas bolas simultaneamente**. Ambas se movem sempre na mesma direção ao mesmo tempo. O objetivo é posicionar as duas bolas nas **posições vencedoras** do nível.

---

## Tabuleiro (Board)

| Propriedade        | Valor |
|--------------------|-------|
| Largura total      | 28 unidades |
| Altura total       | 24 unidades |
| Tamanho de célula  | 2 × 2 unidades |
| Colunas jogáveis   | 12 (x = 2, 4, 6, …, 24) |
| Linhas jogáveis    | 10 (y = 2, 4, 6, …, 20) |

### Sistema de Coordenadas

- Origem `(0, 0)` no canto **superior esquerdo**
- Eixo X cresce para a **direita**
- Eixo Y cresce para **baixo**
- Todas as posições válidas são múltiplos de 2

### Bordas (Walls)

As bordas são paredes invisíveis que cercam o tabuleiro inteiro:

- **Parede esquerda:** toda a coluna `x = 0`
- **Parede direita:** toda a coluna `x = 26`
- **Parede superior:** toda a linha `y = 0`
- **Parede inferior:** toda a linha `y = 22`

As bolas não podem entrar nas bordas. Se um movimento levaria qualquer bola a colidir com uma borda, **nenhuma bola se move**.

---

## Elementos do Jogo

### Bolas (Twin Balls)

Sempre existem exatamente **2 bolas** por nível. Cada bola tem:

| Propriedade | Tipo | Valores possíveis |
|-------------|------|-------------------|
| `position`  | `{x, y}` | Coordenada no tabuleiro |
| `effect`    | enum | `NONE`, `FAST`, `REVERSE` |

#### Efeitos das Bolas

| Efeito    | Passo por movimento |
|-----------|---------------------|
| `NONE`    | 1 célula (2 unidades) |
| `FAST`    | 2 células (4 unidades) |
| `REVERSE` | −1 célula (move na direção oposta à pressionada) |

Os efeitos **persistem** entre movimentos. Uma bola mantém seu efeito atual até pisar em um pad que o altere.

---

### Blocos (Blocks)

Obstáculos estáticos que bloqueiam o caminho das bolas.

| Propriedade | Tipo | Valor |
|-------------|------|-------|
| `type`      | enum | `NORMAL` |
| `position`  | `{x, y}` | Posição no tabuleiro |

Blocos do tipo `NORMAL` são sólidos e impedem o movimento.

---

### Pads (Tiles Especiais)

Tiles no chão que alteram o efeito de uma bola quando ela **pousa** sobre eles.

| Tipo      | Efeito aplicado | Observação |
|-----------|-----------------|------------|
| `FAST`    | `FAST`          | A bola passa a se mover 2 células por turno |
| `REVERSE` | `REVERSE`       | A bola passa a se mover na direção oposta. **Exceção:** se a bola já tem efeito `REVERSE`, o efeito é cancelado e ela volta a `NONE` |
| `WIN`     | `NONE`          | Tile de vitória (posição vencedora visual) |

> **Regra de pad:** O efeito só é aplicado quando a bola **para** naquele tile. A bola não precisa começar no pad para ter um efeito — o efeito é atualizado após cada movimento.

> **Sem pad:** Se a bola se move para uma célula que não tem pad, ela **mantém** o efeito atual.

---

### Posições Vencedoras (Winning Positions)

Lista de exatamente **2 posições** `{x, y}`. O nível é concluído quando:

- A **Bola 1** está em qualquer uma das posições vencedoras, E
- A **Bola 2** está em qualquer uma das posições vencedoras (posições distintas)

A verificação ocorre **após cada movimento bem-sucedido**.

---

## Controles

| Tecla(s)             | Ação       |
|----------------------|------------|
| `W` ou `ArrowUp`     | Mover para cima |
| `S` ou `ArrowDown`   | Mover para baixo |
| `A` ou `ArrowLeft`   | Mover para esquerda |
| `D` ou `ArrowRight`  | Mover para direita |

Tecla com `dedupe`: manter a tecla pressionada não dispara múltiplos movimentos contínuos — cada pressionamento gera exatamente 1 movimento.

---

## Regras de Movimento

A cada pressionamento de tecla, o seguinte algoritmo é executado:

### 1. Calcular próximas posições

Para cada bola, calcula-se a próxima posição com base no efeito atual e na direção:

```
próxima_posição = posição_atual + (direção × passo_do_efeito)
```

Onde o passo é:
- `NONE` → +1 célula na direção
- `FAST` → +2 células na direção
- `REVERSE` → −1 célula na direção (inverte)

### 2. Verificar colisões com blocos e bordas

Para **cada bola individualmente**, verifica se a próxima posição colide com:
- Qualquer bloco `NORMAL` no tabuleiro
- Qualquer célula de borda (parede)

**Se qualquer bola colidir → o movimento inteiro é cancelado. Nenhuma bola se move.**

### 3. Verificar colisão entre as bolas

As bolas não podem ocupar a mesma célula nem "atravessar" uma pela outra.

O movimento é **bloqueado** se ambas as condições abaixo forem verdadeiras:
- A próxima posição da Bola 1 colide com a posição atual da Bola 2, OU a Bola 2 iria para a mesma célula que a Bola 1
- A próxima posição da Bola 2 colide com a posição atual da Bola 1, OU a Bola 1 iria para a mesma célula que a Bola 2

Isso impede dois cenários:
- As bolas ocuparem a mesma célula após o movimento
- As bolas "trocarem de lugar" (passarem uma pela outra)

### 4. Aplicar movimento

Se não houve nenhuma colisão, as posições de ambas as bolas são atualizadas simultaneamente.

### 5. Atualizar efeitos

Após mover, para cada bola, verifica-se se há um pad na nova posição e aplica-se o efeito correspondente.

### 6. Verificar vitória

Após atualizar efeitos, verifica-se se ambas as bolas estão nas posições vencedoras.

---

## Detecção de Colisão (Bounding Box)

A colisão entre dois elementos é detectada por sobreposição de bounding box. Cada elemento ocupa uma área de `2 × 2` unidades a partir de sua posição `(x, y)`:

```
x_início = x
x_fim    = x + 2
y_início = y
y_fim    = y + 2
```

Dois elementos colidem se as suas áreas se sobrepõem em ambos os eixos:
```
colide_x = (x1_início <= x2_início < x1_fim) OU (x1_início < x2_fim <= x1_fim)
colide_y = (y1_início <= y2_início < y1_fim) OU (y1_início < y2_fim <= y1_fim)

colisão = colide_x AND colide_y
```

---

## Estrutura de Dados de um Nível

```json
{
  "id": "default_1",
  "index": 1,
  "enabled": true,
  "name": "Nome opcional",
  "twin_balls": [
    { "effect": "NONE", "position": { "x": 2, "y": 6 } },
    { "effect": "NONE", "position": { "x": 2, "y": 14 } }
  ],
  "blocks": [
    { "type": "NORMAL", "position": { "x": 10, "y": 8 } }
  ],
  "pads": [
    { "type": "FAST",    "position": { "x": 6,  "y": 14 } },
    { "type": "REVERSE", "position": { "x": 12, "y": 16 } }
  ],
  "winning_positions": [
    { "x": 20, "y": 6 },
    { "x": 20, "y": 14 }
  ]
}
```

| Campo               | Tipo      | Obrigatório | Descrição |
|---------------------|-----------|-------------|-----------|
| `id`                | string    | Sim | Identificador único do nível |
| `index`             | number    | Não | Ordem de exibição |
| `enabled`           | boolean   | Sim | Se `false`, o nível não aparece |
| `name`              | string    | Não | Nome de exibição |
| `twin_balls`        | array[2]  | Sim | Exatamente 2 bolas com posição e efeito inicial |
| `blocks`            | array     | Sim | Lista de blocos (pode ser vazia) |
| `pads`              | array     | Sim | Lista de pads (pode ser vazia) |
| `winning_positions` | array[2]  | Sim | Exatamente 2 posições que as bolas devem atingir |

---

## Fluxo de Telas

```
Menu Principal
    ↓
Seletor de Níveis
    ↓
Gameplay (nível ativo)
    ↓ (ao completar)
Próximo nível (ou volta ao seletor se for o último)
```

O jogo salva qual é o nível atual. O jogador pode reiniciar o nível (volta às posições iniciais) a qualquer momento.

---

## Níveis Incluídos

| Nível | ID          | Mecânicas presentes |
|-------|-------------|---------------------|
| 1     | `default_1` | Movimento básico, sem obstáculos |
| 2     | `default_2` | Blocos como labirinto |
| 3     | `default_3` | Pad FAST |
| 4     | `default_4` | Pad REVERSE |
| 5     | `default_5` | Blocos + FAST + REVERSE (múltiplos pads) |
| 6     | `default_6` | Blocos + FAST + REVERSE (mais complexo) |

---

## Resumo das Regras em Pseudocódigo

```
ao pressionar tecla(direção):
  se nível_completo: ignorar

  para cada bola:
    calcular próxima_posição(bola, direção)

  para cada bola:
    se colide_com_bloco(próxima_posição) ou colide_com_borda(próxima_posição):
      cancelar movimento inteiro; retornar

  se colide_entre_bolas(próximas_posições):
    cancelar movimento inteiro; retornar

  para cada bola:
    bola.posição = próxima_posição
    bola.efeito  = efeito_do_pad_em(bola.posição) ou bola.efeito (se não há pad)

  se bola1.posição em posições_vencedoras e bola2.posição em posições_vencedoras:
    nível_completo = true
```

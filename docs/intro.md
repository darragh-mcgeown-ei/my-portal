---
title: Introduction
sidebar_position: 1
---
## Heading 2

### Heading 3

#### Heading 4

## Information Panels

:::note
Some **content** with *Markdown* `syntax`. Check [this `api`](#).
:::
:::tip
Some **content** with *Markdown* `syntax`. Check [this `api`](#).
:::
:::info
Some **content** with *Markdown* `syntax`. Check [this `api`](#).
:::
:::warning
Some **content** with *Markdown* `syntax`. Check [this `api`](#).
:::
:::danger
Some **content** with *Markdown* `syntax`. Check [this `api`](#).
:::

## Code Blocks

```jsx
function HelloCodeTitle(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## Mermaid Diagrams

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

```mermaid
quadrantChart
title Reach and engagement of campaigns
x-axis Low Reach --> High Reach
y-axis Low Engagement --> High Engagement
quadrant-1 We should expand
quadrant-2 Need to promote
quadrant-3 Re-evaluate
quadrant-4 May be improved
Campaign A: [0.3, 0.6]
Campaign B: [0.45, 0.23]
Campaign C: [0.57, 0.69]
Campaign D: [0.78, 0.34]
Campaign E: [0.40, 0.34]
Campaign F: [0.35, 0.78]
```

```mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```

```mermaid
radar-beta
  axis m["Math"], s["Science"], e["English"]
  axis h["History"], g["Geography"], a["Art"]
  curve a["Alice"]{85, 90, 80, 70, 75, 90}
  curve b["Bob"]{70, 75, 85, 80, 90, 85}

  max 100
  min 0
```

## Inline Code Highlight
The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

## Images
![](/img/screenshot-2025-07-16-at-10.06.53.png)
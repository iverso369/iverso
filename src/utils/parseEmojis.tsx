import React from 'react'

const EMOJI_MAP: Record<string, string> = {
  '\u{1F600}': 'emoji_u1f600.svg',
  '\u{1F603}': 'emoji_u1f603.svg',
  '\u{1F604}': 'emoji_u1f604.svg',
  '\u{1F601}': 'emoji_u1f601.svg',
  '\u{1F606}': 'emoji_u1f606.svg',
  '\u{1F602}': 'emoji_u1f602.svg',
  '\u{1F923}': 'emoji_u1f923.svg',
  '\u{1F60A}': 'emoji_u1f60a.svg',
  '\u{263A}':  'emoji_u263a.svg',
  '\u{1F642}': 'emoji_u1f642.svg',
  '\u{1F970}': 'emoji_u1f970.svg',
  '\u{1F60D}': 'emoji_u1f60d.svg',
  '\u{1F618}': 'emoji_u1f618.svg',
  '\u{1F617}': 'emoji_u1f617.svg',
  '\u{1F619}': 'emoji_u1f619.svg',
  '\u{1F972}': 'emoji_u1f972.svg',
  '\u{1F979}': 'emoji_u1f979.svg',
  '\u{1F609}': 'emoji_u1f609.svg',
  '\u{1F61C}': 'emoji_u1f61c.svg',
  '\u{1F61D}': 'emoji_u1f61d.svg',
  '\u{1F61B}': 'emoji_u1f61b.svg',
  '\u{1F911}': 'emoji_u1f911.svg',
  '\u{1F917}': 'emoji_u1f917.svg',
  '\u{1F92B}': 'emoji_u1f92b.svg',
  '\u{1F913}': 'emoji_u1f913.svg',
  '\u{1F60E}': 'emoji_u1f60e.svg',
  '\u{1F60F}': 'emoji_u1f60f.svg',
  '\u{1F914}': 'emoji_u1f914.svg',
  '\u{1F928}': 'emoji_u1f928.svg',
  '\u{1F9D0}': 'emoji_u1f9d0.svg',
  '\u{1F610}': 'emoji_u1f610.svg',
  '\u{1F611}': 'emoji_u1f611.svg',
  '\u{1F636}': 'emoji_u1f636.svg',
  '\u{1F62E}': 'emoji_u1f62e.svg',
  '\u{1F632}': 'emoji_u1f632.svg',
  '\u{1F631}': 'emoji_u1f631.svg',
  '\u{1F92F}': 'emoji_u1f92f.svg',
  '\u{1F633}': 'emoji_u1f633.svg',
  '\u{1F624}': 'emoji_u1f624.svg',
  '\u{1F620}': 'emoji_u1f620.svg',
  '\u{1F621}': 'emoji_u1f621.svg',
  '\u{1F612}': 'emoji_u1f612.svg',
  '\u{1F644}': 'emoji_u1f644.svg',
  '\u{1F62C}': 'emoji_u1f62c.svg',
  '\u{1F615}': 'emoji_u1f615.svg',
  '\u{1F616}': 'emoji_u1f616.svg',
  '\u{1F614}': 'emoji_u1f614.svg',
  '\u{1F61E}': 'emoji_u1f61e.svg',
  '\u{1F629}': 'emoji_u1f629.svg',
  '\u{1F62A}': 'emoji_u1f62a.svg',
  '\u{1F634}': 'emoji_u1f634.svg',
  '\u{1F971}': 'emoji_u1f971.svg',
  '\u{1F625}': 'emoji_u1f625.svg',
  '\u{1F622}': 'emoji_u1f622.svg',
  '\u{1F62D}': 'emoji_u1f62d.svg',
  '\u{1F605}': 'emoji_u1f605.svg',
  '\u{1F60C}': 'emoji_u1f60c.svg',
  '\u{1F643}': 'emoji_u1f643.svg',
  '\u{1F648}': 'emoji_u1f648.svg',
  '\u{1F649}': 'emoji_u1f649.svg',
  '\u{1F64A}': 'emoji_u1f64a.svg',
  '\u{1F937}': 'emoji_u1f937.svg',
  '\u{1F97A}': 'emoji_u1f97a.svg',
  '\u{1F61A}': 'emoji_u1f61a.svg',
  '\u{1F607}': 'emoji_u1f607.svg',
  '\u{1F44D}': 'emoji_u1f44d.svg',
  '\u{1F44E}': 'emoji_u1f44e.svg',
  '\u{1F44B}': 'emoji_u1f44b.svg',
  '\u{1F44F}': 'emoji_u1f44f.svg',
  '\u{270C}':  'emoji_u270c.svg',
  '\u{1F4AA}': 'emoji_u1f4aa.svg',
  '\u{1F64F}': 'emoji_u1f64f.svg',
  '\u{2764}':  'emoji_u2764.svg',
}

const emojiRegex = new RegExp(
  Object.keys(EMOJI_MAP)
    .sort((a, b) => b.length - a.length)
    .map(k => k.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'))
    .join('|'),
  'gu'
)

export function parseEmojis(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let lastIndex = 0

  emojiRegex.lastIndex = 0
  let match
  while ((match = emojiRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const emoji = match[0]
    const filename = EMOJI_MAP[emoji]
    if (filename) {
      parts.push(
        <img
          key={`emoji-${match.index}`}
          src={`/emojis/${filename}`}
          alt={emoji}
          className="noto-emoji"
          style={{
            height: '1.4em',
            width: '1.4em',
            verticalAlign: '-0.3em',
            display: 'inline',
            margin: '0 0.05em',
          }}
        />
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

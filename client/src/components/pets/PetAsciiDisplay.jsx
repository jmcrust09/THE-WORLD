import React from 'react';
import { getPetArt, RARITY_COLORS, RARITY_LABELS, RARITY_BORDER, RARITY_GLOW } from '../../utils/petAsciiArt';

/**
 * PetAsciiDisplay
 * ---------------
 * Renders a pet's ASCII art inside a border that reflects its rarity.
 * Supports overlaying accessories on top.
 *
 * Props:
 *   pet      – { species, name, rarity, stage }
 *   accessory – optional key from ACCESSORIES (e.g. "corona", "aura_fuego")
 *   compact  – boolean, renders a smaller version
 */
export default function PetAsciiDisplay({ pet, accessory = "none", compact = false }) {
  const { species, name, rarity, stage } = pet;
  const lines = getPetArt(species, stage, accessory);
  const border = RARITY_BORDER[rarity] || RARITY_BORDER['comun'];
  const colorClass = RARITY_COLORS[rarity] || RARITY_COLORS['comun'];
  const glowStyle = { filter: RARITY_GLOW[rarity] || 'none' };

  // Build border around art
  const width = Math.max(...lines.map(l => l.length)) + 4;
  const hLine = border.h.repeat(width - 2);
  const topBorder    = `${border.tl}${hLine}${border.tr}`;
  const bottomBorder = `${border.bl}${hLine}${border.br}`;

  const paddedLines = lines.map(l => {
    const pad = width - 2 - l.length;
    const left  = Math.floor(pad / 2);
    const right = pad - left;
    return `${border.v}${' '.repeat(left)}${l}${' '.repeat(right)}${border.v}`;
  });

  const rarityLabelLine = (() => {
    const label = `[ ${RARITY_LABELS[rarity]} ]`;
    const lpad = Math.floor((width - label.length) / 2);
    return ' '.repeat(lpad) + label;
  })();

  const stageLabel = `~ ${stage} ~`;
  const stagePad   = ' '.repeat(Math.floor((width - stageLabel.length) / 2));

  const nameLine = name.length <= width - 2 ? name : name.slice(0, width - 5) + '...';
  const namePad  = ' '.repeat(Math.floor((width - nameLine.length) / 2));

  const fullArt = [
    topBorder,
    ...paddedLines,
    bottomBorder,
    rarityLabelLine,
    `${namePad}${nameLine}`,
    `${stagePad}${stageLabel}`
  ].join('\n');

  const fontSize = compact ? 'text-[8px]' : 'text-[11px]';

  return (
    <div
      className={`inline-block font-mono ${colorClass} ${fontSize} leading-tight select-none`}
      style={{ ...glowStyle, letterSpacing: '0.05em' }}
    >
      <pre className="whitespace-pre m-0 p-0">{fullArt}</pre>
    </div>
  );
}

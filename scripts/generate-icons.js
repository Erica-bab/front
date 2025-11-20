const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../assets/icon');
const OUTPUT_FILE = path.join(__dirname, '../components/Icon.tsx');

// SVG 파일 목록 가져오기
const iconFiles = fs.readdirSync(ICONS_DIR)
  .filter(file => file.endsWith('.svg'))
  .sort();

// 파일명을 camelCase IconName으로 변환
const toCamelCase = (str) => {
  return str
    .replace('.svg', '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char, index) => index === 0 ? char.toLowerCase() : char.toUpperCase())
    .replace(/\s/g, '');
};

// Import 문 생성
const imports = iconFiles.map(file => {
  const iconName = toCamelCase(file);
  const capitalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1) + 'Icon';
  return `import ${capitalizedName} from '@/assets/icon/${file}';`;
}).join('\n');

// Icons 객체 생성
const iconEntries = iconFiles.map(file => {
  const iconName = toCamelCase(file);
  const capitalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1) + 'Icon';
  return `  ${iconName}: ${capitalizedName},`;
}).join('\n');

// 최종 파일 내용
const fileContent = `import { SvgProps } from 'react-native-svg';

// 아이콘 import (자동 생성됨 - scripts/generate-icons.js)
${imports}

// 아이콘 매핑
const icons = {
${iconEntries}
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 24, width, height, ...props }: IconProps) {
  const IconComponent = icons[name];

  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      {...props}
    />
  );
}
`;

// 파일 작성
fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8');
console.log(`✅ Icon.tsx generated successfully with ${iconFiles.length} icons!`);
console.log(`📝 Icons: ${iconFiles.map(f => toCamelCase(f)).join(', ')}`);

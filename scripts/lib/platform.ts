import { DictItem, KotoeriHinshi, WindowsImeHinshi } from '../../worddata/dict';

export const toMacUserDict = (items: DictItem[]) => {
  const head = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>`;

  const dicts = items
    .map(({ hiragana, word }) => {
      return `<dict>
  <key>phrase</key>
  <string>${word}</string>
  <key>shortcut</key>
  <string>${hiragana}</string>
</dict>`;
    })
    .join('\n');

  const foot = `</array>
</plist>`;

  return [head, dicts, foot].join('\n');
};

export const toKotoeriDict = (items: DictItem[]) => {
  return items.map((item) => `"${item.hiragana}","${item.word}","${item.hinshi}"`).join('\n');
};
export const toBouyomiDict = (items: DictItem[]) => {
  return items
    .map((item) => `2\tN\t${item.word}\t${item.hiragana}`)
    .join('\r\n');
};

export const toWindowsImeDict = (items: DictItem[]) => {
  const hinshiConv = (hinshi: KotoeriHinshi): WindowsImeHinshi => {
    if (hinshi === '普通名詞') {
      return '名詞';
    } else if (hinshi === 'サ変名詞') {
      return 'さ変名詞';
    } else if (hinshi === '地名') {
      return '地名その他';
    }

    return hinshi;
  };

  return items
    .map(({ hinshi, ...item }) => ({
      ...item,
      hinshi: hinshiConv(hinshi),
    }))
    .map((item) => `${item.hiragana}\t${item.word}\t${item.hinshi}`)
    .join('\r\n');
};
